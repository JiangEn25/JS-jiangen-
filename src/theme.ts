// theme.ts
import { createTheme } from '@mui/material/styles';

export default createTheme({
  palette: {
    primary: {
      main: '#556cd6', // 主要颜色
    },
    secondary: {
      main: '#19857b', // 次要颜色
    },
    background: {
      default: '#f5f5f5', // 默认背景色
      paper: '#ffffff',   // 卡片等组件的背景色
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontSize: '3rem',
    },
    h2: {
      fontSize: '1.5rem',
    },
    body1: {
      fontSize: '0.5rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // 禁用按钮文本大写
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#556cd6', // 应用程序栏背景色
        },
      },
    },
    // 更多组件覆盖...
  },
});