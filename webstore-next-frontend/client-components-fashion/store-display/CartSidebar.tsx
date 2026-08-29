"use client";
import { gql } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import ItemPopup from '../info-details/ItemPopup';
import { useClientContext } from '@/app/[locale]/fashion/clientstore/layout';
import { Box, Button, Card, CardContent, CardMedia, Drawer, IconButton, List, ListItem, Tooltip, Typography } from '@mui/material';
import { ArrowLeftRounded, ArrowRightRounded, ChecklistRounded, CloseRounded, CreditCardRounded, DeleteRounded } from '@mui/icons-material';
import { client } from '@/lib/apolloClient';
import { enqueueSnackbar } from 'notistack';
import { useRouter } from '@/i18n/navigation';
import { URL_CHECKOUT } from '@/service/routeHandler';
import { formatCurrency } from '@/service/generalUtils';
import ButtonWhiteBlack from '@/base-components/showbutton/ButtonWhiteBlack';
import ButtonBlackWhite from '@/base-components/showbutton/ButtonBlackWhite';
import { useAppTranslation } from '@/service/customHooks/useAppTranslation';

export default function CartSidebar({ toggleCartSide, cartOpen }: {toggleCartSide: (newOpen: boolean) => () => void, cartOpen : boolean}) {
    const [cart, setCart] = useState<CartItem[]>([])
    const [selectedProduct, setSelectedProduct] = useState<Product>({ id: 0, code: 'P0', name: '', discount: 0, imageUrl: '/../', price: 0, category: {} as Category, genre: {} as Genre })
    const { cartSize, setCartSize } = useClientContext();
    const { common, noti, carts } = useAppTranslation()
    const lastCartItem = cart.length - 1;
    const router = useRouter();
    const route2 = (url: string) => router.push(url)

    useEffect(() => {
        allCartItems()
    }, [cartSize])

    async function allCartItems() {
        await client.query<AllCartItemsResponse>({
            query: gql`
            query {
            allCartItems{
                productId
                productName
                productImage
                price
                quantity
            }
            }
            `, fetchPolicy: 'network-only' // refresh graphql cache -> fetch new data
        }).then(resp => setCart(resp.data.allCartItems))
            .catch(() => enqueueSnackbar(noti("fail2loadCart"), { variant: "error" }))
    }

    function getSubTotal() {
        let subtotal = 0.00;
        cart.forEach(cartItem => subtotal += cartItem.price);
        return subtotal > 0 ? formatCurrency(subtotal) : 0;
    }

    function cartItemToProduct(cartItem: CartItem) {
        let product: Product =
        {
            id: cartItem.productId,
            name: cartItem.productName,
            imageUrl: cartItem.productImage,
            price: (cartItem.price / cartItem.quantity),
            category: {} as Category,
            genre: {} as Genre,
            code: "P001",
            discount: 0.0
        }
        return product;
    }

    async function addMore(cartItem: CartItem) {
        try {
            await client.mutate<AddToCartResponse>({
                mutation: gql`
                mutation {
                addToCart(cartItem: {
                    productId: ${cartItem.productId},
                    productName: "${cartItem.productName}",
                    productImage: "${cartItem.productImage}",
                    price: ${cartItem.price}
                })
                }
                `, fetchPolicy: 'network-only'
            }).then(resp => {
                setCartSize(resp.data.addToCart);
                enqueueSnackbar(noti("cartadded"), { variant: "success" });
            })
        } catch (error) {
            enqueueSnackbar(noti("cartaddfailed"), { variant: "error" });
        }
    }

    const checkout = () => {
        toggleCartSide(false)
        route2(URL_CHECKOUT)
    }

    async function removeLess(cartItem: CartItem) {
        try {
            await client.mutate<RemoveFromCartResponse>({
                mutation: gql`
                mutation {
                removeFromCart(cartItem: {
                    productId: ${cartItem.productId},
                    productName: "${cartItem.productName}",
                    productImage: "${cartItem.productImage}",
                    price: ${cartItem.price}
                })
                }
                `, fetchPolicy: 'network-only'
            }).then(resp => {
                setCartSize(resp.data.removeFromCart);
                enqueueSnackbar(noti("cartremoved"), { variant: "success" });
            })
        } catch (error) {
            enqueueSnackbar(noti("cartremovefailed"), { variant: "error" });
        }
    }

    async function removeWhole(cartItem: CartItem) {
        try {
            await client.mutate<RemoveCertainItemResponse>({
                mutation: gql`
                mutation {
                removeCertainItem(cartItem: {
                    productId: ${cartItem.productId},
                    productName: "${cartItem.productName}",
                    productImage: "${cartItem.productImage}",
                    price: ${cartItem.price}
                })
                }
                `, fetchPolicy: 'network-only'
            }).then(resp => {
                setCartSize(resp.data.removeCertainItem);
                enqueueSnackbar(noti("cartclean1"), { variant: "success" });
            })
        } catch (error) {
            enqueueSnackbar(noti("cartclean1failed"), { variant: "error" });
        }
    }

    const [open, setOpen] = React.useState<boolean>(false);
    const popupOpen = () => setOpen(true);
    const popupClose = () => setOpen(false);
    const showpopup = (product: Product) => {
        setSelectedProduct(product);
        popupOpen();
    }

    const DrawerUI = (
        <Box
            sx={{
                width: 500, height: "100%", paddingBottom: "100px",
                overflowY: "auto",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": {
                    display: "none"
                }
            }} role="presentation"
        >
            <Box sx={{ flexGrow: 1, p: 2, bgcolor: "#eeeeee", height: "100%" }}>
                <Typography variant="h6">{carts("cartcontent")}</Typography>
                <List>
                    {
                        cart.length == 0 &&
                        <div className="text-center w-full py-50 text-gray-400">{carts("nocartitem")}</div>
                    }
                    {
                        cart.length > 0 && cart.map((cartItem, index) => (
                            <ListItem key={cartItem.productId} disablePadding sx={{ mt: 2, mb: index == lastCartItem ? 16 : 2 }}>

                                <Card sx={{ display: 'flex', width: "100%" }}>
                                    <CardMedia component="img" sx={{ maxWidth: "120px", cursor: "pointer", mx: 2 }} image={'/images/' + cartItem.productImage} alt={cartItem.productName}
                                        onClick={() => showpopup(cartItemToProduct(cartItem))} />
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <CardContent sx={{ flex: '1 0 auto' }}>
                                            <Typography sx={{ fontSize: "0.8rem" }} >{"Category : Genre"}</Typography>
                                            <Typography component="span" sx={{ fontSize: "1.2rem" }}>{cartItem.productName}</Typography>
                                            <Typography component="div" variant="subtitle1" sx={{ color: 'text.secondary' }}>
                                                Yen {formatCurrency(cartItem.price)}
                                            </Typography>
                                        </CardContent>
                                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                            <Tooltip title={<Typography sx={{ fontSize: '14px' }}>{carts("removeone")}</Typography>} placement="bottom">
                                                <IconButton size="large" color="inherit" onClick={() => removeLess(cartItem)}
                                                    sx={{ p: 0, ms: 2, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.2)' } }}>
                                                    <ArrowLeftRounded sx={{ height: 38, width: 38 }} />
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip title={<Typography sx={{ fontSize: '14px' }}>{carts("qty")}</Typography>} placement="bottom">
                                                <Button sx={{ px: 1, mx: 1, minWidth: 'auto' }} color="inherit" >{formatCurrency(cartItem.quantity)}</Button>
                                            </Tooltip>

                                            <Tooltip title={<Typography sx={{ fontSize: '14px' }}>{carts("addmore")}</Typography>} placement="bottom">
                                                <IconButton size="large" color="inherit" onClick={() => addMore(cartItem)}
                                                    sx={{ p: 0, ms: 2, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.2)' } }}>
                                                    <ArrowRightRounded sx={{ height: 38, width: 38 }} />
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip title={<Typography sx={{ fontSize: '14px' }}>{carts("deletetype")}</Typography>} placement="bottom">
                                                <IconButton size="large" color="inherit" onClick={() => removeWhole(cartItem)}
                                                    sx={{ p: 1, ms: 2, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.2)' } }}>
                                                    <DeleteRounded sx={{ height: 25, width: 25, color: "red" }} />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </Box>
                                </Card>
                            </ListItem>
                        ))}
                    {
                        selectedProduct &&
                        <ItemPopup product={selectedProduct} genrename={"GenreName"} catname={"CatName"}
                            open={open} popupClose={popupClose} />
                    }
                </List>
            </Box>

            <Box sx={{
                position: "fixed", bottom: 0, right: 0, width: 500,
                borderTop: "1px solid #ccc", p: 2, textAlign: "center", bgcolor: "background.paper"
            }}>
                <div className="container">
                    <div className="flex justify-between mt-3">
                        <p>{carts("subtotal")} :</p><p className="flex items-center">Yen {getSubTotal()}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                        <ButtonWhiteBlack label={common("close")} startIcon={<CloseRounded />} onClickFunc={toggleCartSide(false)} />
                        <ButtonBlackWhite label={carts('checkout')} endIcon={<CreditCardRounded />} onClickFunc={checkout} />
                    </div>
                </div>
            </Box>
        </Box>
    )

    return (
        <Drawer open={cartOpen} onClose={toggleCartSide(false)} anchor='right'>
            {DrawerUI}
        </Drawer>
    )
}
