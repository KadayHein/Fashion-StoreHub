"use client"
import { CONDITIONAL_TYPE } from '@/types/constant';
import { DataType } from '@/types/enum';
import { CurrencyYen } from '@mui/icons-material'
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Tooltip, Typography } from '@mui/material'
import React from 'react'

interface FilterProps {
  options : FilterOption[];
  filterDataset : FilterDataset; 
  setFilterDataset : React.Dispatch<React.SetStateAction<FilterDataset>>;
  open: boolean;
  close: () => void;
}

export default function FilterOptionSetter({options ,filterDataset, setFilterDataset, open, close} : FilterProps) {
    const initialFilterList : Filter[] = [{
      itemid : 1, 
      caption: options[0].caption, 
      fieldname: options[0].fieldname, 
      datatype: options[0].datatype, 
      condition: CONDITIONAL_TYPE.get(options[0].datatype)?.at(0)?.value ?? "eq"
    }]
    const [filterList, setFilterList] = React.useState<Filter[]>(initialFilterList);
    
    const onchangeFieldName = (event: SelectChangeEvent, id: number) => {
      let opt = options.find(option => option.fieldname === event.target.value);
      if(opt) {
        setFilterList((prev) => 
          prev.map(filter => filter.itemid == id 
            ? {...filter, 
            itemid : parseInt(opt.optionid),
            fieldname : opt.fieldname,
            condition : CONDITIONAL_TYPE.get(opt.datatype)?.at(0)?.value ?? "eq",
            datatype : opt.datatype
           } 
            : filter)
        );
      }
    };

    const onchangeCondition = (event: SelectChangeEvent, id: number) => {
      setFilterList((prev) => 
        prev.map(filter => filter.itemid == id ? {...filter, condition : event.target.value} : filter)
      );
    };

    const newFilterSlot = () => {
      let unused1stOption = options.find(option => !filterList.some(f => f.fieldname === option.fieldname));
      if(unused1stOption) {
        let newSlot : Filter = 
        {
          itemid : parseInt(unused1stOption.optionid), 
          caption: unused1stOption.caption, 
          fieldname: unused1stOption.fieldname, 
          datatype: unused1stOption.datatype, 
          condition: CONDITIONAL_TYPE.get(unused1stOption.datatype)?.at(0)?.value ?? "eq"
        };
        setFilterList((prev) => [...(prev || []), newSlot]);
      }
    }

    const removeFilterSlot = (id : number) => {
      if(filterList.length > 1) {
        let remainingList = filterList.filter(filter => filter.itemid !== id)
        setFilterList(remainingList);
      }
    }

    function formatAmount(num : number){
        if (num != undefined && num != null) {
        let numstr = String(num);
        numstr = numstr.replace(/,/g, "");
        var parts = numstr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts;
        } else return "";
    }

  return (
    <Box sx={{width: {xs: 500, sm: 650, md: 800, lg: 900}, px: 2}}>
        {
        filterList?.map((filter, index) => (
        <Box key={filter.itemid} sx={{ display: "flex", alignItems: "center", my: 3}} >
            <Box sx={{ minWidth: "30%", mr: 1 }}>
            <FormControl fullWidth>
                <InputLabel id={`filterby-label${filter.itemid}`}>Filter By</InputLabel>
                <Select sx={{ height: 45 }}
                labelId={`filterby-select-label${filter.itemid}`}
                id={`filterby-select${filter.itemid}`}
                value={filter.fieldname}
                label="Filter By" readOnly={filterList?.length > index+1}
                onChange={(event) => onchangeFieldName(event, filter.itemid)}
                >
                {
                    options
                    ?.filter(option => !filterList.some(f => f.fieldname === option.fieldname && f.itemid !== filter.itemid)) // remove (AlreadySelectedFieldname && NotSameAsCurrentItemid)
                    ?.map(option => (
                        <MenuItem key={option.optionid} value={option.fieldname}>{option.caption}</MenuItem>
                    ))
                }
                </Select>
            </FormControl>
            </Box>
            <Box sx={{ minWidth: "25%", mr: 1 }}>
            <FormControl fullWidth>
                <InputLabel id={`condition-label${filter.itemid}`}>Condition</InputLabel>
                <Select sx={{ height: 45 }}
                labelId={`condition-select-label${filter.itemid}`}
                id={`condition-select${filter.itemid}`}
                value={filter.condition}
                label="Condition"
                onChange={(event) => onchangeCondition(event, filter.itemid)}
                >
                {
                    CONDITIONAL_TYPE?.get(filter.datatype)?.map(condition => (
                        <MenuItem value={condition.value}>{condition.label}</MenuItem>
                    ))
                }
                </Select>
            </FormControl>
            </Box>
            <Box sx={{ minWidth: "30%", mr: 1 }}>
            {getTextField(filter.datatype, filter.condition)}
            </Box>
            <Tooltip title={<Typography sx={{ fontSize: '14px' }}>Add Filter</Typography>} placement="top" >
            <IconButton size="large" color="inherit" onClick={newFilterSlot}
                sx={{ p: 0, mx: 2, transition: 'transform 0.2s', '&:hover': {transform: 'scale(1.2)'} }}>
            <svg fill="none" width={30} height={30} viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg"><path d="m.959867 10.5185c.154133 1.4407 1.312833 2.5994 2.752793 2.7599 1.06955.1192 2.16771.2216 3.28734.2216s2.21779-.1024 3.2873-.2216c1.44-.1605 2.5987-1.3192 2.7528-2.7599.1138-1.06348.2099-2.15535.2099-3.2685 0-1.11316-.0961-2.20502-.2099-3.26853-.1541-1.44065-1.3128-2.59936-2.7528-2.75986-1.06951-.11922-2.16767-.22161-3.2873-.22161s-2.21779.10239-3.28734.22161c-1.43996.1605-2.59866 1.31921-2.752793 2.75986-.113784 1.06351-.209867 2.15537-.209867 3.26853 0 1.11315.096084 2.20502.209867 3.2685z" fill="#d7e0ff"/><g fill="#4147d5"><path d="m10.2873 13.2784-.083-.7454zm-6.57464-12.05679.08308.74538zm3.28734 11.52839c-1.0766 0-2.14116-.0985-3.20426-.217l-.16617 1.4908c1.076.1199 2.20777.2262 3.37043.2262zm3.2043-.217c-1.06314.1185-2.12769.217-3.2043.217v1.5c1.16266 0 2.29443-.1063 3.3704-.2262zm3.5816-1.9347c.1145-1.07069.2141-2.19435.2141-3.3483h-1.5c0 1.07236-.0926 2.13242-.2056 3.1887zm.2141-3.3483c0-1.15395-.0996-2.27761-.2141-3.34832l-1.4915.15958c.113 1.05631.2056 2.11638.2056 3.18874zm-7-5.5c1.07661 0 2.14116.09849 3.2043.21699l.1661-1.490765c-1.07597-.119935-2.20774-.226225-3.3704-.226225zm-3.20426.21699c1.0631-.1185 2.12766-.21699 3.20426-.21699v-1.5c-1.16266 0-2.29443.10629-3.37043.226225zm-3.581617 1.93469c-.114553 1.07071-.214123 2.19436-.214123 3.34832h1.5c0-1.07236.0926-2.13243.20561-3.18874zm-.214123 3.34832c0 1.15395.0995702 2.27761.214123 3.3483l1.491487-.1596c-.11301-1.05628-.20561-2.11634-.20561-3.1887zm13.7859-3.34832c-.1918-1.79214-1.6275-3.226163-3.4155-3.425455l-.1661 1.490765c1.0919.12172 1.9736 1.00512 2.0901 2.09427zm-3.4155 10.12212c1.788-.1993 3.2237-1.6333 3.4155-3.4255l-1.4915-.1596c-.1165 1.0892-.9982 1.9726-2.0901 2.0943zm-6.74083-13.547575c-1.78794.199292-3.223709 1.633315-3.415447 3.425455l1.491487.15958c.11653-1.08916.99817-1.97255 2.09013-2.09427zm.16617 12.056775c-1.09196-.1217-1.9736-1.0051-2.09013-2.0943l-1.491487.1596c.191739 1.7922 1.627507 3.2262 3.415447 3.4255z"/><path d="m7.75 4.75c0-.41421-.33579-.75-.75-.75s-.75.33579-.75.75zm-1.5 5c0 .4142.33579.75.75.75s.75-.3358.75-.75zm0-5v5h1.5v-5z"/><path d="m9.5 8c.41421 0 .75-.33579.75-.75s-.33579-.75-.75-.75zm-5-1.5c-.41421 0-.75.33579-.75.75s.33579.75.75.75zm5 0h-5v1.5h5z"/></g></svg>                
            </IconButton>
            </Tooltip>
            <Tooltip title={<Typography sx={{ fontSize: '14px' }}>Remove Filter</Typography>} placement="top" >
            <IconButton size="large" color="inherit" onClick={() => removeFilterSlot(filter.itemid)}
                sx={{ p: 0, mx: 2, transition: 'transform 0.2s', '&:hover': {transform: 'scale(1.2)'} }}>
            <svg width={30} height={30} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" ><path fill="#ff5a79" d="M62 52c0 5.5-4.5 10-10 10H12C6.5 62 2 57.5 2 52V12C2 6.5 6.5 2 12 2h40c5.5 0 10 4.5 10 10v40z"/><path fill="#fff" d="M50 21.2L42.8 14 32 24.8 21.2 14 14 21.2 24.8 32 14 42.8l7.2 7.2L32 39.2 42.8 50l7.2-7.2L39.2 32z"/></svg>
            </IconButton>
            </Tooltip>
        </Box>
        ))
        }
        <Box sx={{ display: "flex", my: 3}}>
            <div className="w-7/12 flex items-center">
            <Button sx={{backgroundColor: 'navy', color: 'white',  
                borderRadius: '9999px', width: '100%',
                '&:disabled': {
                opacity: 0.5,  
                },
                display: 'flex', alignItems: 'center', justifyContent: 'center'}} variant="contained" startIcon={<CurrencyYen />}> {formatAmount(10000)} </Button>
            </div>
            <div className="w-5/12 flex justify-around items-center">
            <Tooltip title={<Typography sx={{ fontSize: '14px' }}>Add to Favourite</Typography>}
                placement="top" 
                >
            <IconButton size="large" color="inherit" 
                sx={{ p: 0, mx: 2, transition: 'transform 0.2s', '&:hover': {transform: 'scale(1.2)'} }}>
                <svg width={30} height={30} enableBackground="new 0 0 128 128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path d="m93.99 8.97c-21.91 0-29.96 22.39-29.96 22.39s-7.94-22.39-30-22.39c-16.58 0-35.48 13.14-28.5 43.01s58.56 67.08 58.56 67.08 51.39-37.21 58.38-67.08c6.98-29.87-10.56-43.01-28.48-43.01z" fill="#f44336"/><path d="m30.65 11.2c17.2 0 25.74 18.49 28.5 25.98.39 1.07 1.88 1.1 2.33.06l2.52-5.89c-3.55-11.34-13.31-22.38-29.97-22.38-6.9 0-14.19 2.28-19.86 7.09 5.01-3.29 10.88-4.86 16.48-4.86z" fill="#c33"/><path d="m93.99 8.97c-5.29 0-10.11 1.15-13.87 3.47 2.64-1.02 5.91-1.24 9.15-1.24 16.21 0 30.72 12.29 24.17 40.7-5.62 24.39-38.46 53.98-48.49 65.27-.64.72-.86 1.88-.86 1.88s51.39-37.21 58.38-67.08c6.98-29.86-10.53-43-28.48-43z" fill="#c33"/><g fill="#ff8a80"><path d="m17.04 24.82c3.75-4.68 10.45-8.55 16.13-4.09 3.07 2.41 1.73 7.35-1.02 9.43-4 3.04-7.48 4.87-9.92 9.63-1.46 2.86-2.34 5.99-2.79 9.18-.18 1.26-1.83 1.57-2.45.46-4.22-7.48-5.42-17.78.05-24.61z"/><path d="m77.16 34.66c-1.76 0-3-1.7-2.36-3.34 1.19-3.02 2.73-5.94 4.58-8.54 2.74-3.84 7.95-6.08 11.25-3.75 3.38 2.38 2.94 7.14.57 9.44-5.09 4.93-11.51 6.19-14.04 6.19z"/></g></svg>                            
            </IconButton>
            </Tooltip>
            <Tooltip title={<Typography sx={{ fontSize: '14px' }}>Tap to set</Typography>} placement="top">
            <IconButton size="large" color="inherit" //onClick={addToCart}
                sx={{ p: 0, mx: 2, transition: 'transform 0.2s', '&:hover': {transform: 'scale(1.2)'} }}>
                <svg width={35} height={35} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" fill="#4bd37b" r="30"/><path d="m46 14-21 21.6-7-7.2-7 7.2 14 14.4 28-28.8z" fill="#fff"/></svg>                
            </IconButton>
            </Tooltip>
            </div>
        </Box>
    </Box>
  )
}

const getTextField = ( datatype : DataType, condition : string ) => {
  const fieldStyle = {
    "& .MuiInputBase-root": { height: 45 },
    "& .MuiInputLabel-root": { top: -5 },
    "& .MuiInputLabel-shrink": { top: 0 /* onFocus */},
  }
  const isBetween = (condition === "bt");
  return (
    <>
    {
      isBetween
      ? <Box display={"flex"}>
          <TextField label="Match with" type={datatype} sx={{...fieldStyle, width : "49%", mr: 1}} />
          <TextField label="Match with" type={datatype} sx={{...fieldStyle, width : "50%"}} />
        </Box>
      : <TextField label="Match with" type={datatype} sx={fieldStyle} fullWidth/>
    }
    </>
  )
}
