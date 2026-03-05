import React from 'react';
import { UserOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { formatDate } from '@shared/lib/format-date';

export const createAppointmentColumns = (DeleteButtonComponent) => [
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
    render: (_, record) => <DeleteButtonComponent id={record._id} />,
  },
];
