import { useCheckoutContext } from '@/app/fashion/clientstore/checkout/CheckoutContext';
import { useClientContext } from '@/app/fashion/clientstore/layout';
import { client } from '@/lib/apolloClient';
import { gql } from '@apollo/client';
import { Box, Card, CardContent, CardMedia, List, ListItem, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'

export default function OrderConfirmation() {
    const [cart, setCart] = useState<CartItem[]>([])
    const { cartSize } = useClientContext();
    const lastCartItem = cart.length - 1;
    const { setHeader } = useCheckoutContext();

    useEffect(() => {
        setHeader("Order Confirmation");
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
    return (
        <div>

            <List>
                {
                    cart.length == 0 &&
                    <div className="text-center w-full py-50 text-gray-400">No Cart Item Found!</div>
                }
                {
                    cart.length > 0 && cart.map((cartItem, index) => (
                        <ListItem key={cartItem.productId} disablePadding sx={{ mt: 2, mb: index == lastCartItem ? 16 : 2 }}>

                            <Card sx={{ display: 'flex', width: "100%" }}>
                                <CardMedia component="img" sx={{ maxWidth: "120px", cursor: "pointer", mx: 2 }} image={'/images/' + cartItem.productImage} alt={cartItem.productName}/>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography sx={{ fontSize: "0.8rem" }} >{"Category : Genre"}</Typography>
                                        <Typography component="span" sx={{ fontSize: "1.2rem" }}>{cartItem.productName}</Typography>
                                        <Typography component="div" variant="subtitle1" sx={{ color: 'text.secondary' }}>
                                            Yen {formatAmount(cartItem.price)}
                                        </Typography>
                                    </CardContent>
                                </Box>
                            </Card>
                        </ListItem>
                    ))}
            </List>

        </div>
    )
}
