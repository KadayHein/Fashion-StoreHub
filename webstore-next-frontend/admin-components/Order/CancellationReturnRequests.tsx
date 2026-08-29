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
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography,
} from "@mui/material";

import {
    AssignmentReturnRounded,
    CancelRounded,
    CheckCircleRounded,
    CloseRounded,
    ErrorOutlineRounded,
    HourglassTopRounded,
    Inventory2Rounded,
    LocalShippingRounded,
    PersonRounded,
    ReceiptLongRounded,
    SearchRounded,
    ShoppingBagRounded,
    VisibilityRounded,
} from "@mui/icons-material";


// ============================================================
// TYPES
// ============================================================

type RequestTab =
    | "ALL"
    | "CANCELLATION"
    | "RETURN"
    | "REFUND"
    | "REJECTED";

type RequestKind =
    | "CANCELLATION"
    | "RETURN";

type RequestStatus =
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "RECEIVED"
    | "INSPECTING"
    | "COMPLETED"
    | "REFUND_PENDING"
    | "REFUNDED";

type CancellationReason =
    | "CUSTOMER_CHANGED_MIND"
    | "WRONG_PRODUCT"
    | "WRONG_SIZE"
    | "DAMAGED_PRODUCT"
    | "PRODUCT_ERROR"
    | "DUPLICATE_ORDER"
    | "PAYMENT_PROBLEM"
    | "OTHER";

type ReturnReason =
    | "DAMAGED_PRODUCT"
    | "WRONG_PRODUCT"
    | "WRONG_SIZE"
    | "PRODUCT_NOT_AS_DESCRIBED"
    | "DEFECTIVE_PRODUCT"
    | "CUSTOMER_CHANGED_MIND"
    | "OTHER";


interface RequestItem {
    id: number;
    product: string;
    sku: string;
    image: string;
    quantity: number;
    price: number;
    size: string;
    color: string;
}


interface CancelReturnRequest {

    id: string;

    type: RequestKind;

    orderId: string;

    customer: string;
    email: string;
    phone: string;

    reason:
    | CancellationReason
    | ReturnReason;

    customerMessage: string;

    status: RequestStatus;

    requestedAt: string;

    reviewedAt?: string;

    reviewedBy?: string;

    reviewMessage?: string;

    paymentStatus:
    | "PAID"
    | "PENDING"
    | "REFUNDED";

    refundAmount: number;

    items: RequestItem[];

}


// ============================================================
// MOCK DATA
// ============================================================

