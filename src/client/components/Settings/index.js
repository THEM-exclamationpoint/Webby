import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react';
import Switch from '@mui/material/Switch';
import { Divider } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { toggleTheme } from '../../store/settings'
import lightMode from './lightMode'
import darkMode from './darkMode'


const Settings = (props) => {

    const dispatch = useDispatch()

const settings = useSelector (

    (state) => state.settings

) 

const clickTheme = () => {
    dispatch(toggleTheme())
}

  return (
    <div>
    Settings:
        <Divider />
    App Theme:
        <br />
      Light/Dark: 
        <Switch color='primary' onChange={clickTheme} checked={settings.theme === darkMode}/>            
        <br />
       High Contrast: <Switch color='primary' />
       <Divider />
    Notifications:
        <br />
       Friend Requests: <Switch color='primary'  defaultChecked />
        <br />
       Messages: <Switch color='primary' defaultChecked />
        <br />
       Group Messages: <Switch color='primary' defaultChecked />
        <br />
       Time To Update!: <Switch color='primary' defaultChecked />
        <br />
       New Features: <Switch color='primary' defaultChecked />
        <Divider />
    Accessibility:
        <br/>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Colorblind Mode:</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="Off"
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="Red-Green" control={<Radio color='primary' />} label="Red-Green" />
                    <FormControlLabel value="Blue-Yellow" control={<Radio color='primary' />} label="Blue-Yellow" />
                    <FormControlLabel value="Off" control={<Radio color='primary' />} label="Off" />
                </RadioGroup>
            </FormControl>
 
       <br />
       Large Text: <Switch color='primary' />
       <br />
       Screen Reader Safe: <Switch color='primary' />
       <Divider />
       Blocked Users {/* this should link to its own page */}
       <br /> 
       Delete Account

    </div>
  );
}

export default Settings