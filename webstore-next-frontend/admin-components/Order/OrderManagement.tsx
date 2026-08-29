"use client";

import React, { useMemo, useState } from "react";

import {
    Avatar,
    Box,
    Button,
    Card,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Pagination,
    Paper,
    Select,
    SelectChangeEvent,
    Stack,
    Tab,
    Tabs,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";

import {
    CheckCircleRounded,
    CloseRounded,
    LocalShippingRounded,
    MoreVertRounded,
    PendingActionsRounded,
    PersonRounded,
    ReceiptLongRounded,
    SearchRounded,
    ShoppingBagRounded,
    VisibilityRounded,
} from "@mui/icons-material";
import { useMobileScroll } from "@/service/customHooks/useMobileScroll";


// ============================================================
// TYPES
// ============================================================

type OrderStatus =
    | "PENDING"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED";

interface OrderItem {
    id: number;
    product: string;
    sku: string;
    image: string;
    quantity: number;
    price: number;
    size: string;
    color: string;
}

interface Order {
    id: string;
    customer: string;
    email: string;
    phone: string;

    status: OrderStatus;

    orderedAt: string;
    updatedAt: string;

    paymentStatus:
        | "PAID"
        | "PENDING"
        | "REFUNDED";

    paymentMethod:
        | "CREDIT_CARD"
        | "CASH_ON_DELIVERY"
        | "BANK_TRANSFER";

    shippingAddress: string;

    shippingMethod: string;

    items: OrderItem[];

    subtotal: number;
    shippingFee: number;
    discount: number;
    total: number;
}


// ============================================================
// MOCK DATA
// ============================================================

const orders: Order[] = [

    {
        id: "ORD-20260825-001",
        customer: "Kaday Hein",
        email: "kaday@example.com",
        phone: "090-1234-5678",

        status: "PENDING",

        orderedAt: "2026-08-25 09:30",
        updatedAt: "2026-08-25 09:30",

        paymentStatus: "PAID",
        paymentMethod: "CREDIT_CARD",

        shippingAddress:
            "Osaka, Japan",

        shippingMethod:
            "Yamato Transport",

        items: [
            {
                id: 1,
                product: "Oversized Cotton T-Shirt",
                sku: "TSH-OS-001",
                image:
                    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
                quantity: 2,
                price: 3980,
                size: "L",
                color: "Black",
            },
        ],

        subtotal: 7960,
        shippingFee: 600,
        discount: 500,
        total: 8060,
    },


    {
        id: "ORD-20260825-002",
        customer: "John Smith",
        email: "john@example.com",
        phone: "080-9876-5432",

        status: "PROCESSING",

        orderedAt: "2026-08-25 08:15",
        updatedAt: "2026-08-25 09:00",

        paymentStatus: "PAID",
        paymentMethod: "CREDIT_CARD",

        shippingAddress:
            "Fukuoka, Japan",

        shippingMethod:
            "Japan Post",

        items: [
            {
                id: 2,
                product: "Wide Leg Cargo Pants",
                sku: "PNT-WC-002",
                image:
                    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
                quantity: 1,
                price: 6980,
                size: "M",
                color: "Beige",
            },
        ],

        subtotal: 6980,
        shippingFee: 600,
        discount: 0,
        total: 7580,
    },


    {
        id: "ORD-20260824-003",
        customer: "Sarah Tanaka",
        email: "sarah@example.com",
        phone: "070-5555-1234",

        status: "SHIPPED",

        orderedAt: "2026-08-24 14:20",
        updatedAt: "2026-08-24 18:00",

        paymentStatus: "PAID",
        paymentMethod: "BANK_TRANSFER",

        shippingAddress:
            "Tokyo, Japan",

        shippingMethod:
            "Yamato Transport",

        items: [
            {
                id: 3,
                product: "Minimal Leather Jacket",
                sku: "JKT-LM-003",
                image:
                    "https://images.unsplash.com/photo-1551028719-00167b16eac5",
                quantity: 1,
                price: 12800,
                size: "M",
                color: "Black",
            },
        ],

        subtotal: 12800,
        shippingFee: 800,
        discount: 1000,
        total: 12600,
    },


    {
        id: "ORD-20260823-004",
        customer: "Michael Brown",
        email: "michael@example.com",
        phone: "090-8888-2222",

        status: "DELIVERED",

        orderedAt: "2026-08-23 10:00",
        updatedAt: "2026-08-25 12:00",

        paymentStatus: "PAID",
        paymentMethod: "CREDIT_CARD",

        shippingAddress:
            "Kyoto, Japan",

        shippingMethod:
            "Japan Post",

        items: [
            {
                id: 4,
                product: "Relaxed Knit Sweater",
                sku: "SWT-RK-004",
                image:
                    "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
                quantity: 1,
                price: 5980,
                size: "L",
                color: "Gray",
            },
        ],

        subtotal: 5980,
        shippingFee: 600,
        discount: 0,
        total: 6580,
    },

];


// ============================================================
// STATUS CONFIG
// ============================================================

const statusConfig: Record<
    OrderStatus,
    {
        label: string;
        color:
            | "default"
            | "warning"
            | "info"
            | "primary"
            | "success"
            | "error";
    }
> = {

    PENDING: {
        label: "Pending",
        color: "warning",
    },

    PROCESSING: {
        label: "Processing",
        color: "info",
    },

    SHIPPED: {
        label: "Shipped",
        color: "primary",
    },

    DELIVERED: {
        label: "Delivered",
        color: "success",
    },

    CANCELLED: {
        label: "Cancelled",
        color: "error",
    },

};


// ============================================================
// HELPERS
// ============================================================

const formatYen = (
    value: number
) =>
    `¥${value.toLocaleString("ja-JP")}`;


// ============================================================
// MAIN COMPONENT
// ============================================================

export default function OrderManagement() {

    const [selectedTab, setSelectedTab] =
        useState(0);

    const [search, setSearch] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState<OrderStatus | "ALL">("ALL");

    const [selectedOrder, setSelectedOrder] =
        useState<Order | null>(null);

    const [page, setPage] =
        useState(1);

    const rowsPerPage = 8;


    // ========================================================
    // TAB STATUS
    // ========================================================

    const tabStatus: (
        OrderStatus | "ALL"
    )[] = [
        "ALL",
        "PENDING",
        "PROCESSING",
        "SHIPPED",
        "DELIVERED",
    ];


    // ========================================================
    // FILTER
    // ========================================================

    const filteredOrders =
        useMemo(() => {

            const currentStatus =
                tabStatus[selectedTab];

            return orders.filter(
                order => {

                    const matchesTab =
                        currentStatus ===
                            "ALL" ||
                        order.status ===
                            currentStatus;


                    const matchesStatus =
                        statusFilter ===
                            "ALL" ||
                        order.status ===
                            statusFilter;


                    const query =
                        search
                            .toLowerCase()
                            .trim();


                    const matchesSearch =
                        !query ||
                        order.id
                            .toLowerCase()
                            .includes(query) ||
                        order.customer
                            .toLowerCase()
                            .includes(query) ||
                        order.email
                            .toLowerCase()
                            .includes(query);


                    return (
                        matchesTab &&
                        matchesStatus &&
                        matchesSearch
                    );

                }
            );

        }, [
            selectedTab,
            search,
            statusFilter,
        ]);


    // ========================================================
    // PAGINATION
    // ========================================================

    const totalPages =
        Math.ceil(
            filteredOrders.length /
                rowsPerPage
        );


    const paginatedOrders =
        filteredOrders.slice(
            (page - 1) *
                rowsPerPage,

            page *
                rowsPerPage
        );


    // ========================================================
    // HANDLERS
    // ========================================================

    const handleTabChange = (
        _event: React.SyntheticEvent,
        value: number
    ) => {

        setSelectedTab(value);
        setPage(1);
        setStatusFilter("ALL");
        scrollToTarget()
    };


    const handleStatusChange = (
        event: SelectChangeEvent
    ) => {

        setStatusFilter(
            event.target.value as
                | OrderStatus
                | "ALL"
        );

        setPage(1);

    };

    const {targetRef, scrollToTarget} = useMobileScroll()


    return (

        <Box >
            <Stack
                direction={{
                    xs: "column",
                    md: "row",
                }}
                justifyContent="space-between"
                alignItems={{
                    xs: "flex-start",
                    md: "center",
                }}
                gap={2}
                mb={3}
            >

                <Box>

                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                    >

                        <ShoppingBagRounded fontSize="large"/>

                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >
                            Order Management
                        </Typography>

                    </Stack>

                    <Typography
                        color="text.secondary"
                        sx={{
                            mt: 0.5,
                        }}
                    >
                        Monitor and manage
                        customer orders from
                        purchase to delivery.
                    </Typography>

                </Box>

            </Stack>


            {/* =================================================
                SUMMARY
            ================================================= */}

            <Grid
                container
                spacing={2}
                mb={3}
            >

                <Grid
                    size={{
                        xs: 6,
                        md: 2.4,
                    }}
                >

                    <OrderSummary
                        icon={
                            <ReceiptLongRounded />
                        }
                        label="All Orders"
                        value={
                            orders.length
                        }
                    />

                </Grid>


                <Grid
                    size={{
                        xs: 6,
                        md: 2.4,
                    }}
                >

                    <OrderSummary
                        icon={
                            <PendingActionsRounded />
                        }
                        label="Pending"
                        value={
                            orders.filter(
                                o =>
                                    o.status ===
                                    "PENDING"
                            ).length
                        }
                    />

                </Grid>


                <Grid
                    size={{
                        xs: 6,
                        md: 2.4,
                    }}
                >

                    <OrderSummary
                        icon={
                            <ShoppingBagRounded />
                        }
                        label="Processing"
                        value={
                            orders.filter(
                                o =>
                                    o.status ===
                                    "PROCESSING"
                            ).length
                        }
                    />

                </Grid>


                <Grid
                    size={{
                        xs: 6,
                        md: 2.4,
                    }}
                >

                    <OrderSummary
                        icon={
                            <LocalShippingRounded />
                        }
                        label="Shipped"
                        value={
                            orders.filter(
                                o =>
                                    o.status ===
                                    "SHIPPED"
                            ).length
                        }
                    />

                </Grid>


                <Grid
                    size={{
                        xs: 6,
                        md: 2.4,
                    }}
                >

                    <OrderSummary
                        icon={
                            <CheckCircleRounded />
                        }
                        label="Delivered"
                        value={
                            orders.filter(
                                o =>
                                    o.status ===
                                    "DELIVERED"
                            ).length
                        }
                    />

                </Grid>

            </Grid>


            {/* =================================================
                TABS
            ================================================= */}

            <Paper
                variant="outlined"
                sx={{
                    borderRadius: 3,
                    mb: 2,
                    overflow: "hidden",
                }}
            >

                <Tabs
                    value={selectedTab}
                    onChange={
                        handleTabChange
                    }
                    variant="scrollable"
                    scrollButtons="auto"
                >

                    <Tab label="All Orders" />

                    <Tab label="Pending" />

                    <Tab label="Processing" />

                    <Tab label="Shipped" />

                    <Tab label="Delivered" />

                </Tabs>

            </Paper>


            {/* =================================================
                SEARCH + FILTER
            ================================================= */}

            <Card
                elevation={0}
                sx={{
                    border: "1px solid",
                    borderColor:
                        "divider",
                    borderRadius: 3,
                    mb: 2,
                }}
            >

                <Stack
                    direction={{
                        xs: "column",
                        md: "row",
                    }}
                    spacing={2}
                    p={2}
                >

                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Search Order ID, customer or email..."
                        value={search}
                        onChange={e => {

                            setSearch(
                                e.target.value
                            );

                            setPage(1);

                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment
                                    position="start"
                                >
                                    <SearchRounded />
                                </InputAdornment>
                            ),
                        }}
                    />


                    <FormControl
                        size="small"
                        sx={{
                            minWidth: 180,
                        }}
                    >

                        <InputLabel>
                            Status
                        </InputLabel>

                        <Select
                            value={
                                statusFilter
                            }
                            label="Status"
                            onChange={
                                handleStatusChange
                            }
                        >

                            <MenuItem value="ALL">
                                All Status
                            </MenuItem>

                            <MenuItem value="PENDING">
                                Pending
                            </MenuItem>

                            <MenuItem value="PROCESSING">
                                Processing
                            </MenuItem>

                            <MenuItem value="SHIPPED">
                                Shipped
                            </MenuItem>

                            <MenuItem value="DELIVERED">
                                Delivered
                            </MenuItem>

                        </Select>

                    </FormControl>

                </Stack>

            </Card>


            {/* =================================================
                CURRENT SECTION TITLE
            ================================================= */}

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={1.5}
            >

                <Box>

                    <Typography
                        variant="h6"
                        fontWeight={700}
                    >
                        {tabStatus[
                            selectedTab
                        ] === "ALL"
                            ? "All Orders"
                            : `${
                                  statusConfig[
                                      tabStatus[
                                          selectedTab
                                      ] as OrderStatus
                                  ].label
                              } Orders`}
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        {
                            filteredOrders.length
                        }{" "}
                        orders found
                    </Typography>

                </Box>

            </Stack>


            {/* =================================================
                ORDER LIST
            ================================================= */}

            <Paper ref={targetRef}
                variant="outlined"
                sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                }}
            >

                <TableContainer>

                    <Table
                        sx={{
                            minWidth: 900,
                        }}
                    >

                        <TableHead>

                            <TableRow>

                                <TableCell>
                                    Order
                                </TableCell>

                                <TableCell>
                                    Customer
                                </TableCell>

                                <TableCell>
                                    Items
                                </TableCell>

                                <TableCell>
                                    Payment
                                </TableCell>

                                <TableCell>
                                    Date
                                </TableCell>

                                <TableCell>
                                    Status
                                </TableCell>

                                <TableCell
                                    align="right"
                                >
                                    Total
                                </TableCell>

                                <TableCell />

                            </TableRow>

                        </TableHead>


                        <TableBody>

                            {paginatedOrders.map(
                                order => (

                                    <TableRow
                                        key={
                                            order.id
                                        }
                                        hover
                                    >

                                        {/* ORDER */}

                                        <TableCell>

                                            <Typography
                                                fontWeight={700}
                                            >
                                                {
                                                    order.id
                                                }
                                            </Typography>

                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                            >
                                                {
                                                    order.items.length
                                                }{" "}
                                                product
                                                {order.items.length >
                                                1
                                                    ? "s"
                                                    : ""}
                                            </Typography>

                                        </TableCell>


                                        {/* CUSTOMER */}

                                        <TableCell>

                                            <Stack
                                                direction="row"
                                                spacing={1.2}
                                                alignItems="center"
                                            >

                                                <Avatar
                                                    sx={{
                                                        width: 36,
                                                        height: 36,
                                                    }}
                                                >
                                                    {
                                                        order
                                                            .customer[0]
                                                    }
                                                </Avatar>

                                                <Box>

                                                    <Typography
                                                        fontWeight={600}
                                                    >
                                                        {
                                                            order.customer
                                                        }
                                                    </Typography>

                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                    >
                                                        {
                                                            order.email
                                                        }
                                                    </Typography>

                                                </Box>

                                            </Stack>

                                        </TableCell>


                                        {/* ITEMS */}

                                        <TableCell>

                                            <Stack
                                                direction="row"
                                                spacing={1}
                                                alignItems="center"
                                            >

                                                <Avatar
                                                    src={
                                                        order
                                                            .items[0]
                                                            ?.image
                                                    }
                                                    variant="rounded"
                                                    sx={{
                                                        width: 42,
                                                        height: 42,
                                                    }}
                                                />

                                                <Box>

                                                    <Typography
                                                        variant="body2"
                                                        fontWeight={600}
                                                    >
                                                        {
                                                            order
                                                                .items[0]
                                                                ?.product
                                                        }
                                                    </Typography>

                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                    >
                                                        {order.items[0]?.quantity}
                                                        {" × "}
                                                        {formatYen(
                                                            order
                                                                .items[0]
                                                                ?.price ??
                                                                0
                                                        )}
                                                    </Typography>

                                                </Box>

                                            </Stack>

                                        </TableCell>


                                        {/* PAYMENT */}

                                        <TableCell>

                                            <Chip
                                                size="small"
                                                label={
                                                    order.paymentStatus
                                                }
                                                color={
                                                    order.paymentStatus ===
                                                    "PAID"
                                                        ? "success"
                                                        : "warning"
                                                }
                                                variant="outlined"
                                            />

                                        </TableCell>


                                        {/* DATE */}

                                        <TableCell>

                                            <Typography
                                                variant="body2"
                                            >
                                                {
                                                    order.orderedAt
                                                }
                                            </Typography>

                                        </TableCell>


                                        {/* STATUS */}

                                        <TableCell>

                                            <Chip
                                                size="small"
                                                label={
                                                    statusConfig[
                                                        order.status
                                                    ].label
                                                }
                                                color={
                                                    statusConfig[
                                                        order.status
                                                    ].color
                                                }
                                            />

                                        </TableCell>


                                        {/* TOTAL */}

                                        <TableCell
                                            align="right"
                                        >

                                            <Typography
                                                fontWeight={800}
                                            >
                                                {
                                                    formatYen(
                                                        order.total
                                                    )
                                                }
                                            </Typography>

                                        </TableCell>


                                        {/* ACTION */}

                                        <TableCell
                                            align="right"
                                        >

                                            <IconButton
                                                size="small"
                                                onClick={() =>
                                                    setSelectedOrder(
                                                        order
                                                    )
                                                }
                                            >

                                                <VisibilityRounded />

                                            </IconButton>

                                        </TableCell>

                                    </TableRow>

                                )
                            )}


                            {paginatedOrders.length ===
                                0 && (

                                <TableRow>

                                    <TableCell
                                        colSpan={8}
                                        align="center"
                                        sx={{
                                            py: 8,
                                        }}
                                    >

                                        <ShoppingBagRounded
                                            sx={{
                                                fontSize: 45,
                                                color:
                                                    "text.disabled",
                                            }}
                                        />

                                        <Typography
                                            color="text.secondary"
                                        >
                                            No orders
                                            found.
                                        </Typography>

                                    </TableCell>

                                </TableRow>

                            )}

                        </TableBody>

                    </Table>

                </TableContainer>


                {/* PAGINATION */}

                {totalPages > 0 && (

                    <Stack
                        direction={{
                            xs: "column",
                            sm: "row",
                        }}
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                        p={2}
                        borderTop="1px solid"
                        borderColor="divider"
                    >

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Showing{" "}
                            {(page - 1) *
                                rowsPerPage +
                                1}
                            –
                            {Math.min(
                                page *
                                    rowsPerPage,
                                filteredOrders.length
                            )}{" "}
                            of{" "}
                            {
                                filteredOrders.length
                            }
                        </Typography>


                        <Pagination
                            page={page}
                            count={
                                totalPages
                            }
                            onChange={(
                                _,
                                value
                            ) =>
                                setPage(
                                    value
                                )
                            }
                            showFirstButton
                            showLastButton
                            shape="rounded"
                        />

                    </Stack>

                )}

            </Paper>


            {/* =================================================
                ORDER DETAIL DIALOG
            ================================================= */}

            <OrderDetailDialog
                order={
                    selectedOrder
                }
                onClose={() =>
                    setSelectedOrder(
                        null
                    )
                }
            />

        </Box>
    );
}


