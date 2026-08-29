"use client";

import React, { useMemo, useState } from "react";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    IconButton,
    InputAdornment,
    MenuItem,
    Paper,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography,
} from "@mui/material";

import {
    AddRounded,
    ArrowForwardRounded,
    AssignmentRounded,
    CheckCircleRounded,
    CloseRounded,
    Inventory2Rounded,
    LocalShippingRounded,
    MoreVertRounded,
    PendingActionsRounded,
    LowPriorityRounded,
    SearchRounded,
    StoreRounded,
    WarningRounded,
} from "@mui/icons-material";
import { useMobileScroll } from "@/service/customHooks/useMobileScroll";

type PurchaseRequestStatus =
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "ORDERED";


type PurchaseOrderStatus =
    | "DRAFT"
    | "ORDERED"
    | "PARTIAL"
    | "IN_TRANSIT"
    | "RECEIVED"
    | "CANCELLED";


type IncomingStatus =
    | "EXPECTED"
    | "IN_TRANSIT"
    | "ARRIVED"
    | "INSPECTING"
    | "COMPLETED";


type PurchaseHistoryStatus =
    | "COMPLETED"
    | "PARTIAL"
    | "CANCELLED";

const statusOptions = {

    0: [
        { value: "PENDING", label: "Pending" },
        { value: "APPROVED", label: "Approved" },
        { value: "ORDERED", label: "Ordered" },
        { value: "REJECTED", label: "Rejected" },
    ],

    1: [
        { value: "DRAFT", label: "Draft" },
        { value: "ORDERED", label: "Ordered" },
        { value: "PARTIAL", label: "Partially Received" },
        { value: "IN_TRANSIT", label: "In Transit" },
        { value: "RECEIVED", label: "Received" },
        { value: "CANCELLED", label: "Cancelled" },
    ],

    2: [
        { value: "EXPECTED", label: "Expected" },
        { value: "IN_TRANSIT", label: "In Transit" },
        { value: "ARRIVED", label: "Arrived" },
        { value: "INSPECTING", label: "Inspecting" },
        { value: "COMPLETED", label: "Completed" },
    ],

    3: [
        { value: "COMPLETED", label: "Completed" },
        { value: "PARTIAL", label: "Partial" },
        { value: "CANCELLED", label: "Cancelled" },
    ],
};


interface PurchaseRequest {
    id: string;
    product: string;
    sku: string;
    warehouse: string;
    requestedQty: number;
    currentStock: number;
    requestedBy: string;
    requestedAt: string;
    reason: string;
    status: PurchaseRequestStatus;
}


interface PurchaseOrder {
    id: string;
    supplier: string;
    items: number;
    totalQuantity: number;
    totalCost: number;
    orderedAt: string;
    expectedDate: string;
    status: PurchaseOrderStatus;
}


interface IncomingStock {
    id: string;
    purchaseOrderId: string;
    supplier: string;
    warehouse: string;
    expectedQty: number;
    receivedQty: number;
    damagedQty: number;
    expectedDate: string;
    receivedDate?: string;
    status: IncomingStatus;
}


interface PurchaseHistory {
    id: string;
    supplier: string;
    purchaseOrderId: string;
    totalQuantity: number;
    totalCost: number;
    orderedAt: string;
    receivedAt: string;
    status: PurchaseHistoryStatus;
}


/* =========================================================
   MOCK DATA
========================================================= */

const purchaseRequests: PurchaseRequest[] = [

    {
        id: "PR-20260826-001",
        product: "Basic T-Shirt",
        sku: "TS-BLK-M",
        warehouse: "Osaka Main Warehouse",
        requestedQty: 100,
        currentStock: 12,
        requestedBy: "Kaday Hein",
        requestedAt: "2026-08-26 09:10",
        reason: "Low Stock",
        status: "PENDING",
    },

    {
        id: "PR-20260825-014",
        product: "Oversized Hoodie",
        sku: "HD-GRY-L",
        warehouse: "Osaka Main Warehouse",
        requestedQty: 50,
        currentStock: 8,
        requestedBy: "Yuki Tanaka",
        requestedAt: "2026-08-25 15:20",
        reason: "Low Stock",
        status: "APPROVED",
    },

    {
        id: "PR-20260824-008",
        product: "Slim Jeans",
        sku: "JN-BLU-32",
        warehouse: "Nara Warehouse",
        requestedQty: 60,
        currentStock: 21,
        requestedBy: "Ken Sato",
        requestedAt: "2026-08-24 11:30",
        reason: "High Sales Demand",
        status: "ORDERED",
    },

    {
        id: "PR-20260823-004",
        product: "Winter Jacket",
        sku: "JK-BLK-M",
        warehouse: "Osaka Main Warehouse",
        requestedQty: 40,
        currentStock: 18,
        requestedBy: "Mika Suzuki",
        requestedAt: "2026-08-23 10:00",
        reason: "Seasonal Demand",
        status: "REJECTED",
    },

];


