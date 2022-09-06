import {styled} from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FadeMenu from './UserMenu'
import TemporaryDrawer from './NavMenu'

import {Link, useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {setUser} from '../../store/auth/user'
import {ReactComponent as Webby} from '../../../Spider-light.svg'
import {ReactComponent as DarkWebby} from '../../../Spider.svg'

const StyledToolbar = styled(Toolbar)(({theme}) => ({
  alignItems: 'center',
}))

export default function ProminentAppBar() {
  let nav = useNavigate()
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
    <AppBar
      className="navbar"
      sx={{
        position: 'sticky',
        top: 0,
      }}>
      <StyledToolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{
              width: 50,
              height: 50,
              display: 'flex',
              alignItems: 'baseline',
            }}
            disabled={isOff}>
            <TemporaryDrawer />
          </IconButton>
          {theme === 'dark' ? (
            <img
              onClick={() => nav('./home')}
              src={'/Webby-logotype-light.png'}
              style={{width: 150, cursor: 'pointer'}}
            />
          ) : (
            <img
              onClick={() => nav('./home')}
              src={'/Webby-logotype-dark.png'}
              style={{width: 150, cursor: 'pointer'}}
            />
          )}
        </Box>

        <Box sx={{display: 'flex', alignItems: 'center'}}>
          {theme === 'dark' ? (
            <DarkWebby style={{width: 80}} className="webby" />
          ) : (
            <Webby style={{width: 80}} className="webby" />
          )}
          <IconButton
            sx={{
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
        </Box>
      </StyledToolbar>
    </AppBar>
  )
}
