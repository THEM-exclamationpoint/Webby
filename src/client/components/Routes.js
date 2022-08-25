import { Routes, Route} from 'react-router-dom';

      <Routes>
import {Routes, Route} from 'react-router-dom'
import LogIn from './Auth/Login'
import Home from './Home'
import Signup from './Auth/Sign-up'
import Graph from './Graph/index.js'

function WebbyRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<LogIn />} />
      <Route exact path="/register" element={<Signup />} />
    </Routes>
  )
}

export default WebbyRoutes