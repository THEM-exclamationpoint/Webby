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
      } from '@mui/material';
import ChipMultiSelect from '../../Elements/ChipMultiSelect';
import './style.css';

const pronounList = ['any','none (name only)','he/him', 'she/her', 'they/them', 'ey/em', 'xe/xem', 'ze/hir', 'fae/faer', 've/ver', 'e/em', 'it/its']

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
    <div className = 'edit-profile-block'>
      <section>
        <h1>Edit Profile</h1>
        <h3>Tell us a little about yourself...</h3>
        <h6>(your personal information will only be shared with other users of this app)</h6>
        <form onSubmit={handleSubmit}>
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
          <ChipMultiSelect
            label='pronouns'
            options={pronounList}
            required={true}
            helperText='Order will be preserved'
            value={userProfile.pronouns}
          />
          <ChipMultiSelect
            label='interests'
            options={['thing0','thing1', 'thing2', 'thing3', 'thing4', 'thing5', 'thing6']}
            required={true}
            helperText='Select up to 5'
            limitSelection='5'
            value={userProfile.interests}
          />
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
        </form>
      </section>
    </div>
  );
}

export default EditProfile;