import {Routes, Route} from 'react-router-dom'
import LogIn from './Auth/Login'
import Home from './Home'
import Signup from './Auth/Sign-up'
import EditProfile from './Profile/EditProfile'
import Chat from './Chat/ChatRoom'
import Graph from './Graph'
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {setUser} from '../store/auth/user'
import AppSettings from './Settings';
import User, {setUser} from '../store/auth/user'
import {FriendsList} from './Friends'
import UserProfile from './Profile/UserProfile'

function WebbyRoutes() {
  let dispatch = useDispatch()
  let user = useSelector((state) => state.user)
  useEffect(() => {
    dispatch(setUser())
  }, [])
  return (
    <Routes>
      <Route exact path="/home" element={user ? <Home /> : <LogIn />} />
      <Route exact path="/settings" element={<AppSettings/>} />
      <Route exact path="/" element={<LogIn />} />
      <Route exact path="/register" element={<Signup />} />
      <Route
        exact
        path="/editprofile"
        element={user ? <EditProfile /> : <LogIn />}
      />
      <Route exact path="/chatroom" element={user ? <Chat /> : <LogIn />} />
      <Route exact path="/graph" element={user ? <Graph /> : <LogIn />} />
      <Route
        exact
        path="/Friends"
        element={user ? <FriendsList /> : <LogIn />}
      />
      <Route path="/users/:uid" element={user ? <UserProfile /> : <LogIn />} />
    </Routes>
  )
}

export default WebbyRoutes