const purchaseOrders: PurchaseOrder[] = [

    {
        id: "PO-20260826-001",
        supplier: "ABC Clothing Co.",
        items: 4,
        totalQuantity: 250,
        totalCost: 320000,
        orderedAt: "2026-08-26",
        expectedDate: "2026-09-02",
        status: "ORDERED",
    },

    {
        id: "PO-20260824-002",
        supplier: "XYZ Fashion Ltd.",
        items: 3,
        totalQuantity: 180,
        totalCost: 415000,
        orderedAt: "2026-08-24",
        expectedDate: "2026-09-05",
        status: "IN_TRANSIT",
    },

    {
        id: "PO-20260820-003",
        supplier: "Fashion Wholesale",
        items: 6,
        totalQuantity: 320,
        totalCost: 280000,
        orderedAt: "2026-08-20",
        expectedDate: "2026-08-27",
        status: "PARTIAL",
    },

    {
        id: "PO-20260815-004",
        supplier: "ABC Clothing Co.",
        items: 5,
        totalQuantity: 200,
        totalCost: 250000,
        orderedAt: "2026-08-15",
        expectedDate: "2026-08-22",
        status: "RECEIVED",
    },

];


const incomingStocks: IncomingStock[] = [

    {
        id: "IN-20260826-001",
        purchaseOrderId: "PO-20260824-002",
        supplier: "XYZ Fashion Ltd.",
        warehouse: "Osaka Main Warehouse",
        expectedQty: 180,
        receivedQty: 0,
        damagedQty: 0,
        expectedDate: "2026-09-05",
        status: "IN_TRANSIT",
    },

    {
        id: "IN-20260825-002",
        purchaseOrderId: "PO-20260820-003",
        supplier: "Fashion Wholesale",
        warehouse: "Nara Warehouse",
        expectedQty: 320,
        receivedQty: 150,
        damagedQty: 3,
        expectedDate: "2026-08-27",
        status: "INSPECTING",
    },

    {
        id: "IN-20260822-003",
        purchaseOrderId: "PO-20260815-004",
        supplier: "ABC Clothing Co.",
        warehouse: "Osaka Main Warehouse",
        expectedQty: 200,
        receivedQty: 200,
        damagedQty: 2,
        expectedDate: "2026-08-22",
        receivedDate: "2026-08-22",
        status: "COMPLETED",
    },

];


const purchaseHistory: PurchaseHistory[] = [

    {
        id: "HIS-20260822-001",
        supplier: "ABC Clothing Co.",
        purchaseOrderId: "PO-20260815-004",
        totalQuantity: 200,
        totalCost: 250000,
        orderedAt: "2026-08-15",
        receivedAt: "2026-08-22",
        status: "COMPLETED",
    },

    {
        id: "HIS-20260818-002",
        supplier: "Fashion Wholesale",
        purchaseOrderId: "PO-20260810-006",
        totalQuantity: 300,
        totalCost: 270000,
        orderedAt: "2026-08-10",
        receivedAt: "2026-08-18",
        status: "PARTIAL",
    },

    {
        id: "HIS-20260810-003",
        supplier: "XYZ Fashion Ltd.",
        purchaseOrderId: "PO-20260801-004",
        totalQuantity: 150,
        totalCost: 360000,
        orderedAt: "2026-08-01",
        receivedAt: "2026-08-08",
        status: "COMPLETED",
    },

];


/* =========================================================
   CONFIG
========================================================= */

const requestStatusConfig: Record<
    PurchaseRequestStatus,
    {
        label: string;
        color:
        | "warning"
        | "success"
        | "error"
        | "info";
    }
