import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
// import {makeStyles} from '@mui/styles'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import Drawer from '@mui/material/Drawer'

import SingleChat from './SingleChat'

import {setUser} from '../../store/auth/user'
import {getChatUsers} from '../../store/chat/chatUsers'

// const useStyles = makeStyles({
//   chatSection: {
//     width: '100%',
//     height: '80vh',
//   },
//   borderRight500: {},
//   collapse: {
//     orientation: 'horizontal',
//   },
// })

const Chat = () => {
  const dispatch = useDispatch()
  // const classes = useStyles()
  let [collapse, setCollapse] = useState(false)

  let user = useSelector((state) => state.user)
  let groups = useSelector((state) => state.chatUsers)
  

  useEffect(() => {
    dispatch(setUser())
    dispatch(getChatUsers())

  }, [])
let [selectedGroup, setSelectedGroup] = useState(groups[0])
  function clickMenu() {
    setCollapse(!collapse)
  }

  return (
    <div>
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
              <ListItem button key="RemySharp">
                <ListItemIcon>
                  <Avatar alt="Remy Sharp" src={user.profilePicture} />
                </ListItemIcon>
                <ListItemText primary={user.name}></ListItemText>
              </ListItem>
            </List>
            <Divider />
            {/* search for anyone on your friends list */}

            <Grid item={true} xs={12} style={{padding: '10px'}}>
              <TextField
                id="outlined-basic-email"
                label="Search"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Divider />
            {groups.map((group) => {
              return (
                <ListItem button key={group.groupId} onClick={()=>setSelectedGroup(group)}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={group.groupname}>
                    {group.groupname}
                  </ListItemText>
                  <ListItemText align="right"></ListItemText>
                </ListItem>
              )
            })}
            <List>
              <ListItem button key="NewChat">
                <ListItemText primary="New Chat">New Chat</ListItemText>
              </ListItem>
            </List>
          </Grid>
        </Drawer>
        {/* single chat component, should change as the state changes when you click on a different chat */}
       { selectedGroup && <SingleChat group={selectedGroup}/>}
      </Grid>
    </div>
  )
}

export default Chat
