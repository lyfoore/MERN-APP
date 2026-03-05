import React from 'react';
import { Tag, Divider, Space, Typography } from 'antd';
import { CheckCircleOutlined, WarningOutlined, InfoCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { colors } from '@shared/config/theme.config';

const { Title } = Typography;

export const ColorPalette = ({ isDarkMode }) => (
  <div style={{
    background: isDarkMode ? '#1f1f1f' : '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
    boxShadow: isDarkMode
      ? '0 2px 8px rgba(0, 0, 0, 0.4)'
      : '0 2px 8px rgba(0, 0, 0, 0.08)',
  }}>
    <Title level={3} style={{ margin: '0 0 16px 0', fontWeight: 600 }}>
      Цветовая палитра
    </Title>
    
    <Space wrap size="middle">
      <Tag color={colors.primary} style={{ fontSize: '14px', padding: '6px 16px' }}>
        Primary
      </Tag>
      <Tag color={colors.secondary} style={{ fontSize: '14px', padding: '6px 16px' }}>
        Secondary
      </Tag>
      <Tag color={colors.accent} style={{ fontSize: '14px', padding: '6px 16px' }}>
        Accent
      </Tag>
      <Tag icon={<CheckCircleOutlined />} color="success" style={{ fontSize: '14px', padding: '6px 16px' }}>
        Success
      </Tag>
      <Tag icon={<WarningOutlined />} color="warning" style={{ fontSize: '14px', padding: '6px 16px' }}>
        Warning
      </Tag>
      <Tag icon={<CloseCircleOutlined />} color="error" style={{ fontSize: '14px', padding: '6px 16px' }}>
        Error
      </Tag>
      <Tag icon={<InfoCircleOutlined />} color="processing" style={{ fontSize: '14px', padding: '6px 16px' }}>
        Info
      </Tag>
    </Space>
    
    <Divider style={{ margin: '16px 0' }} />
    
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      <div>
        <span style={{ fontSize: '12px', color: isDarkMode ? '#8c8c8c' : '#8c8c8c' }}>Background</span>
        <div style={{
          width: '80px',
          height: '60px',
          background: isDarkMode ? '#0b0f1a' : '#f0f2f5',
          borderRadius: '8px',
          border: `1px solid ${isDarkMode ? '#434343' : '#d9d9d9'}`,
          marginTop: '8px',
        }} />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: isDarkMode ? '#8c8c8c' : '#8c8c8c' }}>Surface</span>
        <div style={{
          width: '80px',
          height: '60px',
          background: isDarkMode ? '#1f1f1f' : '#ffffff',
          borderRadius: '8px',
          border: `1px solid ${isDarkMode ? '#434343' : '#d9d9d9'}`,
          marginTop: '8px',
        }} />
      </div>
    </div>
  </div>
);
