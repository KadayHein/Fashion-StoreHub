import AuthContainer from '@/client-components-fashion/auth-secure/AuthContainer'
import { Box } from '@mui/material'
import React from 'react'

export default function page() {
  return (
    <Box className="flex items-center justify-center min-h-screen bg-gray-300">
      <AuthContainer />
    </Box>
  )
}