// ============================================================
// SUMMARY CARD
// ============================================================

function OrderSummary({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: number;
}) {

    return (

        <Card
            elevation={0}
            sx={{
                border: "1px solid",
                borderColor:
                    "divider",
                borderRadius: 3,
            }}
        >

            <Stack
                direction={"row"}
                spacing={1.5}
                alignItems={{
                    xs: "flex-start",
                    sm: "center",
                }}
                p={2}
            >

                <Box
                    sx={{
                        width: 42,
                        height: 42,
                        borderRadius: 2,
                        bgcolor:
                            "action.hover",
                        display: "flex",
                        alignItems:
                            "center",
                        justifyContent:
                            "center",
                    }}
                >
                    {icon}
                </Box>

                <Box>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        {label}
                    </Typography>

                    <Typography
                        variant="h6"
                        fontWeight={800}
                    >
                        {value.toLocaleString()}
                    </Typography>

                </Box>

            </Stack>

        </Card>
    );
}


// ============================================================
// ORDER DETAIL DIALOG
// ============================================================

function OrderDetailDialog({
    order,
    onClose,
}: {
    order: Order | null;
    onClose: () => void;
}) {

    if (!order) return null;


    return (

        <Dialog
            open={Boolean(order)}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >

            {/* HEADER */}

            <DialogTitle>

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >

                    <Box>

                        <Typography
                            variant="h6"
                            fontWeight={800}
                        >
                            Order Details
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {order.id}
                        </Typography>

                    </Box>


                    <IconButton
                        onClick={onClose}
                    >
                        <CloseRounded />
                    </IconButton>

                </Stack>

            </DialogTitle>


            <DialogContent dividers>

                {/* CUSTOMER */}

                <SectionTitle
                    icon={
                        <PersonRounded />
                    }
                    title="Customer"
                />

                <Grid
                    container
                    spacing={2}
                    mb={3}
                >

                    <Grid
                        size={{
                            xs: 12,
                            sm: 4,
                        }}
                    >

                        <InfoItem
                            label="Name"
                            value={
                                order.customer
                            }
                        />

                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            sm: 4,
                        }}
                    >

                        <InfoItem
                            label="Email"
                            value={
                                order.email
                            }
                        />

                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            sm: 4,
                        }}
                    >

                        <InfoItem
                            label="Phone"
                            value={
                                order.phone
                            }
                        />

                    </Grid>

                </Grid>


                {/* ORDER */}

                <SectionTitle
                    icon={
                        <ReceiptLongRounded />
                    }
                    title="Order Information"
                />

                <Grid
                    container
                    spacing={2}
                    mb={3}
                >

                    <Grid
                        size={{
                            xs: 6,
                            sm: 3,
                        }}
                    >

                        <InfoItem
                            label="Status"
                            value={
                                <Chip
                                    size="small"
                                    label={
                                        statusConfig[
                                            order.status
                                        ].label
                                    }
                                    color={
                                        statusConfig[
                                            order.status
                                        ].color
                                    }
                                />
                            }
                        />

                    </Grid>


                    <Grid
                        size={{
                            xs: 6,
                            sm: 3,
                        }}
                    >

                        <InfoItem
                            label="Payment"
                            value={
                                order.paymentStatus
                            }
                        />

                    </Grid>


                    <Grid
                        size={{
                            xs: 6,
                            sm: 3,
                        }}
                    >

                        <InfoItem
                            label="Ordered At"
                            value={
                                order.orderedAt
                            }
                        />

                    </Grid>


                    <Grid
                        size={{
                            xs: 6,
                            sm: 3,
                        }}
                    >

                        <InfoItem
                            label="Shipping"
                            value={
                                order.shippingMethod
                            }
                        />

                    </Grid>

                </Grid>


                <Divider sx={{ mb: 3 }} />


                {/* PRODUCTS */}

                <SectionTitle
                    icon={
                        <ShoppingBagRounded />
                    }
                    title="Products"
                />


                <Stack spacing={1.5} mb={3}>

                    {order.items.map(
                        item => (

                            <Paper
                                key={item.id}
                                variant="outlined"
                                sx={{
                                    p: 1.5,
                                    borderRadius: 2,
                                }}
                            >

                                <Stack
                                    direction="row"
                                    spacing={2}
                                    alignItems="center"
                                >

                                    <Avatar
                                        src={
                                            item.image
                                        }
                                        variant="rounded"
                                        sx={{
                                            width: 60,
                                            height: 60,
                                        }}
                                    />

                                    <Box
                                        flex={1}
                                    >

                                        <Typography
                                            fontWeight={700}
                                        >
                                            {
                                                item.product
                                            }
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            SKU:{" "}
                                            {
                                                item.sku
                                            }
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {
                                                item.color
                                            }
                                            {" / "}
                                            {
                                                item.size
                                            }
                                            {" / "}
                                            Qty:{" "}
                                            {
                                                item.quantity
                                            }
                                        </Typography>

                                    </Box>

                                    <Typography
                                        fontWeight={800}
                                    >
                                        {
                                            formatYen(
                                                item.price *
                                                    item.quantity
                                            )
                                        }
                                    </Typography>

                                </Stack>

                            </Paper>

                        )
                    )}

                </Stack>


                {/* SHIPPING */}

                <SectionTitle
                    icon={
                        <LocalShippingRounded />
                    }
                    title="Shipping"
                />

                <Paper
                    variant="outlined"
                    sx={{
                        p: 2,
                        borderRadius: 2,
                        mb: 3,
                    }}
                >

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Delivery Address
                    </Typography>

                    <Typography
                        fontWeight={600}
                    >
                        {
                            order.shippingAddress
                        }
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 1 }}
                    >
                        Method
                    </Typography>

                    <Typography
                        fontWeight={600}
                    >
                        {
                            order.shippingMethod
                        }
                    </Typography>

                </Paper>


                {/* TOTAL */}

                <Stack
                    spacing={1}
                    alignItems="flex-end"
                >

                    <SummaryLine
                        label="Subtotal"
                        value={
                            formatYen(
                                order.subtotal
                            )
                        }
                    />

                    <SummaryLine
                        label="Shipping"
                        value={
                            formatYen(
                                order.shippingFee
                            )
                        }
                    />

                    <SummaryLine
                        label="Discount"
                        value={`-${formatYen(
                            order.discount
                        )}`}
                    />

                    <Divider
                        sx={{
                            width: "100%",
                            my: 1,
                        }}
                    />

                    <SummaryLine
                        label="Total"
                        value={
                            formatYen(
                                order.total
                            )
                        }
                        strong
                    />

                </Stack>

            </DialogContent>


            <DialogActions
                sx={{
                    p: 2,
                }}
            >

                {order.status ===
                    "PENDING" && (

                    <Button
                        variant="contained"
                        color="primary"
                    >
                        Start Processing
                    </Button>

                )}


                {order.status ===
                    "PROCESSING" && (

                    <Button
                        variant="contained"
                        startIcon={
                            <LocalShippingRounded />
                        }
                    >
                        Mark as Shipped
                    </Button>

                )}


                {order.status ===
                    "SHIPPED" && (

                    <Button
                        variant="contained"
                        color="success"
                    >
                        Mark as Delivered
                    </Button>

                )}

                <Button
                    onClick={onClose}
                    color="inherit"
                >
                    Close
                </Button>

            </DialogActions>

        </Dialog>
    );
}


