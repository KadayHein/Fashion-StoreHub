"use client"
import { useClientContext } from '@/app/[locale]/fashion/clientstore/layout'
import { client } from '@/lib/apolloClient';
import { useAppTranslation } from '@/service/customHooks/useAppTranslation';
import { formatCurrency } from '@/service/generalUtils';
import { CartIcon, FavouriteIcon } from '@/service/svgIconUtils';
import { gql } from '@apollo/client'
import { CloseRounded } from '@mui/icons-material';
import { Backdrop, Box, Button, Divider, Fade, FormControl, Grid, IconButton, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, Tooltip, Typography } from '@mui/material'
import { enqueueSnackbar } from 'notistack';
import React from 'react'

interface ItemPopupProps {
  product: Product;
  genrename: string;
  catname: string;
  open: boolean;
  popupClose: () => void;
}
export default function ItemPopup({ product, genrename, catname, open, popupClose }: ItemPopupProps) {

  const { setCartSize } = useClientContext();
  const { noti, carts, common } = useAppTranslation();
  const [color, setColor] = React.useState<string>('');
  const [size, setSize] = React.useState<string>('');

  const availableColors = [
    { colorValue: 10, colorName: "White" },
    { colorValue: 20, colorName: "Black" },
    { colorValue: 30, colorName: "Blue" },
    { colorValue: 40, colorName: "Gray" },
    { colorValue: 50, colorName: "Pink" },
    { colorValue: 60, colorName: "Navy" }
  ]

  const onchangecolor = (event: SelectChangeEvent) => {
    setColor(event.target.value as string);
  };

  const availableSizes = [
    { sizeValue: 10, size: "Small" },
    { sizeValue: 20, size: "Medium" },
    { sizeValue: 30, size: "Large" },
    { sizeValue: 40, size: "Extra Large" },
    { sizeValue: 50, size: "2XL" },
    { sizeValue: 60, size: "3XL" }
  ]

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

  async function addToCart() {
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
        // openNoti("success");
        enqueueSnackbar(noti("cartadded"), { variant: "success" });
      })
    } catch (error) {
      enqueueSnackbar(noti("cartaddfailed"), { variant: "error" });
    }
  }


  return (
    <Modal
      aria-labelledby="product-modal-title"
      aria-describedby="product-modal-description"
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
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",

            width: {
              xs: "95%",
              sm: "90%",
              md: 850,
            },

            maxHeight: "90vh",
            overflowY: "auto",

            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: 24,
            p: {
              xs: 2,
              sm: 3,
            },
          }}
        >
          <Grid
            container
            spacing={{
              xs: 2,
              md: 4,
            }}
          >

            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: {
                      xs: 300,
                      sm: 400,
                      md: 450,
                    },
                    bgcolor: "grey.100",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    component="img"
                    src={`/images/${product.imageUrl}`}
                    alt={product.name}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />

                  {/* Favourite - Overlay */}
                  <Tooltip title={carts("add2fav")} placement="left">
                    <IconButton
                      //onClick={addToFavourite}
                      sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,

                        width: 48,
                        height: 48,

                        bgcolor: "background.paper",

                        boxShadow: 2,

                        "&:hover": {
                          bgcolor: "background.paper",
                          transform: "scale(1.1)",
                        },

                        transition: "transform 0.2s",
                      }}
                    >
                      <FavouriteIcon
                        width={30}
                        height={30}
                      />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Grid>


            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1,
                    mb: 1,
                  }}
                >
                  {/* Product Name */}
                  <Typography
                    id="product-modal-title"
                    variant="h5"
                    fontWeight={700}
                    sx={{
                      minWidth: 0,
                      wordBreak: "break-word",
                    }}
                  >
                    {product.name}
                  </Typography>

                  {/* Close Button - LG only */}
                  <IconButton
                    aria-label="close"
                    onClick={popupClose}
                    sx={{
                      display: {
                        xs: "none",
                        lg: "flex",
                      },
                      flexShrink: 0,
                    }}
                  >
                    <CloseRounded />
                  </IconButton>
                </Box>

                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {common("category")}
                  </Typography>

                  <Typography variant="body1">{catname}</Typography>
                </Box>


                {/* Genre */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    {common("genre")}
                  </Typography>

                  <Typography variant="body1">{genrename}</Typography>
                </Box>


                <Divider sx={{ mb: 2 }} />

                <Grid
                  container
                  spacing={2}
                  sx={{ mb: 2 }}
                >
                  <Grid size={{ xs: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel id="size-select-label">
                        {common("size")}
                      </InputLabel>

                      <Select
                        labelId="size-select-label"
                        id="size-select"
                        value={size}
                        label={common("size")}
                        onChange={onchangesize}
                      >
                        {
                          availableSizes && availableSizes.map(avSize => (
                            <MenuItem key={avSize.sizeValue} value={avSize.sizeValue}>{avSize.size}</MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  </Grid>


                  <Grid size={{ xs: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel id="color-select-label">
                        {common("color")}
                      </InputLabel>

                      <Select
                        labelId="color-select-label"
                        id="color-select"
                        value={color}
                        label={common("color")}
                        onChange={onchangecolor}
                      >
                        {
                          availableColors && availableColors.map(avColor => (
                            <MenuItem key={avColor.colorValue} value={avColor.colorValue}>{avColor.colorName}</MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {common("price")}
                  </Typography>

                  <Typography
                    variant="h5"
                    fontWeight={700}
                    color="primary"
                  >
                    ¥ {formatCurrency(product.price)}
                  </Typography>
                </Box>


                <Divider sx={{ mb: 2 }} />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: {
                      md: "row",
                      xs: "column"
                    },
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: 1,
                    mt: "auto",
                  }}
                >
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<CloseRounded width={25} height={25} />}
                    onClick={popupClose}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      fontSize: "1rem",
                      fontWeight: 600,
                      textTransform: "none",
                      display: { md: "none", xs: "flex" }
                    }}
                  >
                    {common("close")}
                  </Button>

                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<CartIcon width={25} height={25} />}
                    onClick={addToCart}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      fontSize: "1rem",
                      fontWeight: 600,
                      textTransform: "none",
                    }}
                  >
                    {carts("add2cart")}
                  </Button>

                </Box>

              </Box>
            </Grid>

          </Grid>
        </Box>
      </Fade>
    </Modal>
  )
}
