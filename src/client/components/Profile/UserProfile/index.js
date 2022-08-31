import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'
import {
  Button,
  Box,
  TextField,
  Typography,
  Avatar,
  Fab,
  FormGroup,
  FormControlLabel,
  FormLabel,
  Switch,
  Card,
  Paper,
  IconButton,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Slider,
} from '@mui/material'
import {User} from '../../../../firebase/models/User'
import {getUserProfile} from '../../../store/profile'
import './style.css'
import {border} from '@mui/system'

const UserProfile = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {uid} = useParams()
  const profile = useSelector((state) => state.profile)

  useEffect(() => {
    dispatch(getUserProfile(uid))
  }, [uid])

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
            alt={profile.name}
            src={profile.profilePicture}
            sx={{
              width: 150,
              height: 150,
              border: '6px double #028090',
            }}
          />
          <Typography variant="h3">{profile.name}</Typography>
        </Paper>
        <div>params {uid}</div>
        <div>profile {profile.uid}</div>
      </Paper>
    </div>
  )
}

export default UserProfile
