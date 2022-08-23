import React from 'react'
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
import Collapse from '@material-ui/core/Collapse';
import SingleChat from './SingleChat'

// need to fetch: user thats logged in, and any users they have a chat with, as well as that users' PFP

const useStyles = makeStyles({
  chatSection: {
    width: '100%',
    height: '80vh',
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
  },
})

const Chat = () => {
  const classes = useStyles()

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className="header-message">
            Chat
          </Typography>
        </Grid>
      </Grid>

      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={3} className={classes.borderRight500}>
          {/* first person above search bar is the person who's chat is opened / can do this using usestate? */}
          <List>
            <ListItem button key="RemySharp">
              <ListItemIcon>
                <Avatar
                  alt="Remy Sharp"
                  src="https://material-ui.com/static/images/avatar/4.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="John Wick"></ListItemText>
            </ListItem>
          </List>
          <Divider />
          {/* search for anyone on your friends list */}
          <Grid item xs={12} style={{padding: '10px'}}>
            <TextField
              id="outlined-basic-email"
              label="Search"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Divider />
          <List>
            {/* map over every user that the person has an open chat with, display their name and icon -extra: if theyre online*/}
            <ListItem button key="RemySharp">
              <ListItemIcon>
                <Avatar
                  alt="Remy Sharp"
                  src="https://material-ui.com/static/images/avatar/1.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
              <ListItemText secondary="online" align="right"></ListItemText>
            </ListItem>
            <ListItem button key="Alice">
              <ListItemIcon>
                <Avatar
                  alt="Alice"
                  src="https://material-ui.com/static/images/avatar/3.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Alice">Alice</ListItemText>
            </ListItem>
            <ListItem button key="CindyBaker">
              <ListItemIcon>
                <Avatar
                  alt="Cindy Baker"
                  src="https://material-ui.com/static/images/avatar/2.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
              {/* ability to create new chat with anyone on your friends list. maybe appear a dropdown menu of everyone on your friends list? */}
            </ListItem>
            <ListItem button key="NewChat">
              <ListItemText primary="New Chat">New Chat</ListItemText>
            </ListItem>
          </List>
        </Grid>
        {/* single chat component, should change as the state changes when you click on a different chat */}
        <SingleChat />
      </Grid>
    </div>
  )
}

export default Chat
