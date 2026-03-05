import { theme } from 'antd';

export const colors = {
  primary: '#1677ff',
  secondary: '#722ed1',
  accent: '#fa8c16',
  success: '#52c41a',
  warning: '#faad14',
  error: '#ff4d4f',
  info: '#1677ff',
};

export const getCustomTheme = (isDarkMode) => ({
  algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
  token: {
    colorPrimary: colors.primary,
    borderRadius: 8,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
    fontSize: 14,
    fontSizeLG: 16,
    fontSizeXL: 18,
    fontSizeHeading1: 38,
    fontSizeHeading2: 30,
    fontSizeHeading3: 24,
    fontSizeHeading4: 20,
    fontSizeHeading5: 16,
    lineHeightHeading1: 1.2,
    lineHeightHeading2: 1.25,
    lineHeightHeading3: 1.3,
    fontWeightStrong: 600,
  },
  components: {
    Typography: {
      titleColor: isDarkMode ? '#e5e5e5' : '#1f1f1f',
      titleColorLight: isDarkMode ? '#bfbfbf' : '#8c8c8c',
      titleH1Color: isDarkMode ? '#f0f0f0' : '#001529',
      titleH2Color: isDarkMode ? '#e5e5e5' : '#003a8c',
      titleH3Color: isDarkMode ? '#d9d9d9' : '#0050b3',
      titleFontWeight: 600,
      titleMarginBottom: '0.5em',
    },
    Table: {
      headerBg: isDarkMode ? '#1d1d1d' : '#fafafa',
      headerColor: isDarkMode ? '#e8e8e8' : '#262626',
      rowHoverBg: isDarkMode ? '#262626' : '#e6f7ff',
      borderColor: isDarkMode ? '#434343' : '#f0f0f0',
      colorBgContainer: isDarkMode ? '#1f1f1f' : '#ffffff',
    },
    Button: {
      algorithm: true,
      colorPrimary: colors.primary,
      colorPrimaryHover: '#4096ff',
      colorPrimaryActive: '#0958d9',
    },
    Card: {
      colorBgContainer: isDarkMode ? '#1f1f1f' : '#ffffff',
    },
  },
});
