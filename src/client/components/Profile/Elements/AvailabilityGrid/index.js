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
          alignItems: 'center',
        }}>
        {availability &&
          availability.map((day) => {
            return (
              <Item
                key={day.day}
                sx={{
                  p: 0.5,
                  m: 0.5,
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                {day.day[0].toUpperCase()}
                <div style={{p: 1}}>
                  <WbSunny fontSize="24px" />
                  {day.am === 'available' ? (
                    <Check color="success" fontSize="24px" />
                  ) : day.am === 'notice' ? (
                    <Event color="warning" fontSize="24px" />
                  ) : (
                    <NotInterested color="error" fontSize="24px" />
                  )}
                </div>
                <div>
                  <NightsStay fontSize="24px" />
                  {day.pm === 'available' ? (
                    <Check color="success" fontSize="24px" />
                  ) : day.pm === 'notice' ? (
                    <Event color="warning" fontSize="24px" />
                  ) : (
                    <NotInterested color="error" fontSize="24px" />
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
