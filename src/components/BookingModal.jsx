import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  TextField,
  Stepper,
  Step,
  StepLabel,
  MenuItem,
  CircularProgress,
  Divider
} from '@mui/material'

const steps = ['Details', 'Payment', 'Confirm']

function BookingModal({ isOpen, onClose, skipData, postcode }) {
  const [selectedDate, setSelectedDate] = useState('')
  const [timeSlot, setTimeSlot] = useState('')
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState(1) // 1: Details, 2: Payment, 3: Confirmation

  if (!isOpen || !skipData) return null

  // Generate available dates (next 14 days, excluding Sundays)
  const getAvailableDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      if (date.getDay() !== 0) {
        dates.push({
          value: date.toISOString().split('T')[0],
          label: date.toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
          })
        })
      }
    }
    return dates
  }

  const timeSlots = [
    { value: '8-12', label: '8:00 AM - 12:00 PM' },
    { value: '12-16', label: '12:00 PM - 4:00 PM' },
    { value: '16-18', label: '4:00 PM - 6:00 PM' }
  ]

  const handleCustomerDetailsChange = (field, value) => {
    setCustomerDetails(prev => ({ ...prev, [field]: value }))
  }

  const handleCardDetailsChange = (field, value) => {
    let formattedValue = value
    if (field === 'number') {
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim()
    } else if (field === 'expiry') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d{2})/, '$1/$2')
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3)
    }
    setCardDetails(prev => ({ ...prev, [field]: formattedValue }))
  }

  const validateStep1 = () => {
    return selectedDate && timeSlot &&
           customerDetails.name && customerDetails.email &&
           customerDetails.phone && customerDetails.address
  }

  const validateStep2 = () => {
    if (paymentMethod === 'card') {
      return cardDetails.number.replace(/\s/g, '').length === 16 &&
             cardDetails.expiry.length === 5 &&
             cardDetails.cvv.length === 3 &&
             cardDetails.name.trim().length > 0
    }
    return true
  }

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2)
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3)
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleConfirmBooking = async () => {
    setIsProcessing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    const bookingData = {
      id: `BK-${Date.now()}`,
      skipType: skipData.name,
      price: skipData.price,
      deliveryDate: selectedDate,
      timeSlot,
      postcode,
      customerDetails,
      paymentMethod,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    }
    const existingBookings = JSON.parse(localStorage.getItem('skipBookings') || '[]')
    existingBookings.push(bookingData)
    localStorage.setItem('skipBookings', JSON.stringify(existingBookings))
    setIsProcessing(false)
    alert(`Booking confirmed! Your booking reference is ${bookingData.id}`)
    onClose()
    window.location.href = `/tracking?booking=${bookingData.id}`
  }

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Book Your {skipData.name || `${skipData.size} Yard Skip`}
      </DialogTitle>
      <DialogContent dividers>
        <Stepper activeStep={currentStep - 1} alternativeLabel sx={{ mb: 3 }}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {/* Step 1: Delivery Details */}
        {currentStep === 1 && (
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Delivery Details
            </Typography>
            <Box
              sx={{
                bgcolor: 'primary.50',
                borderRadius: 2,
                p: 2,
                mb: 3,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}
            >
              <Box>
                <Typography fontWeight="bold">{skipData.name || `${skipData.size} Yard Skip`}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {skipData.size} Yard Skip
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Delivering to: {postcode}
                </Typography>
              </Box>
              <Box textAlign="right">
                <Typography variant="h5" fontWeight="bold" color="text.primary">
                  £{skipData.price || (skipData.price_before_vat * 1.2).toFixed(2)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  inc. VAT
                </Typography>
              </Box>
            </Box>
            <Box display="flex" gap={2} mb={3}>
              <TextField
                select
                label="Delivery Date"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                fullWidth
                required
              >
                <MenuItem value="">Select a date</MenuItem>
                {getAvailableDates().map(date => (
                  <MenuItem key={date.value} value={date.value}>
                    {date.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Time Slot"
                value={timeSlot}
                onChange={e => setTimeSlot(e.target.value)}
                fullWidth
                required
              >
                <MenuItem value="">Select time</MenuItem>
                {timeSlots.map(slot => (
                  <MenuItem key={slot.value} value={slot.value}>
                    {slot.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Contact Information
            </Typography>
            <Box display="flex" gap={2} flexWrap="wrap">
              <TextField
                label="Full Name"
                value={customerDetails.name}
                onChange={e => handleCustomerDetailsChange('name', e.target.value)}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <TextField
                label="Email Address"
                value={customerDetails.email}
                onChange={e => handleCustomerDetailsChange('email', e.target.value)}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <TextField
                label="Phone Number"
                value={customerDetails.phone}
                onChange={e => handleCustomerDetailsChange('phone', e.target.value)}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <TextField
                label="Delivery Address"
                value={customerDetails.address}
                onChange={e => handleCustomerDetailsChange('address', e.target.value)}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
            </Box>
          </Box>
        )}

        {/* Step 2: Payment */}
        {currentStep === 2 && (
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Payment Information
            </Typography>
            <TextField
              select
              label="Payment Method"
              value={paymentMethod}
              onChange={e => setPaymentMethod(e.target.value)}
              fullWidth
              sx={{ mb: 3 }}
            >
              <MenuItem value="card">Credit/Debit Card</MenuItem>
              <MenuItem value="paypal">PayPal</MenuItem>
            </TextField>
            {paymentMethod === 'card' && (
              <Box>
                <TextField
                  label="Card Number"
                  value={cardDetails.number}
                  onChange={e => handleCardDetailsChange('number', e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                  inputProps={{ maxLength: 19 }}
                />
                <Box display="flex" gap={2} mb={2}>
                  <TextField
                    label="Cardholder Name"
                    value={cardDetails.name}
                    onChange={e => handleCardDetailsChange('name', e.target.value)}
                    fullWidth
                    required
                  />
                  <TextField
                    label="CVV"
                    value={cardDetails.cvv}
                    onChange={e => handleCardDetailsChange('cvv', e.target.value)}
                    placeholder="123"
                    required
                    inputProps={{ maxLength: 3 }}
                    sx={{ width: 120 }}
                  />
                  <TextField
                    label="Expiry Date"
                    value={cardDetails.expiry}
                    onChange={e => handleCardDetailsChange('expiry', e.target.value)}
                    placeholder="MM/YY"
                    required
                    inputProps={{ maxLength: 5 }}
                    sx={{ width: 120 }}
                  />
                </Box>
              </Box>
            )}
            {paymentMethod === 'paypal' && (
              <Box sx={{ bgcolor: 'warning.light', borderRadius: 2, p: 2, mt: 2 }}>
                <Typography variant="body2" color="warning.dark">
                  You will be redirected to PayPal to complete your payment securely.
                </Typography>
              </Box>
            )}
          </Box>
        )}

        {/* Step 3: Confirmation */}
        {currentStep === 3 && (
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Confirm Your Booking
            </Typography>
            <Box sx={{ bgcolor: 'grey.100', borderRadius: 2, p: 2, mb: 2 }}>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Skip Type:</Typography>
                <Typography fontWeight="bold">{skipData.name || `${skipData.size} Yard Skip`}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Delivery Date:</Typography>
                <Typography fontWeight="bold">
                  {getAvailableDates().find(d => d.value === selectedDate)?.label}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Time Slot:</Typography>
                <Typography fontWeight="bold">
                  {timeSlots.find(t => t.value === timeSlot)?.label}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Delivery Address:</Typography>
                <Typography fontWeight="bold">{customerDetails.address}, {postcode}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Contact:</Typography>
                <Typography fontWeight="bold">{customerDetails.name}</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h6" fontWeight="bold">Total:</Typography>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  £{skipData.price || (skipData.price_before_vat * 1.2).toFixed(2)}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ bgcolor: 'primary.50', borderRadius: 2, p: 2 }}>
              <Typography variant="body2" color="primary.dark">
                By confirming this booking, you agree to our terms and conditions.
                You will receive a confirmation email with your booking details.
              </Typography>
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={currentStep === 1 ? onClose : handlePreviousStep}
          color={currentStep === 1 ? "secondary" : "primary"}
        >
          {currentStep === 1 ? 'Cancel' : 'Previous'}
        </Button>
        {currentStep < 3 && (
          <Button
            onClick={handleNextStep}
            variant="contained"
            color="primary"
            disabled={currentStep === 1 ? !validateStep1() : !validateStep2()}
          >
            Next
          </Button>
        )}
        {currentStep === 3 && (
          <Button
            onClick={handleConfirmBooking}
            variant="contained"
            color="success"
            disabled={isProcessing}
            startIcon={isProcessing && <CircularProgress size={18} color="inherit" />}
          >
            {isProcessing ? 'Processing...' : 'Confirm Booking'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default BookingModal
