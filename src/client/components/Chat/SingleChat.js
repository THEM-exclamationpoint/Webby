import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Fab from '@mui/material/Fab'
import SendIcon from '@mui/icons-material/Send'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import Button from '@mui/material/Button'

import React, {useState, useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {setUser} from '../../store/auth/user'
import {sentMessage} from '../../store/chat/sendMessage'
import {getMessagesWithGroup} from '../../../firebase/chat'
import {setUsers} from '../../store/auth/users'
import {getFriends} from '../../store/friends'
import {addChatUsers} from '../../store/chat/chatUsers'

const SingleChat = ({group}) => {
  const dispatch = useDispatch()
  let user = useSelector((state) => state.user)
  let users = useSelector((state) => state.users)
  let friends = useSelector((state) => state.friends)

  const scrollRef = useRef(null)

  let [message, setMessage] = useState('')
  let [messages, setMessages] = useState([])
  let [menuOpen, setMenuOpen] = useState(false)
  let [menuOpen2, setMenuOpen2] = useState(false)
  let [anchorEl, setAnchorEl] = useState(null)
  let [anchorEl2, setAnchorEl2] = useState(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({behavior: 'smooth'})
    }
  }, [messages])
  useEffect(() => {
    dispatch(setUser())
    dispatch(setUsers(group.members))
    dispatch(getFriends(user.uid))
  }, [])

  useEffect(() => {
    const unsubscribe = getMessagesWithGroup(group.groupId, setMessages)
    return unsubscribe
  }, [group.groupId])

  function isEnter(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleClick()
    }
  }
  function handleClick() {
    dispatch(sentMessage(user.uid, group.groupId, message))
    console.log(message)
    setMessage('')
  }
  function handleChange(e) {
    setMessage(e.target.value)
  }
  function handleSelect(uid) {
    dispatch(addChatUsers(uid, user.uid, group.groupId))
  }
  function toggleMenu(e) {
    setMenuOpen(true)
    setAnchorEl(e.target)
  }
  let closeMenu = () => {
    setMenuOpen(false)
    setAnchorEl(null)
  }

  function toggleMenu2(e) {
    setMenuOpen2(true)
    setAnchorEl2(e.target)
  }
  let closeMenu2 = () => {
    setMenuOpen2(false)
    setAnchorEl2(null)
  }
  return (
    <Grid onKeyPress={isEnter}>
      <Grid container>
        <Grid item={true} xs={12}>
          <Typography variant="h5" className="header-message" align="center">
            {group.groupname}
          </Typography>
          <React.Fragment>
            <Button onClick={toggleMenu2}>Add Member</Button>
            <Menu open={menuOpen2} onClose={closeMenu2} anchorEl={anchorEl2}>
              {friends.map((friend) => {
                if (!group.members.includes(friend.uid)) {
                  return (
                    <MenuItem
                      value={friend}
                      key={friend.uid}
                      onClick={() => handleSelect(friend.uid)}>
                      {friend.name}
                    </MenuItem>
                  )
                }
              })}
            </Menu>
          </React.Fragment>
          <React.Fragment>
            <Button onClick={toggleMenu} align="right">
              Members
            </Button>
            <Menu open={menuOpen} onClose={closeMenu} anchorEl={anchorEl}>
              {users.map((user) => {
                {
                  return (
                    <MenuItem value={user} key={user.uid}>
                      {user.name}
                    </MenuItem>
                  )
                }
              })}
            </Menu>
          </React.Fragment>
        </Grid>
      </Grid>
      <List
        height="70vh"
        style={{
          maxHeight: 300,
          overflow: 'auto',
        }}>
        {messages.map((message, i) => {
          let from = users.find((curuser) => {
            return curuser.uid === message.fromUser
          })
          let date = new Date(message.timeStamp.seconds * 1000)
          let splitted = String(date).split(' ').slice(0, 5).join(' ')
          return (
            <ListItem key={i} ref={scrollRef}>
              <Grid container>
                <Grid item={true} xs={12}>
                  <ListItemText
                    align={message.fromUser !== user.uid ? 'left' : 'right'}
                    secondary={from && from.name}></ListItemText>
                  <ListItemText
                    align={message.fromUser !== user.uid ? 'left' : 'right'}
                    primary={message.content}></ListItemText>
                </Grid>
                <Grid item={true} xs={12}>
                  <ListItemText
                    align={message.fromUser !== user.uid ? 'left' : 'right'}
                    secondary={splitted}></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
          )
        })}
      </List>
      <Divider />
      <Grid container style={{padding: '20px'}}>
        <Grid item={true} xs={11}>
          <TextField
            autoFocus
            margin="dense"
            label="Type Something"
            value={message}
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid onClick={handleClick} item={true} xs={1} align="right">
          <Fab color="primary" aria-label="add">
            <SendIcon />
          </Fab>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default SingleChat
