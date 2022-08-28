import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { 
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
  Typography,
  Chip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
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

  let [expanded, setExpanded] = useState(false);

  const handleClick = (e) => {
    let updated = JSON.parse(e.target.value);
    let newAvailability = [...availability];
    newAvailability[updated.id] = updated;
    setAvailability(newAvailability);

  }

  const handleChange = (day) => (e, isExpanded) => {
    setExpanded(isExpanded ? day : false);
  }

  return (
      <FormControl sx={{
            display: 'flex',
            m: 2,
        }}
      >        
        {availability.map((day, idx) => {
        return(
            <Accordion
              expanded={expanded === day.day}
              onChange={handleChange(day.day)}
              key={`${day.day}block`}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls={`${day.day}-content`}
                id={`${day.day}-header`}
                sx={{
                  width: '100%',
                  display: 'flex',
                  alignContent: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    alignContent: 'center',
                  }}
                >
                  <h3> {day.day} </h3>
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    alignContent: 'center',
                    justifyContent: 'space-evenly',
                    '& > *': {
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      aspectRatio: '1/1',
                      m: 1,
                    },
                }}>
                  <Card>
                    {day.am === 'available' ? (<WbSunnyIcon color='success'/>) : ''}
                    {day.am === 'notice' ? (<WbSunnyIcon color='warning'/>) : ''}
                    {day.am === 'unavailable' ? (<WbSunnyIcon color='error'/>) : ''}
                  </Card>
                  <Card>
                    {day.pm === 'available' ? (<NightsStayIcon color='success'/>) : ''}
                    {day.pm === 'notice' ? (<NightsStayIcon color='warning'/>) : ''}
                    {day.pm === 'unavailable' ? (<NightsStayIcon color='error'/>) : ''}
                  </Card>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  '& > *': {
                    m: 1,
                    p: 1,
                  },
                }}
              >
                <Item elevation={3} key={`${day.day}-am`}>
                  <h3>DAY</h3>
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
                  
                  <h3>NIGHT</h3>
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
              </AccordionDetails>
            </Accordion>
          )
        })}
      </FormControl>
  )
}

export default AvailabilityGrid;