> = {

    PENDING: {
        label: "Pending",
        color: "warning",
    },

    APPROVED: {
        label: "Approved",
        color: "success",
    },

    REJECTED: {
        label: "Rejected",
        color: "error",
    },

    ORDERED: {
        label: "Ordered",
        color: "info",
    },

};


const orderStatusConfig: Record<
    PurchaseOrderStatus,
    {
        label: string;
        color:
        | "default"
        | "info"
        | "warning"
        | "success"
        | "error";
    }
> = {

    DRAFT: {
        label: "Draft",
        color: "default",
    },

    ORDERED: {
        label: "Ordered",
        color: "info",
    },

    PARTIAL: {
        label: "Partially Received",
        color: "warning",
    },

    IN_TRANSIT: {
        label: "In Transit",
        color: "info",
    },

    RECEIVED: {
        label: "Received",
        color: "success",
    },

    CANCELLED: {
        label: "Cancelled",
        color: "error",
    },

};


const incomingStatusConfig: Record<
    IncomingStatus,
    {
        label: string;
        color:
        | "default"
        | "info"
        | "warning"
        | "success";
    }
> = {

    EXPECTED: {
        label: "Expected",
        color: "default",
    },

    IN_TRANSIT: {
        label: "In Transit",
        color: "info",
    },

    ARRIVED: {
        label: "Arrived",
        color: "info",
    },

    INSPECTING: {
        label: "Inspecting",
        color: "warning",
    },

    COMPLETED: {
        label: "Completed",
        color: "success",
    },

};

const tabList = [
    {
        label: "Purchase Requests",
        icon: <AssignmentRounded />,
        value: 0,
    },
    {
        label: "Purchase Orders",
        icon: <LowPriorityRounded />,
        value: 1,
    },
    {
        label: "Incoming Stock",
        icon: <LocalShippingRounded />,
        value: 2,
    },
    {
        label: "Purchase History",
        icon: <CheckCircleRounded />,
        value: 3,
    },
]

/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
    title,
    value,
    subtitle,
    icon,
}: {
    title: string;
    value: string | number;
    subtitle: string;
    icon: React.ReactNode;
}) {

    return (

        <Card
            variant="outlined"
            sx={{
                borderRadius: 3,
                height: "100%",
            }}
        >

            <CardContent>

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                >

                    <Box>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {title}
                        </Typography>

                        <Typography
                            variant="h5"
                            fontWeight={800}
                            sx={{ mt: 0.5 }}
                        >
                            {value}
                        </Typography>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            {subtitle}
                        </Typography>

                    </Box>

                    <Box
                        sx={{
                            width: 42,
                            height: 42,
                            borderRadius: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: "action.hover",
                        }}
                    >
                        {icon}
                    </Box>

                </Stack>

            </CardContent>

        </Card>
    );
}


