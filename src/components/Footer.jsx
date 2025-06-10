import React from 'react'
import { Box, Container, Typography } from '@mui/material'

function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'grey.900', color: 'grey.100', py: 4, mt: 6 }}>
      <Container maxWidth="md">
        <Typography variant="body2" align="center" color="grey.400">
          © 2025 WeWantWaste. Professional waste management solutions.
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer
