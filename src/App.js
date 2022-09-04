import './App.css'
import WebbyRoutes from './client/components/Routes'
import NavBar from './client/components/Nav'
import { ThemeProvider } from '@mui/material'
import { useSelector } from 'react-redux'
import lightMode from './client/components/Settings/lightMode'

function App() {

  const settings = useSelector((state) => state.settings)

  return (
    <ThemeProvider theme = {settings ? settings.theme : lightMode}>
      <div className="App">
      
        <header className="App-header">
          <NavBar />
          <WebbyRoutes />
        </header>
        
      </div>
    </ThemeProvider>
  )
}

export default App
