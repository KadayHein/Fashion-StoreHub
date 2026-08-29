"use client";

import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";

import {
    CheckCircle,
    HistoryRounded,
    LocalMallRounded,
    LocalShipping,
    LocationOn,
    Payment,
    ShoppingBag,
} from "@mui/icons-material";
import { formatCurrency, formatDate_MM_DD, formatDate_MM_DD_YY } from "@/service/generalUtils";
import { useCheckoutContext } from "@/app/[locale]/fashion/clientstore/checkout/layout";
import { useRouter } from "@/i18n/navigation";
import { URL_CATEGORIES } from "@/service/routeHandler";
import { useEffect } from "react";
import { useAppTranslation } from "@/service/customHooks/useAppTranslation";

export default function PaymentComplete() {

    const { selectedPayment, cart, backstep } = useCheckoutContext()

    const { paymentComplete } = useAppTranslation()

    const router = useRouter()

    useEffect(() => {
        if (selectedPayment == null) backstep()
    }, [selectedPayment, backstep]);

    const orderNumber = "GD-20260817-001";

    const itemCount = cart.length;
    const subtotal = cart.reduce((total, item) =>
        total + item.price * item.quantity,
        0
    )
    const shippingFee = 500;
    const total = subtotal + shippingFee;

    const orderDate = new Date();

    const arrivingFrom = new Date(orderDate);
    arrivingFrom.setDate(arrivingFrom.getDate() + 4);

    const arrivingTo = new Date(orderDate);
    arrivingTo.setDate(arrivingTo.getDate() + 7);

    const arrivingDate = `${formatDate_MM_DD(arrivingFrom)} – ${formatDate_MM_DD(arrivingTo)}`;

    const customer = {
        name: "Kaday Hein",
        address: "Fukuoka, Japan",
    };

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: 650,
                mx: "auto",
                px: { xs: 2, sm: 3 },
                py: { xs: 3, sm: 5 },
            }}
        >

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    mb: 4,
                }}
            >
                <Avatar
                    sx={{
                        width: 72,
                        height: 72,
                        bgcolor: "success.main",
                        mb: 2,
                    }}
                >
                    <CheckCircle sx={{ fontSize: 48 }} />
                </Avatar>

                <Typography
                    variant="h5"
                    fontWeight="bold"
                    gutterBottom
                >
                    {paymentComplete("successTitle")}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    {paymentComplete("thankYou", {
                        customerName: customer.name
                    })}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    {paymentComplete("paymentCompleted")}
                </Typography>

                <Chip
                    label={paymentComplete("orderConfirmed")}
                    color="success"
                    variant="outlined"
                    sx={{ mt: 2 }}
                />
            </Box>

            <Card
                elevation={2}
                sx={{
                    borderRadius: 3,
                    mb: 2,
                }}
            >
                <CardContent>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                        }}
                    >
                        <Box>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                {paymentComplete("orderNumber")}
                            </Typography>

                            <Typography
                                fontWeight="bold"
                            >
                                {orderNumber}
                            </Typography>
                        </Box>

                        <Box sx={{ textAlign: "right" }}>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                {paymentComplete("orderDate")}
                            </Typography>

                            <Typography
                                variant="body2"
                                fontWeight="bold"
                            >
                                {formatDate_MM_DD_YY(orderDate)}
                            </Typography>
                        </Box>
                    </Box>

                </CardContent>
            </Card>

            <Card
                elevation={2}
                sx={{
                    borderRadius: 3,
                    mb: 2,
                }}
            >
                <CardContent>

                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{ mb: 2 }}
                    >
                        {paymentComplete("deliveryInformation")}
                    </Typography>

                    <List disablePadding>

                        <ListItem disableGutters>
                            <ListItemIcon>
                                <LocalShipping color="primary" />
                            </ListItemIcon>

                            <ListItemText
                                primary={paymentComplete("estimatedArrival")}
                                secondary={arrivingDate}
                            />
                        </ListItem>


                        <ListItem disableGutters>
                            <ListItemIcon>
                                <LocationOn color="primary" />
                            </ListItemIcon>

                            <ListItemText
                                primary={paymentComplete("shippingAddress")}
                                secondary={
                                    <>
                                        {customer.name}
                                        <br />
                                        {customer.address}
                                    </>
                                }
                            />
                        </ListItem>

                    </List>

                    <Chip
                        label={paymentComplete("standardDelivery")}
                        size="small"
                        variant="outlined"
                        sx={{ mt: 1 }}
                    />

                </CardContent>
            </Card>

            <Card
                elevation={2}
                sx={{
                    borderRadius: 3,
                    mb: 2,
                }}
            >
                <CardContent>

                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{ mb: 2 }}
                    >
                        {paymentComplete("paymentInformation")}
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                        }}
                    >

                        <Avatar
                            sx={{
                                bgcolor: "background.default",
                                color: "text.primary",
                            }}
                        >
                            <Payment />
                        </Avatar>

                        <Box sx={{ flex: 1 }}>
                            <Typography fontWeight="bold">
                                {selectedPayment?.name}
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                {paymentComplete("paymentCompletedShort")}
                            </Typography>
                        </Box>

                        <Typography
                            fontWeight="bold"
                            color="success.main"
                        >
                            ¥ {formatCurrency(total)}
                        </Typography>

                    </Box>

                </CardContent>
            </Card>

            <Card
                elevation={2}
                sx={{
                    borderRadius: 3,
                    mb: 3,
                }}
            >
                <CardContent>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 2,
                        }}
                    >
                        <ShoppingBag color="primary" />

                        <Typography
                            variant="h6"
                            fontWeight="bold"
                        >
                            {paymentComplete("orderSummary")}
                        </Typography>
                    </Box>


                    <Stack spacing={1.5}>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography color="text.secondary">
                                {paymentComplete("items")}
                            </Typography>

                            <Typography>
                                {itemCount} {paymentComplete("itemCount")}
                            </Typography>
                        </Box>


                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography color="text.secondary">
                                {paymentComplete("subtotal")}
                            </Typography>

                            <Typography>
                                ¥ {formatCurrency(subtotal)}
                            </Typography>
                        </Box>


                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography color="text.secondary">
                                {paymentComplete("shipping")}
                            </Typography>

                            <Typography>
                                ¥ {formatCurrency(shippingFee)}
                            </Typography>
                        </Box>

                    </Stack>


                    <Divider sx={{ my: 2 }} />


                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                        >
                            {paymentComplete("total")}
                        </Typography>

                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            color="primary"
                        >
                            ¥ {formatCurrency(total)}
                        </Typography>
                    </Box>

                </CardContent>
            </Card>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <Button fullWidth variant="outlined" size="large"
                    startIcon={<HistoryRounded />}
                    onClick={() => { router.push("/fashion/clientstore/orders/history") }}>
                    {paymentComplete("viewOrder")}
                </Button>

                <Button fullWidth variant="contained" size="large"
                    endIcon={<LocalMallRounded />}
                    onClick={() => { router.push(URL_CATEGORIES) }}>
                    {paymentComplete("continueShopping")}
                </Button>
            </Stack>

        </Box>
    );
}