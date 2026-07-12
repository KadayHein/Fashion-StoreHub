import React, { useEffect } from 'react'
import { TextField } from '@mui/material'
import { useCheckoutContext } from '@/app/fashion/clientstore/checkout/layout';

export default function ReviewDetails() {

  const { setHeader , setDeliInfo } = useCheckoutContext();

  useEffect(() => {
    setHeader("Review Details Information");
  },[])

    const details = 
    [
        {
            label : "Customer Name",
            value : "Kaday Hein"
        },
        {
          label : "Customer Email",
          value : "k.h@mit.com.mm"
        },
        {
          label : "Contact Number",
          value : "09-787-887-066"
        },
        {
          label : "Address",
          value : "Padonmar St., Mayangon Tsp, Yangon"
        } 
    ]

  return (
        
    <div className='flex flex-wrap justify-around w-full pb-5'>
      {
        details && 
        details.map(detail => (
        <TextField key={detail.label} label={detail.label} size="small" defaultValue={detail.value}
          sx={{'& .MuiOutlinedInput-root.Mui-focused fieldset': {borderColor: 'green' },
                '& .MuiInputLabel-root.Mui-focused': {color: 'green' }, mb:"1rem"
              }} />
        ))
      }
    </div>
  )
}
