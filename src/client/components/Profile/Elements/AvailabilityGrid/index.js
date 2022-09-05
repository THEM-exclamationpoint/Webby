import React from 'react'
import {Grid, Box, Card, Typography} from '@mui/material'
import {
  Event,
  NotInterested,
  Check,
  WbSunny,
  NightsStay,
} from '@mui/icons-material'
import {styled} from '@mui/material/styles'

const Item = styled(Card)(({theme}) => ({
  ...theme.typography.body2,
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  color: theme.palette.text.primary,
}))

const AvailabilityGrid = (props) => {
  const {availability} = props
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'space-evenly',
        m: 0,
      }}>
      {availability &&
        availability.map((day) => {
          return (
            <Item
              elevation={3}
              key={day.day}
              sx={{
                p: 0.22,
                ml: 0.22,
                mr: 0.22,
              }}>
              <Typography variant="caption">
                {day.day[0].toUpperCase() + day.day[1].toLowerCase()}
              </Typography>
              <Box>
                <WbSunny fontSize="small" color="primary" />
                {day.am === 'available' ? (
                  <Check color="success" fontSize="small" />
                ) : day.am === 'notice' ? (
                  <Event color="warning" fontSize="small" />
                ) : (
                  <NotInterested color="error" fontSize="small" />
                )}
              </Box>
              <Box>
                <NightsStay fontSize="small" color="primary" />
                {day.pm === 'available' ? (
                  <Check color="success" fontSize="small" />
                ) : day.pm === 'notice' ? (
                  <Event color="warning" fontSize="small" />
                ) : (
                  <NotInterested color="error" fontSize="small" />
                )}
              </Box>
            </Item>
          )
        })}
    </Box>
  )
}

export default AvailabilityGrid