const requests: CancelReturnRequest[] = [

    // ========================================================
    // 1. CANCELLATION - PENDING
    // ========================================================

    {
        id: "CAN-20260825-001",

        type: "CANCELLATION",

        orderId: "ORD-20260825-001",

        customer: "Kaday Hein",
        email: "kaday@example.com",
        phone: "090-1234-5678",

        reason:
            "CUSTOMER_CHANGED_MIND",

        customerMessage:
            "I ordered the wrong color and would like to cancel the order before it is shipped.",

        status: "PENDING",

        requestedAt:
            "2026-08-25 10:15",

        paymentStatus: "PAID",

        refundAmount: 8060,

        items: [
            {
                id: 1,
                product:
                    "Oversized Cotton T-Shirt",
                sku: "TSH-OS-001",
                image:
                    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
                quantity: 2,
                price: 3980,
                size: "L",
                color: "Black",
            },
        ],
    },


    // ========================================================
    // 2. CANCELLATION - APPROVED
    // ========================================================

    {
        id: "CAN-20260825-002",

        type: "CANCELLATION",

        orderId: "ORD-20260825-004",

        customer: "Sarah Tanaka",
        email: "sarah@example.com",
        phone: "070-5555-1234",

        reason:
            "WRONG_PRODUCT",

        customerMessage:
            "I selected the wrong product by mistake.",

        status: "APPROVED",

        requestedAt:
            "2026-08-25 09:20",

        reviewedAt:
            "2026-08-25 09:45",

        reviewedBy:
            "Manager",

        reviewMessage:
            "Order had not been shipped yet. Cancellation approved.",

        paymentStatus: "PAID",

        refundAmount: 12600,

        items: [
            {
                id: 2,
                product:
                    "Minimal Leather Jacket",
                sku: "JKT-LM-003",
                image:
                    "https://images.unsplash.com/photo-1551028719-00167b16eac5",
                quantity: 1,
                price: 12600,
                size: "M",
                color: "Black",
            },
        ],
    },


    // ========================================================
    // 3. CANCELLATION - REFUND PENDING
    // ========================================================

    {
        id: "CAN-20260825-003",

        type: "CANCELLATION",

        orderId: "ORD-20260824-011",

        customer: "Daniel Kim",
        email: "daniel@example.com",
        phone: "080-2222-4444",

        reason:
            "DUPLICATE_ORDER",

        customerMessage:
            "I accidentally placed the same order twice. Please cancel one of them.",

        status: "REFUND_PENDING",

        requestedAt:
            "2026-08-24 16:40",

        reviewedAt:
            "2026-08-24 17:10",

        reviewedBy:
            "Manager",

        reviewMessage:
            "Duplicate order confirmed. Refund is being processed.",

        paymentStatus: "PENDING",

        refundAmount: 15960,

        items: [
            {
                id: 3,
                product:
                    "Classic Oxford Shirt",
                sku: "SHR-OX-004",
                image:
                    "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab",
                quantity: 2,
                price: 7980,
                size: "M",
                color: "White",
            },
        ],
    },


    // ========================================================
    // 4. CANCELLATION - REFUNDED
    // ========================================================

    {
        id: "CAN-20260824-006",

        type: "CANCELLATION",

        orderId: "ORD-20260823-021",

        customer: "Yuki Nakamura",
        email: "yuki@example.com",
        phone: "090-7777-8888",

        reason:
            "PAYMENT_PROBLEM",

        customerMessage:
            "There was a problem with my payment and I would like to cancel the order.",

        status: "REFUNDED",

        requestedAt:
            "2026-08-23 11:25",

        reviewedAt:
            "2026-08-23 11:50",

        reviewedBy:
            "Manager",

        reviewMessage:
            "Cancellation approved and refund successfully completed.",

        paymentStatus: "REFUNDED",

        refundAmount: 9800,

        items: [
            {
                id: 4,
                product:
                    "Relaxed Fit Hoodie",
                sku: "HOD-RF-007",
                image:
                    "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
                quantity: 1,
                price: 9800,
                size: "L",
                color: "Gray",
            },
        ],
    },


    // ========================================================
    // 5. CANCELLATION - REJECTED
    // ========================================================

    {
        id: "CAN-20260823-004",

        type: "CANCELLATION",

        orderId: "ORD-20260822-015",

        customer: "James Wilson",
        email: "james@example.com",
        phone: "080-3333-1111",

        reason:
            "CUSTOMER_CHANGED_MIND",

        customerMessage:
            "I changed my mind and want to cancel my order.",

        status: "REJECTED",

        requestedAt:
            "2026-08-22 13:20",

        reviewedAt:
            "2026-08-22 14:05",

        reviewedBy:
            "Manager",

        reviewMessage:
            "The order had already been shipped and cannot be cancelled.",

        paymentStatus: "PAID",

        refundAmount: 0,

        items: [
            {
                id: 5,
                product:
                    "Slim Fit Chino Pants",
                sku: "PNT-SC-001",
                image:
                    "https://images.unsplash.com/photo-1473966968600-fa801b869a1a",
                quantity: 1,
                price: 7200,
                size: "M",
                color: "Khaki",
            },
        ],
    },


    // ========================================================
    // 6. RETURN - PENDING
    // ========================================================

    {
        id: "RET-20260825-001",

        type: "RETURN",

        orderId: "ORD-20260820-008",

        customer: "Michael Brown",
        email: "michael@example.com",
        phone: "080-9876-5432",

        reason:
            "DAMAGED_PRODUCT",

        customerMessage:
            "The jacket arrived with a damaged zipper. I would like to return it.",

        status: "PENDING",

        requestedAt:
            "2026-08-25 08:30",

        paymentStatus: "PAID",

        refundAmount: 14800,

        items: [
            {
                id: 6,
                product:
                    "Premium Denim Jacket",
                sku: "JKT-DM-008",
                image:
                    "https://images.unsplash.com/photo-1543076447-215ad9ba6923",
                quantity: 1,
                price: 14800,
                size: "L",
                color: "Blue",
            },
        ],
    },


    // ========================================================
    // 7. RETURN - RECEIVED
    // ========================================================

    {
        id: "RET-20260824-002",

        type: "RETURN",

        orderId: "ORD-20260818-012",

        customer: "Emily Wilson",
        email: "emily@example.com",
        phone: "070-1234-5678",

        reason:
            "WRONG_SIZE",

        customerMessage:
            "The size does not fit me. I would like to return the item.",

        status: "RECEIVED",

        requestedAt:
            "2026-08-24 14:20",

        reviewedAt:
            "2026-08-24 15:10",

        reviewedBy:
            "Staff",

        reviewMessage:
            "Return approved. Product has arrived at the warehouse.",

        paymentStatus: "PAID",

        refundAmount: 6980,

        items: [
            {
                id: 7,
                product:
                    "Wide Leg Cargo Pants",
                sku: "PNT-WC-002",
                image:
                    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
                quantity: 1,
                price: 6980,
                size: "M",
                color: "Beige",
            },
        ],
    },


    // ========================================================
    // 8. RETURN - INSPECTING
    // ========================================================

    {
        id: "RET-20260824-005",

        type: "RETURN",

        orderId: "ORD-20260817-019",

        customer: "Anna Smith",
        email: "anna@example.com",
        phone: "070-4444-2222",

        reason:
            "DEFECTIVE_PRODUCT",

        customerMessage:
            "The stitching started coming apart after I received the product.",

        status: "INSPECTING",

        requestedAt:
            "2026-08-23 09:40",

        reviewedAt:
            "2026-08-23 10:30",

        reviewedBy:
            "Warehouse Staff",

        reviewMessage:
            "Product received. Staff is checking the condition.",

        paymentStatus: "PAID",

        refundAmount: 11200,

        items: [
            {
                id: 8,
                product:
                    "Premium Knit Sweater",
                sku: "SWT-PK-005",
                image:
                    "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
                quantity: 1,
                price: 11200,
                size: "S",
                color: "Cream",
            },
        ],
    },


    // ========================================================
    // 9. RETURN - REFUND PENDING
    // ========================================================

    {
        id: "RET-20260823-008",

        type: "RETURN",

        orderId: "ORD-20260815-027",

        customer: "Robert Chen",
        email: "robert@example.com",
        phone: "080-6666-9999",

        reason:
            "WRONG_PRODUCT",

        customerMessage:
            "I received a different product from what I ordered.",

        status: "REFUND_PENDING",

        requestedAt:
            "2026-08-21 12:15",

        reviewedAt:
            "2026-08-21 13:00",

        reviewedBy:
            "Manager",

        reviewMessage:
            "Wrong product confirmed. Return accepted and refund is being processed.",

        paymentStatus: "PENDING",

        refundAmount: 18900,

        items: [
            {
                id: 9,
                product:
                    "Premium Casual Blazer",
                sku: "BLZ-PC-002",
                image:
                    "https://images.unsplash.com/photo-1598808503746-f34c53b9323e",
                quantity: 1,
                price: 18900,
                size: "M",
                color: "Navy",
            },
        ],
    },


    // ========================================================
    // 10. RETURN - REFUNDED
    // ========================================================

    {
        id: "RET-20260822-010",

        type: "RETURN",

        orderId: "ORD-20260812-031",

        customer: "Lisa Anderson",
        email: "lisa@example.com",
        phone: "090-1111-2222",

        reason:
            "PRODUCT_NOT_AS_DESCRIBED",

        customerMessage:
            "The actual color is significantly different from the product photos.",

        status: "REFUNDED",

        requestedAt:
            "2026-08-18 10:30",

        reviewedAt:
            "2026-08-18 11:45",

        reviewedBy:
            "Manager",

        reviewMessage:
            "Return inspected and accepted. Refund completed.",

        paymentStatus: "REFUNDED",

        refundAmount: 8500,

        items: [
            {
                id: 10,
                product:
                    "Relaxed Linen Shirt",
                sku: "SHR-LN-006",
                image:
                    "https://images.unsplash.com/photo-1604695573706-53170668f6a6",
                quantity: 1,
                price: 8500,
                size: "L",
                color: "Green",
            },
        ],
    },


    // ========================================================
    // 11. RETURN - COMPLETED
    // ========================================================

    {
        id: "RET-20260821-012",

        type: "RETURN",

        orderId: "ORD-20260810-042",

        customer: "Kenji Sato",
        email: "kenji@example.com",
        phone: "080-5555-7777",

        reason:
            "WRONG_SIZE",

        customerMessage:
            "The pants were too small, so I requested a return.",

        status: "COMPLETED",

        requestedAt:
            "2026-08-17 15:10",

        reviewedAt:
            "2026-08-17 16:00",

        reviewedBy:
            "Manager",

        reviewMessage:
            "Return completed and inventory updated.",

        paymentStatus: "REFUNDED",

        refundAmount: 7800,

        items: [
            {
                id: 11,
                product:
                    "Straight Denim Jeans",
                sku: "JNS-SD-004",
                image:
                    "https://images.unsplash.com/photo-1542272604-787c3835535d",
                quantity: 1,
                price: 7800,
                size: "S",
                color: "Indigo",
            },
        ],
    },


    // ========================================================
    // 12. RETURN - REJECTED
    // ========================================================

    {
        id: "RET-20260820-014",

        type: "RETURN",

        orderId: "ORD-20260805-055",

        customer: "David Lee",
        email: "david@example.com",
        phone: "070-8888-6666",

        reason:
            "CUSTOMER_CHANGED_MIND",

        customerMessage:
            "I don't need the product anymore and want to return it.",

        status: "REJECTED",

        requestedAt:
            "2026-08-16 09:15",

        reviewedAt:
            "2026-08-16 10:05",

        reviewedBy:
            "Manager",

        reviewMessage:
            "Return window has expired. Return request rejected.",

        paymentStatus: "PAID",

        refundAmount: 0,

        items: [
            {
                id: 12,
                product:
                    "Basic Cotton Polo",
                sku: "POL-BC-003",
                image:
                    "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d",
                quantity: 1,
                price: 5800,
                size: "M",
                color: "White",
            },
        ],
    },

];


