import React from 'react';
import { Button, Popconfirm, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { appointmentApi } from '@shared/api/appointment.api';

export const DeleteAppointmentButton = ({ id, onSuccess }) => {
  const handleDelete = async () => {
    try {
      await appointmentApi.delete(id);
      message.success('Запись удалена');
      onSuccess();
    } catch (error) {
      message.error('Ошибка удаления');
      console.error(error);
    }
  };

  return (
    <Popconfirm
      title="Удалить запись?"
      description="Вы уверены, что хотите удалить эту запись?"
      onConfirm={handleDelete}
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
  );
};
