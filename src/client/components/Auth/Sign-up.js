import {useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  TextField,
  Button
} from '@mui/material'
import './style.css'

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let [userInfo, setUserInfo] = useState({
    name:'',
    username: '',
    password: '',
  });
  let [success, setSuccess] = useState(false);

function handleChange(e){
  setUserInfo({
    ...userInfo,
    [e.target.name]: e.target.value
  })
}
function handleSubmit (e){
    e.preventDefault()

}
  return (
    <div className='signup-component'>
<form className='signup-form' onSubmit={handleSubmit}>
  <TextField  onChange={handleChange} className='form-field' label="Name" variant="filled" required />
  <TextField onChange={handleChange} className='form-field' label="Email" variant="filled" type="email" required />
  <TextField onChange={handleChange} className='form-field' label="Password" variant="filled" type="password" required />
  <Button type='submit'>Submit</Button>
</form>
</div>
  )
}