// ============================================================
// REASON CONFIG
// ============================================================

const reasonConfig: Record<string, string> = {

    CUSTOMER_CHANGED_MIND:
        "Changed Mind",

    WRONG_PRODUCT:
        "Wrong Product",

    WRONG_SIZE:
        "Wrong Size",

    DAMAGED_PRODUCT:
        "Damaged Product",

    PRODUCT_ERROR:
        "Product Error",

    PRODUCT_NOT_AS_DESCRIBED:
        "Product Not as Described",

    DEFECTIVE_PRODUCT:
        "Defective Product",

    DUPLICATE_ORDER:
        "Duplicate Order",

    PAYMENT_PROBLEM:
        "Payment Problem",

    OTHER:
        "Other",

};


// ============================================================
// STATUS CONFIG
// ============================================================

const statusConfig: Record<
    RequestStatus,
    {
        label: string;
        color:
        | "warning"
        | "success"
        | "error"
        | "info"
        | "default";
    }
> = {

    PENDING: {
        label: "Pending Review",
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

    RECEIVED: {
        label: "Product Received",
        color: "info",
    },

    INSPECTING: {
        label: "Inspecting",
        color: "info",
    },

    COMPLETED: {
        label: "Completed",
        color: "success",
    },

    REFUND_PENDING: {
        label: "Refund Pending",
        color: "warning",
    },

    REFUNDED: {
        label: "Refunded",
        color: "success",
    },
};


// ============================================================
// MAIN COMPONENT
// ============================================================

export default function CancellationReturnRequests() {

    const [
        requestType,
        setRequestType,
    ] = useState<RequestTab>("ALL");


    const [
        selectedRequest,
        setSelectedRequest,
    ] =
        useState<CancelReturnRequest | null>(
            null
        );


    const [
        statusFilter,
        setStatusFilter,
    ] =
        useState<
            RequestStatus | "ALL"
        >("ALL");


    const [
        search,
        setSearch,
    ] = useState("");


    const [page, setPage] =
        useState(1);


    const rowsPerPage = 8;


    // ========================================================
    // FILTER
    // ========================================================

    const filteredRequests =
        useMemo(() => {

            const query =
                search
                    .toLowerCase()
                    .trim();

            return requests.filter(
                request => {

                    // --------------------------------------------
                    // TAB FILTER
                    // --------------------------------------------

                    let matchesTab = true;

                    switch (requestType) {

                        case "CANCELLATION":

                            matchesTab =
                                request.type ===
                                "CANCELLATION";

                            break;


                        case "RETURN":

                            matchesTab =
                                request.type ===
                                "RETURN";

                            break;


                        case "REFUND":

                            matchesTab =
                                (
                                    request.status ===
                                    "REFUND_PENDING" ||

                                    request.status ===
                                    "REFUNDED" ||

                                    request.paymentStatus ===
                                    "REFUNDED"
                                );

                            break;


                        case "REJECTED":

                            matchesTab =
                                request.status ===
                                "REJECTED";

                            break;


                        case "ALL":
                        default:
                            matchesTab = true;
                            break;
                    }


                    // --------------------------------------------
                    // STATUS FILTER
                    // --------------------------------------------

                    const matchesStatus =
                        statusFilter === "ALL" ||
                        request.status ===
                        statusFilter;


                    // --------------------------------------------
                    // SEARCH
                    // --------------------------------------------

                    const matchesSearch =
                        !query ||

                        request.id
                            .toLowerCase()
                            .includes(query) ||

                        request.orderId
                            .toLowerCase()
                            .includes(query) ||

                        request.customer
                            .toLowerCase()
                            .includes(query) ||

                        request.email
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
            requestType,
            statusFilter,
            search,
        ]);

    // ========================================================
    // PAGINATION
    // ========================================================

    const totalPages =
        Math.ceil(
            filteredRequests.length /
            rowsPerPage
        );


    const paginatedRequests =
        filteredRequests.slice(
            (page - 1) *
            rowsPerPage,

            page *
            rowsPerPage
        );


    // ========================================================
    // COUNTS
    // ========================================================

    const allRequestCount =
        requests.length;


    const cancellationCount =
        requests.filter(
            request =>
                request.type ===
                "CANCELLATION"
        ).length;


    const returnCount =
        requests.filter(
            request =>
                request.type ===
                "RETURN"
        ).length;


    const refundCount =
        requests.filter(
            request =>
                request.status ===
                "REFUND_PENDING" ||

                request.status ===
                "REFUNDED" ||

                request.paymentStatus ===
                "REFUNDED"
        ).length;


    const rejectedCount =
        requests.filter(
            request =>
                request.status ===
                "REJECTED"
        ).length;


    const pendingCount =
        requests.filter(
            request =>
                request.status ===
                "PENDING"
        ).length;


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
                        spacing={1}
                        alignItems="center"
                    >

                        <AssignmentReturnRounded fontSize="large"/>

                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >
                            Cancellation & Returns
                        </Typography>

                    </Stack>

                    <Typography
                        color="text.secondary"
                        sx={{
                            mt: 0.5,
                        }}
                    >
                        Review customer
                        cancellation and
                        product return
                        requests.
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

                {/* ALL */}

                <Grid
                    size={{
                        xs: 6,
                        sm: 4,
                        lg: 2.4,
                    }}
                >

                    <SummaryCard
                        icon={
                            <AssignmentReturnRounded />
                        }
                        title="All Requests"
                        value={
                            allRequestCount
                        }
                        onClick={() =>
                            setRequestType("ALL")
                        }
                        selected={
                            requestType === "ALL"
                        }
                    />

                </Grid>


                {/* CANCELLATION */}

                <Grid
                    size={{
                        xs: 6,
                        sm: 4,
                        lg: 2.4,
                    }}
                >

                    <SummaryCard
                        icon={
                            <CancelRounded />
                        }
                        title="Cancellation"
                        value={
                            cancellationCount
                        }
                        onClick={() =>
                            setRequestType(
                                "CANCELLATION"
                            )
                        }
                        selected={
                            requestType ===
                            "CANCELLATION"
                        }
                    />

                </Grid>


                {/* RETURN */}

                <Grid
                    size={{
                        xs: 6,
                        sm: 4,
                        lg: 2.4,
                    }}
                >

                    <SummaryCard
                        icon={
                            <AssignmentReturnRounded />
                        }
                        title="Returns"
                        value={
                            returnCount
                        }
                        onClick={() =>
                            setRequestType(
                                "RETURN"
                            )
                        }
                        selected={
                            requestType ===
                            "RETURN"
                        }
                    />

                </Grid>


                {/* REFUND */}

                <Grid
                    size={{
                        xs: 6,
                        sm: 4,
                        lg: 2.4,
                    }}
                >

                    <SummaryCard
                        icon={
                            <ReceiptLongRounded />
                        }
                        title="Refunds"
                        value={
                            refundCount
                        }
                        onClick={() =>
                            setRequestType(
                                "REFUND"
                            )
                        }
                        selected={
                            requestType ===
                            "REFUND"
                        }
                    />

                </Grid>


                {/* REJECTED */}

                <Grid
                    size={{
                        xs: 6,
                        sm: 4,
                        lg: 2.4,
                    }}
                >

                    <SummaryCard
                        icon={
                            <ErrorOutlineRounded />
                        }
                        title="Rejected"
                        value={
                            rejectedCount
                        }
                        onClick={() =>
                            setRequestType(
                                "REJECTED"
                            )
                        }
                        selected={
                            requestType ===
                            "REJECTED"
                        }
                    />

                </Grid>

            </Grid>


            {/* =================================================
                REQUEST TYPE TABS
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
                    value={requestType}
                    onChange={(
                        _,
                        value: RequestTab
                    ) => {

                        setRequestType(value);

                        setPage(1);

                    }}
                    variant="scrollable"
                    scrollButtons="auto"
                >

                    <Tab
                        value="ALL"
                        label={
                            `All Requests (${allRequestCount})`
                        }
                    />

                    <Tab
                        value="CANCELLATION"
                        icon={
                            <CancelRounded />
                        }
                        iconPosition="start"
                        label={
                            `Cancellation (${cancellationCount})`
                        }
                    />

                    <Tab
                        value="RETURN"
                        icon={
                            <AssignmentReturnRounded />
                        }
                        iconPosition="start"
                        label={
                            `Returns (${returnCount})`
                        }
                    />

                    <Tab
                        value="REFUND"
                        icon={
                            <ReceiptLongRounded />
                        }
                        iconPosition="start"
                        label={
                            `Refunds (${refundCount})`
                        }
                    />

                    <Tab
                        value="REJECTED"
                        icon={
                            <ErrorOutlineRounded />
                        }
                        iconPosition="start"
                        label={
                            `Rejected (${rejectedCount})`
                        }
                    />

                </Tabs>

            </Paper>


            {/* =================================================
                SEARCH / FILTER
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
                        placeholder="Search Request ID, Order ID, customer..."
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
                            minWidth: 190,
                        }}
                    >

                        <InputLabel>
                            Status
                        </InputLabel>

                        <Select
                            value={statusFilter}
                            label="Status"
                            onChange={event => {

                                setStatusFilter(
                                    event.target.value as
                                    RequestStatus | "ALL"
                                );

                                setPage(1);

                            }}
                        >

                            <MenuItem value="ALL">
                                All Status
                            </MenuItem>

                            <MenuItem value="PENDING">
                                Pending Review
                            </MenuItem>

                            <MenuItem value="APPROVED">
                                Approved
                            </MenuItem>

                            <MenuItem value="RECEIVED">
                                Product Received
                            </MenuItem>

                            <MenuItem value="INSPECTING">
                                Inspecting
                            </MenuItem>

                            <MenuItem value="REFUND_PENDING">
                                Refund Pending
                            </MenuItem>

                            <MenuItem value="REFUNDED">
                                Refunded
                            </MenuItem>

                            <MenuItem value="COMPLETED">
                                Completed
                            </MenuItem>

                            <MenuItem value="REJECTED">
                                Rejected
                            </MenuItem>

                        </Select>

                    </FormControl>

                </Stack>

            </Card>


            {/* =================================================
                REQUEST LIST
            ================================================= */}

            <Stack spacing={1.5}>

                {paginatedRequests.map(
                    request => (

                        <RequestCard
                            key={
                                request.id
                            }
                            request={
                                request
                            }
                            onClick={() =>
                                setSelectedRequest(
                                    request
                                )
                            }
                        />

                    )
                )}

            </Stack>


            {/* =================================================
                PAGINATION
            ================================================= */}

            {totalPages > 0 && (

                <Stack
                    direction={{
                        xs: "column",
                        sm: "row",
                    }}
                    justifyContent="space-between"
                    alignItems="center"
                    gap={2}
                    mt={2}
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
                            filteredRequests.length
                        )}{" "}
                        of{" "}
                        {
                            filteredRequests.length
                        }
                    </Typography>


                    <Pagination
                        count={
                            totalPages
                        }
                        page={page}
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


            {/* =================================================
                DETAIL MODAL
            ================================================= */}

            <RequestDetailDialog
                request={
                    selectedRequest
                }
                onClose={() =>
                    setSelectedRequest(
                        null
                    )
                }
            />

        </Box>
    );
}


// ============================================================
// REQUEST CARD
// ============================================================

function RequestCard({
    request,
    onClick,
}: {
    request: CancelReturnRequest;
    onClick: () => void;
}) {

    const isCancellation =
        request.type ===
        "CANCELLATION";


    return (

        <Paper
            variant="outlined"
            onClick={onClick}
            sx={{
                p: 2,
                borderRadius: 3,
                cursor: "pointer",

                transition:
                    "all .2s",

                "&:hover": {
                    bgcolor:
                        "action.hover",
                    borderColor:
                        "text.primary",
                },
            }}
        >

            <Grid
                container
                spacing={2}
                alignItems="center"
            >

                {/* TYPE */}

                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 1.5,
                    }}
                >

                    <Chip
                        size="small"
                        icon={
                            isCancellation
                                ? (
                                    <CancelRounded />
                                )
                                : (
                                    <AssignmentReturnRounded />
                                )
                        }
                        label={
                            isCancellation
                                ? "Cancellation"
                                : "Return"
                        }
                        color={
                            isCancellation
                                ? "warning"
                                : "info"
                        }
                    />

                </Grid>


                {/* CUSTOMER */}

                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 2.5,
                    }}
                >

                    <Stack
                        direction="row"
                        spacing={1.5}
                        alignItems="center"
                    >

                        <Avatar>
                            {
                                request
                                    .customer[0]
                            }
                        </Avatar>

                        <Box
                            sx={{
                                minWidth: 0,
                            }}
                        >

                            <Typography
                                fontWeight={700}
                                noWrap
                            >
                                {
                                    request.customer
                                }
                            </Typography>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                                noWrap
                            >
                                {
                                    request.email
                                }
                            </Typography>

                        </Box>

                    </Stack>

                </Grid>


                {/* REQUEST */}

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
                        Request
                    </Typography>

                    <Typography
                        fontWeight={700}
                        noWrap
                    >
                        {
                            request.id
                        }
                    </Typography>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                        noWrap
                    >
                        Order:{" "}
                        {
                            request.orderId
                        }
                    </Typography>

                </Grid>


                {/* REASON */}

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
                        Reason
                    </Typography>

                    <Typography
                        fontWeight={600}
                        noWrap
                    >
                        {
                            reasonConfig[
                            request.reason
                            ]
                        }
                    </Typography>

                </Grid>


                {/* STATUS */}

                <Grid
                    size={{
                        xs: 6,
                        sm: 3,
                        md: 1.5,
                    }}
                >

                    <Chip
                        size="small"
                        label={
                            statusConfig[
                                request.status
                            ].label
                        }
                        color={
                            statusConfig[
                                request.status
                            ].color
                        }
                    />

                </Grid>


                {/* REFUND */}

                <Grid
                    size={{
                        xs: 6,
                        sm: 3,
                        md: 1.5,
                    }}
                >

                    <Typography
                        variant="caption"
                        color="text.secondary"
                    >
                        Refund
                    </Typography>

                    <Typography
                        fontWeight={800}
                    >
                        ¥
                        {
                            request
                                .refundAmount
                                .toLocaleString()
                        }
                    </Typography>

                </Grid>


                {/* VIEW */}

                <Grid
                    size={{
                        xs: 6,
                        sm: 3,
                        md: 1,
                    }}
                    sx={{
                        display: "flex",
                        justifyContent: {
                            xs: "flex-end",
                            md: "center",
                        },
                    }}
                >

                    <VisibilityRounded
                        sx={{
                            color:
                                "text.secondary",
                        }}
                    />

                </Grid>

            </Grid>

        </Paper>
    );
}


