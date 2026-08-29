"use client";
import ButtonBlackWhite from '@/base-components/showbutton/ButtonBlackWhite';
import { client } from '@/lib/apolloClient';
import { URL_CATEGORIES } from '@/service/routeHandler';
import { gql } from '@apollo/client'
import { ArrowForwardRounded, AutoAwesome, Checkroom } from '@mui/icons-material';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Chip, Container, Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import { useRouter } from '@/i18n/navigation';
import { enqueueSnackbar } from 'notistack';
import React, { useState, useEffect } from 'react'
import { useAppTranslation } from '@/service/customHooks/useAppTranslation';

export default function CategoryGrid({ toggleCatSide }: any) {

  const [categories, setCategories] = useState<Category[]>([])
  const router = useRouter();
  const { common, home, noti } = useAppTranslation();
  const route2 = (url: string) => router.push(url)

  useEffect(() => {
    getAllCategories()
  }, [])

  async function getAllCategories() {
    await client.query<AllCategoriesResponse>({
      query: gql`
            query all{
            allCategories{
            id
            name
            bannerImageUrl
            genres {
              id
              name
              }
            }
            }
            `
    }).then(resp => {
      console.log('Categories', resp.data.allCategories)
      setCategories(resp.data.allCategories)
    }).catch(() => enqueueSnackbar(noti("fail2loadCat"), { variant: "error" }))
  }

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Stack spacing={1} mb={5}>
        <Typography variant="h4" fontWeight={700}>
          {home("showroomheader")}
        </Typography>
        <Typography color="text.secondary">
          {home("showroomsubheader")}
        </Typography>
      </Stack>

      <Grid container spacing={4}>
        {categories.map((category) => (
          <Grid
            key={category.id}
            size={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 3,
            }}>
            <Card elevation={3}
              sx={{
                height: 320, borderRadius: 4, overflow: "hidden", transition: ".3s",
                "&:hover": { transform: "translateY(-8px)", boxShadow: 8 },
              }}>

              <CardActionArea onClick={() => route2(`${URL_CATEGORIES}/${category.id}`)}>

                <CardMedia
                  component="img"
                  image={`/images/categorybanner/${category.bannerImageUrl}`}
                  alt={category.name}
                  sx={{
                    height: 160,
                    width: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />

                <CardContent>
                  <Stack spacing={2}>
                    <Typography variant="h6" fontWeight={700}>
                      {category.name}
                    </Typography>

                    <Box
                      sx={{
                        overflow: "hidden",
                        width: "100%",
                        position: "relative",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          width: "max-content",
                          animation: category.genres?.length > 3 ? "scrollLeft 15s linear infinite" : "none",

                          "@keyframes scrollLeft": {
                            "0%": {
                              transform: "translateX(0)",
                            },
                            "100%": {
                              transform: "translateX(-50%)",
                            },
                          },
                        }}
                      >
                        {category.genres?.map((genre) => (
                          <Chip
                            key={genre.id}
                            label={genre.name}
                            size="small"
                            variant="outlined"
                            sx={{ flexShrink: 0 }}
                          />
                        ))}
                      </Box>
                    </Box>

                    <Box>
                      <ButtonBlackWhite label={common('explore')} endIcon={<ArrowForwardRounded/>}/>
                    </Box>

                  </Stack>

                </CardContent>

              </CardActionArea>

            </Card>

          </Grid>

        ))}

      </Grid>

    </Container>
  );
}
