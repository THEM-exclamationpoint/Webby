import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setUser} from '../../store/auth/user'
import {Link} from 'react-router-dom'

import {setUserInterests} from '../../store/interests'
import './style.css'

const Home = () => {
  const dispatch = useDispatch()
  let user = useSelector((state) => state.user)
  let interests = useSelector((state) => state.interests)

  useEffect(() => {
    dispatch(setUser())
  }, [])
  useEffect(() => {
    dispatch(setUserInterests(user.uid))
  }, [user.uid])

  return (
    <div className="homepage">
      <Paper sx={{m: 1, p: 1, gap: 1}}>
        <h1> Welcome, {user.name}</h1>
        <small>Build communities!</small>
        <Divider />
        <div>
          <List>
            <ListItem button component={Link} to="/editprofile">
              <ListItemText align="center">Add/Edit my interests</ListItemText>
            </ListItem>
            <ListItem button component={Link} to="/graph">
              <ListItemText align="center">My Web</ListItemText>
            </ListItem>
            <ListItem button component={Link} to="/chatroom">
              <ListItemText align="center">Messages</ListItemText>
            </ListItem>
            <ListItem button component={Link} to={`/users/${user.uid}`}>
              <ListItemText align="center">My Profile</ListItemText>
            </ListItem>
          </List>
        </div>
        <Card variant="outlined">
          <CardHeader title="My Interests" />
          <List>
            {interests.map((interest) => {
              return (
                <ListItem key={interest}>
                  <ListItemText align="center">{interest}</ListItemText>
                </ListItem>
              )
            })}
          </List>
        </Card>
      </Paper>
    </div>
  )
}

export default Home
