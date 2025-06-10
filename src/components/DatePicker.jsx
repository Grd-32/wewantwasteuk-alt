import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Box, Typography } from '@mui/material';

const CustomDatePicker = ({ selectedDate, onDateChange }) => {
  const [startDate, setStartDate] = useState(selectedDate || new Date());

  const handleChange = (date) => {
    setStartDate(date);
    onDateChange(date);
  };

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        Select Booking Date
      </Typography>
      <DatePicker
        selected={startDate}
        onChange={handleChange}
        minDate={new Date()}
        dateFormat="MMMM d, yyyy"
        placeholderText="Select a date"
        className="date-picker"
        popperPlacement="bottom"
      />
    </Box>
  );
};

export default CustomDatePicker;