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
import {getChatMessages} from '../../store/chat'
import {sentMessage} from '../../store/chat/sendMessage'

const useStyles = makeStyles({
  messageArea: {
    height: '70vh',
    overflowY: 'auto',
  },
})

// need to fetch: user thats logged in, messages between logged in user and user that they clicked on
const SingleChat = (props) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  let user = useSelector((state) => state.user)
  let messages = useSelector((state) => state.messages)
  let [message, setMessage] = useState('')

  useEffect(() => {
    dispatch(setUser())
  }, [])

  useEffect(() => {
    dispatch(getChatMessages(props.group.groupId))
  }, [])

  function handleClick() {
    dispatch(sentMessage(user.uid, props.group.groupId, message))
  }

  function handleChange(e) {
    setMessage({
      message: e.target.value,
    })
  }
  console.log(messages)
  return (
    <Grid item xs={9}>
      <List className={classes.messageArea}>
        {messages.map((message, i) => {
          return (
            <ListItem key={i}>
              <Grid container>
                <Grid item={true} xs={12}>
                  <ListItemText
                    align={message.fromUser !== user.uid ? 'left' : 'right'}
                    primary={message.content.message}
                  ></ListItemText>
                </Grid>
                <Grid item={true} xs={12}>
                  <ListItemText
                    align={message.fromUser !== user.uid ? 'left' : 'right'}
                    secondary={message.timeStamp ? message.timeStamp.seconds : 'today'}
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
