import * as React from 'react';
import Switch from '@mui/material/Switch';
import { Divider } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function AppSettings() {
  return (
    <div>
        Settings:
        <Divider />
        App Theme:
        <br />
      Dark/Light: <Switch {...label} defaultChecked />
        <br />
       High Contrast: <Switch {...label} />
       <Divider />
       Notifications:
       <br />
       Friend Requests: <Switch {...label} defaultChecked />
       <br />
       Messages: <Switch {...label} defaultChecked />
       <br />
       Group Messages: <Switch {...label} defaultChecked />
       <br />
       Time To Update!: <Switch {...label} defaultChecked />
       <br />
       New Features: <Switch {...label} defaultChecked />
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
                    <FormControlLabel value="Red-Green" control={<Radio />} label="Red-Green" />
                    <FormControlLabel value="Blue-Yellow" control={<Radio />} label="Blue-Yellow" />
                    <FormControlLabel value="Off" control={<Radio />} label="Off" />
                </RadioGroup>
            </FormControl>
 
       <br />
       Large Text: <Switch {...label} defaultChecked />
       <br />
       Screen Reader Safe: <Switch {...label} defaultChecked />
       <Divider />
       Blocked Users {/* this should link to its own page */}
       <br /> 
       Delete Account

    </div>
  );
}