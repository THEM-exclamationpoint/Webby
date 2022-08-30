import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import {getFriends} from '../../store/friends'
import {setUser} from '../../store/auth/user'
import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
import Avatar from '@mui/material/Avatar'
export const FriendsList = () => {
  const dispatch = useDispatch()
  let friends = useSelector((state) => state.friends)
  let user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(setUser())
    dispatch(getFriends(user.uid))
  }, [])


  return (
    <div className="friends-list">
      Friends:
      <List>
        {friends.map(friend => {
            return(
            
                <ListItem button key={friend.uid}>   
                 <ListItemIcon>
                <Avatar alt="User" src={friend.profilePicture} />
              </ListItemIcon>
                <ListItemText>{friend.name}</ListItemText>
              </ListItem>
            )
        })}
      </List>
    </div>
  )
}
