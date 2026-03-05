import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Table, Empty, Spin, Button, Space, Typography } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { createAppointmentColumns } from '@entities/appointment';
import { DeleteAppointmentButton } from '@features/appointment-actions';
import { appointmentApi } from '@shared/api/appointment.api';

const { Title } = Typography;

export const AppointmentsTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAppointments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await appointmentApi.getAll();
      console.log('API Response:', response);
      // Если response — массив, используем его напрямую
      const data = Array.isArray(response) ? response : (response.data || []);
      setAppointments(data);
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAppointments();
    const interval = setInterval(loadAppointments, 5000);
    return () => clearInterval(interval);
  }, [loadAppointments]);

  const DeleteButtonWrapper = useCallback(({ id }) => {
    return <DeleteAppointmentButton id={id} onSuccess={loadAppointments} />;
  }, [loadAppointments]);

  const columns = useMemo(() => createAppointmentColumns(DeleteButtonWrapper), [DeleteButtonWrapper]);

  const dataSource = useMemo(() => {
    if (!appointments || !Array.isArray(appointments)) return [];
    return appointments.map((item) => ({
      ...item,
      key: item._id,
    }));
  }, [appointments]);

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <Title level={4} style={{ margin: 0 }}>
          Записи на приём
        </Title>

        <Space>
          <Button
            icon={<ReloadOutlined />}
            onClick={loadAppointments}
            loading={loading}
            type="primary"
          >
            Обновить
          </Button>
        </Space>
      </div>

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
  );
};
