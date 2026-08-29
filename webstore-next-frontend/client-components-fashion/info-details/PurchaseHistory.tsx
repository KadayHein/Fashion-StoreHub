"use client";

import React, { useMemo, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Divider,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
    Button,
    IconButton,
} from "@mui/material";

import {
    SearchRounded,
    ReceiptLongRounded,
    ArrowForwardRounded,
    LocalShippingRounded,
    CheckCircleRounded,
    ScheduleRounded,
    CancelRounded,
} from "@mui/icons-material";
import { formatCurrency } from "@/service/generalUtils";

type PurchaseProduct = {
    productId: number;
    productName: string;
    productImage: string;
    price: number;
    quantity: number;
};

type PurchaseOrder = {
    orderId: string;
    orderDate: string;
    status: "PENDING" | "SHIPPING" | "DELIVERED" | "CANCELLED";
    products: PurchaseProduct[];
    shippingFee: number;
};

const purchaseHistory: PurchaseOrder[] = [
    {
        orderId: "GD-20260818-001",
        orderDate: "August 18, 2026",
        status: "DELIVERED",
        shippingFee: 500,
        products: [
            {
                productId: 1,
                productName: "Classic T-Shirt",
                productImage: "as2.png",
                price: 3000,
                quantity: 2,
            },
            {
                productId: 2,
                productName: "Slim Jeans",
                productImage: "as3.png",
                price: 5500,
                quantity: 1,
            },
        ],
    },

    {
        orderId: "GD-20260810-002",
        orderDate: "August 10, 2026",
        status: "SHIPPING",
        shippingFee: 500,
        products: [
            {
                productId: 3,
                productName: "Classic Polo",
                productImage: "pl1.png",
                price: 4500,
                quantity: 1,
            },
        ],
    },

    {
        orderId: "GD-20260728-003",
        orderDate: "July 28, 2026",
        status: "DELIVERED",
        shippingFee: 0,
        products: [
            {
                productId: 4,
                productName: "City Tee",
                productImage: "as13.jpg",
                price: 3500,
                quantity: 1,
            },
            {
                productId: 5,
                productName: "Cargo Jeans",
                productImage: "as14.jpg",
                price: 6500,
                quantity: 1,
            },
        ],
    },
];


const getOrderSubtotal = (order: PurchaseOrder) => {
    return order.products.reduce(
        (total, product) =>
            total + product.price * product.quantity,
        0
    );
};


const getOrderTotal = (order: PurchaseOrder) => {
    return getOrderSubtotal(order) + order.shippingFee;
};

function OrderStatus({ status }: { status: PurchaseOrder["status"] }) {

    const config = {
        PENDING: {
            label: "Pending",
            color: "warning" as const,
            icon: <ScheduleRounded />,
        },

        SHIPPING: {
            label: "Shipping",
            color: "info" as const,
            icon: <LocalShippingRounded />,
        },

        DELIVERED: {
            label: "Delivered",
            color: "success" as const,
            icon: <CheckCircleRounded />,
        },

        CANCELLED: {
            label: "Cancelled",
            color: "error" as const,
            icon: <CancelRounded />,
        },
    };

    const item = config[status];

    return (
        <Chip
            size="small"
            color={item.color}
            icon={item.icon}
            label={item.label}
            variant="outlined"
        />
    );
}

function PurchaseCard({
    order,
    onViewDetails,
}: {
    order: PurchaseOrder;
    onViewDetails: (order: PurchaseOrder) => void;
}) {

    const subtotal = getOrderSubtotal(order);
    const total = getOrderTotal(order);

    const itemCount = order.products.reduce(
        (total, product) =>
            total + product.quantity,
        0
    );

    return (
        <Card
            elevation={2}
            sx={{
                width: "100%",
                borderRadius: 3,
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    px: { xs: 2, sm: 3 },
                    py: 2,
                    display: "flex",
                    flexDirection: {
                        xs: "column",
                        sm: "row",
                    },
                    justifyContent: "space-between",
                    alignItems: {
                        xs: "flex-start",
                        sm: "center",
                    },
                    gap: 1,
                }}
            >

                <Box>
                    <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                    >
                        {order.orderId}
                    </Typography>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                    >
                        {order.orderDate}
                    </Typography>
                </Box>

                <OrderStatus status={order.status} />

            </Box>

            <Divider />

            <CardContent
                sx={{
                    px: { xs: 2, sm: 3 },
                    py: 2,
                }}
            >
                <Stack spacing={2}>
                    {order.products.map((product) => (
                        <Box
                            key={product.productId}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: { xs: 1.5, sm: 2 },
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={`/images/${product.productImage}`}
                                alt={product.productName}
                                sx={{
                                    width: {
                                        xs: 65,
                                        sm: 85,
                                    },
                                    height: {
                                        xs: 65,
                                        sm: 85,
                                    },
                                    borderRadius: 2,
                                    objectFit: "cover",
                                    flexShrink: 0,
                                    bgcolor: "grey.100",
                                }}
                            />
                            <Box
                                sx={{
                                    flex: 1,
                                    minWidth: 0,
                                }}
                            >

                                <Typography
                                    variant="body1"
                                    fontWeight="medium"
                                    noWrap
                                >
                                    {product.productName}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Quantity: {product.quantity}
                                </Typography>

                            </Box>

                            <Typography
                                fontWeight="bold"
                                sx={{
                                    whiteSpace: "nowrap",
                                    fontSize: {
                                        xs: "0.85rem",
                                        sm: "1rem",
                                    },
                                }}
                            >
                                ¥{formatCurrency(
                                    product.price *
                                    product.quantity
                                )}
                            </Typography>

                        </Box>

                    ))}

                </Stack>
            </CardContent>

            <Divider />

            <Box
                sx={{
                    px: { xs: 2, sm: 3 }, py: 2,
                    display: "flex",
                    flexDirection: {
                        xs: "column",
                        sm: "row",
                    },
                    alignItems: {
                        xs: "stretch",
                        sm: "center",
                    },
                    justifyContent: "space-between", gap: 2,
                }}
            >
                <Box>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                    >
                        {itemCount}{" "}
                        {itemCount === 1
                            ? "item"
                            : "items"}
                    </Typography>

                    <Typography
                        variant="h6"
                        fontWeight="bold"
                    >
                        ¥{formatCurrency(total)}
                    </Typography>

                    {order.shippingFee > 0 && (
                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            Including ¥
                            {formatCurrency(
                                order.shippingFee
                            )} shipping
                        </Typography>
                    )}
                </Box>

                <Button
                    variant="outlined"
                    endIcon={<ArrowForwardRounded />}
                    onClick={() =>
                        onViewDetails(order)
                    }
                    sx={{
                        borderRadius: 999,
                        width: {
                            xs: "100%",
                            sm: "auto",
                        },
                    }}
                >
                    View Details
                </Button>

            </Box>

        </Card>
    );
}


