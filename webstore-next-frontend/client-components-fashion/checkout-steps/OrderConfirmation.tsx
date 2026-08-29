import { useCheckoutContext } from '@/app/[locale]/fashion/clientstore/checkout/CheckoutContext';
import { useRouter } from '@/i18n/navigation';
import { useAppTranslation } from '@/service/customHooks/useAppTranslation';
import { formatCurrency } from '@/service/generalUtils';
import { URL_CATEGORIES } from '@/service/routeHandler';
import { CheckCircleRounded, LocalMallRounded } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardMedia, List, ListItem, Stack, Typography } from '@mui/material';
import React from 'react'

export default function OrderConfirmation() {
    const { cart, nextstep } = useCheckoutContext();
    const { carts, checkout } = useAppTranslation();
    const router = useRouter()
    const lastCartItem = cart.length - 1;
    const subTotal = formatCurrency(
        cart.reduce(
            (total, item) =>
                total + item.price * item.quantity,
            0
        )
    )

    return (
        <>
            <Box
                sx={{
                    height: 330,
                    overflowY: "auto",
                    width: "100%",
                    pr: 1,
                    "&::-webkit-scrollbar": {
                        width: 6,
                    },
                    "&::-webkit-scrollbar-thumb": {
                        borderRadius: 3,
                        backgroundColor: "rgba(0,0,0,0.25)",
                    }
                }}>
                <List>
                    {
                        cart.length == 0 &&
                        <div className="text-center w-full py-50 text-gray-400">No Cart Item Found!</div>
                    }
                    {
                        cart.length > 0 && cart.map((cartItem, index) => (
                            <ListItem key={cartItem.productId} disablePadding sx={{ mt: 1, mb: index == lastCartItem ? 8 : 2 }}>

                                <Card sx={{ display: 'flex', width: "100%" }}>
                                    <CardMedia component="img" sx={{ maxWidth: "120px", cursor: "pointer", mx: 2 }} image={'/images/' + cartItem.productImage} alt={cartItem.productName} />
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <CardContent sx={{ flex: '1 0 auto' }}>
                                            <Typography sx={{ fontSize: "0.8rem" }} >{"Category : Genre"}</Typography>
                                            <Typography component="span" sx={{ fontSize: "1.2rem" }}>{cartItem.productName}</Typography>
                                            <Typography component="div" variant="subtitle1" sx={{ color: 'text.secondary' }}>
                                                ¥ {formatCurrency(cartItem.price)}
                                            </Typography>
                                            <Typography component="div" variant="subtitle1" sx={{ color: 'text.secondary' }}>
                                                {cartItem.quantity} {carts("pcs")}
                                            </Typography>
                                        </CardContent>
                                    </Box>
                                </Card>
                            </ListItem>
                        ))}
                </List>
            </Box>
            <Box sx={{ width: "100%" }}>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        px: 2,
                        py: 1,
                        borderTop: "1px solid",
                        borderColor: "divider",
                    }}
                >
                    <Box>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {carts("items")}
                        </Typography>

                        <Typography
                            variant="h6"
                            fontWeight="bold"
                        >
                            {cart.length} {carts("pcs")}
                        </Typography>
                    </Box>

                    <Box sx={{ textAlign: "right" }}>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {carts("subtotal")}
                        </Typography>

                        <Typography
                            variant="h6"
                            fontWeight="bold"
                        >
                            ¥ {subTotal}
                        </Typography>
                    </Box>
                </Box>

                <Stack width={"100%"} direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                    <Button fullWidth variant="outlined" size="large"
                        startIcon={<LocalMallRounded />} onClick={() => router.push(URL_CATEGORIES)}>
                        {checkout("buttons.backToShopping")}
                    </Button>

                    <Button fullWidth variant="contained" size="large"
                        endIcon={<CheckCircleRounded />} onClick={nextstep}>
                        {checkout("buttons.confirm")}
                    </Button>
                </Stack>
            </Box >
        </>
    )
}
