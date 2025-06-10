import React from 'react';
import { Link } from 'react-router-dom';
import PostcodeForm from '../components/PostcodeForm.jsx';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
  Stack
} from '@mui/material'

function Home() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ maxWidth: 900, mx: 'auto', textAlign: 'center' }}>
            <Typography
              variant="h2"
              fontWeight="bold"
              sx={{
                mb: 3,
                lineHeight: 1.1,
                fontSize: { xs: '2.2rem', md: '3.5rem', lg: '4rem' },
              }}
            >
              Skip Hire Made{' '}
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(90deg, #facc15, #fb923c)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Simple
              </Box>
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 5,
                color: 'primary.light',
                maxWidth: 600,
                mx: 'auto',
                fontWeight: 400,
              }}
            >
              Professional waste management solutions for your home, business, or construction project. Get instant quotes and same-day delivery.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" mb={4}>
              <Button
                component={Link}
                to="/skip-types"
                variant="outlined"
                color="inherit"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.08)',
                  borderColor: 'rgba(255,255,255,0.3)',
                  color: '#fff',
                  fontWeight: 500,
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.18)',
                    borderColor: 'rgba(255,255,255,0.5)',
                  },
                  backdropFilter: 'blur(4px)',
                }}
                startIcon={
                  <img
                    src="https://ext.same-assets.com/2226811400/1387812303.svg"
                    alt=""
                    width="18"
                    height="18"
                    style={{ filter: 'invert(1)' }}
                  />
                }
              >
                View Skip Types
              </Button>
            </Stack>
            {/* Postcode Form */}
            <Box sx={{ maxWidth: 420, mx: 'auto' }}>
              <Paper elevation={6} sx={{ borderRadius: 3, bgcolor: 'background.paper', p: 3, backdropFilter: 'blur(4px)' }}>
                <PostcodeForm />
              </Paper>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography variant="h4" fontWeight="bold" mb={2} color="text.primary">
              Why Choose WeWantWaste?
            </Typography>
            <Typography variant="h6" color="text.secondary" maxWidth={600} mx="auto">
              Professional, reliable, and environmentally responsible waste management
            </Typography>
          </Box>
          <Grid container spacing={4} maxWidth="md" mx="auto" justifyContent="center">
            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                <Typography variant="h6" fontWeight="bold" mb={1} color="text.primary">
                  Same Day Delivery
                </Typography>
                <Typography color="text.secondary">
                  Fast, reliable delivery when you need it most
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                <Typography variant="h6" fontWeight="bold" mb={1} color="text.primary">
                  All Inclusive Pricing
                </Typography>
                <Typography color="text.secondary">
                  No hidden fees - delivery, collection & disposal included
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                <Typography variant="h6" fontWeight="bold" mb={1} color="text.primary">
                  Professional Service
                </Typography>
                <Typography color="text.secondary">
                  Experienced team with full waste carrier licenses
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="md">
          <Box maxWidth={600} mx="auto" textAlign="center">
            <Typography variant="h4" fontWeight="bold" mb={2} color="text.primary">
              Need Help Choosing?
            </Typography>
            <Typography variant="h6" color="text.secondary" mb={4}>
              Our expert team is here to help you find the perfect skip for your project
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  fontWeight: 600,
                  px: 5,
                  py: 1.5,
                  background: 'linear-gradient(90deg, #2563eb, #1e40af)',
                  boxShadow: 2,
                  '&:hover': {
                    background: 'linear-gradient(90deg, #1e40af, #2563eb)',
                  },
                }}
              >
                Call Us Now
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                sx={{
                  fontWeight: 600,
                  px: 5,
                  py: 1.5,
                  borderWidth: 2,
                  color: 'primary.main',
                  backgroundColor: 'background.paper',
                  '&:hover': {
                    backgroundColor: 'primary.50',
                  },
                }}
              >
                Email Quote
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default Home
