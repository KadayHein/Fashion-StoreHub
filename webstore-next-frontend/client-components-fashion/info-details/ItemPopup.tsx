"use client"
import { useClientContext } from '@/app/fashion/clientstore/layout'
import { client } from '@/lib/apolloClient';
import { gql } from '@apollo/client'
import { CurrencyYen } from '@mui/icons-material'
import { Backdrop, Box, Button, Fade, FormControl, IconButton, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, Tooltip, Typography } from '@mui/material'
import React from 'react'

interface ItemPopupProps {
  product: Product; 
  genrename: string;
  catname: string;
  open: boolean;
  popupClose: () => void;
}
export default function ItemPopup({product, genrename, catname, open, popupClose} : ItemPopupProps) {

    const {setCartSize,setNotibox} = useClientContext();
    const [color, setColor] = React.useState<string>('');
    const [size, setSize] = React.useState<string>('');

  const onchangecolor = (event: SelectChangeEvent) => {
    setColor(event.target.value as string);
  };

  const onchangesize = (event: SelectChangeEvent) => {
    setSize(event.target.value as string);
  };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: '30px',
        boxShadow: 24,
        p: 4,
      };
      
    async function addToCart(){
      alert("Add to Cart Triggered")
    try {
        await client.mutate<AddToCartResponse>({
            mutation: gql`
            mutation {
            addToCart(cartItem: {
                productId: ${product.id},
                productName: "${product.name}",
                productImage: "${product.imageUrl}",
                price: ${product.price}
            })
            }
            `
        }).then(resp => {
          setCartSize(resp.data.addToCart);
          openNoti("success");
        })
    } catch (error) {
      openNoti("error");
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

  const openNoti = (status: string) => {
    setNotibox({
      status: status,
      show: true, 
      timeout: 3000, 
      message: status == "success" ? "Successfully Added To Cart!" : "Failed To Add!"
    })
  };


  return (

    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={popupClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 700,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {product.name}
            </Typography>
            <Typography id="transition-modal-description" sx={{ my: 2 }}>
              Genre : {genrename}, Category : {catname}
            </Typography>
            <div className='flex flex-wrap w-full my-2'>
            <div className="w-[48%] me-[2%]">
              <Box sx={{ minWidth: 150 }}>
                <FormControl fullWidth>
                  <InputLabel id="size-label">Size</InputLabel>
                  <Select
                    labelId="size-select-label"
                    id="size-select"
                    value={size}
                    label="Size"
                    onChange={onchangesize}
                  >
                    <MenuItem value={10}>Small</MenuItem>
                    <MenuItem value={20}>Medium</MenuItem>
                    <MenuItem value={30}>Large</MenuItem>
                    <MenuItem value={40}>Extra-Large</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
            <div className="w-[50%]">
              <Box sx={{ minWidth: 150 }}>
                <FormControl fullWidth>
                  <InputLabel id="color-label">Color</InputLabel>
                  <Select
                    labelId="color-select-label"
                    id="color-select"
                    value={color}
                    label="Color"
                    onChange={onchangecolor}
                  >
                    <MenuItem value={10}>Blue</MenuItem>
                    <MenuItem value={20}>Gray</MenuItem>
                    <MenuItem value={30}>Pink</MenuItem>
                    <MenuItem value={40}>Navy</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
            </div>
            <img src={"/images/"+product.imageUrl} alt={product.name} className="popupImg"></img>
            <div className="mt-3 flex">
                <div className="w-7/12 flex items-center">
                  <Button sx={{backgroundColor: 'navy', color: 'white',  
                    borderRadius: '9999px', width: '100%',
                    '&:disabled': {
                      opacity: 0.5,  
                    },
                    display: 'flex', alignItems: 'center', justifyContent: 'center'}} variant="contained" startIcon={<CurrencyYen />}> {formatAmount(product.price)} </Button>
                </div>
                <div className="w-5/12 flex justify-around items-center">
                  <Tooltip title={<Typography sx={{ fontSize: '14px' }}>Add to Favourite</Typography>}
                    placement="top" 
                      // componentsProps={{ // override tooltip style
                      // tooltip: {
                      //   sx: { backgroundColor: '#c53326', color: 'white', fontSize: '15px',  
                      //     borderRadius: '6px', padding: '8px 12px' 
                      //   }
                      // }}}
                      >
                  <IconButton size="large" color="inherit" 
                    sx={{ p: 0, mx: 2, transition: 'transform 0.2s', '&:hover': {transform: 'scale(1.2)'} }}>
                    <svg width={30} height={30} enableBackground="new 0 0 128 128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path d="m93.99 8.97c-21.91 0-29.96 22.39-29.96 22.39s-7.94-22.39-30-22.39c-16.58 0-35.48 13.14-28.5 43.01s58.56 67.08 58.56 67.08 51.39-37.21 58.38-67.08c6.98-29.87-10.56-43.01-28.48-43.01z" fill="#f44336"/><path d="m30.65 11.2c17.2 0 25.74 18.49 28.5 25.98.39 1.07 1.88 1.1 2.33.06l2.52-5.89c-3.55-11.34-13.31-22.38-29.97-22.38-6.9 0-14.19 2.28-19.86 7.09 5.01-3.29 10.88-4.86 16.48-4.86z" fill="#c33"/><path d="m93.99 8.97c-5.29 0-10.11 1.15-13.87 3.47 2.64-1.02 5.91-1.24 9.15-1.24 16.21 0 30.72 12.29 24.17 40.7-5.62 24.39-38.46 53.98-48.49 65.27-.64.72-.86 1.88-.86 1.88s51.39-37.21 58.38-67.08c6.98-29.86-10.53-43-28.48-43z" fill="#c33"/><g fill="#ff8a80"><path d="m17.04 24.82c3.75-4.68 10.45-8.55 16.13-4.09 3.07 2.41 1.73 7.35-1.02 9.43-4 3.04-7.48 4.87-9.92 9.63-1.46 2.86-2.34 5.99-2.79 9.18-.18 1.26-1.83 1.57-2.45.46-4.22-7.48-5.42-17.78.05-24.61z"/><path d="m77.16 34.66c-1.76 0-3-1.7-2.36-3.34 1.19-3.02 2.73-5.94 4.58-8.54 2.74-3.84 7.95-6.08 11.25-3.75 3.38 2.38 2.94 7.14.57 9.44-5.09 4.93-11.51 6.19-14.04 6.19z"/></g></svg>                            
                  </IconButton>
                  </Tooltip>
                  <Tooltip title={<Typography sx={{ fontSize: '14px' }}>Add to Cart</Typography>} placement="top">
                  <IconButton size="large" color="inherit" onClick={addToCart}
                    sx={{ p: 0, mx: 2, transition: 'transform 0.2s', '&:hover': {transform: 'scale(1.2)'} }}>
                    <svg width={30} height={30} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="#2b3f6c"><path clipRule="evenodd" d="m1.26471 2.85306c.08123-.40617.47635-.66958.88252-.58835l1.04936.20987c1.18525.23705 2.07676 1.22024 2.19703 2.42296l.08527.8526h13.57551c1.9842 0 3.4401 1.86474 2.9589 3.78974l-1.1228 4.49102c-.473 1.892-2.1729 3.2192-4.1231 3.2192h-8.99291c-1.39205 0-2.56455-1.0402-2.73041-2.4223l-.98948-8.24565-.15353-1.53535c-.05467-.54669-.4599-.9936-.99865-1.10135l-1.04936-.20987c-.40617-.08123-.66958-.47635-.58835-.88252zm7.73529 9.89694c-.41421 0-.75.3358-.75.75s.33579.75.75.75h4c.4142 0 .75-.3358.75-.75s-.3358-.75-.75-.75z" fillRule="evenodd"/><circle cx="8.5" cy="20" r="1.5"/><circle cx="17.5" cy="20" r="1.5"/></g></svg>
                  </IconButton>
                  </Tooltip>
                </div>
            </div>
          </Box>
        </Fade>
      </Modal>
  )
}
