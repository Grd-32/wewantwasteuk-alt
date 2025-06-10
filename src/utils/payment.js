import axios from 'axios';

const PAYMENT_API_URL = 'https://your-payment-gateway.com/api/payments'; // Replace with your actual payment gateway URL

export const processPayment = async (paymentData) => {
  try {
    const response = await axios.post(PAYMENT_API_URL, paymentData);
    return response.data;
  } catch (error) {
    console.error('Payment processing error:', error);
    throw new Error('Payment processing failed. Please try again.');
  }
};

export const validatePaymentData = (data) => {
  const { cardNumber, expiryDate, cvv } = data;
  const errors = {};

  if (!cardNumber || cardNumber.length !== 16) {
    errors.cardNumber = 'Card number must be 16 digits.';
  }
  if (!expiryDate) {
    errors.expiryDate = 'Expiry date is required.';
  }
  if (!cvv || cvv.length !== 3) {
    errors.cvv = 'CVV must be 3 digits.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};