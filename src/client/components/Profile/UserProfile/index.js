import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'
import {
  Button,
  Box,
  TextField,
  Typography,
  Avatar,
  Switch,
  Card,
  CardHeader,
  Paper,
  IconButton,
  Slider,
  List,
  ListItem,
} from '@mui/material'
import {
  PersonAdd,
  PeopleAlt,
  PersonRemove,
  Pending,
  ChatBubbleRounded,
  WbSunnyOutlined,
  NightlightOutlined
} from '@mui/icons-material'
import {
  getUserProfile,
  getUserFriends,
  getUserInterests,
} from '../../../store/profile'
import { setUser } from '../../../store/auth/user'
import { addAFriend, deleteFriend, getJunctions } from '../../../store/friends/junctions'
import {User} from '../../../../firebase/models/User'
import './style.css'
import {border} from '@mui/system'

const UserProfile = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {uid} = useParams()
  const profile = useSelector((state) => state.profile)
  const currentUser = useSelector(state => state.user)
  const {user, friends, interests} = profile
  const friendJunctions = useSelector(state => state.friendJunctions)
 let [isFriend,setIsFriend] = useState(null)
let [junctionId, setJunctionId] = useState(null)
  useEffect(() => {
    dispatch(setUser())
    dispatch(getUserProfile(uid))
    dispatch(getUserInterests(uid))
    dispatch(getUserFriends(uid))
    dispatch(getJunctions(uid))
  }, [])

  useEffect(() => {
    friendJunctions.forEach(friend =>{
      if(friend.friends.includes(currentUser.uid)){
        setIsFriend(true)
        setJunctionId(friend.id)
      }
    })

  }, [uid,friendJunctions])

  function addUser (uid1,uid2) {
    dispatch(addAFriend(uid1,uid2))
    setIsFriend(true)
  }
  function removeUser(id,uid){
    setIsFriend(null)
    dispatch(deleteFriend(id,uid))
  }

  return (
   
    <div className="user-profile-block">
      <Paper
        sx={{
          m: 1,
          p: 1,
          display: 'flex',
          flexDirection: 'column',
        }}>
        <Paper
          sx={{
            m: 1,
            p: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Avatar
            alt={user.name}
            src={user.profilePicture}
            sx={{
              m: 1,
              width: 150,
              height: 150,
              border: '4px double #028090',
            }}
          />
          <Typography variant="h3" align='center'>{user.name}</Typography>
          <Typography variant="subtitle1">
            {user.pronouns
              ? user.pronouns.map((pronoun, idx) => {
                  return (
                    <span key={pronoun}>
                      {idx ? '|| ' : ' '}
                      {pronoun}{' '}
                    </span>
                  )
                })
              : ''}
          </Typography>
          <Box>
            {isFriend ? <IconButton onClick={()=> removeUser(junctionId,uid)}><PersonRemove /> </IconButton>: <IconButton onClick={()=> addUser(uid,currentUser.uid)}><PersonAdd /></IconButton>}
            <IconButton><ChatBubbleRounded /></IconButton>
          </Box>
        </Paper>
        <Paper>
          {user.availability &&
            user.availability.map((day,id) => {
              return (
                <Paper sx={{justifyContent:'center', textAlign:'center'}} key={id}>
                  <Typography variant='h5'>{day.day}</Typography>
                 <ListItem><WbSunnyOutlined sx={{margin:'5px'}}/> {day.am}</ListItem> 
                 <ListItem><NightlightOutlined sx={{margin:'5px'}}/> {day.pm}</ListItem> 
                </Paper>
              )
            })}
        </Paper>
        <Paper sx={{margin:'5px'}}>
                  <CardHeader align="center" title={`Hobbies`} />
        <List>
          {interests.map((interest,id) => {
            return (
              <ListItem sx={{justifyContent: 'center'}} key={id}>
                {interest}
              </ListItem>
            )
          })}
        </List>
        </Paper>
      </Paper>
    </div>
  )
}

export default UserProfile
