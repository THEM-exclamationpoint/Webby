import {useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {TextField, Button, FormHelperText} from '@mui/material'
import { signUpUser } from '../../store/auth'
import './style.css'

export default function Signup() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  let [userInfo, setUserInfo] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
  })
  let [success, setSuccess] = useState(false)

  useEffect(() => {
    if (success) {
      navigate('/preferences');
    }
  });


  function handleChange(e) {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    })
  }
  function handleSubmit(e) {
    e.preventDefault()
    dispatch(signUpUser(userInfo.name, userInfo.email, userInfo.password))
    setSuccess(true)
  }


  return (
    <div className="signup-component">
      <form className="signup-form" onSubmit={handleSubmit}>
        <TextField
          onChange={handleChange}
          className="form-field"
          name="name"
          label="Name"
          variant="filled"
          required
        />
        <TextField
          onChange={handleChange}
          className="form-field"
          name="email"
          label="Email"
          variant="filled"
          type="email"
          required
        />
        <TextField
          onChange={handleChange}
          className="form-field"
          name="password"
          label="Password"
          variant="filled"
          type="password"
          required
        />
        <TextField
          onChange={handleChange}
          className="form-field"
          name="confirmPassword"
          label="Confirm Password"
          variant="filled"
          type="password"
          error={userInfo.password === userInfo.confirmPassword ? false : true}
          required
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  )
}
