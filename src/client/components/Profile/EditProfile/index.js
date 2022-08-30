import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {
  Button,
  Box,
  TextField,
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
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import EditAvailabilityGrid from '../Elements/EditAvailibilityGrid'
import MultiSelctorAuto from '../Elements/MultiSelectorAuto'
import {newAvailability, User} from '../../../../firebase/models/User'
import './style.css'

export const userModel = (user) => {
  return {
    uid: user.uid || '',
    name: user.name || '',
    pronouns: user.pronouns || [],
    email: user.email || '',
    remote: user.remote || false,
    local: user.local || true,
    availability: user.availability || newAvailability(),
    zipCode: user.zipCode || '',
    profilePicture: user.profilePicture || '',
    range: 20,
    interests: user.interests || [],
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    newEmail: '',
    confirmEmail: '',
  }
}

const EditProfile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  let user = useSelector((state) => state.user)

  let [userProfile, setUserProfile] = useState(userModel(user))

  let [saved, setSaved] = useState(false)

  let [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  })

  const handleChange = (e) => {
    if (e.target.name === 'remote' || e.target.name === 'local') {
      setUserProfile({
        ...userProfile,
        [e.target.name]: e.target.checked,
      })
    } else {
      setUserProfile({
        ...userProfile,
        [e.target.name]: e.target.value,
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(userProfile)
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

  return (
    <Paper
      sx={{
        m: 1,
        p: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>
      <h1>Edit Profile</h1>
      <h3>Tell us a little about yourself...</h3>
      <h6>
        (your personal information will only be shared with other users of this
        app)
      </h6>
      <form onSubmit={handleSubmit}>
        <Paper sx={{m: 1, p: 2}}>
          <h3>Personal Details</h3>
          <TextField
            fullWidth
            required
            label="Name"
            type="text"
            name="name"
            autoComplete="off"
            helperText="This is the name that will be shown on your profile"
            onChange={handleChange}
            value={userProfile.name}
          />
          <MultiSelctorAuto
            fullWidth
            name="pronouns"
            label="pronouns"
            options={pronounList}
            helperText="Order will be preserved"
            value={userProfile.pronouns}
            defaultValue={userProfile.pronouns}
            id="pronoun-selector"
            setState={(pronouns) => {
              setUserProfile({...userProfile, pronouns})
            }}
          />
          <MultiSelctorAuto
            fullWidth
            name="interests"
            label="interests"
            options={interestList}
            helperText="Enter up to 5"
            limitSelection="5"
            value={userProfile.interests}
            defaultValue={userProfile.interests}
            id="interest-selector"
            setState={(interests) => {
              setUserProfile({...userProfile, interests})
            }}
          />
          <h5>Profile Picture</h5>
          <TextField
            fullWidth
            required
            label="Image URL"
            type="url"
            name="profilePicture"
            autoComplete="off"
            helperText="We should make this an uploader"
            onChange={handleChange}
            value={userProfile.profilePicture}
          />
        </Paper>
        <Paper sx={{m: 1, p: 2}}>
          <h3>Search Details</h3>
          <Card sx={{m: 1, p: 3}}>
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
                  label="remote"
                />
                <FormControlLabel
                  control={
                    <Switch
                      onChange={handleChange}
                      name="local"
                      checked={userProfile.local}
                    />
                  }
                  label="local"
                />
              </FormGroup>
            </Box>
            <h4>Location:</h4>
            <Box>
              <TextField
                required
                label="ZIP Code"
                type="text"
                name="zipCode"
                autoComplete="off"
                onChange={handleChange}
                value={userProfile.zipCode}
              />
              <FormLabel component="legend">
                <small>Max range: {userProfile.range} miles</small>
              </FormLabel>
              <Slider
                aria-label="range"
                name="range"
                defaultValue={20}
                min={1}
                max={100}
                valueLabelDisplay="auto"
                onChange={handleChange}
                value={userProfile.range}
              />
            </Box>
          </Card>
          <h3>Set Availability</h3>
          <EditAvailabilityGrid
            value={userProfile.availability}
            setState={(availability) => {
              setUserProfile({
                ...userProfile,
                availability,
              })
            }}
          />
        </Paper>
        <Card sx={{m: 1, p: 2}}>
          <Box sx={{m: 1}}>
            <h3>Change Email</h3>
            <TextField
              sx={{m: 1}}
              fullWidth
              label="New Email"
              type="email"
              name="newEmail"
              autoComplete="off"
              onChange={handleChange}
              value={userProfile.newEmail}
              error={
                userProfile.confirmEmail
                  ? userProfile.confirmEmail === userProfile.newEmail
                    ? false
                    : true
                  : false
              }
            />
            <TextField
              sx={{m: 1}}
              fullWidth
              label="Confirm New Email"
              type="email"
              name="confirmEmail"
              autoComplete="off"
              onChange={handleChange}
              value={userProfile.confirmEmail}
              error={
                userProfile.confirmEmail
                  ? userProfile.confirmEmail === userProfile.newEmail
                    ? false
                    : true
                  : false
              }
            />
            {userProfile.confirmEmail ? (
              userProfile.confirmEmail === userProfile.newEmail ? (
                ''
              ) : (
                <h6>Emails must match!</h6>
              )
            ) : (
              ''
            )}
          </Box>
          <Box
            sx={{
              m: 1.5,
              '& > *': {
                m: 0.5,
              },
            }}>
            <h3>Change Password</h3>
            <InputLabel htmlFor="oldPassword">Old Password</InputLabel>
            <OutlinedInput
              name="oldPassword"
              id="oldPassword"
              type={showPassword.old ? 'text' : 'password'}
              value={userProfile.oldPassword}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle old password visibility"
                    onClick={() => clickShowPassword('old')}
                    onMouseDown={mouseDownShowPassword}
                    edge="end">
                    {showPassword.old ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Old Password"
              notched={false}
            />
            <InputLabel htmlFor="newPassword">New Password</InputLabel>
            <OutlinedInput
              name="newPassword"
              id="newPassword"
              type={showPassword.new ? 'text' : 'password'}
              value={userProfile.newPassword}
              onChange={handleChange}
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
                userProfile.confirmPassword
                  ? userProfile.confirmPassword === userProfile.newPassword
                    ? false
                    : true
                  : false
              }
            />
            <InputLabel htmlFor="confirmPassword">
              Confirm New Password
            </InputLabel>
            <OutlinedInput
              name="confirmPassword"
              id="confirmPassword"
              type={showPassword.confirm ? 'text' : 'password'}
              value={userProfile.confirmPassword}
              onChange={handleChange}
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
                userProfile.confirmPassword
                  ? userProfile.confirmPassword === userProfile.newPassword
                    ? false
                    : true
                  : false
              }
            />
            {userProfile.confirmPassword ? (
              userProfile.confirmPassword === userProfile.newPassword ? (
                ''
              ) : (
                <h6>Passwords must match!</h6>
              )
            ) : (
              ''
            )}
          </Box>
        </Card>
        <Button type="submit" variant="contained" sx={{m: 1, p: 1}}>
          SAVE
        </Button>
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

const interestList = [
  'thing0',
  'thing1',
  'thing2',
  'thing3',
  'thing4',
  'thing5',
  'thing6',
]
