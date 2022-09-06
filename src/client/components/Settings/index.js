import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useState} from 'react'
import Switch from '@mui/material/Switch'
import {Paper, Box, Divider, Typography, Button} from '@mui/material'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import {toggleTheme, toggleHighContrast} from '../../store/settings'
import lightMode from './lightMode'
import darkMode from './darkMode'

const Settings = (props) => {
  const dispatch = useDispatch()

  const settings = useSelector((state) => state.settings)

  const clickTheme = () => {
    dispatch(toggleTheme())
  }

  const clickHighContrast = () => {
    dispatch(toggleHighContrast())
  }

  return (
    <Paper sx={{m: 1, p: 1, gap: 1, display: 'flex', flexDirection: 'column'}}>
      <Typography variant="h4">Settings:</Typography>
      <Divider />
      <Typography variant="h5">App Theme:</Typography>
      <FormControlLabel
        value="light-dark"
        label="Light/Dark Mode"
        control={
          <Switch
            color="primary"
            onChange={clickTheme}
            checked={settings.theme === darkMode}
          />
        }
      />
      <FormControlLabel
        value="high-contrast"
        label="High Contrast"
        control={
          <Switch
            color="primary"
            checked={settings.highContrast}
            onChange={clickHighContrast}
          />
        }
      />
      <Divider />
      <Typography variant="h5">Notifications:</Typography>
      <FormControlLabel
        value="friend-request-notifications"
        label="Friend Requests"
        control={<Switch color="primary" />}
      />
      <FormControlLabel
        value="message-notifications"
        label="Messages"
        control={<Switch color="primary" />}
      />{' '}
      <FormControlLabel
        value="group-message-notifications"
        label="Group Messages"
        control={<Switch color="primary" />}
      />{' '}
      <FormControlLabel
        value="update-notifications"
        label="Time To Update!"
        control={<Switch color="primary" />}
      />{' '}
      <FormControlLabel
        value="new-feature-notifications"
        label="New Feature"
        control={<Switch color="primary" />}
      />
      <Divider />
      <Typography variant="h5">Accessibility:</Typography>
      {/* <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">
          Colorblind Mode:
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="Off"
          name="radio-buttons-group">
          <FormControlLabel
            value="Red-Green"
            control={<Radio color="primary" />}
            label="Red-Green"
          />
          <FormControlLabel
            value="Blue-Yellow"
            control={<Radio color="primary" />}
            label="Blue-Yellow"
          />
          <FormControlLabel
            value="Off"
            control={<Radio color="primary" />}
            label="Off"
          />
        </RadioGroup>
      </FormControl> */}
      <FormControlLabel
        value="large-text"
        label="Large Text"
        control={<Switch color="primary" />}
      />
      <FormControlLabel
        value="screen-reader-safe"
        label="Screen Reader Safe"
        control={<Switch color="primary" />}
      />
      <Divider />
      <Box sx={{m: 2, gap: 1, display: 'flex', flexDirection: 'column'}}>
        <Button color="error">Blocked Users</Button>
        <Divider sx={{m: 2}} />
        <Button color="error">Delete Account</Button>
      </Box>
    </Paper>
  )
}

export default Settings
