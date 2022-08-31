import './App.css'
import WebbyRoutes from './client/components/Routes'
import NavBar from './client/components/Nav'
import { ThemeProvider } from '@mui/material'
import lightTheme from './client/components/Settings/customTheme.js'

function App() {
  return (
    <div className="App">
      <ThemeProvider theme = {lightTheme}>
      <header className="App-header">
        <NavBar />
        <WebbyRoutes />
      </header>
      </ThemeProvider>
    </div>
  )
}

export default App
