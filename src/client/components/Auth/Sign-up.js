import {useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {TextField, Button, FormHelperText} from '@mui/material'
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
  let [match, setMatch] = useState(true)

  function handleChange(e) {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    })
    console.log(userInfo)
  }
  function handleSubmit(e) {
    e.preventDefault()
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
          error={userInfo.password == userInfo.confirmPassword ? false : true}
          required
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  )
}
