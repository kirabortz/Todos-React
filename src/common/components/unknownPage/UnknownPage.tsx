import React from 'react'
import { Box, Button, Container, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import { useNavigate } from 'react-router-dom'

export const UnknownPage = () => {
  const navigate = useNavigate()
  const backHomeHandler = () => {
    navigate('/')
  }
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h6">The page you’re looking for doesn’t exist.</Typography>
            <Button variant="contained" onClick={backHomeHandler}>
              Back Home
            </Button>
          </Grid>
          <Grid xs={6}>
            <img
              style={{ borderRadius: '15px' }}
              src="https://ic.pics.livejournal.com/ixteac7/47942135/175013/175013_600.jpg"
              alt=""
              width={500}
              height={250}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
