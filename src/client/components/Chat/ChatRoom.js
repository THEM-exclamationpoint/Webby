import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import Drawer from '@mui/material/Drawer'
import Dialog from '@mui/material/Dialog';

import SingleChat from './SingleChat'
import './style.css'

import {getFriends} from '../../store/friends'
import {setUser} from '../../store/auth/user'
import {getChatUsers} from '../../store/chat/chatUsers'
import { NewChat } from './NewChat';

const Chat = () => {
  const dispatch = useDispatch()
  let [collapse, setCollapse] = useState(false)
  let [modalOpen, setModalOpen] = useState(false)
  let [search, setSearch] = useState('')

  let user = useSelector((state) => state.user)
  let groups = useSelector((state) => state.chatUsers)
  let friends = useSelector((state) => state.friends)

  useEffect(() => {
    dispatch(setUser())
    dispatch(getChatUsers())
    dispatch(getFriends(user.uid))
  }, [])
  
  let [selectedGroup, setSelectedGroup] = useState(groups[0])

  function clickMenu() {
    setCollapse(!collapse)
  }
  function modalClose() {
    setModalOpen(false)
  }
  function modalToggle() {
    setModalOpen(true)
  }
  function handleChange (e){
    setSearch(e.target.value)
  }
  const filteredData = groups.filter(group => {
    let input = search.toLowerCase()
    if(input === ''){
      return group
    }
    else {
      return group.groupname.toLowerCase().includes(input)
    }
  })
  
  return (
    <div className='chat-component'>
      <Grid container>
        <Grid item={true} xs={12}>
          <Typography variant="h5" className="header-message">
            Chat
          </Typography>
          <ArrowForwardIosIcon onClick={clickMenu} />
        </Grid>
      </Grid>

      <Grid container component={Paper}>
        <Drawer anchor="left" open={collapse}>
          <Grid>
            <ArrowBackIosIcon onClick={clickMenu} />
            <List>
              <ListItem button key="user">
                <ListItemIcon>
                  <Avatar alt="User" src={user.profilePicture} />
                </ListItemIcon>
                <ListItemText primary={user.name}></ListItemText>
              </ListItem>
            </List>
            <Divider />
            <Grid item={true} xs={12} style={{padding: '10px'}}>
              <TextField
              onChange={handleChange}
                id="outlined-basic-email"
                label="Search"
                variant="outlined"
                value={search}
                fullWidth
              />
            </Grid>
            <Divider />
            {filteredData.map((group) => {
              return (
                <ListItem
                  button
                  key={group.groupId}
                  onClick={() => setSelectedGroup(group)}>
                  <ListItemText primary={group.groupname}>
                    {group.groupname}
                  </ListItemText>
                  <ListItemText align="right"></ListItemText>
                </ListItem>
              )
            })}
            <List>
              <ListItem button key="NewChat" onClick={modalToggle}>
                <ListItemText primary="New Chat">New Chat</ListItemText>
              </ListItem>
            </List>
            <Dialog open={modalOpen} onClose={modalClose}>
            <NewChat friends={friends} user={user}/>
            </Dialog>
          </Grid>
        </Drawer>
        {selectedGroup && <SingleChat group={selectedGroup} />}
      </Grid>

    </div>
  )
}

export default Chat
