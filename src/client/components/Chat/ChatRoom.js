import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

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
import Dialog from '@mui/material/Dialog'

import SingleChat from './SingleChat'
import './style.css'

import {getFriends} from '../../store/friends'
import {setUser} from '../../store/auth/user'
import {getChatUsers} from '../../store/chat/chatUsers'
import {NewChat} from './NewChat'
import {Box} from '@mui/material'

const Chat = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let [collapse, setCollapse] = useState(true)
  let [modalOpen, setModalOpen] = useState(false)
  let [search, setSearch] = useState('')

  let user = useSelector((state) => state.user)
  let groups = useSelector((state) => state.chatUsers)
  let friends = useSelector((state) => state.friends)
  let [selectedGroup, setSelectedGroup] = useState(null)

  useEffect(() => {
    dispatch(setUser())
    dispatch(getChatUsers())
    dispatch(getFriends(user.uid))
    setSelectedGroup(groups[0])
  }, [])

  function clickMenu() {
    setCollapse(!collapse)
  }
  function modalClose() {
    setModalOpen(false)
  }
  function modalToggle() {
    setModalOpen(true)
  }
  function handleChange(e) {
    setSearch(e.target.value)
  }
  function toMyProfile() {
    navigate(`../users/${user.uid}`)
  }

  const filteredData = groups.filter((group) => {
    let name =
      typeof group.groupname === 'string'
        ? group.groupname
        : group.groupname[0] === user.name
        ? group.groupname[1]
        : group.groupname[0]
    let input = search.toLowerCase()
    if (input === '') {
      return group
    } else {
      return name.toLowerCase().includes(input)
    }
  })

  return (
    <Paper
      sx={{m: 1, p: 1, display: 'flex', flexDirection: 'column'}}
      className="chat-component">
      <Grid container>
        <Grid item={true} xs={12}>
          <Typography variant="h5" className="header-message">
            Chat
          </Typography>
          <ArrowForwardIosIcon onClick={clickMenu} />
        </Grid>
      </Grid>

      <Grid container component={Paper}>
        <Drawer sx={{zIndex: 99999}} anchor="left" open={collapse}>
          <Grid>
            <ArrowBackIosIcon sx={{m: 1}} onClick={clickMenu} />
            <List className="user">
              <ListItem button key="user" onClick={toMyProfile}>
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
              let name =
                typeof group.groupname === 'string'
                  ? group.groupname
                  : group.groupname[0] === user.name
                  ? group.groupname[1]
                  : group.groupname[0]
              return (
                <ListItem
                  button
                  key={group.groupId}
                  onClick={() => {
                    setSelectedGroup(group)
                    setCollapse()
                  }}>
                  <ListItemText primary={name}>{name}</ListItemText>
                  <ListItemText align="right"></ListItemText>
                </ListItem>
              )
            })}
            <List>
              <ListItem
                button
                key="NewChat"
                onClick={() => {
                  modalToggle()
                }}>
                <ListItemText primary="New Chat">New Chat</ListItemText>
              </ListItem>
            </List>
            <Dialog open={modalOpen} onClose={modalClose} sx={{zIndex: 999999}}>
              <NewChat friends={friends} user={user} />
            </Dialog>
          </Grid>
        </Drawer>
        {selectedGroup && <SingleChat group={selectedGroup} groupname={name} />}
      </Grid>
    </Paper>
  )
}

export default Chat
