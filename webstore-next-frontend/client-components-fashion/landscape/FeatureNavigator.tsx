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
import { URL_AUTH, URL_CATEGORIES } from '@/service/routeHandler';
import { formatCurrency } from '@/service/generalUtils';
import { useAppTranslation } from '@/service/customHooks/useAppTranslation';


interface Trendings {
  syskey: number,
  product: Product
}

export default function FeatureNavigator() {

  const { feature } = useAppTranslation()

  const [trendings, setTrendings] = useState<Trendings[]>();

  useEffect(() => {
    getAllTrendings()
  }, [])

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
      console.log("trendings", resp.data.trendings)
    })
  }

  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const activeCard = trendings?.at(activeIndex)?.product;

  const [open, setOpen] = React.useState<boolean>(false);
  const popupOpen = () => setOpen(true);
  const popupClose = () => setOpen(false);

  return (
    <Stack direction={{ sm: "column", lg: "row" }} spacing={3}>
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
              {feature.rich("trend", {
                red: (chunks) => (
                  <span className="text-red-500">{chunks}</span>
                )
              })}
            </Typography>
            <Typography variant="body1" fontWeight="light">
              {feature.rich("trendSub", {
                red: (chunks) => (
                  <span className="text-red-500">{chunks}</span>
                ),
                br: () => <br />,
              })}
            </Typography>
          </Stack>
        </Box>
        <Box width={"60%"} my={2} display={"flex"} flexDirection={"column"} alignItems={"center"}>

          <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards]}
            initialSlide={activeIndex + 2}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className="w-60 max-h-75 select-none"
          >
            {
              trendings?.map(cardItem => (
                <SwiperSlide key={cardItem.syskey} className="flex items-center justify-center rounded-2xl">
                  <Card sx={{
                    maxWidth: 345, height: "100%",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
                    border: "1px solid rgba(0, 0, 0, 0.1)", borderRadius: "1rem"
                  }}>
                    <CardMedia onClick={popupOpen}
                      component="img"
                      alt={cardItem.product.name}
                      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                      image={'/images/' + cardItem.product.imageUrl}
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
              <Button sx={{
                backgroundColor: 'navy', color: 'white', borderRadius: '9999px', width: '100%',
                '&:disabled': { opacity: 0.5 }, display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
                variant="contained" startIcon={<CurrencyYen />}>{formatCurrency(activeCard.price)}</Button>
            </Box>
          }
          {
            activeCard &&
            <ItemPopup product={activeCard} genrename={activeCard.genre.name}
              catname={"UnknownCategory"} open={open} popupClose={popupClose} />
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
          my: { xs: 2 }
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          {feature.rich("explore", {
            red: (chunks) => (
              <span className="text-red-500">{chunks}</span>
            )
          })}
        </Typography>
        <Typography variant="body1" fontWeight="light">
          {feature("exploreSub")}
        </Typography>
        <Button href={URL_CATEGORIES} sx={{ color: "#fff", textTransform: "none", fontSize: 16, width: "fit-content", marginInlineStart: "auto" }} endIcon={<KeyboardArrowRightRounded fontSize="large" />}>
          {feature("exploreNav")}
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
            {feature.rich("createAcc", {
              red: (chunks) => (
                <span className="text-red-500">{chunks}</span>
              )
            })}
          </Typography>
          <Typography variant="body1" fontWeight="light">
            {feature("moreChanceSub")}
          </Typography>
          <Button href={URL_AUTH} sx={{ color: "#fff", textTransform: "none", fontSize: 16, width: "fit-content", marginInlineStart: "auto" }} endIcon={<KeyboardArrowRightRounded fontSize="large" />}>
            {feature("createAccNav")}
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
            {feature.rich("membership", {
              red: (chunks) => (
                <span className="text-red-500">{chunks}</span>
              )
            })}
          </Typography>
          <Typography variant="body1" fontWeight="light">
            {feature("moreChanceSub")}
          </Typography>
          <Button href={URL_AUTH} sx={{ color: "#fff", textTransform: "none", fontSize: 16, width: "fit-content", marginInlineStart: "auto" }} endIcon={<KeyboardArrowRightRounded fontSize="large" />}>
            {feature("membershipNav")}
          </Button>
        </Paper>
      </Stack>


    </Stack>
  )
}
