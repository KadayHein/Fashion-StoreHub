"use client"
import { client } from '@/lib/apolloClient';
import { gql } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'; 
import 'swiper/css/navigation'; 
import 'swiper/css/thumbs'; 
import 'swiper/css/free-mode'; 
import { Box } from '@mui/material'
import { enqueueSnackbar } from 'notistack';
import { useAppTranslation } from '@/service/customHooks/useAppTranslation';

export default function EventSlider() {

  const { noti } = useAppTranslation();

  const [sliders,setSliders] = useState<PicRef[]>([])
  const [activeSlide,setActiveSlide] = useState<number>(0)

  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  useEffect(() => {
    getAllSliders()
  },[])

  async function getAllSliders() {
      await client.query<EventSlidersResponse>({
          query: gql`
          query {
          eventSliders {
              syskey
              imageUrl
          }
          }
          `
      }).then(resp => {
        setSliders(resp.data.eventSliders);
      }).catch(error => {
        console.log(error);
        enqueueSnackbar(noti("fail2loadSlide"), { variant: "error" })
      })
  }

  return (
    <Box sx={{ px: {xs: 1.5, sm: 2, md: 7, lg: 10}, my: 2}}>
    <Swiper className="mb-5"
      onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
      spaceBetween={10}
      loop={false}
      navigation={true}
      modules={[Navigation, Thumbs, FreeMode]}
      thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
    >
      {
        sliders && sliders.map((slide, index) => (
          <SwiperSlide key={index}>
          <Box sx={{ cursor: "pointer"}}>
            <img src={"/images/slides/"+slide.imageUrl} className="block w-full rounded-2xl" alt="..."></img>
          </Box>
          </SwiperSlide>
        ))
      }
    </Swiper>

    {/* thumbnails */}
    <Swiper
      onSwiper={setThumbsSwiper}
      onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
      loop={false}
      spaceBetween={12}
      slidesPerView={sliders.length}
      watchSlidesProgress={true}
      navigation={true}
      freeMode={true}
      modules={[Navigation, Thumbs, FreeMode]}
    >
      {
        sliders && sliders.map((slide, index) => (
          <SwiperSlide key={index} >
          <Box sx={{ cursor: "pointer"}}>
            <img src={"/images/slides/"+slide.imageUrl} alt={`slide${index}`}
              className={`transition-opacity duration-200 rounded-xl 
              ${activeSlide === index ? "opacity-100" : "opacity-50"}`}></img>
          </Box>
          </SwiperSlide>
        ))
      }
    </Swiper>
    </Box>
  )
}
