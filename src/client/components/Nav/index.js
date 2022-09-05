import {styled} from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FadeMenu from './UserMenu'
import TemporaryDrawer from './NavMenu'

import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {setUser} from '../../store/auth/user'
import {ReactComponent as Webby} from '../../../Spider-light.svg'
import {ReactComponent as DarkWebby} from '../../../Spider.svg'

const StyledToolbar = styled(Toolbar)(({theme}) => ({
  alignItems: 'center',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
}))

export default function ProminentAppBar() {
  let dispatch = useDispatch()
  let user = useSelector((state) => state.user)
  let theme = localStorage.getItem('theme')

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
    <AppBar position="static" className="navbar">
      <StyledToolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          '& > *': {
            m: 0,
            display: 'flex',
            alignItems: 'center',
          },
        }}>
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
            alignItems: 'baseline',
          }}
          disabled={isOff}>
          <TemporaryDrawer />
        </IconButton>

        {/* <Typography
              color="inherit"
              variant="h5"
              noWrap
              component={Link}
              to="/home"
              className="brand"
              sx={{
                fontWeight: 'bold',
                textDecoration: 'none',
              }}>
              WEBBY
            </Typography> */}
        {theme === 'dark' ? (
          <Link to="/home">
            <img src={'/Webby-logotype-light.png'} style={{width: 130}} />
          </Link>
        ) : (
          <Link to="/home">
            <img src={'/Webby-logotype-dark.png'} style={{width: 130}} />
          </Link>
        )}
        {theme === 'dark' ? (
          <DarkWebby style={{width: 80}} className="webby" />
        ) : (
          <Webby style={{width: 80}} className="webby" />
        )}
        <IconButton
          sx={{
            ml: 2,
            width: 50,
            height: 50,
            display: 'flex',
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
  )
}
