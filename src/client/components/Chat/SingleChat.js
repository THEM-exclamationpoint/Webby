import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Fab from '@material-ui/core/Fab'
import SendIcon from '@mui/icons-material/Send'

import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setUser} from '../../store/auth/user'
import {sentMessage} from '../../store/chat/sendMessage'
import {getMessagesWithGroup} from '../../../firebase/chat'
import {setUsers} from '../../store/auth/users'

const useStyles = makeStyles({
  messageArea: {
    height: '70vh',
    width:'100%',
    overflowY: 'auto',
  },
})

const SingleChat = (props) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  let user = useSelector((state) => state.user)
  let users = useSelector((state) => state.users)

  let [message, setMessage] = useState('')
  let [messages, setMessages] = useState([])
  useEffect(() => {
    dispatch(setUser())
    dispatch(setUsers(props.group.members))
  }, [])

  useEffect(() => {
    const unsubscribe = getMessagesWithGroup(props.group.groupId, setMessages)
    return unsubscribe
  }, [props.group.groupId])

  function isEnter(e){
    if(e.key === 'Enter'){
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

  return (
    <Grid item xs={9}onKeyPress={isEnter} >
      <List className={classes.messageArea}>
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
                        : 'unkown'
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
