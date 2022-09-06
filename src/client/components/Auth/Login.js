import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, Link} from 'react-router-dom'
import {setUser} from '../../store/auth/user'
import {logIn, logInGoogle} from '../../store/auth'
import {Button, TextField, Paper, Box, Divider, Typography} from '@mui/material'

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

  let theme = localStorage.getItem('theme')

  return (
    <div className="login-container">
      <section>
        <Paper sx={{m: 2, p: 2}}>
          {theme === 'dark' ? (
            <img
              src={'/Webby-logotype-light-transparent.png'}
              style={{width: 250}}
            />
          ) : (
            <img
              src={'/Webby-logotype-dark-transparent.png'}
              style={{width: 250}}
            />
          )}
        </Paper>
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
          <Typography variant="h5">Sign In</Typography>
          <Divider sx={{m: 2}} />
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
            <div className="line">
              <Link to="/register">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </Box>
        </Paper>
        <Paper
          sx={{display: 'flex', flexDirection: 'column', m: 2, p: 2, gap: 1}}>
          <Typography variant="h4">Welcome to Webby!</Typography>
          <Divider sx={{m: 1}} />
          <Typography variant="body1">
            Webby is a networking app that allows users to view an
            interconnected web of themselves and other users generated from
            their mutual interests.
          </Typography>
          <Divider />
          <Typography variant="body1">
            Users can browse their own web and check out other users'
            information, choose to add them as a friend, or send them a message
            to plan a meetup. Use our messenger to chat with other folks, or
            groups of folks to make plans!
          </Typography>
          <Divider />
          <Typography variant="body1">
            Webby strives to help people build their communities and make
            connections with other people through things they might be
            passionate about, or want to learn.
          </Typography>
        </Paper>
      </section>
    </div>
  )
}

export default LogIn
