import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'
import {
  Button,
  Box,
  TextField,
  Typography,
  Avatar,
  Switch,
  Card,
  Paper,
  IconButton,
  Slider,
} from '@mui/material'
import {PersonAdd, PeopleAlt, PersonRemove, Pending} from '@mui/icons-material'
import {
  getUserProfile,
  getUserFriends,
  getUserInterests,
} from '../../../store/profile'
import {getUserData, auth} from '../../../../firebase/auth'
import {User} from '../../../../firebase/models/User'
import './style.css'
import {border} from '@mui/system'

const UserProfile = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {uid} = useParams()
  const profile = useSelector((state) => state.profile)

  const {user, friends, interests} = profile

  useEffect(() => {
    dispatch(getUserProfile(uid))
    dispatch(getUserInterests(uid))
    dispatch(getUserFriends(uid))
  }, [])

  return (
    <div className="user-profile-block">
      <Paper
        sx={{
          m: 1,
          p: 1,
          display: 'flex',
          flexDirection: 'column',
        }}>
        <Paper
          sx={{
            m: 1,
            p: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Avatar
            alt={user.name}
            src={user.profilePicture}
            sx={{
              m: 1,
              width: 150,
              height: 150,
              border: '4px double #028090',
            }}
          />
          <Typography sx={{m: 1}} variant="h3">
            {user.name}
          </Typography>
        </Paper>
        <Paper></Paper>
      </Paper>
    </div>
  )
}

export default UserProfile
