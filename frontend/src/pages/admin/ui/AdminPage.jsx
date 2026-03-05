import React, { useState } from 'react';
import { Typography, ConfigProvider } from 'antd';
import { getCustomTheme } from '@shared/config/theme.config';
import { ThemeToggle } from '@features/theme-toggle';
import { AppointmentsTable } from '@widgets/appointments-table';

const { Title } = Typography;

export const AdminPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const customTheme = getCustomTheme(isDarkMode);

  return (
    <ConfigProvider theme={customTheme}>
      <div style={{
        minHeight: '100vh',
        padding: '24px',
        background: isDarkMode ? '#0b0f1a' : '#f0f2f5',
        transition: 'background 0.3s',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <Title level={1} style={{
            margin: '0 0 8px 0',
            fontWeight: 700,
            letterSpacing: '-0.5px',
          }}>
            📋 Система управления записями
          </Title>

          <Title level={2} style={{
            margin: '0 0 24px 0',
            fontWeight: 600,
            color: isDarkMode ? '#bfbfbf' : '#595959',
          }}>
            Панель администратора
          </Title>

          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '24px',
          }}>
            <ThemeToggle isDarkMode={isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
          </div>

          <div style={{
            background: isDarkMode ? '#1f1f1f' : '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: isDarkMode
              ? '0 2px 8px rgba(0, 0, 0, 0.4)'
              : '0 2px 8px rgba(0, 0, 0, 0.08)',
          }}>
            <AppointmentsTable />
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
};
