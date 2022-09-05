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
import Drawer from '@mui/material/Drawer'

import React, {useState, useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {setUser} from '../../store/auth/user'
import {sentMessage} from '../../store/chat/sendMessage'
import {getMessagesWithGroup} from '../../../firebase/chat'
import {setUsers} from '../../store/auth/users'

import {GroupProfile} from './Group'

const SingleChat = ({group}) => {
  const dispatch = useDispatch()
  let user = useSelector((state) => state.user)
  const scrollRef = useRef(null)

  let [message, setMessage] = useState('')
  let [messages, setMessages] = useState([])
  let users = useSelector((state) => state.users)
  // let [menuOpen, setMenuOpen] = useState(false)
  // let [menuOpen2, setMenuOpen2] = useState(false)
  // let [anchorEl, setAnchorEl] = useState(null)
  // let [anchorEl2, setAnchorEl2] = useState(null)
  let [isGroup, setIsGroup] = useState(null)

  let[collapse,setCollapse] = useState(false)

  function clickMenu() {
    setCollapse(!collapse)
  }
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({behavior: 'smooth'})
    }
  }, [messages])

  useEffect(() => {
    dispatch(setUser())
  }, [])

  useEffect(() => {
    typeof group.groupname === 'string' ? setIsGroup(true) : setIsGroup(false)
    dispatch(setUsers(group.members))
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
    setMessage('')
  }
  function handleChange(e) {
    setMessage(e.target.value)
  }

  return (
    <Grid onKeyPress={isEnter}>
      <Grid container>
        <Grid item={true} xs={12}>
          {isGroup ? (
            <Typography variant="h5" className="header-message" align="center" onClick={clickMenu}>
              {group.groupname}
            </Typography>
          ) : (
            <div>
              <Typography
                variant="h5"
                className="header-message"
                align="center">
                {group.groupname[0] === user.name
                  ? group.groupname[1]
                  : group.groupname[0]}
              </Typography>
            </div>
          )}
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
          let date = message.timeStamp
            ? new Date(message.timeStamp.seconds * 1000)
            : new Date()
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
      <Drawer sx={{zIndex: 99999}} anchor="right" open={collapse}  ModalProps={{ onBackdropClick: clickMenu }}>
        <GroupProfile group={group} users={users} user={user}/>
      </Drawer>
    </Grid>
  )
}

export default SingleChat
