import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'
import SendIcon from '@mui/icons-material/Send'
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
  Menu,
  Grid,
} from '@mui/material'
import {
  PersonAdd,
  PeopleAlt,
  PersonRemove,
  Pending,
  ChatBubbleRounded,
  WbSunnyOutlined,
  NightlightOutlined,
} from '@mui/icons-material'
import {
  getUserProfile,
  getUserFriends,
  getUserInterests,
} from '../../../store/profile'
import {setUser} from '../../../store/auth/user'
import {sendDM} from '../../../store/chat/sendDm'
import {
  addAFriend,
  deleteFriend,
  getJunctions,
} from '../../../store/friends/junctions'
import {User} from '../../../../firebase/models/User'
import calculateDistance from './util/calculateDistance'
import AvailabilityGrid from '../Elements/AvailabilityGrid'
import './style.css'
import {border} from '@mui/system'

const UserProfile = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {uid} = useParams()
  const profile = useSelector((state) => state.profile)
  const currentUser = useSelector((state) => state.user)
  const {user, friends, interests} = profile
  const friendJunctions = useSelector((state) => state.friendJunctions)
  const sentMessage = useSelector((state) => state.sendDM)

  let [messageSent,setMessageSent] = useState(false)
  let [isFriend, setIsFriend] = useState(false)
  let [junctionId, setJunctionId] = useState(null)

  let [anchorEl, setAnchorEl] = useState(null)
  let [menuOpen, setMenuOpen] = useState(false)
  let [message, setMessage] = useState('Hey! Lets plan something')

  useEffect(() => {
    dispatch(setUser())
    dispatch(getUserProfile(uid))
    dispatch(getUserInterests(uid))
    dispatch(getJunctions(uid))
  }, [])

  useEffect(() => {
    friendJunctions.forEach((friend) => {
      if (friend.friends.includes(currentUser.uid)) {
        setIsFriend(true)
        setJunctionId(friend.id)
      }
    })
  }, [uid, friendJunctions])

  function addUser(uid1, uid2) {
    dispatch(addAFriend(uid1, uid2))
    setIsFriend(true)
  }
  function removeUser(id, uid) {
    setIsFriend(null)
    dispatch(deleteFriend(id, uid))
  }
  function handleChange(e) {
    setMessage(e.target.value)
  }
  function openMenu(e) {
    setMenuOpen(true)
    setAnchorEl(e.target)
  }
  let closeMenu = () => {
    setMenuOpen(false)
    setAnchorEl(null)
  }

  function handleSend() {
    dispatch(
      sendDM(currentUser.uid, user.uid, currentUser.name, user.name, message)
    )
setMessageSent(true)
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
          <Typography variant="h4" align="center">
            {user.name}
          </Typography>
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
            {isFriend ? (
              <IconButton onClick={() => removeUser(junctionId, uid)}>
                <PersonRemove />
              </IconButton>
            ) : (
              <IconButton onClick={() => addUser(uid, currentUser.uid)}>
                <PersonAdd />
              </IconButton>
            )}
            <IconButton onClick={openMenu}>
              <ChatBubbleRounded />
            </IconButton>
            <Menu open={menuOpen} onClose={closeMenu} anchorEl={anchorEl}>
              <Grid
                container
                sx={{
                  p: 1,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                {messageSent ? (
                  <div>Message sent!</div>
                ) : (
                  <div>
                    <TextField
                      autoFocus
                      margin="dense"
                      value={message}
                      type="text"
                      variant="standard"
                      onChange={handleChange}
                    />
                    <IconButton><SendIcon onClick={handleSend} /></IconButton>
                  </div>
                )}
              </Grid>
            </Menu>
          </Box>
          {currentUser.location &&
          user.location &&
          currentUser.uid != user.uid ? (
            <Box>
              <Typography variant="subtitle1">
                {calculateDistance(currentUser.location, user.location)} mi
              </Typography>
            </Box>
          ) : (
            ''
          )}
        </Paper>
        <AvailabilityGrid availability={user.availability} />
        {/* {user.availability &&
            user.availability.map((day, id) => {
              return (
                <Paper
                  sx={{justifyContent: 'center', textAlign: 'center'}}
                  key={id}>
                  <Typography variant="h5">{day.day}</Typography>
                  <ListItem>
                    <WbSunnyOutlined sx={{margin: '5px'}} /> {day.am}
                  </ListItem>
                  <ListItem>
                    <NightlightOutlined sx={{margin: '5px'}} /> {day.pm}
                  </ListItem>
                </Paper>
              )
            })} */}
        {interests.length > 0 && (
          <Paper sx={{m: 1, p: 1}}>
            <CardHeader align="center" title={`Hobbies`} />
            <List>
              {interests.map((interest, id) => {
                return (
                  <ListItem sx={{justifyContent: 'center'}} key={id}>
                    {interest}
                  </ListItem>
                )
              })}
            </List>
          </Paper>
        )}
      </Paper>
    </div>
  )
}

export default UserProfile
