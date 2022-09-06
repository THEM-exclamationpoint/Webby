import WebbyRoutes from './client/components/Routes'
import NavBar from './client/components/Nav'
import {ThemeProvider, CssBaseline} from '@mui/material'
import {useSelector} from 'react-redux'
import lightMode from './client/components/Settings/lightMode'

function App() {
  const settings = useSelector((state) => state.settings)

  return (
    <ThemeProvider theme={settings ? settings.theme : lightMode}>
      <CssBaseline />
      <div>
        <NavBar />
      </div>
      <div id="content-body">
        <WebbyRoutes />
      </div>
    </ThemeProvider>
  )
}

export default App
