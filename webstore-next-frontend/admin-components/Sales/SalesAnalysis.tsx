import { Box, Stack } from '@mui/material'
import React from 'react'
import Revenue from './Revenue/Revenue'
import SaleInfoCards from './SaleInfoSection/SaleInfoCards'
import WebsiteVisitors from './WebsiteVisitors/WebsiteVisitors'

export default function SalesAnalysis() {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" }, gap: 2, width:"100%" }}>
      <Box sx={{ gridColumn: "span 2" }}> 
        <SaleInfoCards />
      </Box>
      <Box sx={{ gridColumn: { xs: "span 2", md: "span 1"}}}> 
        <Revenue />
      </Box>
      <Box> 
        <WebsiteVisitors />
      </Box>
    </Box>
  )
}
