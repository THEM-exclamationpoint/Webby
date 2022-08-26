import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { 
  Button, 
  ButtonGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Checkbox,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormLabel, 
  MenuItem,
  Switch,
  Paper,
  Grid,
  Box,
  Radio,
  RadioGroup,
  Divider,
  Typography,
  Card,
  Autocomplete,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { 
  createTheme,
  ThemeProvider,
  styled
} from '@mui/material/styles';
import './style.css'
import user from '../../../../store/auth/user';

const Item = styled(Card)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const daysOTW = ['Sunday' ,'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const objOTW = daysOTW.map((day, idx) => {return {id: idx, day}});

const AvailabilityGrid = (props) => {
    const {
      label='',
      value,
    } = props;

    let [availability, setAvailability] = 
      useState(
        [...objOTW
          .map( obj => {
            return {
              ...obj,
              'availability' : 'available',
            }
            })
        ]
      );

    const handleClick = (e) => {
      console.log({...e.target})
    }

    return (
      <div className='availability-grid-block'>
        <FormControl>
            <Paper 
              elevation={3}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                '& > *': {
                  m: 1,
                },
                justifyContent: 'space-evenly',
              }}
            >
              {daysOTW.map(day => {
              return(
                  <Accordion key={`${day}accordion`}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <h3>
                        {day}
                        </h3>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box
                        sx={{
                          display: 'flex',
                          '& > *': {
                            m: 1,
                          },
                        }}
                      >
                        <Item elevation={3} key={`${day}-am`}>
                          <h5>AM</h5>
                          <ButtonGroup orientation='vertical'>
                            <Button onClick={handleClick}>
                              available
                            </Button>
                            <Button onClick={handleClick}>
                              with notice
                            </Button>
                            <Button onClick={handleClick}>
                              not available
                            </Button>
                          </ButtonGroup>
                        </Item>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          '& > *': {
                            m: 1,
                          },
                        }}
                      >
                        <Item elevation={3} key={`${day}-pm`}>
                          
                        <h5>PM</h5>
                          <ButtonGroup orientation='vertical'>
                            <Button onClick={handleClick}>
                              AVAILABLE
                            </Button>
                            <Button onClick={handleClick}>
                              WITH NOTICE
                            </Button>
                            <Button onClick={handleClick}>
                              NOT AVAILABLE
                            </Button>
                          </ButtonGroup>
                        </Item>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                )
              })}
            </Paper>
        </FormControl>
      </div>
    )
}

export default AvailabilityGrid;

