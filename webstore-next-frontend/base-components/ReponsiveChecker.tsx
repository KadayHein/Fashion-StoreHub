import React from 'react';
import { Box } from '@mui/material';

const breakpoints = [
  { label: "Extra Small Screen", show: { xs: 'block', sm: 'none', md: 'none', lg: 'none', xl: 'none' } },
  { label: "Small Screen", show: { xs: 'none', sm: 'block', md: 'none', lg: 'none', xl: 'none' } },
  { label: "Medium Screen", show: { xs: 'none', sm: 'none', md: 'block', lg: 'none', xl: 'none' } },
  { label: "Large Screen", show: { xs: 'none', sm: 'none', md: 'none', lg: 'block', xl: 'none' } },
  { label: "Extra Large Screen", show: { xs: 'none', sm: 'none', md: 'none', lg: 'none', xl: 'block' } },
];

export default function ResponsiveChecker() {
  return (
    <>
      {breakpoints.map((bp, index) => (
        <Box key={index} display={bp.show}>
          {bp.label}
        </Box>
      ))}
    </>
  );
}