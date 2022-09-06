import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Fade from '@mui/material/Fade'
import MoreIcon from '@mui/icons-material/MoreVert'
import {Link, useNavigate} from 'react-router-dom'
import {logOutUser} from '../../store/auth'
import {setUser} from '../../store/auth/user'

export default function FadeMenu() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let [isLoggedIn, setIsLoggedIn] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  let user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(setUser())
  }, [])

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [user])

  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const goToEditor = () => {
    setAnchorEl(null)
    navigate('./editprofile')
  }

  const handleLogout = () => {
    dispatch(logOutUser())
    setIsLoggedIn(false)
    navigate('/')
  }

  return (
    <div className="profile-options">
      <MoreIcon
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      />
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        className="menu"
        sx={{zIndex: 99999}}>
        {isLoggedIn ? (
          <div>
            <MenuItem onClick={goToEditor}>Edit my profile</MenuItem>

            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </div>
        ) : (
          <MenuItem onClick={() => navigate('/')}>Login</MenuItem>
        )}
      </Menu>
    </div>
  )
}
