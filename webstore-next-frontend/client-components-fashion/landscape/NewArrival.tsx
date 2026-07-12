"use client"
import { client } from '@/lib/apolloClient';
import { gql } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import ItemPopup from '../info-details/ItemPopup'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material'
import { AppsOutageRounded, CurrencyYen, StarRounded } from '@mui/icons-material'

interface Trendings {
    syskey : number,
    product : Product
}

export default function NewArrival() {

    const [sliders,setSliders] = useState<Trendings[]>();
    const [activeSlide,setActiveSlide] = useState(0)
    const [selectedProduct,setSelectedProduct] = useState<Product>();

    useEffect(() => {
    getAllTrendings()
    },[])

    // const chunkArray = (array: any[], groupsize : number) => {
    // array = Array.from(
    //         { length: Math.ceil(array.length / groupsize)},
    //         (_,i) => array.slice(i * groupsize, i * groupsize + groupsize));
    //         console.log("Chucked into ",array);
    // return Array.from(
    //     { length: Math.ceil(array.length / groupsize)},
    //     (_,i) => array.slice(i * groupsize, i * groupsize + groupsize));
    // }


    // const groupedSliders = chunkArray(sliders, 3);

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
                    genre { name }
                }
            }
            }
            `
        }).then(resp => {
            setSliders(resp.data.trendings);
            console.log("Sliders",resp.data.trendings)
        })
    }

    function formatAmount(num : number) {
        if (num != undefined && num != null) {
        let numstr = String(num);
        numstr = numstr.replace(/,/g, "");
        var parts = numstr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts;
        } else return "";
    }

  return (
    <Paper 
    sx={{
        display: "flex",
        backgroundImage: "url('/images/feather-bg.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        borderRadius: 2,
        boxShadow: (theme) => theme.shadows[4]
      }}
    >
        <Box  width={"33%"} display={"flex"} justifyContent={"center"} >
        <Stack 
        display={"flex"} direction="column" justifyContent={"center"} 
        color={"#fff"} spacing={2} width={"60%"}>
            <Typography variant="h4" fontWeight="bold">
                <span className="text-red-500">New</span> Arrivals.
            </Typography>
            <Typography variant="body1" fontWeight="light">
                Upcoming products on schedule right there on customer's sight.
            </Typography>
        </Stack>
        </Box>
        <Box width={"66%"} my={2}>
        <Swiper
            breakpoints={{
                0 : { slidesPerView : 1 },
                700 : { slidesPerView : 2 },
                1060 : { slidesPerView : 3 },
                1400 : { slidesPerView : 4 }
            }}
            spaceBetween={5}
            pagination={{
            clickable: true,
            }}
            navigation={true}
            grabCursor={true}
            modules={[Pagination, Navigation]}
            className=" select-none"
        >
        {
            sliders?.map(slider => (
                <SwiperSlide key={slider.syskey}>
                <Box className='inline'>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center"}} height={280}>
                        <img src={'/images/'+slider.product.imageUrl} alt={slider.product.name} className="w-full max-w-52 max-h-60 object-cover rounded-xl"/>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", color: "#fff", textAlign: "center", my: 0.5}} >
                        <Typography variant='h6' noWrap px={3}> {slider.product.name}</Typography>
                        <Typography variant='subtitle1'>Yen {slider.product.price}</Typography>
                        <Typography variant='subtitle2' className='text-yellow-300'><StarRounded sx={{ fontSize: 20 ,mb: 0.5}}/>{slider.product.price*25/100} Points</Typography>
                    </Box>
                </Box>
                </SwiperSlide>
            ))
        }
        </Swiper>
        </Box>
        
    </Paper>
  )
}
