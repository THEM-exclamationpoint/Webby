import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
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
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import SendIcon from '@mui/icons-material/Send'
import CheckIcon from '@mui/icons-material/Check'
import EditAvailabilityGrid from '../Elements/EditAvailibilityGrid'
import MultiSelctorAuto from '../Elements/MultiSelectorAuto'
import {User} from '../../../../firebase/models/User'
import {
  updateProfile,
  updatePassword,
  updateEmail,
} from '../../../store/profile'
import './style.css'

const EditProfile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  let user = useSelector((state) => state.user)

  let [userProfile, setUserProfile] = useState(new User(user))

  let [newPassword, setNewPassword] = useState({
    new: '',
    confirm: '',
  })
  let [newEmail, setNewEmail] = useState({
    new: '',
    confirm: '',
  })

  let [saved, setSaved] = useState(false)

  let [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false,
  })

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
      dispatch(updatePassword(newPassword))
    }
    if (newEmail.new && newEmail.new === newEmail.confirm) {
      dispatch(updateEmail(newEmail))
    }
    dispatch(updateProfile(userProfile))
    setSaved(true)
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
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 1,
            p: 2,
            '& > *': {
              m: 1,
            },
          }}>
          <Box>
            <h3>Personal Details</h3>
            <TextField
              fullWidth
              required
              label="Name"
              type="text"
              name="name"
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
                setSaved(false)
                userProfile.pronouns = [...pronouns]
                setUserProfile(new User(userProfile))
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
                setSaved(false)
                userProfile.interests = [...interests]
                setUserProfile(new User(userProfile))
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
          </Box>
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
            <h4>Location:</h4>
            <Box>
              <TextField
                required
                label="ZIP Code"
                type="text"
                name="zipCode"
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
              setSaved(false)
              userProfile.availability = [...availability]
              setUserProfile(new User(userProfile))
            }}
          />
        </Paper>
        <Card
          sx={{
            m: 1,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: 1,
              '& > *': {
                m: 1,
              },
            }}>
            <h3>Change Email</h3>
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
                <h6>Passwords must match!</h6>
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
            width: '80px',
            height: '80px',
            top: 'auto',
            bottom: 25,
            right: 25,
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

const interestList = [
  'thing0',
  'thing1',
  'thing2',
  'thing3',
  'thing4',
  'thing5',
  'thing6',
]
