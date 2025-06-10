import React, { useState, useEffect } from 'react'
import { useSearchParams, Link as RouterLink } from 'react-router-dom'
import PostcodeForm from '../components/PostcodeForm'
import BookingModal from '../components/BookingModal'
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
  Stack
} from '@mui/material'

const SKIP_DATA = [
  {
    "id": 17933, "size": 4, "hire_period_days": 14, "price_before_vat": 278, "vat": 20, "allowed_on_road": true, "allows_heavy_waste": true
  },
  {
    "id": 17934, "size": 6, "hire_period_days": 14, "price_before_vat": 305, "vat": 20, "allowed_on_road": true, "allows_heavy_waste": true
  },
  {
    "id": 17935, "size": 8, "hire_period_days": 14, "price_before_vat": 375, "vat": 20, "allowed_on_road": true, "allows_heavy_waste": true
  },
  {
    "id": 17936, "size": 10, "hire_period_days": 14, "price_before_vat": 400, "vat": 20, "allowed_on_road": false, "allows_heavy_waste": false
  },
  {
    "id": 17937, "size": 12, "hire_period_days": 14, "price_before_vat": 439, "vat": 20, "allowed_on_road": false, "allows_heavy_waste": false
  },
  {
    "id": 17938, "size": 14, "hire_period_days": 14, "price_before_vat": 470, "vat": 20, "allowed_on_road": false, "allows_heavy_waste": false
  },
  {
    "id": 17939, "size": 16, "hire_period_days": 14, "price_before_vat": 496, "vat": 20, "allowed_on_road": false, "allows_heavy_waste": false
  },
  {
    "id": 15124, "size": 20, "hire_period_days": 14, "transport_cost": 248, "per_tonne_cost": 248, "price_before_vat": 992, "vat": 20, "allowed_on_road": false, "allows_heavy_waste": true
  },
  {
    "id": 15125, "size": 40, "hire_period_days": 14, "transport_cost": 248, "per_tonne_cost": 248, "price_before_vat": 992, "vat": 20, "allowed_on_road": false, "allows_heavy_waste": false
  }
];

