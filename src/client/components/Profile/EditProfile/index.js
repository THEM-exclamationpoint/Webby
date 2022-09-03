// @ts-nocheck
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import interestList from './interestList'
import {
  Button,
  Box,
  Divider,
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
  Typography,
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import SendIcon from '@mui/icons-material/Send'
import CheckIcon from '@mui/icons-material/Check'
import EditAvailabilityGrid from '../Elements/EditAvailibilityGrid'
import MultiSelectorAuto from '../Elements/MultiSelectorAuto'
import {User} from '../../../../firebase/models/User'
import {
  updateProfile,
  updatePassword,
  updateEmail,
} from '../../../store/profile/editProfile'
import {setUser} from '../../../store/auth/user'
// import {fetchAllInterests} from '../../../store/profile/editProfile'
import {setUserInterests} from '../../../store/interests'
import CountrySelect from '../Elements/CountrySelect'
import './style.css'

const EditProfile = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {firstVisit = false} = props

  let user = useSelector((state) => state.user)
  let myInterests = useSelector((state) => state.interests)
  let interests = interestList
  // let {interests} = useSelector((state) => state.editProfile)

  let [userProfile, setUserProfile] = useState(
    new User({...user, interests: [...myInterests]})
  )

  let [newPassword, setNewPassword] = useState({
    new: '',
    confirm: '',
  })
  let [newEmail, setNewEmail] = useState({
    new: '',
    confirm: '',
  })

  let [newLocation, setNewLocation] = useState(false)

  let [newImage, setNewImage] = useState(false)

  let [saved, setSaved] = useState(true)

  let [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false,
  })

  useEffect(() => {
    dispatch(setUser())
    dispatch(setUserInterests(user.uid))
    // dispatch(fetchAllInterests())
  }, [])

  const handleChange = (e) => {
    setSaved(false)
    if (e.target.name === 'remote' || e.target.name === 'local') {
      userProfile[e.target.name] = e.target.checked
      setUserProfile(new User(userProfile))
    } else {
      userProfile[e.target.name] = e.target.value
      setUserProfile(new User(userProfile))
    }
  }

  const changeEmailPassword = (e) => {
    const {name, value} = e.target
    setSaved(false)
    if (name === 'newEmail') {
      setNewEmail({...newEmail, new: value})
    } else if (name === 'confirmEmail') {
      setNewEmail({...newEmail, confirm: value})
    }

    if (name === 'newPassword') {
      setNewPassword({...newPassword, new: value})
    } else if (name === 'confirmPassword') {
      setNewPassword({...newPassword, confirm: value})
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newPassword.new && newPassword.new === newPassword.confirm) {
      dispatch(updatePassword(userProfile, newPassword))
    }
    if (newEmail.new && newEmail.new === newEmail.confirm) {
      dispatch(updateEmail(userProfile, newEmail))
    }
    dispatch(updateProfile(userProfile))
    setSaved(true)
    navigate(`../users/${userProfile.uid}`)
  }

  const clickShowPassword = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field],
    })
  }

  const mouseDownShowPassword = (e) => {
    e.preventDefault()
  }

  const getLocation = (e) => {
    setSaved(false)
    navigator.geolocation.getCurrentPosition((position) => {
      userProfile.location.latitude = position.coords.latitude
      userProfile.location.longitude = position.coords.longitude
      setUserProfile(new User(userProfile))
    })
    setNewLocation(true)
  }

  const uploadImage = async (e) => {
    if (e.target.files[0].size <= 1000000) {
      setSaved(false)
      const file = e.target.files[0]
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        userProfile.profilePicture = fileReader.result
        setUserProfile(new User(userProfile))
      })
      fileReader.readAsDataURL(file)
      setNewImage(true)
    } else {
      window.alert(
        'Your photo file is too big! please limit your files to 1 MB'
      )
      e.target.files = null
    }
  }

  return (
    <Paper
      sx={{
        m: 1,
        p: 0.5,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        mb: 12,
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          mt: 2,
        }}>
        <Typography variant="h4">Edit Profile</Typography>
        <Typography variant="subtitle1">
          Tell us a little about yourself...
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 1,
            p: 1,
          }}>
          <Box
            sx={{
              p: 1,
              gap: 1.5,
              display: 'flex',
              flexDirection: 'column',
              '& > *': {
                display: 'flex',
              },
            }}>
            <Typography variant="h5">Personal Details:</Typography>
            <TextField
              required
              aria-label="name entry field"
              label="Name"
              type="text"
              name="name"
              helperText="This name that will be shown on your profile"
              onChange={handleChange}
              value={userProfile.name}
            />
            <MultiSelectorAuto
              name="pronouns"
              label="pronouns"
              options={pronounList}
              helperText="Order will be preserved"
              value={userProfile.pronouns}
              defaultValue={user.pronouns}
              id="pronoun-selector"
              setState={(pronouns) => {
                setSaved(false)
                userProfile.pronouns = [...pronouns]
                setUserProfile(new User(userProfile))
              }}
            />
            <MultiSelectorAuto
              name="interests"
              label="interests"
              options={interests}
              helperText="Enter up to 5"
              limitSelection="5"
              value={userProfile.interests}
              defaultValue={myInterests}
              id="interest-selector"
              setState={(userInterests) => {
                setSaved(false)
                userProfile.interests = [...userInterests]
                setUserProfile(new User(userProfile))
              }}
            />

            <Divider />
            <Typography variant="h6">Profile Picture:</Typography>
            {/* <TextField
              required
              label="Image URL"
              type="url"
              name="profilePicture"
              autoComplete="off"
              helperText="You look beautiful ;)"
              onChange={handleChange}
              value={userProfile.profilePicture}
            /> */}
            <Button variant={newImage ? 'text' : 'contained'} component="label">
              Upload Image
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={uploadImage}
              />
              {newImage ? <CheckIcon /> : ''}
            </Button>
          </Box>
        </Paper>
        <Paper sx={{m: 1, p: 1}}>
          <Typography variant="h5">Search Details:</Typography>
          <Paper
            sx={{
              m: 1,
              p: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 1.25,
            }}>
            <Box>
              <FormGroup>
                <FormLabel component="legend">Open to:</FormLabel>
                <FormControlLabel
                  control={
                    <Switch
                      onChange={handleChange}
                      name="remote"
                      checked={userProfile.remote}
                    />
                  }
                  label="Remote"
                />
                <FormControlLabel
                  control={
                    <Switch
                      onChange={handleChange}
                      name="local"
                      checked={userProfile.local}
                    />
                  }
                  label="Local"
                />
              </FormGroup>
            </Box>

            <Divider />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1.25,
              }}>
              <Typography variant="h6">Location:</Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  '& > *': {
                    m: 0.25,
                  },
                }}>
                {navigator.geolocation ? (
                  <Button
                    onClick={getLocation}
                    variant={newLocation ? 'text' : 'contained'}>
                    GET LOCATION
                    {newLocation ? <CheckIcon /> : ''}
                  </Button>
                ) : (
                  'Location not supported'
                )}
                <Typography variant="subtitle1">
                  Lat:{' '}
                  {userProfile.location.latitude
                    ? userProfile.location.latitude
                    : ''}
                </Typography>
                <Typography variant="subtitle1">
                  Lon:{' '}
                  {userProfile.location.longitude
                    ? userProfile.location.longitude
                    : ''}
                </Typography>
              </Box>
              <Divider sx={{m: 1}} />
              <TextField
                aria-label="zip code field"
                label="ZIP Code"
                type="text"
                name="zipCode"
                onChange={handleChange}
                value={userProfile.zipCode}
              />
              <CountrySelect
                value={userProfile.country}
                setState={(country) => {
                  setSaved(false)
                  userProfile.country = country
                  setUserProfile(new User(userProfile))
                }}
              />
              <FormLabel component="legend">
                <small>Max range: {userProfile.range} miles</small>
              </FormLabel>
              <Slider
                aria-label="range slider"
                name="range"
                defaultValue={20}
                min={1}
                max={100}
                valueLabelDisplay="auto"
                onChange={handleChange}
                value={userProfile.range}
              />
            </Box>
          </Paper>
          <Divider sx={{m: 1}} />
          <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
            <Typography variant="h5">Set Availability:</Typography>
            <EditAvailabilityGrid
              value={userProfile.availability}
              setState={(availability) => {
                setSaved(false)
                userProfile.availability = [...availability]
                setUserProfile(new User(userProfile))
              }}
            />
          </Box>
        </Paper>
        <Card
          sx={{
            m: 1,
            p: 1,
            gap: 1.25,
            display: 'flex',
            flexDirection: 'column',
          }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1.25,
              '& > *': {
                m: 0.5,
              },
            }}>
            <Typography variant="h5">Change Email</Typography>
            <TextField
              label="New Email"
              type="email"
              name="newEmail"
              autoComplete="off"
              onChange={changeEmailPassword}
              value={newEmail.new}
              error={
                newEmail.confirm
                  ? newEmail.confirm === newEmail.new
                    ? false
                    : true
                  : false
              }
            />
            <TextField
              label="Confirm New Email"
              type="email"
              name="confirmEmail"
              autoComplete="off"
              onChange={changeEmailPassword}
              value={newEmail.confirm}
              error={
                newEmail.confirm
                  ? newEmail.confirm === newEmail.new
                    ? false
                    : true
                  : false
              }
            />
            {newEmail.confirm ? (
              newEmail.confirm === newEmail.new ? (
                ''
              ) : (
                <h6 style={{color: 'red'}}>Emails must match!</h6>
              )
            ) : (
              ''
            )}
          </Box>
          <Divider sx={{m: 1}} />
          <Box
            sx={{
              gap: 1.25,
              '& > *': {
                m: 0.5,
              },
            }}>
            <Typography variant="h5">Change Password</Typography>
            <InputLabel htmlFor="newPassword">New Password</InputLabel>
            <OutlinedInput
              autoComplete={'off'}
              name="newPassword"
              id="newPassword"
              type={showPassword.new ? 'text' : 'password'}
              value={newPassword.new}
              onChange={changeEmailPassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle new password visibility"
                    onClick={() => clickShowPassword('new')}
                    onMouseDown={mouseDownShowPassword}
                    edge="end">
                    {showPassword.new ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="New Password"
              notched={false}
              error={
                newPassword.confirm
                  ? newPassword.confirm === newPassword.new
                    ? false
                    : true
                  : false
              }
            />
            <InputLabel htmlFor="confirmPassword">
              Confirm New Password
            </InputLabel>
            <OutlinedInput
              autoComplete={'off'}
              name="confirmPassword"
              id="confirmPassword"
              type={showPassword.confirm ? 'text' : 'password'}
              value={newPassword.confirm}
              onChange={changeEmailPassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={() => clickShowPassword('confirm')}
                    onMouseDown={mouseDownShowPassword}
                    edge="end">
                    {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm New Password"
              notched={false}
              error={
                newPassword.confirm
                  ? newPassword.confirm === newPassword.new
                    ? false
                    : true
                  : false
              }
            />
            {newPassword.confirm ? (
              newPassword.confirm === newPassword.new ? (
                ''
              ) : (
                <h6 style={{color: 'red'}}>Passwords must match!</h6>
              )
            ) : (
              ''
            )}
          </Box>
        </Card>
        <Fab
          disabled={saved ? true : false}
          color="primary"
          type="submit"
          sx={{
            position: 'fixed',
            width: '60px',
            height: '60px',
            top: 'auto',
            bottom: 15,
            right: 15,
            left: 'auto',
            m: 0,
          }}>
          {saved ? <CheckIcon /> : <SendIcon />}
        </Fab>
      </form>
    </Paper>
  )
}

export default EditProfile

const pronounList = [
  'any',
  'none (name only)',
  'he/him',
  'she/her',
  'they/them',
  'ey/em',
  'xe/xem',
  'ze/hir',
  'fae/faer',
  've/ver',
  'e/em',
  'it/its',
]
