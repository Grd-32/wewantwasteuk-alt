import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  CircularProgress,
  Typography,
  Alert
} from '@mui/material'
// import LocationOnIcon from '@mui/icons-material/LocationOn'
// import LocationOnIcon from '@mui/icons-material/LocationOn'
// import SearchIcon from '@mui/icons-material/Search'

function PostcodeForm({ showLabel = true, className = "" }) {
  const [postcode, setPostcode] = useState('')
  const [error, setError] = useState('')
  const [isValidating, setIsValidating] = useState(false)
  const navigate = useNavigate()

  // UK postcode validation regex
  const postcodeRegex = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?\s?[0-9][A-Z]{2}$/i

  const validatePostcode = (value) => {
    const cleanPostcode = value.replace(/\s/g, '').toUpperCase()
    return postcodeRegex.test(cleanPostcode)
  }

  const formatPostcode = (value) => {
    let cleaned = value.replace(/\s/g, '').toUpperCase()
    if (cleaned.length > 3) {
      cleaned = cleaned.slice(0, -3) + ' ' + cleaned.slice(-3)
    }
    return cleaned
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!postcode.trim()) {
      setError('Please enter a postcode')
      return
    }
    if (!validatePostcode(postcode)) {
      setError('Please enter a valid UK postcode')
      return
    }
    setIsValidating(true)
    setError('')
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      navigate(`/skip-types?postcode=${encodeURIComponent(postcode)}`)
    } catch (err) {
      setError('Unable to verify postcode. Please try again.')
    } finally {
      setIsValidating(false)
    }
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setPostcode(formatPostcode(value))
    if (error) setError('')
  }

  return (
    <Box component="form" onSubmit={handleSubmit} className={className} sx={{ width: '100%', maxWidth: 400, mx: 'auto' }}>
      {showLabel && (
        <Typography variant="subtitle1" fontWeight={500} mb={1}>
          Enter Your Postcode
        </Typography>
      )}
      <TextField
        id="postcode"
        placeholder="e.g. NR32 1AB"
        value={postcode}
        onChange={handleInputChange}
        maxLength={8}
        disabled={isValidating}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {/* <LocationOnIcon color="primary" /> */}
            </InputAdornment>
          ),
        }}
        error={!!error}
        helperText={error}
        sx={{ mb: 2 }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        disabled={isValidating || !postcode.trim()}
        startIcon={
          isValidating ? <CircularProgress size={20} 
          color="inherit" /> : null}
        sx={{ fontWeight: 600, fontSize: '1.1rem', py: 1.5 }}
      >
        {isValidating ? 'Checking...' : 'Find Available Skips'}
      </Button>
    </Box>
  )
}

export default PostcodeForm
