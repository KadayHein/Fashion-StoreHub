import { CloseRounded } from '@mui/icons-material'
import { Button, Stack, Typography } from '@mui/material'
import React from 'react'

interface FilterDetails {
  filterList: Filter[];
  setFilterList: React.Dispatch<React.SetStateAction<Filter[]>>;
  Filter4Products(filters: Filter[]): Promise<void>
}

export default function FilterOptionDetailsList({ filterList, setFilterList, Filter4Products }: FilterDetails) {

  const removeFilter = (id: number) => {
    let remainingList = filterList.filter(filter => filter.itemid !== id)
    setFilterList(remainingList)
    Filter4Products(remainingList)
  }

  return (
    <Stack direction="row" spacing={2} mx={2}
      sx={{
        flex: '1 1 100%',
        display: "flex", justifyContent: "end",
      }}>
      {
        filterList?.map(filter => (
          <Button key={filter.itemid} variant="outlined" 
            sx={{ borderRadius: "9999px", textTransform: "none", display: "flex", minWidth: "auto" }}
            endIcon={<CloseRounded onClick={() => removeFilter(filter.itemid)}/>}>
            <Typography noWrap>{filter.caption}</Typography>
          </Button>
        ))
      }
    </Stack>
  )
}
