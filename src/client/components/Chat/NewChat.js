import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import List from '@mui/material/List'
import ListItemIcon from '@mui/material/ListItemIcon'
import TextField from '@mui/material/TextField';
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import ListItemButton from '@mui/material/ListItemButton'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import React, {useState} from 'react'
import { addNewChat } from '../../store/chat/chatUsers'
import {useDispatch} from 'react-redux'

export const NewChat = ({friends,user}) => {

  let [selected, setSelected] = useState([])
  let [name, setName] = useState('')

  const dispatch = useDispatch()

  function onSelect(friend) {
    if (selected.includes(friend)) {
      setSelected(selected.filter((friends) => friends !== friend))
      return false
    } else {
      setSelected([...selected, friend])
      return true
    }
  }

  function handleChange (e) {
    setName(e.target.value)
  }

  function submitNewGroup (){
    let newMembers = [...selected, user.uid]
    dispatch(addNewChat(newMembers,name,user.uid))
  }
  return (
    <DialogContent>
              <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Group Name"
            value={name}
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
      <DialogContentText>Friends</DialogContentText>

      <Box>
        <List>
          {friends.map((friend) => {
            return (
              <ListItemButton onClick={() => onSelect(friend)}>
                <ListItemIcon>
                  <Avatar alt="User" src={friend.profilePicture} />
                </ListItemIcon>
                <ListItemText>{friend.name}</ListItemText>
              </ListItemButton>
            )
          })}
        </List>
        <DialogContentText>Selected</DialogContentText>
        <List>
          {selected.map((friend) => {
            return (
              <ListItemButton onClick={() => onSelect(friend)}>
                <ListItemIcon>
                  <Avatar alt="User" src={friend.profilePicture} />
                </ListItemIcon>
                <ListItemText>{friend.name}</ListItemText>
              </ListItemButton>
            )
          })}
        </List>
      </Box>
      <Button onClick={submitNewGroup}>Make Group</Button>
    </DialogContent>
  )
}
