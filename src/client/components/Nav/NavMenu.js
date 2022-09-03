import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined'
import {Link} from 'react-router-dom'
import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {setAllUsers} from '../../store/auth/users'
export default function TemporaryDrawer() {
  let [search, setSearch] = useState('')
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  })
  let dispatch = useDispatch()
  let users = useSelector((state) => state.users)
  let [searched, setSearched] = useState(false)
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({...state, [anchor]: open})
  }
  function handleChange(e) {
    setSearch(e.target.value)
  }
  async function onSearch() {
    await dispatch(setAllUsers())
    setSearched(true)
  }

  const filteredData = users.filter((user) => {
    let input = search.toLowerCase()
    return user.name.toLowerCase().includes(input)
  })
  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250,
      }}
      role="presentation">
      <List>
        <ListItem disablePadding onClick={toggleDrawer(anchor, false)}>
          <ListItemButton component={Link} to="/graph">
            <ListItemText primary="Web" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={toggleDrawer(anchor, false)}>
          <ListItemButton component={Link} to="/friends">
            <ListItemText primary="Friends" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={toggleDrawer(anchor, false)}>
          <ListItemButton component={Link} to="/chatroom">
            <ListItemText primary="Messages" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={toggleDrawer(anchor, false)}>
          <ListItemButton component={Link} to="/settings">
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <TextField
            onChange={handleChange}
            id="outlined-basic-email"
            label="Search"
            variant="outlined"
            value={search}
          />
          <IconButton onClick={onSearch}>
            {' '}
            <PersonSearchOutlinedIcon />
          </IconButton>
        </ListItem>
        <ListItem>
          {searched && (
            <List className="searched-user">
              {filteredData.map((user) => {
                return (
                  <Link
                    to={`/users/${user.uid}`}
                    key={user.uid}
                    onClick={toggleDrawer(anchor, false)}>
                    <ListItemButton>{user.name}</ListItemButton>
                  </Link>
                )
              })}
            </List>
          )}
        </ListItem>
      </List>
    </Box>
  )

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <MenuIcon onClick={toggleDrawer(anchor, true)}>{anchor}</MenuIcon>
          <Drawer
            sx={{zIndex: 99999}}
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  )
}