export default function PurchaseHistory() {

    const [searchText, setSearchText] = useState("");

    const [status, setStatus] =
        useState("ALL");


    const filteredOrders = useMemo(() => {

        return purchaseHistory.filter((order) => {

            const matchesStatus =
                status === "ALL" ||
                order.status === status;

            const search =
                searchText.trim().toLowerCase();

            const matchesSearch =
                !search ||
                order.orderId
                    .toLowerCase()
                    .includes(search) ||

                order.products.some(product =>
                    product.productName
                        .toLowerCase()
                        .includes(search)
                );

            return matchesStatus && matchesSearch;
        });

    }, [searchText, status]);


    const handleViewDetails = (
        order: PurchaseOrder
    ) => {
        console.log(
            "Open order:",
            order.orderId
        );

        // router.push(
        //   `/fashion/clientstore/orders/${order.orderId}`
        // );
    };


    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: 1000,
                mx: "auto",
                px: {
                    xs: 2,
                    sm: 3,
                    md: 4,
                },
                py: {
                    xs: 3,
                    sm: 5,
                },
            }}
        >
            <Stack
                direction="row"
                alignItems="center"
                spacing={1.5}
                mb={1}
            >
                <ReceiptLongRounded />

                <Typography
                    variant="h5"
                    fontWeight="bold"
                >
                    Purchase History
                </Typography>
            </Stack>

            <Typography
                variant="body2"
                color="text.secondary"
                mb={3}
            >
                View your previous orders and purchase
                details.
            </Typography>

            <Stack
                direction={"row"}
                spacing={1.5}
                mb={4}
            >

                <TextField
                    fullWidth
                    size="small"
                    placeholder="Search orders or products..."
                    value={searchText}
                    onChange={(e) =>
                        setSearchText(
                            e.target.value
                        )
                    }
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchRounded />
                            </InputAdornment>
                        ),
                    }}
                />
                <FormControl
                    size="small"
                    sx={{
                        minWidth: 160
                    }}
                >
                    <InputLabel>Status</InputLabel>

                    <Select
                        value={status}
                        label="Status"
                        onChange={(e) =>
                            setStatus(e.target.value)
                        }
                    >
                        <MenuItem value="ALL">All Orders</MenuItem>
                        <MenuItem value="PENDING">Pending</MenuItem>
                        <MenuItem value="SHIPPING">Shipping</MenuItem>
                        <MenuItem value="DELIVERED">Delivered</MenuItem>
                        <MenuItem value="CANCELLED">Cancelled</MenuItem>
                    </Select>

                </FormControl>

            </Stack>

            {filteredOrders.length > 0 ? (

                <Stack spacing={2.5}>

                    {filteredOrders.map(order => (

                        <PurchaseCard
                            key={order.orderId}
                            order={order}
                            onViewDetails={
                                handleViewDetails
                            }
                        />

                    ))}

                </Stack>

            ) : (

                <Box
                    sx={{
                        py: 10,
                        textAlign: "center",
                        color: "text.secondary",
                    }}
                >
                    <ReceiptLongRounded
                        sx={{
                            fontSize: 60,
                            opacity: 0.3,
                            mb: 2,
                        }}
                    />
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                    >
                        No Purchase History
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{ mt: 1 }}
                    >
                        We couldn't find any orders
                        matching your search.
                    </Typography>
                </Box>
            )}
        </Box>
    );
}