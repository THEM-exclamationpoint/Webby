import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Fab from '@material-ui/core/Fab'
import SendIcon from '@mui/icons-material/Send'

const useStyles = makeStyles({
  messageArea: {
    height: '70vh',
    overflowY: 'auto',
  },
})

// need to fetch: user thats logged in, messages between logged in user and user that they clicked on
const SingleChat = () => {
  const classes = useStyles()
  return (
    <Grid item xs={9}>
      <List className={classes.messageArea}>
        {/* map over messages between user and user selected, if message is from user, display on the right, if message is from other person, display on left. also add time message was sent */}
        <ListItem key="1">
          <Grid container>
            <Grid item xs={12}>
              <ListItemText
                align="right"
                primary="Do you think God stays in heaven because he too lives in fear of what he's created?"
              ></ListItemText>
            </Grid>
            <Grid item xs={12}>
              <ListItemText align="right" secondary="09:30"></ListItemText>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem key="2">
          <Grid container>
            <Grid item xs={12}>
              <ListItemText align="left" primary="What"></ListItemText>
            </Grid>
            <Grid item xs={12}>
              <ListItemText align="left" secondary="09:31"></ListItemText>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem key="3">
          <Grid container>
            <Grid item xs={12}>
              <ListItemText align="right" primary="<3"></ListItemText>
            </Grid>
            <Grid item xs={12}>
              <ListItemText align="right" secondary="10:30"></ListItemText>
            </Grid>
          </Grid>
        </ListItem>
      </List>
      <Divider />
      <Grid container style={{padding: '20px'}}>
        <Grid item xs={11}>
          <TextField
            id="outlined-basic-email"
            label="Type Something"
            fullWidth
          />
        </Grid>
        <Grid xs={1} align="right">
          <Fab color="primary" aria-label="add">
            <SendIcon />
          </Fab>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default SingleChat
