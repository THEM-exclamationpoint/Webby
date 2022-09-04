import * as React from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
// import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

const lightMode = createTheme ({
  palette: {
    type: 'light',
    primary: {
      main: '#2C2C54',
    },
    secondary: {
      main: '#951A4D',
    },
    background: {
      default: '#FCF7F8',
      paper: '#FCF7F8',
      card: '#FCF7F8',
    },
    text: {
      primary: '#090A0C',
      secondary: '#090A0C',
    },
    error: {
      main: '#F44336',
    },
    warning: {
      main: '#FF9800',
    },
    success: {
      main: '#4CAF50',
    },
  },
});

export default lightMode