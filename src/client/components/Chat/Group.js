import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useRoutes} from 'react-router-dom'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import Avatar from '@mui/material/Avatar'

import {getFriends} from '../../store/friends'
import {addChatUsers, removeChatUsers} from '../../store/chat/chatUsers'
import {setUsers} from '../../store/auth/users'

export const GroupProfile = ({group, user}) => {
  let dispatch = useDispatch()
  let friends = useSelector((state) => state.friends)
  let users = useSelector((state) => state.users)
  let [openAdd, setOpenAdd] = useState(false)
  let [members, setMembers] = useState(null)

  useEffect(() => {
    dispatch(getFriends(user.uid))
    dispatch(setUsers(group.members))
    if (users.length !== 0) {
      setMembers(users)
    }
  }, [])

  function handleSelect(friend) {
    dispatch(addChatUsers(friend.uid, user.uid, group.groupId))
    setMembers([...members, friend])
  }

  function handleRemoveUser(uid) {
    dispatch(removeChatUsers(uid, user.uid, group.groupId))
    setMembers(members.filter((member) => member.uid !== uid))
  }

  return (
    <div className="group-profile-container" align="center">
      <Typography variant="h5">{group.groupname}</Typography>
      <List>
        {members &&
          members.map((curuser) => {
            return (
              <ListItemButton key={curuser.uid}>
                <Avatar
                  alt={curuser.name}
                  src={curuser.profilePicture}
                  sx={{margin: '5px'}}
                />
                {curuser.name}
                {curuser.uid !== user.uid && (
                  <Button onClick={() => handleRemoveUser(curuser.uid)}>
                    X
                  </Button>
                )}
              </ListItemButton>
            )
          })}
      </List>
      <Button onClick={() => setOpenAdd(true)}>Add Member</Button>
      {openAdd && (
        <div>
          <List>
            {friends.map((friend) => {
              if (!group.members.includes(friend.uid)) {
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
