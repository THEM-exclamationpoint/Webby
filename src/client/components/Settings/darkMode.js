import * as React from 'react'
import {createTheme, ThemeProvider, styled} from '@mui/material/styles'
// import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

const darkMode = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#A799B7',
    },
    secondary: {
      main: '#028090',
    },
    background: {
      default: '#282c36',
      paper: '#282c36',
    },
    text: {
      primary: '#F3E2E6',
      secondary: '#DBA9B4',
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
})

export default darkMode