function SkipTypes() {
  const [searchParams] = useSearchParams()
  const [selectedPostcode, setSelectedPostcode] = useState('')
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [selectedSkip, setSelectedSkip] = useState(null)
  const [skipTypes, setSkipTypes] = useState([])

  useEffect(() => {
    const postcode = searchParams.get('postcode')
    if (postcode) {
      setSelectedPostcode(postcode)
      setSkipTypes(SKIP_DATA)
    }
  }, [searchParams])

  const handleBookSkip = (skip) => {
    setSelectedSkip(skip)
    setIsBookingModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsBookingModalOpen(false)
    setSelectedSkip(null)
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header Section */}
      <Box sx={{
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        py: { xs: 8, md: 12 }
      }}>
        <Container maxWidth="lg">
          <Box maxWidth={800} mx="auto" textAlign="center">
            <Typography variant="h3" fontWeight="bold" mb={2}>
              Choose Your Skip Size
            </Typography>
            <Typography variant="h6" color="primary.light" mb={4}>
              Professional waste management solutions for any project size
            </Typography>

            {!selectedPostcode && (
              <Box maxWidth={400} mx="auto">
                <Paper elevation={6} sx={{ borderRadius: 3, bgcolor: 'background.paper', p: 3, backdropFilter: 'blur(4px)' }}>
                  <PostcodeForm setSelectedPostcode={setSelectedPostcode} />
                </Paper>
              </Box>
            )}

            {selectedPostcode && (
              <Paper elevation={0} sx={{ bgcolor: 'primary.dark', color: 'primary.contrastText', display: 'inline-block', px: 3, py: 1, borderRadius: 2, mt: 2 }}>
                <Typography>
                  Delivering to: <Box component="span" fontWeight="bold" color="#fff">{selectedPostcode}</Box>
                </Typography>
              </Paper>
            )}
          </Box>
        </Container>
      </Box>

      {/* Skip Types Grid */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            {skipTypes.map((skip) => {
              const priceWithVat = (skip.price_before_vat * 1.2).toFixed(2)
              return (
                <Grid item xs={12} sm={6} md={4} key={skip.id}>
                  <Paper
                    elevation={skip.size === 8 ? 8 : 3}
                    sx={{
                      borderRadius: 3,
                      p: 3,
                      position: 'relative',
                      border: skip.size === 8 ? '2px solid #2563eb' : '1px solid #e0e0e0',
                      boxShadow: skip.size === 8 ? 6 : 2,
                      minHeight: 340,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {skip.size === 8 && (
                      <Chip
                        label="Most Popular"
                        color="primary"
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 16,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          fontWeight: 600,
                          zIndex: 2
                        }}
                      />
                    )}
                    <Box textAlign="center" mb={2}>
                      <Typography variant="h2" fontSize="2.5rem" mb={1}>🗑️</Typography>
                      <Typography variant="h6" fontWeight="bold" mb={0.5}>{skip.size} Yard Skip</Typography>
                      <Typography color="primary.main" fontWeight={600}>{skip.hire_period_days} days hire</Typography>
                    </Box>
                    <Box mb={2}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>On Road:</strong> {skip.allowed_on_road ? 'Yes' : 'No'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Heavy Waste:</strong> {skip.allows_heavy_waste ? 'Yes' : 'No'}
                      </Typography>
                    </Box>
                    <Box mt="auto" borderTop="1px solid #e0e0e0" pt={2}>
                      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                        <Box>
                          <Typography variant="h5" fontWeight="bold" color="text.primary">
                            £{priceWithVat}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" ml={1}>
                            inc. VAT
                          </Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          All inclusive pricing
                        </Typography>
                      </Stack>
                      <Button
                        fullWidth
                        variant={skip.size === 8 ? "contained" : "outlined"}
                        color="primary"
                        size="large"
                        sx={{
                          fontWeight: 600,
                          py: 1.5,
                          borderRadius: 2,
                          background: skip.size === 8
                            ? 'linear-gradient(90deg, #2563eb, #1e40af)'
                            : undefined,
                          color: skip.size === 8 ? '#fff' : 'primary.main',
                          borderWidth: skip.size === 8 ? 0 : 2,
                          '&:hover': skip.size === 8
                            ? { background: 'linear-gradient(90deg, #1e40af, #2563eb)' }
                            : { background: 'grey.100' }
                        }}
                        onClick={() => handleBookSkip(skip)}
                      >
                        Book This Skip
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
              )
            })}
          </Grid>
        </Container>
      </Box>

      {/* Information Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Box maxWidth={900} mx="auto">
            <Typography variant="h4" fontWeight="bold" textAlign="center" mb={6} color="text.primary">
              What's Included in Our Pricing
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} md={4}>
                <Paper elevation={2} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      bgcolor: 'primary.light',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                      fontSize: 32
                    }}
                  >
                    🚚
                  </Box>
                  <Typography fontWeight="bold" mb={1}>Free Delivery</Typography>
                  <Typography color="text.secondary" fontSize={14}>
                    Same-day or next-day delivery to your location
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper elevation={2} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      bgcolor: 'primary.light',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                      fontSize: 32
                    }}
                  >
                    ♻️
                  </Box>
                  <Typography fontWeight="bold" mb={1}>Eco-Friendly Disposal</Typography>
                  <Typography color="text.secondary" fontSize={14}>
                    Responsible waste disposal and recycling
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper elevation={2} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      bgcolor: 'primary.light',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                      fontSize: 32
                    }}
                  >
                    📋
                  </Box>
                  <Typography fontWeight="bold" mb={1}>All Permits Included</Typography>
                  <Typography color="text.secondary" fontSize={14}>
                    No hidden fees for permits or licenses
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="md">
          <Box maxWidth={600} mx="auto" textAlign="center">
            <Typography variant="h4" fontWeight="bold" mb={2} color="text.primary">
              Still Not Sure Which Skip You Need?
            </Typography>
            <Typography variant="h6" color="text.secondary" mb={4}>
              Our expert team can help you choose the perfect skip size for your project
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
                component={RouterLink}
                to="/"
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
                Back to Home
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseModal}
        skipData={selectedSkip}
        postcode={selectedPostcode}
      />
    </Box>
  )
}

export default SkipTypes
