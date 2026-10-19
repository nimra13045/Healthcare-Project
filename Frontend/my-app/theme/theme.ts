import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#07998F',
      light: '#38ada4',
      dark: '#056f67',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#15384B',
      light: '#2a556d',
      dark: '#0b2331',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F8FBFC',
    },
    text: {
      primary: '#15384B',
      secondary: '#507283',
    },
  },
  typography: {
    fontFamily: 'var(--font-geist-sans), Arial, sans-serif',
    h1: {
      fontWeight: 800,
      color: '#15384B',
    },
    h2: {
      fontWeight: 700,
      color: '#15384B',
    },
    h3: {
      fontWeight: 600,
      color: '#15384B',
    },
  },
  shape: {
    borderRadius: 16,
  },
});

export default theme;