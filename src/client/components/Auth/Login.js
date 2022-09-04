import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, Link} from 'react-router-dom'
import {setUser} from '../../store/auth/user'
import {logIn, logInGoogle} from '../../store/auth'
import {Button, TextField, Paper, Box, Divider} from '@mui/material'

const LogIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  let isNew = useSelector((state) => state.auth)

  let [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
  })

  let [success, setSuccess] = useState(false)
  useEffect(() => {
    if (success) {
      navigate('/home')
    }
  })

  const handleChange = (e) => {
    e.preventDefault()
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(logIn(userInfo.username, userInfo.password))

    setSuccess(true)

    dispatch(setUser())
  }

  const handleSubmitGoogle = async (e) => {
    e.preventDefault()
    await dispatch(logInGoogle())
    if (isNew) {
      navigate('/editprofile')
    } else {
      setSuccess(true)
    }

    dispatch(setUser())
  }

  return (
    <div className="login-container">
      <section>
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 1,
            p: 1,
            '& > *': {
              m: 1,
            },
          }}>
          <h1>Sign In</h1>
          <Divider />
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                m: 1,
                p: 1,
                gap: 1,
              }}>
              <TextField
                onChange={handleChange}
                className="form-field"
                name="username"
                label="username"
                type="text"
                required
              />
              <TextField
                onChange={handleChange}
                className="form-field"
                name="password"
                label="password"
                type="password"
                required
              />
              <Button type="submit">Sign In</Button>
            </Box>
            <Divider />
            <Box sx={{m: 1}}>
              <Button type="button" onClick={handleSubmitGoogle}>
                Sign in with Google
              </Button>
            </Box>
            <Divider />
          </form>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 1,
              p: 1,
              gap: 1,
            }}>
            Need an Account?
            <br />
            <div className="line">
              <Link to="/register">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </Box>
        </Paper>
      </section>
    </div>
  )
}

export default LogIn