// ============================================================
// DETAIL DIALOG
// ============================================================

function RequestDetailDialog({
    request,
    onClose,
}: {
    request:
    | CancelReturnRequest
    | null;

    onClose: () => void;
}) {

    if (!request)
        return null;


    const isCancellation =
        request.type ===
        "CANCELLATION";


    return (

        <Dialog
            open={Boolean(request)}
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

                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                        >

                            {isCancellation
                                ? (
                                    <CancelRounded />
                                )
                                : (
                                    <AssignmentReturnRounded />
                                )}

                            <Typography
                                variant="h6"
                                fontWeight={800}
                            >
                                {
                                    isCancellation
                                        ? "Cancellation Request"
                                        : "Return Request"
                                }
                            </Typography>

                        </Stack>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {
                                request.id
                            }
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

                {/* =================================================
                    REQUEST STATUS
                ================================================= */}

                <Paper
                    variant="outlined"
                    sx={{
                        p: 2,
                        borderRadius: 2,
                        mb: 3,
                    }}
                >

                    <Grid
                        container
                        spacing={2}
                    >

                        <Grid
                            size={{
                                xs: 12,
                                sm: 4,
                            }}
                        >

                            <Info
                                label="Order ID"
                                value={
                                    request.orderId
                                }
                            />

                        </Grid>


                        <Grid
                            size={{
                                xs: 6,
                                sm: 4,
                            }}
                        >

                            <Info
                                label="Requested At"
                                value={
                                    request.requestedAt
                                }
                            />

                        </Grid>


                        <Grid
                            size={{
                                xs: 6,
                                sm: 4,
                            }}
                        >

                            <Box>

                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    Status
                                </Typography>

                                <Box
                                    sx={{
                                        mt: 0.5,
                                    }}
                                >

                                    <Chip
                                        size="small"
                                        label={
                                            statusConfig[
                                                request.status
                                            ].label
                                        }
                                        color={
                                            statusConfig[
                                                request.status
                                            ].color
                                        }
                                    />

                                </Box>

                            </Box>

                        </Grid>

                    </Grid>

                </Paper>


                {/* =================================================
                    CUSTOMER
                ================================================= */}

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
                        <Info
                            label="Customer"
                            value={
                                request.customer
                            }
                        />
                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            sm: 4,
                        }}
                    >
                        <Info
                            label="Email"
                            value={
                                request.email
                            }
                        />
                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            sm: 4,
                        }}
                    >
                        <Info
                            label="Phone"
                            value={
                                request.phone
                            }
                        />
                    </Grid>

                </Grid>


                {/* =================================================
                    REASON
                ================================================= */}

                <SectionTitle
                    icon={
                        <ErrorOutlineRounded />
                    }
                    title={
                        isCancellation
                            ? "Cancellation Reason"
                            : "Return Reason"
                    }
                />

                <Paper
                    variant="outlined"
                    sx={{
                        p: 2,
                        borderRadius: 2,
                        mb: 3,
                    }}
                >

                    <Chip
                        size="small"
                        label={
                            reasonConfig[
                            request.reason
                            ]
                        }
                        color="warning"
                        sx={{
                            mb: 1.5,
                        }}
                    />

                    <Typography
                        variant="body2"
                    >
                        {
                            request.customerMessage
                        }
                    </Typography>

                </Paper>


                {/* =================================================
                    PRODUCTS
                ================================================= */}

                <SectionTitle
                    icon={
                        <ShoppingBagRounded />
                    }
                    title="Affected Products"
                />

                <Stack
                    spacing={1.5}
                    mb={3}
                >

                    {request.items.map(
                        item => (

                            <Paper
                                key={
                                    item.id
                                }
                                variant="outlined"
                                sx={{
                                    p: 1.5,
                                    borderRadius: 2,
                                }}
                            >

                                <Grid
                                    container
                                    spacing={2}
                                    alignItems="center"
                                >

                                    <Grid
                                        size={{
                                            xs: 2,
                                            sm: 1,
                                        }}
                                    >

                                        <Avatar
                                            src={
                                                item.image
                                            }
                                            variant="rounded"
                                            sx={{
                                                width: 55,
                                                height: 55,
                                            }}
                                        />

                                    </Grid>


                                    <Grid
                                        size={{
                                            xs: 10,
                                            sm: 7,
                                        }}
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
                                            {" / Qty "}
                                            {
                                                item.quantity
                                            }
                                        </Typography>

                                    </Grid>


                                    <Grid
                                        size={{
                                            xs: 12,
                                            sm: 4,
                                        }}
                                    >

                                        <Typography
                                            fontWeight={800}
                                            sx={{
                                                textAlign: {
                                                    xs: "left",
                                                    sm: "right",
                                                },
                                            }}
                                        >
                                            ¥
                                            {
                                                (
                                                    item.price *
                                                    item.quantity
                                                ).toLocaleString()
                                            }
                                        </Typography>

                                    </Grid>

                                </Grid>

                            </Paper>

                        )
                    )}

                </Stack>


                {/* =================================================
                    RETURN PROCESS
                ================================================= */}

                {!isCancellation && (

                    <>

                        <SectionTitle
                            icon={
                                <Inventory2Rounded />
                            }
                            title="Return Processing"
                        />

                        <Paper
                            variant="outlined"
                            sx={{
                                p: 2,
                                borderRadius: 2,
                                mb: 3,
                            }}
                        >

                            <Grid
                                container
                                spacing={2}
                            >

                                <Grid
                                    size={{
                                        xs: 6,
                                        sm: 4,
                                    }}
                                >

                                    <Info
                                        label="Return Status"
                                        value={
                                            statusConfig[
                                                request.status
                                            ].label
                                        }
                                    />

                                </Grid>

                                <Grid
                                    size={{
                                        xs: 6,
                                        sm: 4,
                                    }}
                                >

                                    <Info
                                        label="Payment"
                                        value={
                                            request.paymentStatus
                                        }
                                    />

                                </Grid>

                                <Grid
                                    size={{
                                        xs: 12,
                                        sm: 4,
                                    }}
                                >

                                    <Info
                                        label="Refund"
                                        value={
                                            `¥${request.refundAmount.toLocaleString()}`
                                        }
                                    />

                                </Grid>

                            </Grid>

                        </Paper>

                    </>

                )}


                {/* =================================================
                    REFUND
                ================================================= */}

                <SectionTitle
                    icon={
                        <ReceiptLongRounded />
                    }
                    title="Refund Information"
                />

                <Paper
                    variant="outlined"
                    sx={{
                        p: 2,
                        borderRadius: 2,
                    }}
                >

                    <Grid
                        container
                        spacing={2}
                    >

                        <Grid
                            size={{
                                xs: 6,
                                sm: 4,
                            }}
                        >

                            <Info
                                label="Payment Status"
                                value={
                                    request.paymentStatus
                                }
                            />

                        </Grid>


                        <Grid
                            size={{
                                xs: 6,
                                sm: 4,
                            }}
                        >

                            <Info
                                label="Refund Amount"
                                value={
                                    `¥${request.refundAmount.toLocaleString()}`
                                }
                            />

                        </Grid>


                        <Grid
                            size={{
                                xs: 12,
                                sm: 4,
                            }}
                        >

                            <Info
                                label="Reviewed By"
                                value={
                                    request.reviewedBy ??
                                    "Not reviewed"
                                }
                            />

                        </Grid>

                    </Grid>

                </Paper>

            </DialogContent>


            {/* =================================================
                ACTIONS
            ================================================= */}

            <DialogActions
                sx={{
                    p: 2,
                }}
            >

                {request.status ===
                    "PENDING" && (

                        <>

                            <Button
                                variant="contained"
                                color="success"
                                startIcon={
                                    <CheckCircleRounded />
                                }
                            >
                                Approve
                                {
                                    isCancellation
                                        ? " Cancellation"
                                        : " Return"
                                }
                            </Button>


                            <Button
                                variant="outlined"
                                color="error"
                                startIcon={
                                    <CancelRounded />
                                }
                            >
                                Reject
                            </Button>

                        </>

                    )}


                {!isCancellation &&
                    request.status ===
                    "RECEIVED" && (

                        <Button
                            variant="contained"
                            startIcon={
                                <Inventory2Rounded />
                            }
                        >
                            Start Inspection
                        </Button>

                    )}


                {!isCancellation &&
                    request.status ===
                    "INSPECTING" && (

                        <Button
                            variant="contained"
                            color="success"
                            startIcon={
                                <CheckCircleRounded />
                            }
                        >
                            Accept Return
                        </Button>

                    )}


                <Button
                    color="inherit"
                    onClick={onClose}
                >
                    Close
                </Button>

            </DialogActions>

        </Dialog>
    );
}


