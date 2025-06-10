import React from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Box, Button, Container } from '@mui/material'

function Header() {
  const location = useLocation()

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h5"
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
              fontWeight: 'bold',
              mr: 4,
            }}
          >
            WeWantWaste
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              component={RouterLink}
              to="/"
              color={location.pathname === '/' ? 'primary' : 'inherit'}
              sx={{
                fontWeight: 500,
                color: location.pathname === '/' ? 'primary.main' : 'text.secondary',
              }}
            >
              Home
            </Button>
            <Button
              component={RouterLink}
              to="/skip-types"
              color={location.pathname === '/skip-types' ? 'primary' : 'inherit'}
              sx={{
                fontWeight: 500,
                color: location.pathname === '/skip-types' ? 'primary.main' : 'text.secondary',
              }}
            >
              Skip Types
            </Button>
            <Button
              component={RouterLink}
              to="/tracking"
              color={location.pathname === '/tracking' ? 'primary' : 'inherit'}
              sx={{
                fontWeight: 500,
                color: location.pathname === '/tracking' ? 'primary.main' : 'text.secondary',
              }}
            >
              Track Order
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
