import React, { useState, useEffect } from 'react'
import { useSearchParams, Link as RouterLink } from 'react-router-dom'
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  TextField,
  Grid,
  Stack,
  LinearProgress,
  Avatar,
  Alert
} from '@mui/material'

function Tracking() {
  const [searchParams] = useSearchParams()
  const [bookingId, setBookingId] = useState('')
  const [booking, setBooking] = useState(null)
  const [error, setError] = useState('')
  const [trackingData, setTrackingData] = useState(null)

  useEffect(() => {
    const urlBookingId = searchParams.get('booking')
    if (urlBookingId) {
      setBookingId(urlBookingId)
      searchBooking(urlBookingId)
    }
  }, [searchParams])

  const searchBooking = (id) => {
    const bookings = JSON.parse(localStorage.getItem('skipBookings') || '[]')
    const foundBooking = bookings.find(b => b.id === id)

    if (foundBooking) {
      setBooking(foundBooking)
      setError('')
      generateTrackingData(foundBooking)
    } else {
      setError('Booking not found. Please check your booking reference.')
      setBooking(null)
      setTrackingData(null)
    }
  }

  const generateTrackingData = (bookingData) => {
    const deliveryDate = new Date(bookingData.deliveryDate)
    const today = new Date()
    const daysDiff = Math.ceil((deliveryDate - today) / (1000 * 60 * 60 * 24))

    const stages = [
      {
        id: 1,
        title: 'Booking Confirmed',
        description: 'Your skip hire booking has been confirmed and payment processed',
        completed: true,
        timestamp: bookingData.createdAt,
        icon: '✅'
      },
      {
        id: 2,
        title: 'Order Processing',
        description: 'We are preparing your skip for delivery',
        completed: daysDiff <= 2,
        timestamp: daysDiff <= 2 ? new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() : null,
        icon: '📋'
      },
      {
        id: 3,
        title: 'Out for Delivery',
        description: 'Your skip is on the way to your location',
        completed: daysDiff <= 0,
        timestamp: daysDiff <= 0 ? new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString() : null,
        icon: '🚚'
      },
      {
        id: 4,
        title: 'Delivered',
        description: 'Skip has been delivered to your specified location',
        completed: daysDiff < 0,
        timestamp: daysDiff < 0 ? deliveryDate.toISOString() : null,
        icon: '📍'
      },
      {
        id: 5,
        title: 'Collection Scheduled',
        description: 'Collection will be arranged when you contact us',
        completed: false,
        timestamp: null,
        icon: '🔄'
      }
    ]

    let estimatedDelivery = 'Unknown'
    if (daysDiff > 0) {
      estimatedDelivery = deliveryDate.toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      })
    } else if (daysDiff === 0) {
      estimatedDelivery = 'Today'
    } else {
      estimatedDelivery = 'Delivered'
    }

    const drivers = [
      { name: 'James Wilson', phone: '07700 900123', vehicle: 'Skip Truck SH-42' },
      { name: 'Sarah Thompson', phone: '07700 900124', vehicle: 'Skip Truck SH-18' },
      { name: 'Mike Johnson', phone: '07700 900125', vehicle: 'Skip Truck SH-35' }
    ]

    const driver = daysDiff <= 0 ? drivers[Math.floor(Math.random() * drivers.length)] : null

    setTrackingData({
      stages,
      estimatedDelivery,
      driver,
      currentStage: stages.findIndex(stage => !stage.completed) || stages.length - 1
    })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (bookingId.trim()) {
      searchBooking(bookingId.trim().toUpperCase())
    }
  }

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return ''
    return new Date(timestamp).toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = () => {
    if (!trackingData) return 'text.secondary'
    const { currentStage } = trackingData
    if (currentStage >= 4) return 'success.main'
    if (currentStage >= 2) return 'primary.main'
    return 'warning.main'
  }

  const getStatusText = () => {
    if (!trackingData) return 'Unknown'
    const { currentStage, stages } = trackingData
    if (currentStage >= stages.length) return 'Complete'
    return stages[currentStage]?.title || 'Processing'
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header Section */}
      <Box sx={{
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        py: { xs: 8, md: 10 }
      }}>
        <Container maxWidth="md">
          <Box textAlign="center">
            <Typography variant="h3" fontWeight="bold" mb={2}>
              Track Your Skip Delivery
            </Typography>
            <Typography variant="h6" color="primary.light" mb={4}>
              Enter your booking reference to see real-time delivery updates
            </Typography>
            <Box maxWidth={500} mx="auto">
              <form onSubmit={handleSearch}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    value={bookingId}
                    onChange={e => setBookingId(e.target.value.toUpperCase())}
                    placeholder="Enter booking reference (e.g., BK-1234567890)"
                    variant="outlined"
                    size="large"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="warning"
                    size="large"
                    sx={{ fontWeight: 600, px: 4 }}
                  >
                    Track
                  </Button>
                </Stack>
              </form>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Content Section */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          {error && (
            <Box maxWidth={600} mx="auto" mb={4}>
              <Alert severity="error">
                {error}
                <Typography variant="body2" color="error" mt={1}>
                  Make sure you entered the correct booking reference. It should look like "BK-1234567890".
                </Typography>
              </Alert>
            </Box>
          )}

          {booking && trackingData && (
            <Box maxWidth="md" mx="auto">
              {/* Booking Summary */}
              <Paper elevation={4} sx={{ borderRadius: 3, mb: 4, overflow: 'hidden' }}>
                <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', p: 3 }}>
                  <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item xs={12} md={8}>
                      <Typography variant="h6" fontWeight="bold" mb={1}>
                        Booking {booking.id}
                      </Typography>
                      <Typography variant="body2" color="primary.light">
                        {booking.skipType} • Delivering to {booking.postcode}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={4} textAlign={{ xs: 'left', md: 'right' }}>
                      <Typography variant="subtitle1" fontWeight="bold" color={getStatusColor()}>
                        Status: {getStatusText()}
                      </Typography>
                      <Typography variant="body2" color="primary.light">
                        Estimated delivery: {trackingData.estimatedDelivery}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Box sx={{ p: 3 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography fontWeight="bold" mb={1}>Delivery Details</Typography>
                      <Typography variant="body2">
                        <strong>Date:</strong> {new Date(booking.deliveryDate).toLocaleDateString('en-GB', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long'
                        })}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Time:</strong> {
                          booking.timeSlot === '8-12' ? '8:00 AM - 12:00 PM' :
                          booking.timeSlot === '12-16' ? '12:00 PM - 4:00 PM' :
                          '4:00 PM - 6:00 PM'
                        }
                      </Typography>
                      <Typography variant="body2">
                        <strong>Address:</strong> {booking.customerDetails.address}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography fontWeight="bold" mb={1}>Contact Information</Typography>
                      <Typography variant="body2">
                        <strong>Customer:</strong> {booking.customerDetails.name}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Phone:</strong> {booking.customerDetails.phone}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Email:</strong> {booking.customerDetails.email}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>

              {/* Driver Information */}
              {trackingData.driver && (
                <Paper elevation={2} sx={{ borderRadius: 3, mb: 4, p: 3 }}>
                  <Stack direction="row" alignItems="center" spacing={3}>
                    <Avatar sx={{ bgcolor: 'primary.light', width: 56, height: 56, fontSize: 32 }}>👤</Avatar>
                    <Box flex={1}>
                      <Typography fontWeight="bold">{trackingData.driver.name}</Typography>
                      <Typography variant="body2" color="text.secondary">{trackingData.driver.vehicle}</Typography>
                    </Box>
                    <Button
                      variant="contained"
                      color="primary"
                      href={`tel:${trackingData.driver.phone}`}
                      startIcon={<span role="img" aria-label="phone">📞</span>}
                    >
                      Call Driver
                    </Button>
                  </Stack>
                </Paper>
              )}

              {/* Tracking Timeline */}
              <Paper elevation={2} sx={{ borderRadius: 3, p: 3 }}>
                <Typography variant="h6" fontWeight="bold" mb={3}>Delivery Progress</Typography>
                <Stack spacing={3}>
                  {trackingData.stages.map((stage, index) => (
                    <Stack direction="row" spacing={2} alignItems="flex-start" key={stage.id}>
                      <Avatar
                        sx={{
                          bgcolor: stage.completed
                            ? 'success.light'
                            : index === trackingData.currentStage
                            ? 'primary.light'
                            : 'grey.200',
                          color: stage.completed
                            ? 'success.main'
                            : index === trackingData.currentStage
                            ? 'primary.main'
                            : 'grey.500',
                          width: 48,
                          height: 48,
                          fontSize: 28
                        }}
                      >
                        {stage.icon}
                      </Avatar>
                      <Box flex={1}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography fontWeight={stage.completed ? 'bold' : 500} color={stage.completed ? 'success.main' : 'text.primary'}>
                            {stage.title}
                          </Typography>
                          {stage.timestamp && (
                            <Typography variant="caption" color="text.secondary">
                              {formatTimestamp(stage.timestamp)}
                            </Typography>
                          )}
                        </Stack>
                        <Typography variant="body2" color="text.secondary" mt={0.5}>
                          {stage.description}
                        </Typography>
                      </Box>
                      {stage.completed && (
                        <Typography color="success.main" fontWeight="bold" fontSize={20}>✓</Typography>
                      )}
                    </Stack>
                  ))}
                </Stack>
                {/* Progress Bar */}
                <Box mt={4}>
                  <Stack direction="row" justifyContent="space-between" mb={1}>
                    <Typography variant="body2" color="text.secondary">Progress</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {Math.round((trackingData.currentStage / (trackingData.stages.length - 1)) * 100)}%
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={(trackingData.currentStage / (trackingData.stages.length - 1)) * 100}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      background: 'linear-gradient(90deg, #2563eb, #1e40af)'
                    }}
                  />
                </Box>
              </Paper>

              {/* Action Buttons */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" mt={4}>
                <Button
                  component={RouterLink}
                  to="/skip-types"
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Book Another Skip
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                >
                  Contact Support
                </Button>
              </Stack>
            </Box>
          )}

          {!booking && !error && bookingId && (
            <Box maxWidth={500} mx="auto" textAlign="center">
              <Paper elevation={2} sx={{ borderRadius: 3, p: 6 }}>
                <Avatar sx={{ bgcolor: 'grey.100', width: 64, height: 64, mx: 'auto', mb: 2, fontSize: 32 }}>🔍</Avatar>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Searching for your booking...
                </Typography>
                <Typography color="text.secondary">
                  Please wait while we locate your booking information.
                </Typography>
              </Paper>
            </Box>
          )}

          {!booking && !bookingId && (
            <Box maxWidth={500} mx="auto" textAlign="center">
              <Paper elevation={2} sx={{ borderRadius: 3, p: 6 }}>
                <Avatar sx={{ bgcolor: 'blue.100', width: 64, height: 64, mx: 'auto', mb: 2, fontSize: 32 }}>📦</Avatar>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Track Your Skip Delivery
                </Typography>
                <Typography color="text.secondary" mb={4}>
                  Enter your booking reference above to see real-time updates on your skip delivery.
                </Typography>
                <Button
                  component={RouterLink}
                  to="/skip-types"
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Book a Skip
                </Button>
              </Paper>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  )
}

export default Tracking
