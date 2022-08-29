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

import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setUser} from '../../store/auth/user'
import {sentMessage} from '../../store/chat/sendMessage'
import {getMessagesWithGroup} from '../../../firebase/chat'
import {setUsers} from '../../store/auth/users'
import {getFriends} from '../../store/friends'
import { addChatUsers } from '../../store/chat/chatUsers'

const SingleChat = (props) => {
  const dispatch = useDispatch()
  let user = useSelector((state) => state.user)
  let users = useSelector((state) => state.users)
  let friends = useSelector((state) => state.friends)

  let [message, setMessage] = useState('')
  let [messages, setMessages] = useState([])
  let [menuOpen, setMenuOpen] = useState(false)



  useEffect(() => {
    dispatch(setUser())
    dispatch(setUsers(props.group.members))
    dispatch(getFriends(user.uid))
  }, [])

  useEffect(() => {
    const unsubscribe = getMessagesWithGroup(props.group.groupId, setMessages)
    return unsubscribe
  }, [props.group.groupId])

  function isEnter(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleClick()
    }
  }
  function handleClick() {
    dispatch(sentMessage(user.uid, props.group.groupId, message))
  }

  function handleChange(e) {
    setMessage({
      message: e.target.value,
    })
  }
  function handleSelect(uid) {
    dispatch(addChatUsers(uid,user.uid,props.group.groupId))
  }
  function toggleMenu(){
    setMenuOpen(true)
  }
  let closeMenu = () => {
    setMenuOpen(false);
}
  return (
    <Grid onKeyPress={isEnter}>
      <Grid container>
        <Grid item={true} xs={12}>
          <Typography variant="h5" className="header-message" align="center">
            {props.group.groupname}
          </Typography>
          <React.Fragment>
          <Button onClick={toggleMenu}>Add Member</Button>
          <Menu open={menuOpen} onClose={closeMenu}> 
            {friends.map((friend) => {
              return (
                <MenuItem value={friend} key={friend.uid} onClick={()=>handleSelect(friend.uid)}>
                  {friend.name}
                </MenuItem>
              )
            })}
          </Menu>
          </React.Fragment>
        </Grid>
      </Grid>
      <List width="100%" height="70vh"  style={{
       maxHeight: 300, overflow: 'auto'
      }}>
        {messages.map((message, i) => {
          let from = users.find((curuser) => {
            return curuser.uid === message.fromUser
          })
          return (
            <ListItem key={i}>
              <Grid container>
                <Grid item={true} xs={12}>
                  <ListItemText
                    align={message.fromUser !== user.uid ? 'left' : 'right'}
                    secondary={from && from.name}
                  ></ListItemText>
                  <ListItemText
                    align={message.fromUser !== user.uid ? 'left' : 'right'}
                    primary={message.content.message}
                  ></ListItemText>
                </Grid>
                <Grid item={true} xs={12}>
                  <ListItemText
                    align={message.fromUser !== user.uid ? 'left' : 'right'}
                    secondary={
                      message.timeStamp
                        ? `${new Date(message.timeStamp.seconds * 1000)}`
                        : 'unknown'
                    }
                  ></ListItemText>
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
            id="outlined-basic-email"
            label="Type Something"
            fullWidth
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
