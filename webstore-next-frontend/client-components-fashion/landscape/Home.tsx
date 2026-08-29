"use client"
import React from 'react'
import FeatureNavigator from './FeatureNavigator'
import EventSlider from './EventSlider'
import { Box, Stack, Typography } from '@mui/material'
import NewArrival from './NewArrival'
import ExpandingCards from '@/base-components/showcard/ExpandingCards'
import { useAppTranslation } from '@/service/customHooks/useAppTranslation'

export default function Home() {

  const { home } = useAppTranslation()

  return (
    <>
      <EventSlider />
      <Box mt={5} textAlign={"center"}>
        <Typography sx={{ typography: { xs: "h5", sm: "h4", md: "h4", lg: "h3" }, mb: 4 }} >{home("landingheader")}</Typography>
        <Typography sx={{ typography: { xs: "subtitle1", sm: "subtitle1", md: "h6", lg: "h6" } }} >{home("landingsubheader")}</Typography>
        <Typography sx={{ typography: "subtitle2" }} component="small">{home("landingsubheader2")}</Typography>
      </Box>
      <ExpandingCards />
      <Stack width={"100%"} my={5} sx={{ px: { xs: 1.5, sm: 2, md: 7, lg: 10 } }}>
        <Box pb={3} textAlign={"center"}>
          <Typography sx={{ typography: { xs: "h5", sm: "h4", md: "h4", lg: "h3" }, mb: 4 }} >{home("header")}</Typography>
          <Typography sx={{ typography: { xs: "subtitle1", sm: "subtitle1", md: "h6", lg: "h6" } }} >{home("subheader")}</Typography>
          <Typography sx={{ typography: "subtitle2" }} component="small">{home("subheader2")}</Typography>
        </Box>
        <FeatureNavigator />
      </Stack>
      <Stack width={"100%"} py={5} sx={{ px: { xs: 1.5, sm: 2, md: 7, lg: 10 } }}>
        <NewArrival />
      </Stack>
    </>
  )
}