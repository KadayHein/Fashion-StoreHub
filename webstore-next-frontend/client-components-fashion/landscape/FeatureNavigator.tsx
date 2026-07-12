"use client"
import { client } from '@/lib/apolloClient';
import { gql } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import ItemPopup from '../info-details/ItemPopup'
import { Box, Button, Card, CardMedia, Paper, Stack, Typography } from '@mui/material'
import { CurrencyYen, KeyboardArrowRightRounded } from '@mui/icons-material'
import 'swiper/css';
import 'swiper/css/effect-cards';
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards } from 'swiper/modules';


interface Trendings {
    syskey : number,
    product : Product
}

export default function FeatureNavigator() {

    const [trendings,setTrendings] = useState<Trendings[]>();

    useEffect(() => {
    getAllTrendings()
    },[])

    async function getAllTrendings() {
        await client.query<TrendingsResponse>({
            query: gql`
            query {
            trendings {
                syskey,
                product{
                    id,
                    name,
                    imageUrl,
                    price,
                    genre { name },
                    category { name }
                }
            }
            }
            `
        }).then(resp => {
            setTrendings(resp.data.trendings);
            console.log("trendings",resp.data.trendings)
        })
    }

    const [activeIndex,setActiveIndex] = React.useState<number>(0);
    const activeCard = trendings?.at(activeIndex)?.product;
    const [selectedProduct,setSelectedProduct] = React.useState<Product>();

    const [open, setOpen] = React.useState<boolean>(false);
    const popupOpen = () => setOpen(true);
    const popupClose = () => setOpen(false);

    function formatAmount(num : number) {
    if (num != undefined && num != null) {
    let numstr = String(num);
    numstr = numstr.replace(/,/g, "");
    var parts = numstr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts;
    } else return "";
    }

  return (
    <Stack direction={{ sm: "column", lg: "row"}} spacing={3}>
    <Paper 
    sx={{
        display: "flex",
        backgroundImage: "url('/images/feather-bg1.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        borderRadius: 2,
        boxShadow: (theme) => theme.shadows[4],
        width: '100%'
      }}
    >
        <Box width={"40%"} display={"flex"} justifyContent={"center"} >
        <Stack
        display={"flex"} direction="column" justifyContent={"center"} 
        color={"#fff"} spacing={2} width={"60%"}>
            <Typography variant="h4" fontWeight="bold">
                <span className="text-red-500">Trend</span> Now.
            </Typography>
            <Typography variant="body1" fontWeight="light">
                Brand New & Best Selling Products on <span className="text-red-500">Hot</span> are waiting there for u.
            </Typography>
            <Typography variant="body1" fontWeight="light">
                Drag the Flash! 
            </Typography>
            <Typography variant="body1" fontWeight="light">
                Get the Best! 
            </Typography>
        </Stack>
        </Box>
        <Box width={"60%"} my={2} display={"flex"} flexDirection={"column"} alignItems={"center"}>
        
        <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        initialSlide={activeIndex+2}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="w-60 max-h-75 select-none"
        >
          {
            trendings?.map(cardItem => (
              <SwiperSlide key={cardItem.syskey} className="flex items-center justify-center rounded-2xl">
              <Card sx={{ maxWidth: 345, height: "100%" ,
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)", 
                  border: "1px solid rgba(0, 0, 0, 0.1)", borderRadius: "1rem"
              }}>
              <CardMedia onClick={popupOpen}
                  component="img"
                  alt={cardItem.product.name}
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  image={'/images/'+cardItem.product.imageUrl}
              />
              </Card>
              </SwiperSlide>
            ))
          }
        </Swiper>
            {
          activeCard &&
          <Box width={"60%"} textAlign={"center"}>
          <Typography variant="body1" component="div" color='#fff' px={2} py={1} noWrap>
            {`(${activeCard.genre.name}) ${activeCard.name}`}
          </Typography>
          <Button sx={{backgroundColor: 'navy', color: 'white', borderRadius: '9999px', width: '100%',
            '&:disabled': {opacity: 0.5}, display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                variant="contained" startIcon={<CurrencyYen />}>{formatAmount(activeCard.price)}</Button>
            </Box>
          }
          {
            activeCard && 
            <ItemPopup product={activeCard} genrename={activeCard.genre.name} 
            catname={"UnknownCategory"} open={open} popupClose={popupClose}/>
          }
          
        </Box>
        
    </Paper>
    <Paper
    sx={{
        display: "flex", flexDirection: "column", justifyContent: "space-around", p: 3,
        backgroundImage: "url('/images/feather-bg1.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        borderRadius: 2, color: "#fff",
        boxShadow: (theme) => theme.shadows[4],
      }}
    >
      <Typography variant="h4" fontWeight="bold">
          <span className="text-red-500">Explore</span> Showroom.
      </Typography>
      <Typography variant="body1" fontWeight="light">
          Visit Around Showroom to get out Item displayed for your pleasure.
      </Typography>
      <Button href={"/fashion/clientstore/categories/1"} sx={{ color: "#fff",textTransform: "none", fontSize: 16, width:"fit-content", marginInlineStart:"auto"}} endIcon={<KeyboardArrowRightRounded fontSize="large"/>}>
        Go to Showroom
      </Button>
    </Paper>
    <Stack spacing={2} direction={"column"}>
    <Paper sx={{
      display: "flex", flexDirection: "column", justifyContent: "space-around",
      backgroundImage: "url('/images/feather-bg1.jpg')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      borderRadius: 2, color: "#fff",
      boxShadow: (theme) => theme.shadows[4],
      height: "50%", p: 3
    }}>
        <Typography variant="h5" fontWeight="bold">
            <span className="text-red-500">Create</span> Account.
        </Typography>
        <Typography variant="body1" fontWeight="light">
            For More Discounts, Coupons, Cashback & Presents.
        </Typography>
        <Button href={"/clientstore/categories/1"} sx={{ color: "#fff",textTransform: "none", fontSize: 16, width:"fit-content", marginInlineStart:"auto"}} endIcon={<KeyboardArrowRightRounded fontSize="large"/>}>
          Sign up
        </Button>
    </Paper>

    <Paper sx={{
      display: "flex", flexDirection: "column", justifyContent: "space-around",
      backgroundImage: "url('/images/feather-bg1.jpg')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      borderRadius: 2, color: "#fff",
      boxShadow: (theme) => theme.shadows[4],
      height: "50%", p: 3
    }}>
        <Typography variant="h5" fontWeight="bold">
            <span className="text-red-500">Membership</span> Plan.
        </Typography>
        <Typography variant="body1" fontWeight="light">
            For More Discounts, Coupons, Cashback & Presents.
        </Typography>
        <Button href={"/clientstore/categories/1"} sx={{ color: "#fff",textTransform: "none", fontSize: 16, width:"fit-content", marginInlineStart:"auto"}} endIcon={<KeyboardArrowRightRounded fontSize="large"/>}>
          Apply Member
        </Button>
    </Paper>
    </Stack>
    
    
    </Stack>
  )
}
