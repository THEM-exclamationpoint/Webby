import React, {useState} from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  ButtonGroup,
  Card,
  FormControl,
  Typography,
  Box,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Event,
  NotInterested,
  Check,
  WbSunny,
  NightsStay,
} from '@mui/icons-material'
import {styled} from '@mui/material/styles'
import {newAvailability, User} from '../../../../../firebase/models/User'
import './style.css'

const Item = styled(Card)(({theme}) => ({
  ...theme.typography.body2,
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const EditAvailabilityGrid = (props) => {
  const {setState = (state) => {}, value} = props
  let [availability, setAvailability] =
    useState(value) || useState(newAvailability())

  let [expanded, setExpanded] = useState(false)

  const handleClick = (e) => {
    let updated = JSON.parse(e.target.value)
    let newAvailability = [...availability]
    newAvailability[updated.id] = updated
    setAvailability(newAvailability)
    setState(newAvailability)
  }

  const accordionControl = (day) => (e, isExpanded) => {
    setExpanded(isExpanded ? day : false)
  }

  return (
    <FormControl
      sx={{
        display: 'flex',
        m: 0.5,
      }}>
      {availability.map((day, idx) => {
        return (
          <Accordion
            expanded={expanded === day.day}
            onChange={accordionControl(day.day)}
            key={`${day.day}block`}
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon color="primary" />}
              aria-controls={`${day.day}-content`}
              id={`${day.day}-header`}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Box
                sx={{
                  width: '60%',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                <Typography variant="h6"> {day.day} </Typography>
              </Box>
              <Box
                sx={{
                  width: '40%',
                  display: 'flex',
                  alignContent: 'center',
                  justifyContent: 'flex-end',
                  '& > *': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    aspectRatio: '1/1',
                    m: 0.25,
                    p: 0.25,
                  },
                }}>
                <Box>
                  <WbSunny fontSize="small" />
                  {day.am === 'available' ? (
                    <Check color="success" fontSize="small" />
                  ) : day.am === 'notice' ? (
                    <Event color="warning" fontSize="small" />
                  ) : (
                    <NotInterested color="error" fontSize="small" />
                  )}
                </Box>
                <Box>
                  <NightsStay fontSize="small" />
                  {day.pm === 'available' ? (
                    <Check color="success" fontSize="small" />
                  ) : day.pm === 'notice' ? (
                    <Event color="warning" fontSize="small" />
                  ) : (
                    <NotInterested color="error" fontSize="small" />
                  )}
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  '& > *': {
                    m: 0.5,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  },
                }}>
                <Item key={`${day.day}-am`}>
                  <Typography sx={{m: 1}} variant="h6">
                    DAY
                  </Typography>
                  <ButtonGroup orientation="vertical">
                    <Button
                      variant={
                        day.am === 'available' ? 'contained' : 'outlined'
                      }
                      color={day.am === 'available' ? 'success' : 'secondary'}
                      value={JSON.stringify({...day, am: 'available'})}
                      onClick={handleClick}>
                      available
                    </Button>
                    <Button
                      variant={day.am === 'notice' ? 'contained' : 'outlined'}
                      color={day.am === 'notice' ? 'warning' : 'secondary'}
                      value={JSON.stringify({...day, am: 'notice'})}
                      onClick={handleClick}>
                      plan ahead
                    </Button>
                    <Button
                      variant={
                        day.am === 'unavailable' ? 'contained' : 'outlined'
                      }
                      color={day.am === 'unavailable' ? 'error' : 'secondary'}
                      value={JSON.stringify({...day, am: 'unavailable'})}
                      onClick={handleClick}>
                      unavailable
                    </Button>
                  </ButtonGroup>
                </Item>
                <Item key={`${day.day}-pm`}>
                  <Typography sx={{m: 1}} variant="h6">
                    NIGHT
                  </Typography>
                  <ButtonGroup orientation="vertical">
                    <Button
                      variant={
                        day.pm === 'available' ? 'contained' : 'outlined'
                      }
                      color={day.pm === 'available' ? 'success' : 'secondary'}
                      value={JSON.stringify({...day, pm: 'available'})}
                      onClick={handleClick}>
                      available
                    </Button>
                    <Button
                      variant={day.pm === 'notice' ? 'contained' : 'outlined'}
                      color={day.pm === 'notice' ? 'warning' : 'secondary'}
                      value={JSON.stringify({...day, pm: 'notice'})}
                      onClick={handleClick}>
                      plan ahead
                    </Button>
                    <Button
                      variant={
                        day.pm === 'unavailable' ? 'contained' : 'outlined'
                      }
                      color={day.pm === 'unavailable' ? 'error' : 'secondary'}
                      value={JSON.stringify({...day, pm: 'unavailable'})}
                      onClick={handleClick}>
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

export default EditAvailabilityGrid