// ============================================================
// SMALL COMPONENTS
// ============================================================

function SectionTitle({
    icon,
    title,
}: {
    icon: React.ReactNode;
    title: string;
}) {

    return (

        <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            mb={1.5}
        >

            {icon}

            <Typography
                fontWeight={800}
            >
                {title}
            </Typography>

        </Stack>
    );
}


function InfoItem({
    label,
    value,
}: {
    label: string;
    value: React.ReactNode;
}) {

    return (

        <Box>

            <Typography
                variant="caption"
                color="text.secondary"
            >
                {label}
            </Typography>

            <Box
                sx={{
                    mt: 0.3,
                }}
            >
                <Typography
                    variant="body2"
                    fontWeight={600}
                >
                    {value}
                </Typography>
            </Box>

        </Box>
    );
}


function SummaryLine({
    label,
    value,
    strong = false,
}: {
    label: string;
    value: string;
    strong?: boolean;
}) {

    return (

        <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
                width: "100%",
                maxWidth: 300,
            }}
        >

            <Typography
                fontWeight={
                    strong ? 800 : 400
                }
            >
                {label}
            </Typography>

            <Typography
                fontWeight={
                    strong ? 900 : 600
                }
                variant={
                    strong
                        ? "h6"
                        : "body2"
                }
            >
                {value}
            </Typography>

        </Stack>
    );
}