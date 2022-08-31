import {useState} from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link, useNavigate } from 'react-router-dom';
import { logOutUser } from '../../store/auth';
import { useDispatch } from 'react-redux';

export default function FadeMenu() {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
const handleLogout = () => {
  dispatch(logOutUser())
  navigate('/')
}
  return (
    <div className='profile-options'>
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
        className= 'menu'
      >
       <Link to='/editprofile'><MenuItem onClick={handleClose}>My account</MenuItem></Link>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}