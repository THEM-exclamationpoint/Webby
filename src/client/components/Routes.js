import {Routes, Route} from 'react-router-dom'
import LogIn from './Auth/Login'
import Home from './Home'
import Signup from './Auth/Sign-up'
import EditProfile from './Profile/EditProfile'
import Chat from './Chat/ChatRoom'
import Graph from './Graph'
import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import AppSettings from './Settings'
import User, {setUser} from '../store/auth/user'
import {FriendsList} from './Friends'
import UserProfile from './Profile/UserProfile'
import {auth} from '../../firebase/auth'
import './style.css'
import {Box} from '@mui/material'

function WebbyRoutes() {
  let dispatch = useDispatch()
  let user = useSelector((state) => state.user)
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser())
      }
    })
  }, [])
  return (
    <Box sx={{background: 'primary'}} className="content">
      <Routes>
        <Route exact path="/home" element={user ? <Home /> : <LogIn />} />
        <Route exact path="/" element={<LogIn />} />
        <Route exact path="/register" element={<Signup />} />
        <Route exact path="/editprofile" element={user && <EditProfile />} />
        <Route exact path="/chatroom" element={user && <Chat />} />
        <Route exact path="/graph" element={user && <Graph />} />
        <Route exact path="/Friends" element={user && <FriendsList />} />
        <Route path="/users/:uid" element={user && <UserProfile />} />
        <Route exact path="/settings" element={<AppSettings />} />
      </Routes>
    </Box>
  )
}

export default WebbyRoutes