/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function Purchasing() {

    const [
        activeTab,
        setActiveTab,
    ] = useState(0);


    const [
        search,
        setSearch,
    ] = useState("");


    const [
        statusFilter,
        setStatusFilter,
    ] = useState("ALL");


    /* =====================================================
       REQUEST FILTER
    ===================================================== */

    const filteredRequests =
        useMemo(() => {

            const query =
                search
                    .toLowerCase()
                    .trim();

            return purchaseRequests.filter(
                request => {

                    const matchesSearch =
                        !query ||
                        request.id
                            .toLowerCase()
                            .includes(query) ||
                        request.product
                            .toLowerCase()
                            .includes(query) ||
                        request.sku
                            .toLowerCase()
                            .includes(query) ||
                        request.requestedBy
                            .toLowerCase()
                            .includes(query);

                    const matchesStatus =
                        statusFilter === "ALL" ||
                        request.status ===
                        statusFilter;

                    return (
                        matchesSearch &&
                        matchesStatus
                    );
                }
            );

        }, [
            search,
            statusFilter,
        ]);


    /* =====================================================
       ORDER FILTER
    ===================================================== */

    const filteredOrders =
        useMemo(() => {

            const query =
                search
                    .toLowerCase()
                    .trim();

            return purchaseOrders.filter(
                order => {

                    const matchesSearch =
                        !query ||
                        order.id
                            .toLowerCase()
                            .includes(query) ||
                        order.supplier
                            .toLowerCase()
                            .includes(query);

                    const matchesStatus =
                        statusFilter === "ALL" ||
                        order.status ===
                        statusFilter;

                    return (
                        matchesSearch &&
                        matchesStatus
                    );
                }
            );

        }, [
            search,
            statusFilter,
        ]);


    /* =====================================================
       INCOMING FILTER
    ===================================================== */

    const filteredIncoming =
        useMemo(() => {

            const query =
                search
                    .toLowerCase()
                    .trim();

            return incomingStocks.filter(
                incoming => {

                    const matchesSearch =
                        !query ||
                        incoming.id
                            .toLowerCase()
                            .includes(query) ||
                        incoming.purchaseOrderId
                            .toLowerCase()
                            .includes(query) ||
                        incoming.supplier
                            .toLowerCase()
                            .includes(query);

                    const matchesStatus =
                        statusFilter === "ALL" ||
                        incoming.status ===
                        statusFilter;

                    return (
                        matchesSearch &&
                        matchesStatus
                    );
                }
            );

        }, [
            search,
            statusFilter,
        ]);


    /* =====================================================
       HISTORY FILTER
    ===================================================== */

    const filteredHistory =
        useMemo(() => {

            const query =
                search
                    .toLowerCase()
                    .trim();

            return purchaseHistory.filter(
                history => {

                    const matchesSearch =
                        !query ||
                        history.id
                            .toLowerCase()
                            .includes(query) ||
                        history.supplier
                            .toLowerCase()
                            .includes(query) ||
                        history.purchaseOrderId
                            .toLowerCase()
                            .includes(query);

                    const matchesStatus =
                        statusFilter === "ALL" ||
                        history.status ===
                        statusFilter;

                    return (
                        matchesSearch &&
                        matchesStatus
                    );
                }
            );

        }, [
            search,
            statusFilter,
        ]);


    /* =====================================================
       TAB CHANGE
    ===================================================== */

    const changeTab = (value: number) => {
        setActiveTab(value);
        setSearch("");
        setStatusFilter("ALL");
        scrollToTarget()
    };

    const handleTabChange = (
        _: React.SyntheticEvent,
        value: number
    ) => {
        changeTab(value);
    };

    const { targetRef, scrollToTarget } = useMobileScroll()

    return (

        <Box>

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
                        spacing={1}
                        alignItems="center"
                    >

                        <StoreRounded fontSize="large" />

                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >
                            Purchasing
                        </Typography>

                    </Stack>

                    <Typography
                        color="text.secondary"
                        sx={{
                            mt: 0.5,
                        }}
                    >
                        Manage purchase requests,
                        orders, incoming stock,
                        and purchasing history.
                    </Typography>

                </Box>


                <Button
                    variant="contained"
                    startIcon={
                        <AddRounded />
                    }
                >
                    {activeTab === 0
                        ? "New Request"
                        : activeTab === 1
                            ? "Create Purchase Order"
                            : "Record Incoming Stock"}
                </Button>

            </Stack>


            {/* =================================================
                SUMMARY
            ================================================= */}

            <Grid
                container
                spacing={2}
                sx={{
                    mb: 3,
                }}
            >

                <Grid
                    size={{
                        xs: 6,
                        lg: 3,
                    }}
                >

                    <SummaryCard
                        title="Pending Requests"
                        value={
                            purchaseRequests.filter(
                                item =>
                                    item.status ===
                                    "PENDING"
                            ).length
                        }
                        subtitle="Awaiting approval"
                        icon={
                            <PendingActionsRounded />
                        }
                    />

                </Grid>


                <Grid
                    size={{
                        xs: 6,
                        lg: 3,
                    }}
                >

                    <SummaryCard
                        title="Active Orders"
                        value={
                            purchaseOrders.filter(
                                item =>
                                    item.status !==
                                    "RECEIVED" &&
                                    item.status !==
                                    "CANCELLED"
                            ).length
                        }
                        subtitle="Currently being processed"
                        icon={
                            <LowPriorityRounded />
                        }
                    />

                </Grid>


                <Grid
                    size={{
                        xs: 6,
                        lg: 3,
                    }}
                >

                    <SummaryCard
                        title="Incoming"
                        value={
                            incomingStocks.filter(
                                item =>
                                    item.status !==
                                    "COMPLETED"
                            ).length
                        }
                        subtitle="Awaiting receiving"
                        icon={
                            <LocalShippingRounded />
                        }
                    />

                </Grid>


                <Grid
                    size={{
                        xs: 6,
                        lg: 3,
                    }}
                >

                    <SummaryCard
                        title="This Month"
                        value="¥1.26M"
                        subtitle="Purchase spending"
                        icon={
                            <Inventory2Rounded />
                        }
                    />

                </Grid>

            </Grid>

            <div ref={targetRef}>{/*jumpline*/}</div>

            {/* TABS*/}

            <Paper
                variant="outlined"
                sx={{
                    position: "sticky",
                    top: 70,
                    zIndex: 1100,
                    borderRadius: 3,
                    mb: 3,
                    overflow: "hidden",
                    bgcolor: "background.paper",
                }}
            >

                {/* DESKTOP / TABLET */}

                <Box
                    sx={{
                        display: {
                            xs: "none",
                            md: "block",
                        },
                    }}
                >

                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        variant="fullWidth"
                    >
                        {
                            tabList && tabList.map(tab =>
                                <Tab
                                    key={tab.value}
                                    icon={tab.icon}
                                    iconPosition="start"
                                    label={tab.label}
                                />
                            )
                        }

                    </Tabs>

                </Box>


                {/* MOBILE */}

                <Box
                    sx={{
                        display: {
                            xs: "grid",
                            md: "none",
                        },
                        gridTemplateColumns:
                            "repeat(4, 1fr)",
                        width: "100%",
                    }}
                >
                    {tabList.map((tab) => (

                        <Button
                            key={tab.value}
                            onClick={() =>
                                changeTab(tab.value)
                            }
                            sx={{
                                minWidth: 0,
                                minHeight: 72,

                                px: 0.5,
                                py: 1,

                                borderRadius: 0,

                                display: "flex",
                                flexDirection: "column",

                                justifyContent: "center",
                                alignItems: "center",

                                textTransform: "none",

                                color:
                                    activeTab === tab.value
                                        ? "primary.main"
                                        : "text.secondary",

                                bgcolor:
                                    activeTab === tab.value
                                        ? "action.selected"
                                        : "transparent",

                                borderBottom:
                                    activeTab === tab.value
                                        ? 2
                                        : 2,

                                borderColor:
                                    activeTab === tab.value
                                        ? "primary.main"
                                        : "transparent",

                                "&:hover": {
                                    bgcolor:
                                        "action.hover",
                                },
                            }}
                        >

                            <Box
                                sx={{
                                    display: "flex",
                                    mb: 0.5,

                                    "& svg": {
                                        fontSize: 22,
                                    },
                                }}
                            >
                                {tab.icon}
                            </Box>

                            <Typography
                                variant="caption"
                                fontWeight={
                                    activeTab === tab.value
                                        ? 700
                                        : 500
                                }
                                sx={{
                                    textAlign: "center",
                                }}
                            >
                                {tab.label}
                            </Typography>

                        </Button>

                    ))}
                </Box>

            </Paper>


            {/* =================================================
                SEARCH / FILTER
            ================================================= */}

            <Stack
                direction={{
                    xs: "column",
                    sm: "row",
                }}
                spacing={2}
                mb={3}
            >

                <TextField
                    fullWidth
                    placeholder={
                        activeTab === 0
                            ? "Search request ID, product, SKU..."
                            : activeTab === 1
                                ? "Search PO ID or supplier..."
                                : activeTab === 2
                                    ? "Search incoming ID, PO or supplier..."
                                    : "Search history ID, PO or supplier..."
                    }
                    value={search}
                    onChange={event =>
                        setSearch(
                            event.target.value
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

                <TextField
                    select
                    label="Status"
                    value={statusFilter}
                    onChange={(event) =>
                        setStatusFilter(event.target.value)
                    }
                    sx={{
                        minWidth: {
                            sm: 190,
                        },
                    }}
                >
                    <MenuItem value="ALL">
                        All Status
                    </MenuItem>

                    {statusOptions[activeTab].map(
                        (option) => (
                            <MenuItem
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </MenuItem>
                        )
                    )}
                </TextField>

            </Stack>


            {/* REQUESTS*/}

            {activeTab === 0 && (

                <Stack spacing={1.5}>

                    {filteredRequests.map(
                        request => (

                            <Paper
                                key={request.id}
                                variant="outlined"
                                sx={{
                                    p: 2.5,
                                    borderRadius: 3,
                                    transition:
                                        "background-color .2s",
                                    "&:hover": {
                                        bgcolor:
                                            "action.hover",
                                    },
                                }}
                            >

                                <Grid
                                    container
                                    spacing={2}
                                    alignItems="center"
                                >

                                    <Grid
                                        size={{
                                            xs: 12,
                                            md: 3,
                                        }}
                                    >

                                        <Typography
                                            fontWeight={700}
                                        >
                                            {
                                                request.product
                                            }
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {
                                                request.sku
                                            }
                                        </Typography>

                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            {
                                                request.id
                                            }
                                        </Typography>

                                    </Grid>


                                    <Grid
                                        size={{
                                            xs: 6,
                                            sm: 4,
                                            md: 2,
                                        }}
                                    >

                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            Warehouse
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            fontWeight={600}
                                        >
                                            {
                                                request.warehouse
                                            }
                                        </Typography>

                                    </Grid>


                                    <Grid
                                        size={{
                                            xs: 6,
                                            sm: 4,
                                            md: 2,
                                        }}
                                    >

                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            Stock / Request
                                        </Typography>

                                        <Typography
                                            fontWeight={700}
                                        >
                                            {
                                                request.currentStock
                                            }
                                            {" / "}
                                            {
                                                request.requestedQty
                                            }
                                        </Typography>

                                    </Grid>


                                    <Grid
                                        size={{
                                            xs: 6,
                                            sm: 4,
                                            md: 2,
                                        }}
                                    >

                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            Requested By
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                        >
                                            {
                                                request.requestedBy
                                            }
                                        </Typography>

                                    </Grid>


                                    <Grid
                                        size={{
                                            xs: 6,
                                            md: 2,
                                        }}
                                    >

                                        <Chip
                                            size="small"
                                            label={
                                                requestStatusConfig[
                                                    request.status
                                                ].label
                                            }
                                            color={
                                                requestStatusConfig[
                                                    request.status
                                                ].color
                                            }
                                        />

                                    </Grid>


                                    <Grid
                                        size={{
                                            xs: 12,
                                            md: 1,
                                        }}
                                    >

                                        <IconButton>
                                            <MoreVertRounded />
                                        </IconButton>

                                    </Grid>

                                </Grid>

                            </Paper>

                        )
                    )}

                </Stack>

            )}


            {/* =================================================
                PURCHASE ORDERS
            ================================================= */}

            {activeTab === 1 && (

                <Stack spacing={1.5}>

                    {filteredOrders.map(
                        order => (

                            <Paper
                                key={order.id}
                                variant="outlined"
                                sx={{
                                    p: 2.5,
                                    borderRadius: 3,
                                }}
                            >

                                <Grid
                                    container
                                    spacing={2}
                                    alignItems="center"
                                >

                                    <Grid
                                        size={{
                                            xs: 12,
                                            md: 2.5,
                                        }}
                                    >

                                        <Typography
                                            fontWeight={700}
                                        >
                                            {
                                                order.id
                                            }
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {
                                                order.supplier
                                            }
                                        </Typography>

                                    </Grid>


                                    <Grid
                                        size={{
                                            xs: 6,
                                            sm: 4,
                                            md: 1.5,
                                        }}
                                    >

                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            Items
                                        </Typography>

                                        <Typography
                                            fontWeight={700}
                                        >
                                            {
                                                order.items
                                            }
                                        </Typography>

                                    </Grid>


                                    <Grid
                                        size={{
                                            xs: 6,
                                            sm: 4,
                                            md: 1.5,
                                        }}
                                    >

                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            Quantity
                                        </Typography>

                                        <Typography
                                            fontWeight={700}
                                        >
                                            {
                                                order.totalQuantity
                                            }
                                        </Typography>

                                    </Grid>


                                    <Grid
                                        size={{
                                            xs: 6,
                                            sm: 4,
                                            md: 2,
                                        }}
                                    >

                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            Total Cost
                                        </Typography>

                                        <Typography
                                            fontWeight={700}
                                        >
                                            ¥
                                            {order.totalCost.toLocaleString()}
                                        </Typography>

                                    </Grid>


                                    <Grid
                                        size={{
                                            xs: 6,
                                            sm: 4,
                                            md: 2,
                                        }}
                                    >

                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            Expected
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                        >
                                            {
                                                order.expectedDate
                                            }
                                        </Typography>

                                    </Grid>


                                    <Grid
                                        size={{
                                            xs: 12,
                                            sm: 4,
                                            md: 2,
                                        }}
                                    >

                                        <Chip
                                            size="small"
                                            label={
                                                orderStatusConfig[
                                                    order.status
                                                ].label
                                            }
                                            color={
                                                orderStatusConfig[
                                                    order.status
                                                ].color
                                            }
                                        />

                                    </Grid>

                                </Grid>

                            </Paper>

                        )
                    )}

                </Stack>

            )}


            {/* =================================================
                INCOMING STOCK
            ================================================= */}

            {activeTab === 2 && (

                <Stack spacing={1.5}>

                    <Alert
                        severity="info"
                        icon={
                            <LocalShippingRounded />
                        }
                        sx={{
                            borderRadius: 3,
                        }}
                    >
                        Incoming stock should be
                        inspected against the
                        original purchase order
                        before inventory is updated.
                    </Alert>


                    {filteredIncoming.map(
                        incoming => (

                            <Paper
                                key={incoming.id}
                                variant="outlined"
                                sx={{
                                    p: 2.5,
                                    borderRadius: 3,
                                }}
                            >

                                <Grid
                                    container
                                    spacing={2}
                                    alignItems="center"
                                >

                                    <Grid
                                        size={{
                                            xs: 12,
                                            md: 3,
                                        }}
                                    >

                                        <Typography
                                            fontWeight={700}
                                        >
                                            {
                                                incoming.id
                                            }
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            PO:{" "}
                                            {
                                                incoming.purchaseOrderId
                                            }
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                        >
                                            {
                                                incoming.supplier
                                            }
                                        </Typography>

                                    </Grid>


                                    <Grid
                                        size={{
                                            xs: 6,
                                            sm: 4,
                                            md: 2,
                                        }}
                                    >

                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            Warehouse
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            fontWeight={600}
                                        >
                                            {
                                                incoming.warehouse
                                            }
                                        </Typography>

                                    </Grid>


                                    <Grid
                                        size={{
                                            xs: 6,
                                            sm: 4,
                                            md: 2,
                                        }}
                                    >

                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            Expected
                                        </Typography>

                                        <Typography
                                            fontWeight={700}
                                        >
                                            {
                                                incoming.expectedQty
                                            }
                                        </Typography>

                                    </Grid>


                                    <Grid
                                        size={{
                                            xs: 6,
                                            sm: 4,
                                            md: 1.5,
                                        }}
                                    >

                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            Received
                                        </Typography>

                                        <Typography
                                            fontWeight={700}
                                        >
                                            {
                                                incoming.receivedQty
                                            }
                                        </Typography>

                                    </Grid>


                                    <Grid
                                        size={{
                                            xs: 6,
                                            sm: 4,
                                            md: 1.5,
                                        }}
                                    >

                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            Damaged
                                        </Typography>

                                        <Typography
                                            fontWeight={700}
                                            color={
                                                incoming.damagedQty >
                                                    0
                                                    ? "error.main"
                                                    : "inherit"
                                            }
                                        >
                                            {
                                                incoming.damagedQty
                                            }
                                        </Typography>

                                    </Grid>


                                    <Grid
                                        size={{
                                            xs: 12,
                                            md: 2,
                                        }}
                                    >

                                        <Chip
                                            size="small"
                                            label={
                                                incomingStatusConfig[
                                                    incoming.status
                                                ].label
                                            }
                                            color={
                                                incomingStatusConfig[
                                                    incoming.status
                                                ].color
                                            }
                                        />

                                    </Grid>

                                </Grid>


                                {incoming.status ===
                                    "INSPECTING" && (

                                        <>

                                            <Divider
                                                sx={{
                                                    my: 2,
                                                }}
                                            />

                                            <Stack
                                                direction={{
                                                    xs: "column",
                                                    sm: "row",
                                                }}
                                                justifyContent="space-between"
                                                alignItems={{
                                                    xs: "flex-start",
                                                    sm: "center",
                                                }}
                                                gap={2}
                                            >

                                                <Stack
                                                    direction="row"
                                                    spacing={1}
                                                    alignItems="center"
                                                >

                                                    <WarningRounded
                                                        color="warning"
                                                    />

                                                    <Typography
                                                        variant="body2"
                                                    >
                                                        Receiving
                                                        inspection is
                                                        required.
                                                    </Typography>

                                                </Stack>


                                                <Button
                                                    variant="contained"
                                                    endIcon={
                                                        <ArrowForwardRounded />
                                                    }
                                                >
                                                    Inspect Shipment
                                                </Button>

                                            </Stack>

                                        </>
                                    )}

                            </Paper>

                        )
                    )}

                </Stack>

            )}


            {/* =================================================
                HISTORY
            ================================================= */}

            {activeTab === 3 && (

                <Stack spacing={1.5}>

                    {filteredHistory.map(
                        history => (

                            <Paper
                                key={history.id}
                                variant="outlined"
                                sx={{
                                    p: 2.5,
                                    borderRadius: 3,
                                }}
                            >

                                <Grid
                                    container
                                    spacing={2}
                                    alignItems="center"
                                >

                                    <Grid
                                        size={{
                                            xs: 12,
                                            md: 3,
                                        }}
                                    >

                                        <Typography
                                            fontWeight={700}
                                        >
                                            {
                                                history.id
                                            }
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {
                                                history.purchaseOrderId
                                            }
                                        </Typography>

                                    </Grid>


                                    <Grid
                                        size={{
                                            xs: 12,
                                            sm: 6,
                                            md: 2,
                                        }}
                                    >

                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            Supplier
                                        </Typography>

                                        <Typography
                                            fontWeight={600}
                                        >
                                            {
                                                history.supplier
                                            }
                                        </Typography>

                                    </Grid>


                                    <Grid
                                        size={{
                                            xs: 6,
                                            sm: 3,
                                            md: 2,
                                        }}
                                    >

                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            Quantity
                                        </Typography>

                                        <Typography
                                            fontWeight={700}
                                        >
                                            {
                                                history.totalQuantity
                                            }
                                        </Typography>

                                    </Grid>


                                    <Grid
                                        size={{
                                            xs: 6,
                                            sm: 3,
                                            md: 2,
                                        }}
                                    >

                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            Total Cost
                                        </Typography>

                                        <Typography
                                            fontWeight={700}
                                        >
                                            ¥
                                            {history.totalCost.toLocaleString()}
                                        </Typography>

                                    </Grid>


                                    <Grid
                                        size={{
                                            xs: 12,
                                            sm: 6,
                                            md: 2,
                                        }}
                                    >

                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            Received
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                        >
                                            {
                                                history.receivedAt
                                            }
                                        </Typography>

                                    </Grid>


                                    <Grid
                                        size={{
                                            xs: 12,
                                            sm: 6,
                                            md: 1,
                                        }}
                                    >

                                        <Chip
                                            size="small"
                                            label={
                                                history.status
                                            }
                                            color={
                                                history.status ===
                                                    "COMPLETED"
                                                    ? "success"
                                                    : history.status ===
                                                        "PARTIAL"
                                                        ? "warning"
                                                        : "error"
                                            }
                                        />

                                    </Grid>

                                </Grid>

                            </Paper>

                        )
                    )}

                </Stack>

            )}


            {/* =================================================
                EMPTY STATE
            ================================================= */}

            {(
                activeTab === 0
                    ? filteredRequests.length === 0
                    : activeTab === 1
                        ? filteredOrders.length === 0
                        : activeTab === 2
                            ? filteredIncoming.length === 0
                            : filteredHistory.length === 0
            ) && (

                    <Paper
                        variant="outlined"
                        sx={{
                            p: 6,
                            borderRadius: 3,
                            textAlign: "center",
                        }}
                    >

                        <SearchRounded
                            sx={{
                                fontSize: 42,
                                color: "text.secondary",
                                mb: 1,
                            }}
                        />

                        <Typography
                            variant="h6"
                            fontWeight={700}
                        >
                            No records found
                        </Typography>

                        <Typography
                            color="text.secondary"
                        >
                            Try changing your search
                            or filter.
                        </Typography>

                    </Paper>

                )}

        </Box>
    );
}