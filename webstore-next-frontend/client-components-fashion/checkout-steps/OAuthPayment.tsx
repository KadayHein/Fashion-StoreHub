"use client"
import {
    Avatar,
    Box,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography,
} from "@mui/material";

import {
    CheckCircle,
    CompareArrowsRounded,
    HandshakeRounded,
} from "@mui/icons-material";
import { useCheckoutContext } from '@/app/[locale]/fashion/clientstore/checkout/CheckoutContext';
import { formatCurrency } from "@/service/generalUtils";
import { URL_WEBLOGO } from "@/service/routeHandler";
import { useAppTranslation } from "@/service/customHooks/useAppTranslation";
import { useEffect } from "react";

export default function OAuthPayment() {

    const { cart, selectedPayment, backstep, nextstep } = useCheckoutContext()
    const { checkout, payment } = useAppTranslation()
    useEffect(() => {
        if (selectedPayment == null) backstep()
    }, [selectedPayment, backstep]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                py: 3,
                px: { xs: 2, sm: 4 },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: { xs: 1.5, sm: 3 },
                    width: "100%",
                    mb: 3,
                }}
            >

                <Box
                    sx={{
                        width: { xs: 64, sm: 80 },
                        height: { xs: 64, sm: 80 },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 2,
                        bgcolor: "#fff",
                        border: "1px solid",
                        borderColor: "divider",
                        boxShadow: 1,
                        overflow: "hidden",
                        flexShrink: 0,
                    }}
                >
                    <img
                        src={URL_WEBLOGO}
                        alt="GD-StoreHub"
                        style={{
                            width: "80%",
                            height: "80%",
                            objectFit: "contain",
                        }}
                    />
                </Box>


                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "text.secondary",
                        flexShrink: 0,
                    }}
                >
                    <CompareArrowsRounded
                        sx={{
                            fontSize: {
                                xs: 28,
                                sm: 36,
                            },
                        }}
                    />
                </Box>

                <Box
                    sx={{
                        width: { xs: 64, sm: 80 },
                        height: { xs: 64, sm: 80 },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 2,
                        bgcolor: "#fff",
                        border: "1px solid",
                        borderColor: "divider",
                        boxShadow: 1,
                        overflow: "hidden",
                        flexShrink: 0,
                    }}
                >
                    {selectedPayment?.icon}
                </Box>

            </Box>


            <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
            >
                {payment("connectTitle", {
                    paymentName: selectedPayment?.name,
                })}
            </Typography>

            <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                    maxWidth: 420,
                }}
            >
                {payment("connectDescription", {
                    paymentName: selectedPayment?.name,
                })}
            </Typography>

            <Paper
                variant="outlined"
                sx={{
                    width: "100%",
                    maxWidth: 400,
                    p: 2,
                    mt: 1,
                    mb: 3,
                    borderRadius: 2,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                    }}
                >
                    <Avatar>KH</Avatar>

                    <Box sx={{ textAlign: "left", flex: 1 }}>
                        <Typography fontWeight="bold">
                            Kaday Hein
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            kadayhein@example.com
                        </Typography>
                    </Box>
                </Box>
            </Paper>

            <Box
                sx={{
                    width: "100%",
                    maxWidth: 400,
                    textAlign: "left",
                    mb: 3,
                }}
            >
                <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    gutterBottom
                >
                    {payment("willBeAllowedTo", {
                        paymentName: selectedPayment?.name,
                    })}
                </Typography>

                <List dense>
                    <ListItem disableGutters>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                            <CheckCircle color="success" />
                        </ListItemIcon>

                        <ListItemText
                            primary={payment("confirmPayment")}
                        />
                    </ListItem>

                    <ListItem disableGutters>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                            <CheckCircle color="success" />
                        </ListItemIcon>

                        <ListItemText
                            primary={payment("processPaymentAmount")}
                        />
                    </ListItem>

                    <ListItem disableGutters>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                            <CheckCircle color="success" />
                        </ListItemIcon>

                        <ListItemText
                            primary={payment("returnPaymentStatus")}
                        />
                    </ListItem>
                </List>
            </Box>

            {/* Amount */}
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 400,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    py: 2,
                    borderTop: "1px solid",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    mb: 3,
                }}
            >
                <Typography color="text.secondary">
                    {payment("paymentAmount")}
                </Typography>

                <Typography
                    variant="h6"
                    fontWeight="bold"
                >
                    ¥ {formatCurrency(
                        cart.reduce(
                            (total, item) =>
                                total + item.price * item.quantity,
                            0
                        )
                    )}
                </Typography>
            </Box>

            <Button
                fullWidth
                variant="contained"
                disabled={selectedPayment == null}
                size="large"
                sx={{
                    maxWidth: 400,
                    borderRadius: 2,
                    py: 1.5,
                }}
                onClick={nextstep}
            >
                {checkout("buttons.allowContinue")}
            </Button>

            <Button
                fullWidth
                size="small"
                sx={{
                    maxWidth: 400,
                    mt: 1,
                }}
                onClick={backstep}
            >
                {checkout("buttons.cancel")}
            </Button>

            <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 2 }}
            >
                {payment("simulationNotice")}
            </Typography>
        </Box>
    )
}
