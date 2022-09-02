import {styled} from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import { TextField } from '@mui/material'
import FadeMenu from './UserMenu'
import TemporaryDrawer from './NavMenu'
import './style.css'
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setUser} from '../../store/auth/user'
import {ReactComponent as Webby} from '../../../Spider-light.svg'

const StyledToolbar = styled(Toolbar)(({theme}) => ({
  alignItems: 'center',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
}))

export default function ProminentAppBar() {
  let dispatch = useDispatch()
  let user = useSelector((state) => state.user)

  let [isOff, setIsOff] = useState(null)

  useEffect(() => {
    dispatch(setUser())
  }, [])

  useEffect(() => {
    if (user) {
      setIsOff(false)
    } else {
      setIsOff(true)
    }
  }, [user])

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        position: 'sticky',
        top: 0,
        zIndex: 99,
      }}
      className="menu">
      <AppBar position="static" className="navbar">
        <StyledToolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{
              mr: 2,
              width: 50,
              height: 50,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'baseline',
            }}
            disabled={isOff}>
            <TemporaryDrawer />
          </IconButton>

          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/home"
            className="brand"
            sx={{flexGrow: 1, alignSelf: 'center'}}>
            WEBBY
          </Typography>
          <Webby className="webby" />
          <IconButton
            sx={{
              ml: 2,
              width: 50,
              height: 50,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'baseline',
            }}
            size="large"
            aria-label="display more actions"
            edge="end"
            color="inherit">
            <FadeMenu />
          </IconButton>
        </StyledToolbar>
      </AppBar>
    </Box>
  )
}
