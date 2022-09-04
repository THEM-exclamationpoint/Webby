import * as React from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const lightTheme = createTheme({
    palette: {
        type: 'light',
        primary: {
          main: '#2C2C54',
        },
        secondary: {
          main: '#A799B7',
        },
        background: {
          default: '#FCF7F8',
        },
      },
});

// export default function CustomStyles() {
//   return (
//     <ThemeProvider theme={lightTheme} />

//   );
// }

export default lightTheme