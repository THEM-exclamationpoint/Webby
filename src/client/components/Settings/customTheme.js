import * as React from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const lightTheme = createTheme({
  palette: {
    primary:{
        main: '#ff0000'
    } ,
    type: 'light'
  },
});

// export default function CustomStyles() {
//   return (
//     <ThemeProvider theme={lightTheme} />

//   );
// }

export default lightTheme