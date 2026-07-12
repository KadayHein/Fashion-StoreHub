import { CloseRounded } from '@mui/icons-material'
import { Button, Stack, Typography } from '@mui/material'
import React from 'react'

interface FilterDetails {
  filterList : Filter[]; 
}

export default function FilterOptionDetailsList({filterList} : FilterDetails) {
  return (
    <Stack direction="row" spacing={2} mx={2} 
        sx={{ flex: '1 1 100%' ,
            display: "flex", justifyContent:"end",
        }}>
        {
            filterList?.map(filter => (
            <Button key={filter.itemid} variant="outlined" 
                sx={{borderRadius:"9999px", textTransform: "none", display:"flex", minWidth:"auto"}}
                endIcon={<CloseRounded/>}>
                <Typography noWrap>{filter.caption}</Typography>
            </Button>
            ))
        }
    </Stack>
  )
}
