import React from 'react'
import {Grid, Box, Card} from '@mui/material'
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
  color: theme.palette.text.secondary,
}))

const AvailabilityGrid = (props) => {
  const {availability} = props
  return (
    <div className="availability-grid">
      <Grid
        container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'space-evenly',
        }}>
        {availability &&
          availability.map((day) => {
            return (
              <Item
                key={day.day}
                sx={{
                  p: 0.25,
                  ml: 0.125,
                  mr: 0.125,
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                {day.day[0].toUpperCase() + day.day[1].toLowerCase()}
                <div>
                  <WbSunny fontSize="small" />
                  {day.am === 'available' ? (
                    <Check color="success" fontSize="small" />
                  ) : day.am === 'notice' ? (
                    <Event color="warning" fontSize="small" />
                  ) : (
                    <NotInterested color="error" fontSize="small" />
                  )}
                </div>
                <div>
                  <NightsStay fontSize="small" />
                  {day.pm === 'available' ? (
                    <Check color="success" fontSize="small" />
                  ) : day.pm === 'notice' ? (
                    <Event color="warning" fontSize="small" />
                  ) : (
                    <NotInterested color="error" fontSize="small" />
                  )}
                </div>
              </Item>
            )
          })}
      </Grid>
    </div>
  )
}

export default AvailabilityGrid
