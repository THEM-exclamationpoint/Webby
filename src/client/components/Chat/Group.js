import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'

import {getFriends} from '../../store/friends'
import {addChatUsers} from '../../store/chat/chatUsers'
import { editGroupName } from '../../store/chat/chatUsers'

export const GroupProfile = ({group, user, users}) => {
  let dispatch = useDispatch()
  let friends = useSelector((state) => state.friends)
  let [name, setName] = useState(group.groupname)
  let [enter, setEnter] = useState(false)
  let [openAdd, setOpenAdd] = useState(false)
  let [members, setMembers] = useState(users)

  useEffect(() => {
    dispatch(getFriends(user.uid))
  }, [])

  useEffect(() => {
    setMembers(users)
  }, [group.groupId])

  function handleChange(e) {
    setName(e.target.value)
  }

  function handleSelect(friend) {
    dispatch(addChatUsers(friend.uid, user.uid, group.groupId))
    setMembers(...users, friend)
  }
function handleNewName(){
    editGroupName(name,group.groupId,user.uid)
}

  return (
    <div className="group-profile-container">
      {enter ? (
        <div>
        <TextField
          autoFocus
          margin="dense"
          value={name}
          type="text"
          variant="standard"
          onChange={handleChange}
        />
        <Button onClick={handleNewName}>Change name</Button>
        </div>
      ) : (
        <Typography variant="h5">{group.groupname}</Typography>
      )}
      <small>
        <Button onClick={()=> setEnter(true)}>Change group name</Button>
      </small>
      <List>
        {members.map((user) => {
          ;<ListItemButton key={user.uid}>
            <Avatar alt={user.name} src={user.profilePicture} />
            {user.name}
          </ListItemButton>
        })}
      </List>
      <Button onClick={() => setOpenAdd(true)}>Add Member</Button>
      {openAdd && (
        <div>
          <List>
            {friends.map((friend) => {
              if (!members.includes(friend.uid)) {
                return (
                  <ListItemButton
                    key={friend.uid}
                    onClick={() => handleSelect(friend)}>
                    <Avatar alt={friend.name} src={friend.profilePicture} />
                    {friend.name}
                  </ListItemButton>
                )
              }
            })}
          </List>
        </div>
      )}
    </div>
  )
}
