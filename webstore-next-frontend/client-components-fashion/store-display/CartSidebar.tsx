"use client";
import { gql } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import ItemPopup from '../info-details/ItemPopup';
import { useClientContext } from '@/app/fashion/clientstore/layout';
import { Box, Button, Card, CardContent, CardMedia, IconButton, List, ListItem, Tooltip, Typography } from '@mui/material';
import { ArrowLeftRounded, ArrowRightRounded, ChecklistRounded, CreditCardRounded, DeleteRounded } from '@mui/icons-material';
import { client } from '@/lib/apolloClient';

export default function CartSidebar({ toggleCartSide }: any) {
    const [cart, setCart] = useState<CartItem[]>([])
    const [selectedProduct, setSelectedProduct] = useState<Product>({ id: 0, code: 'P0', name: '', discount: 0, imageUrl: '/../', price: 0, category: {} as Category, genre: {} as Genre })
    const { cartSize, setCartSize, setNotibox } = useClientContext();
    const lastCartItem = cart.length - 1;

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
            .catch(err => console.log(err))
    }

    function getSubTotal() {
        let subtotal = 0.00;
        cart.forEach(cartItem => subtotal += cartItem.price);
        return subtotal > 0 ? formatAmount(subtotal) : 0;
    }

    function formatAmount(num: number) {
        if (num != undefined && num != null) {
            let numstr = String(num);
            numstr = numstr.replace(/,/g, "");
            var parts = numstr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return parts;
        } else return "";
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
                openNoti("success", "Added To Cart!");
            })
        } catch (error) {
            openNoti("error", "Failed To Add!");
        }
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
                openNoti("success", "Removed From Cart!");
            })
        } catch (error) {
            openNoti("error", "Failed To Remove!");
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
                openNoti("success", "Removed Certain Product!");
            })
        } catch (error) {
            openNoti("error", "Failed To Remove!");
        }
    }

    const [open, setOpen] = React.useState<boolean>(false);
    const popupOpen = () => setOpen(true);
    const popupClose = () => setOpen(false);
    const showpopup = (product: Product) => {
        setSelectedProduct(product);
        popupOpen();
    }

    const openNoti = (status: string, message: string) => {
        setNotibox({
            status: status,
            show: true,
            timeout: 3000,
            message: message
        })
    };

    return (
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
                <Typography variant="h6">Cart Content</Typography>
                <List>
                    {
                        cart.length == 0 &&
                        <div className="text-center w-full py-50 text-gray-400">No Cart Item Found!</div>
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
                                                Yen {formatAmount(cartItem.price)}
                                            </Typography>
                                        </CardContent>
                                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                            <Tooltip title={<Typography sx={{ fontSize: '14px' }}>Remove One</Typography>} placement="bottom">
                                                <IconButton size="large" color="inherit" onClick={() => removeLess(cartItem)}
                                                    sx={{ p: 0, ms: 2, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.2)' } }}>
                                                    <ArrowLeftRounded sx={{ height: 38, width: 38 }} />
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip title={<Typography sx={{ fontSize: '14px' }}>Quantity</Typography>} placement="bottom">
                                                <Button sx={{ px: 1, mx: 1, minWidth: 'auto' }} color="inherit" >{formatAmount(cartItem.quantity)}</Button>
                                            </Tooltip>

                                            <Tooltip title={<Typography sx={{ fontSize: '14px' }}>Add More</Typography>} placement="bottom">
                                                <IconButton size="large" color="inherit" onClick={() => addMore(cartItem)}
                                                    sx={{ p: 0, ms: 2, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.2)' } }}>
                                                    <ArrowRightRounded sx={{ height: 38, width: 38 }} />
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip title={<Typography sx={{ fontSize: '14px' }}>Delete Type</Typography>} placement="bottom">
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
                        <p>Subtotal :</p><p className="flex items-center">Yen {getSubTotal()}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                        <Button fullWidth variant="outlined" sx={{
                            borderColor: "#9CA3AF", color: "#374151", borderRadius: "999px",
                            transition: "background-color 0.2s", "&:hover": { backgroundColor: "black", color: "white" }, textTransform: "none"
                        }}>
                            <ChecklistRounded sx={{ marginRight: 1 }} /> View Cart
                        </Button>
                        <Button href={"/fashion/clientstore/checkout/0"} onClick={toggleCartSide(false)} fullWidth variant="outlined" sx={{
                            bgcolor: "black", color: "white", borderColor: "#9CA3AF", borderRadius: "999px",
                            transition: "background-color 0.2s", "&:hover": { backgroundColor: "white", color: "black" }, textTransform: "none"
                        }}>
                            <CreditCardRounded sx={{ marginRight: 1 }} /> Checkout
                        </Button>
                    </div>
                </div>
            </Box>
        </Box>
    )
}
