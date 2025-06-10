import React from 'react'
import { Box, Paper, Typography, Button, Chip } from '@mui/material'

const SkipCard = ({ skip, onBook }) => {
  return (
    <Paper
      elevation={skip.popular ? 8 : 3}
      sx={{
        borderRadius: 3,
        p: 3,
        position: 'relative',
        border: skip.popular ? '2px solid #2563eb' : '1px solid #e0e0e0',
        boxShadow: skip.popular ? 6 : 2,
        minHeight: 420,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {skip.popular && (
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
        <Typography variant="h2" fontSize="2.5rem" mb={1}>{skip.image}</Typography>
        <Typography variant="h6" fontWeight="bold" mb={0.5}>{skip.name}</Typography>
        <Typography color="primary.main" fontWeight={600}>{skip.size}</Typography>
      </Box>
      <Box mb={2}>
        <Typography variant="body2" color="text.secondary">
          <strong>Dimensions:</strong> {skip.dimensions}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Capacity:</strong> {skip.capacity}
        </Typography>
      </Box>
      <Box mt="auto" borderTop="1px solid #e0e0e0" pt={2}>
        <Typography variant="h5" fontWeight="bold" color="text.primary">
          £{skip.price}
        </Typography>
        <Button
          fullWidth
          variant={skip.popular ? "contained" : "outlined"}
          color="primary"
          size="large"
          sx={{
            fontWeight: 600,
            py: 1.5,
            borderRadius: 2,
            background: skip.popular
              ? 'linear-gradient(90deg, #2563eb, #1e40af)'
              : undefined,
            color: skip.popular ? '#fff' : 'primary.main',
            borderWidth: skip.popular ? 0 : 2,
            '&:hover': skip.popular
              ? { background: 'linear-gradient(90deg, #1e40af, #2563eb)' }
              : { background: 'grey.100' }
          }}
          onClick={() => onBook(skip)}
        >
          Book This Skip
        </Button>
      </Box>
    </Paper>
  )
}

export default SkipCard