// ============================================================
// SUMMARY CARD
// ============================================================

function SummaryCard({
    icon,
    title,
    value,
    onClick,
    selected,
}: {
    icon: React.ReactNode;
    title: string;
    value: number;
    onClick: () => void;
    selected: boolean;
}) {

    return (

        <Card
            elevation={0}
            onClick={onClick}
            sx={{
                border: "1px solid",

                borderColor:
                    selected
                        ? "text.primary"
                        : "divider",

                borderRadius: 3,

                cursor: "pointer",

                bgcolor:
                    selected
                        ? "action.selected"
                        : "background.paper",

                transition:
                    "all .2s",

                "&:hover": {
                    borderColor:
                        "text.primary",

                    transform:
                        "translateY(-2px)",

                    boxShadow:
                        2,
                },
            }}
        >

            <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                p={2}
            >

                <Box
                    sx={{
                        width: 42,
                        height: 42,
                        flexShrink: 0,

                        borderRadius: 2,

                        bgcolor:
                            selected
                                ? "black"
                                : "action.hover",

                        color:
                            selected
                                ? "white"
                                : "inherit",

                        display: "flex",
                        alignItems:
                            "center",
                        justifyContent:
                            "center",
                    }}
                >

                    {icon}

                </Box>


                <Box
                    sx={{
                        minWidth: 0,
                    }}
                >

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        noWrap
                    >
                        {title}
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
// SECTION TITLE
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


// ============================================================
// INFO
// ============================================================

function Info({
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

            <Typography
                variant="body2"
                fontWeight={600}
                sx={{
                    mt: 0.3,
                }}
            >
                {value}
            </Typography>

        </Box>
    );
}