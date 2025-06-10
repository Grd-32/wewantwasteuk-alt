import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function BookingSuccess() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 8 }}>
      <Container maxWidth="sm">
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
          Booking Successful!
        </Typography>
        <Typography variant="body1" textAlign="center" mb={2}>
          Thank you for your booking. Your skip has been successfully reserved.
        </Typography>
        <Typography variant="body2" textAlign="center" mb={4}>
          You will receive a confirmation email shortly with the booking details.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBackToHome}
          fullWidth
        >
          Back to Home
        </Button>
      </Container>
    </Box>
  );
}

export default BookingSuccess;