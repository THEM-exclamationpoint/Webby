import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {
  Button,
  Box,
  TextField,
  Checkbox,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Switch,
  Card,
  Paper,
  Grid,
  Divider,
  Typography,
  Autocomplete,
  IconButton,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Slider,
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import EditAvailabilityGrid, {
  newAvailability,
} from '../Elements/EditAvailibilityGrid'
import MultiSelctorAuto from '../Elements/MultiSelectorAuto'
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
    newPasswordConfirm: '',
  }
}

const EditProfile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  let user = useSelector((state) => state.user)

  let [userProfile, setUserProfile] = useState(userModel(user))

  let [saved, setSaved] = useState(false)

  let [showOldPassword, setShowOldPassword] = useState(false)
  let [showNewPassword, setShowNewPassword] = useState(false)
  let [showNewPasswordConfirm, setShowNewPasswordConfirm] = useState(false)

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

  const clickShowPassword = (e) => {}

  const mouseDownShowPassword = (e) => {}

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
        <Paper sx={{m: 1, p: 3}}>
          <h3>Personal Details</h3>
          <TextField
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
        </Paper>
        <Paper sx={{m: 1, p: 3}}>
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
          <Box sx={{m: 2}}>
            <TextField
              required
              label="Image URL"
              type="url"
              name="profilePicture"
              autoComplete="off"
              helperText="We should make this an uploader"
              onChange={handleChange}
              value={userProfile.profilePicture}
            />
          </Box>

          <FormControl variant="outlined">
            <InputLabel htmlFor="oldPassword">Old Password</InputLabel>
            <OutlinedInput
              name="oldPassword"
              id="oldPassword"
              type={showOldPassword ? 'text' : 'password'}
              value={userProfile.oldPassword}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    name="show-old-password"
                    aria-label="toggle old password visibility"
                    onClick={clickShowPassword}
                    onMouseDown={mouseDownShowPassword}
                    edge="end">
                    {showOldPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Old Password"
            />
          </FormControl>
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
