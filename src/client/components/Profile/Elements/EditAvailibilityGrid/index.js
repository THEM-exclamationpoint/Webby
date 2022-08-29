import React, {useState} from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  ButtonGroup,
  Card,
  FormControl,
  Box,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import NightsStayIcon from '@mui/icons-material/NightsStay'
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

const daysOTW = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

// export const newAvailability = () => {
//   return daysOTW.map((day, idx) => {
//     return {
//       id: idx,
//       day,
//       am: 'unavailable',
//       pm: 'unavailable',
//     }
//   })
// }

const AvailabilityGrid = (props) => {
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
        m: 1,
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
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${day.day}-content`}
              id={`${day.day}-header`}
              sx={{
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'space-between',
              }}>
              <Box
                sx={{
                  width: '60%',
                  display: 'flex',
                  alignContent: 'center',
                }}>
                <h3> {day.day} </h3>
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
                    m: 1,
                    p: 1,
                  },
                }}>
                <Card>
                  <WbSunnyIcon
                    color={
                      day.am === 'available'
                        ? 'success'
                        : day.am === 'notice'
                        ? 'warning'
                        : 'error'
                    }
                  />
                </Card>
                <Card>
                  <NightsStayIcon
                    color={
                      day.pm === 'available'
                        ? 'success'
                        : day.pm === 'notice'
                        ? 'warning'
                        : 'error'
                    }
                  />
                </Card>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  '& > *': {
                    m: 1,
                    p: 1,
                  },
                }}>
                <Item key={`${day.day}-am`}>
                  <h3>DAY</h3>
                  <ButtonGroup orientation="vertical">
                    <Button
                      color={day.am === 'available' ? 'success' : 'secondary'}
                      value={JSON.stringify({...day, am: 'available'})}
                      onClick={handleClick}>
                      available
                    </Button>
                    <Button
                      color={day.am === 'notice' ? 'warning' : 'secondary'}
                      value={JSON.stringify({...day, am: 'notice'})}
                      onClick={handleClick}>
                      plan ahead
                    </Button>
                    <Button
                      color={day.am === 'unavailable' ? 'error' : 'secondary'}
                      value={JSON.stringify({...day, am: 'unavailable'})}
                      onClick={handleClick}>
                      unavailable
                    </Button>
                  </ButtonGroup>
                </Item>
                <Item key={`${day.day}-pm`}>
                  <h3>NIGHT</h3>
                  <ButtonGroup orientation="vertical">
                    <Button
                      color={day.pm === 'available' ? 'success' : 'secondary'}
                      value={JSON.stringify({...day, pm: 'available'})}
                      onClick={handleClick}>
                      available
                    </Button>
                    <Button
                      color={day.pm === 'notice' ? 'warning' : 'secondary'}
                      value={JSON.stringify({...day, pm: 'notice'})}
                      onClick={handleClick}>
                      plan ahead
                    </Button>
                    <Button
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

export default AvailabilityGrid
