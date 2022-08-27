import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { 
  Button, 
  ButtonGroup,
  Card,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormLabel, 
  MenuItem,
  Switch,
  Stack,
  Paper,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { 
  createTheme,
  ThemeProvider,
  styled
} from '@mui/material/styles';
import {
  deepPurple,
  pink,
  cyan,
} from '@mui/material/colors';
import './style.css'
import user from '../../../../store/auth/user';

const Item = styled(Card)(({ theme }) => ({
  ...theme.typography.body2,
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const daysOTW = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const newAvailability = (days) => {
  return days
    .map((day, idx) => {
      return {
        id: idx,
        day,
        'am': 'unavailable',
        'pm': 'unavailable',
      }
    });
}
const AvailabilityGrid = (props) => {
  const {
    label='',
    oldAvailability = null,
    value,
  } = props;

  let [availability, setAvailability] = oldAvailability || useState(newAvailability(daysOTW));

  const handleClick = (e) => {
    let updated = JSON.parse(e.target.value);
    let newAvailability = [...availability];
    newAvailability[updated.id] = updated;
    setAvailability(newAvailability);

  }

  return (
    <div className='availability-grid-block' style={{width: '100%'}}>
      <FormControl>
        <Paper
          sx={{
            m:1,
            p: 1,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            '& > *': {
            },
          }}
        >
        <Stack
          sx={{
            p: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            '& > *': {
            },
          }}
          spacing={2}
        >
            {availability.map((day, idx) => {
            return(
                <Item 
                  key={`${day.day}block`}
                  sx={{
                    p: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    '& > *': {
                    },
                  }}
                >
                  <h1> {day.day} </h1>
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      '& > *': {
                        m: 1,
                      },
                    }}
                  >
                    <Item elevation={3} key={`${day.day}-am`}>
                      <h3>AM</h3>
                      <ButtonGroup 
                        orientation='vertical' 
                      >
                        <Button
                          color={day.am === 'available' ? 'success' : 'secondary'}
                          value={JSON.stringify({...day, am: 'available'})}
                          onClick={handleClick}
                        >
                          available
                        </Button>
                        <Button 
                          color={day.am === 'notice' ? 'warning' : 'secondary'}
                          value={JSON.stringify({...day, am: 'notice'})}
                          onClick={handleClick}
                        >
                          with notice
                        </Button>
                        <Button
                          color={day.am === 'unavailable' ? 'error' : 'secondary'}
                          value={JSON.stringify({...day, am: 'unavailable'})}
                          onClick={handleClick}
                        >
                          unavailable
                        </Button>
                      </ButtonGroup>
                    </Item>
                    <Item elevation={3} key={`${day.day}-pm`}>
                      
                      <h3>PM</h3>
                      <ButtonGroup 
                          orientation='vertical' 
                        >
                          <Button 
                            color={day.pm === 'available' ? 'success' : 'secondary'}
                            value={JSON.stringify({...day, pm: 'available'})}
                            onClick={handleClick}
                          >
                            available
                          </Button>
                          <Button 
                            color={day.pm === 'notice' ? 'warning' : 'secondary'}
                            value={JSON.stringify({...day, pm: 'notice'})}
                            onClick={handleClick}
                          >
                            with notice
                          </Button>
                          <Button
                            color={day.pm === 'unavailable' ? 'error' : 'secondary'}
                            value={JSON.stringify({...day, pm: 'unavailable'})}
                            onClick={handleClick}
                          >
                            unavailable
                          </Button>
                        </ButtonGroup>
                    </Item>
                  </Box>
                </Item>
              )
            })}
            </Stack>
            </Paper>
      </FormControl>
    </div>
  )
}

export default AvailabilityGrid;

