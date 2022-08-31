import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'
import {
  Button,
  Box,
  TextField,
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
import './style.css'

const UserProfile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {uid} = useParams()

  return (
    <div>
      <div>{uid}</div>
      <div>Test</div>
    </div>
  )
}

export default UserProfile
