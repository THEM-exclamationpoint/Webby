import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button, 
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
        Slider,
      } from '@mui/material';
import EditAvailabilityGrid from '../Elements/EditAvailibilityGrid';
import MultiSelctorAuto from '../Elements/MultiSelectorAuto';
import './style.css';

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let user = useSelector((state) => state.auth);

  let [userProfile, setUserProfile] = useState({
    uid: user.uid || '',
    displayName: user.name || '',
    pronouns: user.pronouns || [],
    email: user.email || '',
    // hangoutPreference: user.preference || '',
    // availability: user.availability || [],
    zipCode: user.zipCode || '',
    // range: '',
    interests: user.interests || [],
    profilePicture: user.profilePicture || '',
    oldPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  });

  let [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setUserProfile({
      ...userProfile,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaved(true);
    dispatch();
  }

  return (
      <Paper
        sx={{
          m: 1,
          p: 1,
        }}
      >
        <h1>Edit Profile</h1>
        <h3>Tell us a little about yourself...</h3>
        <h6>(your personal information will only be shared with other users of this app)</h6>
        <FormControl onSubmit={handleSubmit}>
          <Paper>
            <TextField
              required
              label='Name'
              type='text'
              name='displayName'
              autoComplete='off'
              helperText='This is the name that will be shown on your profile'
              onChange={handleChange}
              value={userProfile.displayName}
            />
            <MultiSelctorAuto
              label='pronouns'
              options={pronounList}
              required={true}
              helperText='Order will be preserved'
              defaultValue={userProfile.pronouns}
            />
            <MultiSelctorAuto
              label='interests'
              options={interestList}
              required={true}
              helperText='Enter up to 5'
              limitSelection='5'
              defaultValue={userProfile.interests}
            />
          </Paper>
          <Paper
            sx={{
              display: 'flex',
              flexDirection: 'column',
              '& > *': {
                m: 1,
                p: 1,
              },
              justifyContent: 'space-between',
            }}
          >
            <FormGroup>
              <FormLabel component='legend'>Open to:</FormLabel>
              <FormControlLabel
                control={
                  <Switch 
                    onChange={handleChange}
                    name='remote'
                  />
                }
                label='remote'
              />
              <FormControlLabel
                control={
                  <Switch 
                    onChange={handleChange}
                    name='local'
                  />
                }
                label='local'
              />
            </FormGroup>
            <TextField
              required
              label='Location'
              type='text'
              name='location'
              autoComplete='off'
              helperText='Enter zip'
              onChange={handleChange}
              value={userProfile.zipCode}
            />
            <Slider
              sx={{width:'250px'}}
              aria-label='range'
              defaultValue={25}
              min={5}
              max={99}
              valueLabelDisplay='auto'
            />
            <EditAvailabilityGrid />
            <TextField
              required
              label='Image URL'
              type='text'
              name='imageUrl'
              autoComplete='off'
              helperText='We should make this an uploader'
              onChange={handleChange}
              value={userProfile.imageUrl}
            />
            <Button variant='contained'>SAVE</Button>
          </Paper>
        </FormControl>
      </Paper>
  );
}

export default EditProfile;


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