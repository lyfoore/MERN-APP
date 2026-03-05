import { useState, useEffect, useCallback } from 'react';
import { 
  Table, 
  Button, 
  Typography, 
  ConfigProvider, 
  theme, 
  Space, 
  Popconfirm, 
  message,
  Empty,
  Spin
} from 'antd';
import { 
  DeleteOutlined, 
  SunOutlined, 
  MoonOutlined, 
  UserOutlined, 
  ClockCircleOutlined,
  ReloadOutlined 
} from '@ant-design/icons';
import axios from 'axios';

const { Title } = Typography;

const API_URL = '/api/appointments';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAppointments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setAppointments(response.data);
    } catch (error) {
      message.error('Ошибка загрузки данных');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAppointments();
    const interval = setInterval(loadAppointments, 5000);
    return () => clearInterval(interval);
  }, [loadAppointments]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      message.success('Запись удалена');
      loadAppointments();
    } catch (error) {
      message.error('Ошибка удаления');
      console.error(error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const columns = [
    {
      title: (
        <Space>
          <UserOutlined />
          <span>Имя</span>
        </Space>
      ),
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: (
        <Space>
          <ClockCircleOutlined />
          <span>Время записи</span>
        </Space>
      ),
      dataIndex: 'appointmentTime',
      key: 'appointmentTime',
      render: (date) => formatDate(date),
      sorter: (a, b) => new Date(a.appointmentTime) - new Date(b.appointmentTime),
    },
    {
      title: 'Дата создания',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => formatDate(date),
      responsive: ['md'],
    },
    {
      title: 'Действия',
      key: 'action',
      render: (_, record) => (
        <Popconfirm
          title="Удалить запись?"
          description="Вы уверены, что хотите удалить эту запись?"
          onConfirm={() => handleDelete(record._id)}
          okText="Да"
          cancelText="Отмена"
          okButtonProps={{ danger: true }}
        >
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />}
          >
            Удалить
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const dataSource = appointments.map((item) => ({
    ...item,
    key: item._id,
  }));

  const algorithm = isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm;

  const customTheme = {
    algorithm,
    token: {
      colorPrimary: '#1890ff',
      borderRadius: 6,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      fontSize: 14,
    },
    components: {
      Table: {
        headerBg: isDarkMode ? '#1d1d1d' : '#fafafa',
        headerColor: isDarkMode ? '#e8e8e8' : '#262626',
        rowHoverBg: isDarkMode ? '#262626' : '#e6f7ff',
        borderColor: isDarkMode ? '#434343' : '#f0f0f0',
      },
      Button: {
        algorithm: true,
      },
      Typography: {
        titleColor: isDarkMode ? '#e8e8e8' : '#262626',
      },
    },
  };

  return (
    <ConfigProvider theme={customTheme}>
      <div style={{
        minHeight: '100vh',
        padding: '24px',
        background: isDarkMode ? '#141414' : '#f0f2f5',
        transition: 'background 0.3s',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
            flexWrap: 'wrap',
            gap: '16px',
          }}>
            <Title level={2} style={{ margin: 0 }}>
              📋 Записи на приём
            </Title>
            
            <Space>
              <Button
                icon={<ReloadOutlined />}
                onClick={loadAppointments}
                loading={loading}
              >
                Обновить
              </Button>
              
              <Button
                icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                {isDarkMode ? 'Дневная' : 'Ночная'}
              </Button>
            </Space>
          </div>

          <div style={{
            background: isDarkMode ? '#1f1f1f' : '#ffffff',
            borderRadius: '8px',
            padding: '24px',
            boxShadow: isDarkMode 
              ? '0 1px 2px 0 rgba(0, 0, 0, 0.5)' 
              : '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
          }}>
            {loading && appointments.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <Spin size="large" tip="Загрузка..." />
              </div>
            ) : (
              <Table
                columns={columns}
                dataSource={dataSource}
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  showTotal: (total) => `Всего: ${total}`,
                  locale: {
                    items_per_page: 'стр.',
                  },
                }}
                locale={{
                  emptyText: (
                    <Empty 
                      description="Нет записей" 
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                  ),
                }}
                size="middle"
                bordered
              />
            )}
          </div>

          <div style={{
            marginTop: '24px',
            padding: '16px',
            background: isDarkMode ? '#1f1f1f' : '#ffffff',
            borderRadius: '8px',
            fontSize: '13px',
            color: isDarkMode ? '#a6a6a6' : '#8c8c8c',
          }}>
            <p>
              💡 Для создания записи напишите <strong>/start</strong> в Telegram боте.
              Данные обновляются автоматически каждые 5 секунд.
            </p>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}

export default App;
