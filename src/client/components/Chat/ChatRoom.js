import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import Drawer from '@mui/material/Drawer'

import SingleChat from './SingleChat'

import {setUser} from '../../store/auth/user'
import {getChatUsers} from '../../store/chat/chatUsers'

const useStyles = makeStyles({
  chatSection: {
    width: '100%',
    height: '80vh',
  },
  borderRight500: {},
  collapse: {
    orientation: 'horizontal',
  },
})

const Chat = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  let [collapse, setCollapse] = useState(false)

  let user = useSelector((state) => state.user)
  let groups = useSelector((state) => state.chatUsers)
  let [selectedGroup, setSelectedGroup] = useState(null)

  useEffect(() => {
    dispatch(setUser())
    dispatch(getChatUsers())
    setSelectedGroup(groups[0])
  }, [])

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

      <Grid container component={Paper} className={classes.chatSection}>
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
        <SingleChat group={selectedGroup}/>
      </Grid>
    </div>
  )
}

export default Chat
