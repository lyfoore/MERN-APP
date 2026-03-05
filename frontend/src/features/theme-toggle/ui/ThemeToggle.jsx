import React from 'react';
import { Button } from 'antd';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';

export const ThemeToggle = ({ isDarkMode, onToggle }) => (
  <Button
    icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
    onClick={onToggle}
  >
    {isDarkMode ? 'Дневная' : 'Ночная'}
  </Button>
);
