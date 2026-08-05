"use client"
import React from 'react'
import FeatureNavigator from './FeatureNavigator'
import EventSlider from './EventSlider'
import { Box, Stack, Typography } from '@mui/material'
import NewArrival from './NewArrival'
import ExpandingCards from '@/base-components/showcard/ExpandingCards'

export default function Home() {

  const cardsData = [
  {
    id: "design-excellence",
    front: {
      imageSrc:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400",
      imageAlt: "Design Excellence",
      title: "Design Excellence",
      description:
        "Beautiful, intuitive designs that create meaningful connections with users.",
    },
    back: {
      description:
        "We craft exceptional user experiences through thoughtful design.",
      buttonText: "View Portfolio",
    },
  },

  {
    id: "data-analytics",
    front: {
      imageSrc:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
      imageAlt: "Data Analytics",
      title: "Data Analytics",
      description:
        "Transform raw data into actionable insights.",
    },
    back: {
      description:
        "Real-time analytics and predictive modeling.",
      buttonText: "Learn More",
    },
  },
];
  
  return (
    <>
    <EventSlider/>
    <Box mt={5} textAlign={"center"}>
      <Typography sx={{ typography: {xs: "h5", sm: "h4", md: "h4", lg: "h3"}}} >Featured Products</Typography>
      <Typography sx={{ typography: {xs: "subtitle1", sm: "subtitle1", md: "h6", lg: "h6"}}} >Chan Chan Online Fashion Shopping - Be Smart - Act Less - Neat Style  - Local Distribution </Typography>
      <Typography sx={{ typography: {xs: "subtitle2", sm: "subtitle2", md: "subtitle2", lg: "subtitle1"}}} component="small">チャンチャン-通信販売　－　おしゃれに　ー　行動減少　－　カッコイイ　ー　国内配送</Typography>
    </Box>
    <ExpandingCards/>
    <Stack width={"100%"} py={5} sx={{px : { xs: 1.5, sm: 2, md: 7, lg: 10}}}>
    <FeatureNavigator/>
    </Stack>
    <Stack width={"100%"} py={5} sx={{px : { xs: 1.5, sm: 2, md: 7, lg: 10}}}>
    <NewArrival/>
    </Stack>
    </>
  )
}