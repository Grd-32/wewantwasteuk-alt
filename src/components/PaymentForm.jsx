import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { processPayment } from '../utils/payment';

const PaymentForm = ({ onPaymentSuccess, skipData, postcode }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');

  const handlePayment = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!cardNumber || !expiryDate || !cvv) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const paymentResult = await processPayment({ cardNumber, expiryDate, cvv, amount: skipData.price });
      if (paymentResult.success) {
        onPaymentSuccess();
      } else {
        setError(paymentResult.message || 'Payment failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred while processing the payment.');
    }
  };

  return (
    <Box component="form" onSubmit={handlePayment} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Payment Information
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="Card Number"
        variant="outlined"
        fullWidth
        margin="normal"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
      />
      <TextField
        label="Expiry Date (MM/YY)"
        variant="outlined"
        fullWidth
        margin="normal"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.target.value)}
      />
      <TextField
        label="CVV"
        variant="outlined"
        fullWidth
        margin="normal"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Pay £{skipData.price}
      </Button>
    </Box>
  );
};

export default PaymentForm;