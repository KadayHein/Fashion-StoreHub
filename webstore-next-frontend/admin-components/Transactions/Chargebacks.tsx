"use client";

import React, { useMemo, useState } from "react";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    MenuItem,
    Paper,
    Select,
    Stack,
    Tab,
    Tabs,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";

import {
    AccountBalanceRounded,
    AssignmentRounded,
    AttachMoneyRounded,
    CheckCircleRounded,
    CloseRounded,
    ErrorRounded,
    HistoryRounded,
    HourglassTopRounded,
    PaymentsRounded,
    RefreshRounded,
    SearchRounded,
    VisibilityRounded,
    WarningAmberRounded,
} from "@mui/icons-material";


// =====================================================
// TYPES
// =====================================================

type RefundRequestStatus =
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "PROCESSING"
    | "COMPLETED";

type RefundMethod =
    | "ORIGINAL_PAYMENT"
    | "BANK_TRANSFER"
    | "STORE_CREDIT";

type ChargebackStatus =
    | "RECEIVED"
    | "UNDER_REVIEW"
    | "EVIDENCE_REQUIRED"
    | "SUBMITTED"
    | "WON"
    | "LOST"
    | "CLOSED";

type ChargebackReason =
    | "FRAUDULENT"
    | "PRODUCT_NOT_RECEIVED"
    | "PRODUCT_NOT_AS_DESCRIBED"
    | "DUPLICATE_PAYMENT"
    | "OTHER";

type MainTab =
    | "REFUND_REQUESTS"
    | "REFUND_HISTORY"
    | "CHARGEBACKS";


type RefundRequest = {

    id: string;

    orderId: string;

    customerName: string;

    amount: number;

    reason: string;

    method: RefundMethod;

    status: RefundRequestStatus;

    requestedAt: string;

    processedAt?: string;
};


type RefundHistory = {

    id: string;

    refundId: string;

    orderId: string;

    customerName: string;

    amount: number;

    method: RefundMethod;

    status: "COMPLETED" | "FAILED";

    refundedAt: string;

    transactionId: string;
};


type Chargeback = {

    id: string;

    orderId: string;

    transactionId: string;

    customerName: string;

    amount: number;

    reason: ChargebackReason;

    status: ChargebackStatus;

    receivedAt: string;

    dueDate: string;

    gateway: string;

    customerClaim: string;

    internalNote?: string;
};


// =====================================================
// MOCK DATA
// =====================================================

const refundRequests: RefundRequest[] = [

    {
        id: "REF-10001",
        orderId: "ORD-20260825-001",
        customerName: "Yuki Tanaka",
        amount: 12800,
        reason:
            "Product arrived damaged.",
        method: "ORIGINAL_PAYMENT",
        status: "PENDING",
        requestedAt:
            "2026-08-27 10:42",
    },

    {
        id: "REF-10002",
        orderId: "ORD-20260824-019",
        customerName: "Ken Sato",
        amount: 5600,
        reason:
            "Wrong item delivered.",
        method: "ORIGINAL_PAYMENT",
        status: "APPROVED",
        requestedAt:
            "2026-08-27 09:20",
        processedAt:
            "2026-08-27 10:02",
    },

    {
        id: "REF-10003",
        orderId: "ORD-20260823-113",
        customerName: "Mika Ito",
        amount: 8900,
        reason:
            "Customer returned the product.",
        method: "STORE_CREDIT",
        status: "PROCESSING",
        requestedAt:
            "2026-08-26 16:32",
    },

    {
        id: "REF-10004",
        orderId: "ORD-20260822-091",
        customerName: "Hiro Watanabe",
        amount: 3400,
        reason:
            "Order cancellation.",
        method: "ORIGINAL_PAYMENT",
        status: "COMPLETED",
        requestedAt:
            "2026-08-26 11:20",
        processedAt:
            "2026-08-26 11:45",
    },

    {
        id: "REF-10005",
        orderId: "ORD-20260821-072",
        customerName: "Aoi Suzuki",
        amount: 22000,
        reason:
            "Duplicate payment.",
        method: "BANK_TRANSFER",
        status: "REJECTED",
        requestedAt:
            "2026-08-25 14:10",
        processedAt:
            "2026-08-25 15:22",
    },
];


const refundHistory: RefundHistory[] = [

    {
        id: "RH-001",
        refundId: "REF-10004",
        orderId: "ORD-20260822-091",
        customerName: "Hiro Watanabe",
        amount: 3400,
        method: "ORIGINAL_PAYMENT",
        status: "COMPLETED",
        refundedAt:
            "2026-08-26 11:45",
        transactionId:
            "TXN-8821901",
    },

    {
        id: "RH-002",
        refundId: "REF-09981",
        orderId: "ORD-20260820-034",
        customerName: "Rina Kato",
        amount: 7600,
        method: "STORE_CREDIT",
        status: "COMPLETED",
        refundedAt:
            "2026-08-25 17:20",
        transactionId:
            "TXN-8821742",
    },

    {
        id: "RH-003",
        refundId: "REF-09973",
        orderId: "ORD-20260819-055",
        customerName: "Daichi Mori",
        amount: 11200,
        method: "ORIGINAL_PAYMENT",
        status: "FAILED",
        refundedAt:
            "2026-08-25 13:12",
        transactionId:
            "TXN-8821601",
    },
];


const chargebacks: Chargeback[] = [

    {
        id: "CB-10001",
        orderId: "ORD-20260826-009",
        transactionId: "TXN-900812",
        customerName: "Takeshi Yamamoto",
        amount: 18400,
        reason: "FRAUDULENT",
        status: "EVIDENCE_REQUIRED",
        receivedAt:
            "2026-08-27 09:42",
        dueDate:
            "2026-09-03",
        gateway: "Stripe",
        customerClaim:
            "Customer claims the transaction was not authorized.",
    },

    {
        id: "CB-10002",
        orderId: "ORD-20260824-077",
        transactionId: "TXN-900721",
        customerName: "Mai Nakamura",
        amount: 9200,
        reason: "PRODUCT_NOT_RECEIVED",
        status: "UNDER_REVIEW",
        receivedAt:
            "2026-08-26 15:12",
        dueDate:
            "2026-09-01",
        gateway: "PayPay",
        customerClaim:
            "Customer claims the order was never delivered.",
    },

    {
        id: "CB-10003",
        orderId: "ORD-20260822-042",
        transactionId: "TXN-900601",
        customerName: "Sora Kimura",
        amount: 4500,
        reason: "DUPLICATE_PAYMENT",
        status: "SUBMITTED",
        receivedAt:
            "2026-08-25 12:08",
        dueDate:
            "2026-08-30",
        gateway: "Stripe",
        customerClaim:
            "Customer reports being charged twice.",
    },

    {
        id: "CB-10004",
        orderId: "ORD-20260820-019",
        transactionId: "TXN-900411",
        customerName: "Ryo Fujita",
        amount: 15600,
        reason: "PRODUCT_NOT_AS_DESCRIBED",
        status: "WON",
        receivedAt:
            "2026-08-21 10:15",
        dueDate:
            "2026-08-28",
        gateway: "Stripe",
        customerClaim:
            "Customer claims the received product differs from the listing.",
    },

    {
        id: "CB-10005",
        orderId: "ORD-20260818-004",
        transactionId: "TXN-900201",
        customerName: "Emi Hayashi",
        amount: 7800,
        reason: "OTHER",
        status: "LOST",
        receivedAt:
            "2026-08-19 08:32",
        dueDate:
            "2026-08-25",
        gateway: "PayPay",
        customerClaim:
            "Customer disputed the transaction through the payment provider.",
    },
];


// =====================================================
// LABELS
// =====================================================

const refundStatusConfig = {

    PENDING: {
        label: "Pending",
        color: "warning" as const,
    },

    APPROVED: {
        label: "Approved",
        color: "success" as const,
    },

    REJECTED: {
        label: "Rejected",
        color: "error" as const,
    },

    PROCESSING: {
        label: "Processing",
        color: "info" as const,
    },

    COMPLETED: {
        label: "Completed",
        color: "success" as const,
    },
};


const chargebackStatusConfig = {

    RECEIVED: {
        label: "Received",
        color: "info" as const,
    },

    UNDER_REVIEW: {
        label: "Under Review",
        color: "warning" as const,
    },

    EVIDENCE_REQUIRED: {
        label: "Evidence Required",
        color: "error" as const,
    },

    SUBMITTED: {
        label: "Evidence Submitted",
        color: "info" as const,
    },

    WON: {
        label: "Won",
        color: "success" as const,
    },

    LOST: {
        label: "Lost",
        color: "error" as const,
    },

    CLOSED: {
        label: "Closed",
        color: "default" as const,
    },
};


const reasonLabels: Record<
    ChargebackReason,
    string
> = {

    FRAUDULENT:
        "Fraudulent Transaction",

    PRODUCT_NOT_RECEIVED:
        "Product Not Received",

    PRODUCT_NOT_AS_DESCRIBED:
        "Product Not as Described",

    DUPLICATE_PAYMENT:
        "Duplicate Payment",

    OTHER:
        "Other",
};


const methodLabels: Record<
    RefundMethod,
    string
> = {

    ORIGINAL_PAYMENT:
        "Original Payment",

    BANK_TRANSFER:
        "Bank Transfer",

    STORE_CREDIT:
        "Store Credit",
};


// =====================================================
// SUMMARY CARD
// =====================================================

function SummaryCard({
    title,
    value,
    subtitle,
    icon,
    selected,
    onClick,
}: {
    title: string;
    value: string;
    subtitle: string;
    icon: React.ReactNode;
    selected?: boolean;
    onClick?: () => void;
}) {

    return (

        <Card
            variant="outlined"
            onClick={onClick}
            sx={{
                borderRadius: 3,
                cursor: onClick
                    ? "pointer"
                    : "default",
                height: "100%",

                borderColor: selected
                    ? "primary.main"
                    : "divider",

                bgcolor: selected
                    ? "action.selected"
                    : "background.paper",

                transition:
                    "all .2s",

                "&:hover": onClick
                    ? {
                        borderColor:
                            "primary.main",
                        transform:
                            "translateY(-2px)",
                    }
                    : {},
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
                            sx={{
                                mt: 0.5,
                            }}
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


// =====================================================
// CHARGEBACK DETAIL DIALOG
// =====================================================

function ChargebackDetailDialog({
    chargeback,
    onClose,
}: {
    chargeback:
    | Chargeback
    | null;

    onClose: () => void;
}) {

    if (!chargeback) {
        return null;
    }

    const status =
        chargebackStatusConfig[
        chargeback.status
        ];

    return (

        <Dialog
            open
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >

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
                            Chargeback Details
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {chargeback.id}
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

                <Stack spacing={3}>

                    <Alert
                        severity={
                            chargeback.status ===
                                "EVIDENCE_REQUIRED"
                                ? "warning"
                                : "info"
                        }
                    >
                        Chargebacks should be
                        reviewed against the
                        original order, delivery
                        information, payment record,
                        and customer communication.
                    </Alert>


                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                sm: "1fr 1fr",
                            },
                            gap: 2,
                        }}
                    >

                        <Box>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Chargeback ID
                            </Typography>

                            <Typography
                                fontWeight={700}
                            >
                                {chargeback.id}
                            </Typography>

                        </Box>


                        <Box>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Status
                            </Typography>

                            <Box sx={{ mt: 0.5 }}>

                                <Chip
                                    size="small"
                                    label={
                                        status.label
                                    }
                                    color={
                                        status.color
                                    }
                                />

                            </Box>

                        </Box>


                        <Box>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Order ID
                            </Typography>

                            <Typography
                                fontWeight={700}
                            >
                                {chargeback.orderId}
                            </Typography>

                        </Box>


                        <Box>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Transaction ID
                            </Typography>

                            <Typography
                                fontWeight={700}
                            >
                                {
                                    chargeback.transactionId
                                }
                            </Typography>

                        </Box>


                        <Box>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Customer
                            </Typography>

                            <Typography
                                fontWeight={700}
                            >
                                {
                                    chargeback.customerName
                                }
                            </Typography>

                        </Box>


                        <Box>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Amount
                            </Typography>

                            <Typography
                                variant="h6"
                                fontWeight={800}
                            >
                                ¥
                                {chargeback.amount.toLocaleString()}
                            </Typography>

                        </Box>


                        <Box>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Gateway
                            </Typography>

                            <Typography
                                fontWeight={700}
                            >
                                {
                                    chargeback.gateway
                                }
                            </Typography>

                        </Box>


                        <Box>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Response Due
                            </Typography>

                            <Typography
                                fontWeight={700}
                            >
                                {
                                    chargeback.dueDate
                                }
                            </Typography>

                        </Box>

                    </Box>


                    <Divider />


                    <Box>

                        <Typography
                            variant="subtitle1"
                            fontWeight={800}
                            sx={{ mb: 1 }}
                        >
                            Dispute Reason
                        </Typography>

                        <Chip
                            label={
                                reasonLabels[
                                chargeback.reason
                                ]
                            }
                        />

                    </Box>


                    <Box>

                        <Typography
                            variant="subtitle1"
                            fontWeight={800}
                            sx={{ mb: 1 }}
                        >
                            Customer Claim
                        </Typography>

                        <Paper
                            variant="outlined"
                            sx={{
                                p: 2,
                                borderRadius: 2,
                            }}
                        >

                            <Typography>
                                {
                                    chargeback.customerClaim
                                }
                            </Typography>

                        </Paper>

                    </Box>


                    <Box>

                        <Typography
                            variant="subtitle1"
                            fontWeight={800}
                            sx={{ mb: 1 }}
                        >
                            Evidence
                        </Typography>

                        <Stack
                            direction={{
                                xs: "column",
                                sm: "row",
                            }}
                            spacing={1.5}
                        >

                            <Button
                                variant="outlined"
                                startIcon={
                                    <AssignmentRounded />
                                }
                            >
                                Order Details
                            </Button>

                            <Button
                                variant="outlined"
                                startIcon={
                                    <PaymentsRounded />
                                }
                            >
                                Payment Record
                            </Button>

                            <Button
                                variant="outlined"
                                startIcon={
                                    <AccountBalanceRounded />
                                }
                            >
                                Delivery Proof
                            </Button>

                        </Stack>

                    </Box>

                </Stack>

            </DialogContent>


            <DialogActions
                sx={{
                    px: 3,
                    py: 2,
                }}
            >

                <Button
                    onClick={onClose}
                >
                    Close
                </Button>

                {chargeback.status ===
                    "EVIDENCE_REQUIRED" && (

                        <Button
                            variant="contained"
                        >
                            Submit Evidence
                        </Button>

                    )}

            </DialogActions>

        </Dialog>
    );
}


// =====================================================
// MAIN COMPONENT
// =====================================================

export default function Chargebacks() {

    const [
        activeTab,
        setActiveTab,
    ] = useState<MainTab>(
        "REFUND_REQUESTS"
    );


    const [
        search,
        setSearch,
    ] = useState("");


    const [
        statusFilter,
        setStatusFilter,
    ] = useState("ALL");


    const [
        page,
        setPage,
    ] = useState(0);


    const [
        rowsPerPage,
        setRowsPerPage,
    ] = useState(5);


    const [
        selectedChargeback,
        setSelectedChargeback,
    ] = useState<
        Chargeback | null
    >(null);


    // =================================================
    // SUMMARY
    // =================================================

    const pendingRefunds =
        refundRequests.filter(
            item =>
                item.status ===
                "PENDING" ||
                item.status ===
                "PROCESSING"
        ).length;


    const completedRefundAmount =
        refundHistory
            .filter(
                item =>
                    item.status ===
                    "COMPLETED"
            )
            .reduce(
                (sum, item) =>
                    sum + item.amount,
                0
            );


    const activeChargebacks =
        chargebacks.filter(
            item =>
                ![
                    "WON",
                    "LOST",
                    "CLOSED",
                ].includes(item.status)
        ).length;


    const chargebackAmount =
        chargebacks
            .filter(
                item =>
                    ![
                        "WON",
                        "LOST",
                        "CLOSED",
                    ].includes(item.status)
            )
            .reduce(
                (sum, item) =>
                    sum + item.amount,
                0
            );


    // =================================================
    // FILTER CHARGEBACKS
    // =================================================

    const filteredChargebacks =
        useMemo(() => {

            const searchValue =
                search
                    .trim()
                    .toLowerCase();

            return chargebacks.filter(
                item => {

                    const matchesSearch =
                        !searchValue ||
                        item.id
                            .toLowerCase()
                            .includes(
                                searchValue
                            ) ||
                        item.orderId
                            .toLowerCase()
                            .includes(
                                searchValue
                            ) ||
                        item.transactionId
                            .toLowerCase()
                            .includes(
                                searchValue
                            ) ||
                        item.customerName
                            .toLowerCase()
                            .includes(
                                searchValue
                            );


                    const matchesStatus =
                        statusFilter ===
                        "ALL" ||
                        item.status ===
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


    // =================================================
    // FILTER REFUNDS
    // =================================================

    const filteredRefunds =
        useMemo(() => {

            const searchValue =
                search
                    .trim()
                    .toLowerCase();

            return refundRequests.filter(
                item => {

                    const matchesSearch =
                        !searchValue ||
                        item.id
                            .toLowerCase()
                            .includes(
                                searchValue
                            ) ||
                        item.orderId
                            .toLowerCase()
                            .includes(
                                searchValue
                            ) ||
                        item.customerName
                            .toLowerCase()
                            .includes(
                                searchValue
                            );


                    const matchesStatus =
                        statusFilter ===
                        "ALL" ||
                        item.status ===
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


    const filteredHistory =
        useMemo(() => {

            const searchValue =
                search
                    .trim()
                    .toLowerCase();

            return refundHistory.filter(
                item => {

                    return (
                        !searchValue ||
                        item.refundId
                            .toLowerCase()
                            .includes(
                                searchValue
                            ) ||
                        item.orderId
                            .toLowerCase()
                            .includes(
                                searchValue
                            ) ||
                        item.customerName
                            .toLowerCase()
                            .includes(
                                searchValue
                            ) ||
                        item.transactionId
                            .toLowerCase()
                            .includes(
                                searchValue
                            )
                    );
                }
            );

        }, [
            search,
        ]);


    // =================================================
    // PAGINATION
    // =================================================

    const activeDataLength =
        activeTab ===
            "REFUND_REQUESTS"
            ? filteredRefunds.length
            : activeTab ===
                "REFUND_HISTORY"
                ? filteredHistory.length
                : filteredChargebacks.length;


    const handleTabChange = (
        _:
            React.SyntheticEvent,
        value: MainTab
    ) => {

        setActiveTab(value);

        setSearch("");

        setStatusFilter("ALL");

        setPage(0);
    };


    return (

        <Box>

            {/* =================================================
                HEADER
            ================================================= */}

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

                        <PaymentsRounded />

                        <Typography
                            variant="h4"
                            fontWeight={800}
                        >
                            Refunds & Chargebacks
                        </Typography>

                    </Stack>

                    <Typography
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                    >
                        Manage customer refunds,
                        refund history, and payment
                        disputes.
                    </Typography>

                </Box>


                <Button
                    variant="outlined"
                    startIcon={
                        <RefreshRounded />
                    }
                >
                    Refresh
                </Button>

            </Stack>


            {/* =================================================
                SUMMARY
            ================================================= */}

            <Box
                sx={{
                    display: "grid",

                    gridTemplateColumns: {
                        xs: "1fr 1fr",
                        md: "repeat(4, 1fr)",
                    },

                    gap: 2,

                    mb: 3,
                }}
            >

                <SummaryCard
                    title="Pending Refunds"
                    value={`${pendingRefunds}`}
                    subtitle="Requires review"
                    icon={
                        <HourglassTopRounded />
                    }
                    selected={
                        activeTab ===
                        "REFUND_REQUESTS"
                    }
                    onClick={() =>
                        handleTabChange(
                            {} as React.SyntheticEvent,
                            "REFUND_REQUESTS"
                        )
                    }
                />


                <SummaryCard
                    title="Refunded"
                    value={`¥${completedRefundAmount.toLocaleString()}`}
                    subtitle="Completed refunds"
                    icon={
                        <CheckCircleRounded />
                    }
                    selected={
                        activeTab ===
                        "REFUND_HISTORY"
                    }
                    onClick={() =>
                        handleTabChange(
                            {} as React.SyntheticEvent,
                            "REFUND_HISTORY"
                        )
                    }
                />


                <SummaryCard
                    title="Active Chargebacks"
                    value={`${activeChargebacks}`}
                    subtitle="Open disputes"
                    icon={
                        <WarningAmberRounded />
                    }
                    selected={
                        activeTab ===
                        "CHARGEBACKS"
                    }
                    onClick={() =>
                        handleTabChange(
                            {} as React.SyntheticEvent,
                            "CHARGEBACKS"
                        )
                    }
                />


                <SummaryCard
                    title="Disputed Amount"
                    value={`¥${chargebackAmount.toLocaleString()}`}
                    subtitle="Currently disputed"
                    icon={
                        <AttachMoneyRounded />
                    }
                    selected={
                        activeTab ===
                        "CHARGEBACKS"
                    }
                    onClick={() =>
                        handleTabChange(
                            {} as React.SyntheticEvent,
                            "CHARGEBACKS"
                        )
                    }
                />

            </Box>


            {/* =================================================
                TABS
            ================================================= */}

            <Paper
                variant="outlined"
                sx={{
                    borderRadius: 3,
                    mb: 3,
                    overflow: "hidden",
                }}
            >

                <Tabs
                    value={activeTab}
                    onChange={
                        handleTabChange
                    }
                    variant="scrollable"
                    scrollButtons="auto"
                >

                    <Tab
                        value="REFUND_REQUESTS"
                        icon={
                            <AssignmentRounded />
                        }
                        iconPosition="start"
                        label="Refund Requests"
                    />

                    <Tab
                        value="REFUND_HISTORY"
                        icon={
                            <HistoryRounded />
                        }
                        iconPosition="start"
                        label="Refund History"
                    />

                    <Tab
                        value="CHARGEBACKS"
                        icon={
                            <WarningAmberRounded />
                        }
                        iconPosition="start"
                        label="Chargebacks"
                    />

                </Tabs>

            </Paper>


            {/* =================================================
                FILTER BAR
            ================================================= */}

            <Paper
                variant="outlined"
                sx={{
                    p: 2,
                    borderRadius: 3,
                    mb: 2,
                }}
            >

                <Box
                    sx={{
                        display: "grid",

                        gridTemplateColumns: {
                            xs: "1fr",
                            sm:
                                activeTab ===
                                    "REFUND_HISTORY"
                                    ? "1fr"
                                    : "2fr 1fr",
                        },

                        gap: 2,
                    }}
                >

                    <TextField
                        size="small"
                        placeholder={
                            activeTab ===
                                "CHARGEBACKS"
                                ? "Search chargeback, order, transaction..."
                                : "Search refund, order, customer..."
                        }
                        value={search}
                        onChange={event => {

                            setSearch(
                                event.target.value
                            );

                            setPage(0);
                        }}
                        slotProps={{
                            input: {
                                startAdornment:
                                    <SearchRounded
                                        sx={{
                                            mr: 1,
                                            color:
                                                "text.secondary",
                                        }}
                                    />,
                            },
                        }}
                    />


                    {activeTab !==
                        "REFUND_HISTORY" && (

                            <TextField
                                select
                                size="small"
                                label="Status"
                                value={
                                    statusFilter
                                }
                                onChange={event => {

                                    setStatusFilter(
                                        event.target.value
                                    );

                                    setPage(0);
                                }}
                            >

                                <MenuItem value="ALL">
                                    All Statuses
                                </MenuItem>

                                {activeTab === "REFUND_REQUESTS" ?

                                    [
                                        { value: "PENDING", label: "Pending" },
                                        { value: "APPROVED", label: "Approved" },
                                        { value: "PROCESSING", label: "Processing" },
                                        { value: "COMPLETED", label: "Completed" },
                                        { value: "REJECTED", label: "Rejected" }
                                    ].map(logLv =>
                                        <MenuItem value={logLv.value}>
                                            {logLv.label}
                                        </MenuItem>
                                    )
                                    :

                                    [
                                        { value: "RECEIVED", label: "Received" },
                                        { value: "UNDER_REVIEW", label: "Under Review" },
                                        { value: "EVIDENCE_REQUIRED", label: "Evidence Required" },
                                        { value: "SUBMITTED", label: "Evidence Submitted" },
                                        { value: "WON", label: "Won" },
                                        { value: "LOST", label: "Lost" },
                                        { value: "CLOSED", label: "Closed" }
                                    ].map(logLv =>
                                        <MenuItem value={logLv.value}>
                                            {logLv.label}
                                        </MenuItem>
                                    )
                                }

                            </TextField>

                        )}

                </Box>

            </Paper>


            {/* =================================================
                REFUND REQUESTS
            ================================================= */}

            {activeTab ===
                "REFUND_REQUESTS" && (

                    <Paper
                        variant="outlined"
                        sx={{
                            borderRadius: 3,
                            overflow: "hidden",
                        }}
                    >

                        <TableContainer>

                            <Table>

                                <TableHead>

                                    <TableRow>

                                        <TableCell>
                                            Refund ID
                                        </TableCell>

                                        <TableCell>
                                            Customer
                                        </TableCell>

                                        <TableCell>
                                            Order
                                        </TableCell>

                                        <TableCell>
                                            Amount
                                        </TableCell>

                                        <TableCell>
                                            Reason
                                        </TableCell>

                                        <TableCell>
                                            Method
                                        </TableCell>

                                        <TableCell>
                                            Status
                                        </TableCell>

                                        <TableCell>
                                            Requested
                                        </TableCell>

                                    </TableRow>

                                </TableHead>


                                <TableBody>

                                    {filteredRefunds
                                        .slice(
                                            page *
                                            rowsPerPage,
                                            page *
                                            rowsPerPage +
                                            rowsPerPage
                                        )
                                        .map(
                                            item => (

                                                <TableRow
                                                    key={
                                                        item.id
                                                    }
                                                    hover
                                                >

                                                    <TableCell>
                                                        <Typography
                                                            fontWeight={700}
                                                        >
                                                            {
                                                                item.id
                                                            }
                                                        </Typography>
                                                    </TableCell>


                                                    <TableCell>
                                                        {
                                                            item.customerName
                                                        }
                                                    </TableCell>


                                                    <TableCell>
                                                        {
                                                            item.orderId
                                                        }
                                                    </TableCell>


                                                    <TableCell>

                                                        <Typography
                                                            fontWeight={800}
                                                        >
                                                            ¥
                                                            {item.amount.toLocaleString()}
                                                        </Typography>

                                                    </TableCell>


                                                    <TableCell>
                                                        {
                                                            item.reason
                                                        }
                                                    </TableCell>


                                                    <TableCell>
                                                        {
                                                            methodLabels[
                                                            item.method
                                                            ]
                                                        }
                                                    </TableCell>


                                                    <TableCell>

                                                        <Chip
                                                            size="small"
                                                            label={
                                                                refundStatusConfig[
                                                                    item.status
                                                                ].label
                                                            }
                                                            color={
                                                                refundStatusConfig[
                                                                    item.status
                                                                ].color
                                                            }
                                                        />

                                                    </TableCell>


                                                    <TableCell>
                                                        {
                                                            item.requestedAt
                                                        }
                                                    </TableCell>

                                                </TableRow>

                                            )
                                        )}

                                </TableBody>

                            </Table>

                        </TableContainer>


                        <TablePagination
                            component="div"
                            count={
                                activeDataLength
                            }
                            page={page}
                            rowsPerPage={
                                rowsPerPage
                            }
                            onPageChange={(
                                _,
                                newPage
                            ) =>
                                setPage(
                                    newPage
                                )
                            }
                            onRowsPerPageChange={
                                event => {

                                    setRowsPerPage(
                                        parseInt(
                                            event.target
                                                .value,
                                            10
                                        )
                                    );

                                    setPage(0);
                                }
                            }
                            rowsPerPageOptions={[
                                5,
                                10,
                                25,
                                50,
                            ]}
                        />

                    </Paper>

                )}


            {/* =================================================
                REFUND HISTORY
            ================================================= */}

            {activeTab ===
                "REFUND_HISTORY" && (

                    <Paper
                        variant="outlined"
                        sx={{
                            borderRadius: 3,
                            overflow: "hidden",
                        }}
                    >

                        <TableContainer>

                            <Table>

                                <TableHead>

                                    <TableRow>

                                        <TableCell>
                                            Refund ID
                                        </TableCell>

                                        <TableCell>
                                            Order
                                        </TableCell>

                                        <TableCell>
                                            Customer
                                        </TableCell>

                                        <TableCell>
                                            Amount
                                        </TableCell>

                                        <TableCell>
                                            Method
                                        </TableCell>

                                        <TableCell>
                                            Transaction
                                        </TableCell>

                                        <TableCell>
                                            Status
                                        </TableCell>

                                        <TableCell>
                                            Refunded At
                                        </TableCell>

                                    </TableRow>

                                </TableHead>


                                <TableBody>

                                    {filteredHistory
                                        .slice(
                                            page *
                                            rowsPerPage,
                                            page *
                                            rowsPerPage +
                                            rowsPerPage
                                        )
                                        .map(
                                            item => (

                                                <TableRow
                                                    key={
                                                        item.id
                                                    }
                                                    hover
                                                >

                                                    <TableCell>
                                                        {
                                                            item.refundId
                                                        }
                                                    </TableCell>

                                                    <TableCell>
                                                        {
                                                            item.orderId
                                                        }
                                                    </TableCell>

                                                    <TableCell>
                                                        {
                                                            item.customerName
                                                        }
                                                    </TableCell>

                                                    <TableCell>

                                                        <Typography
                                                            fontWeight={800}
                                                        >
                                                            ¥
                                                            {item.amount.toLocaleString()}
                                                        </Typography>

                                                    </TableCell>

                                                    <TableCell>
                                                        {
                                                            methodLabels[
                                                            item.method
                                                            ]
                                                        }
                                                    </TableCell>

                                                    <TableCell>
                                                        {
                                                            item.transactionId
                                                        }
                                                    </TableCell>

                                                    <TableCell>

                                                        <Chip
                                                            size="small"
                                                            label={
                                                                item.status
                                                            }
                                                            color={
                                                                item.status ===
                                                                    "COMPLETED"
                                                                    ? "success"
                                                                    : "error"
                                                            }
                                                        />

                                                    </TableCell>

                                                    <TableCell>
                                                        {
                                                            item.refundedAt
                                                        }
                                                    </TableCell>

                                                </TableRow>

                                            )
                                        )}

                                </TableBody>

                            </Table>

                        </TableContainer>


                        <TablePagination
                            component="div"
                            count={
                                activeDataLength
                            }
                            page={page}
                            rowsPerPage={
                                rowsPerPage
                            }
                            onPageChange={(
                                _,
                                newPage
                            ) =>
                                setPage(
                                    newPage
                                )
                            }
                            onRowsPerPageChange={
                                event => {

                                    setRowsPerPage(
                                        parseInt(
                                            event.target
                                                .value,
                                            10
                                        )
                                    );

                                    setPage(0);
                                }
                            }
                            rowsPerPageOptions={[
                                5,
                                10,
                                25,
                                50,
                            ]}
                        />

                    </Paper>

                )}


            {/* =================================================
                CHARGEBACKS
            ================================================= */}

            {activeTab ===
                "CHARGEBACKS" && (

                    <Paper
                        variant="outlined"
                        sx={{
                            borderRadius: 3,
                            overflow: "hidden",
                        }}
                    >

                        <TableContainer>

                            <Table>

                                <TableHead>

                                    <TableRow>

                                        <TableCell>
                                            Chargeback
                                        </TableCell>

                                        <TableCell>
                                            Customer
                                        </TableCell>

                                        <TableCell>
                                            Order
                                        </TableCell>

                                        <TableCell>
                                            Amount
                                        </TableCell>

                                        <TableCell>
                                            Reason
                                        </TableCell>

                                        <TableCell>
                                            Status
                                        </TableCell>

                                        <TableCell>
                                            Due Date
                                        </TableCell>

                                        <TableCell />

                                    </TableRow>

                                </TableHead>


                                <TableBody>

                                    {filteredChargebacks
                                        .slice(
                                            page *
                                            rowsPerPage,
                                            page *
                                            rowsPerPage +
                                            rowsPerPage
                                        )
                                        .map(
                                            item => {

                                                const status =
                                                    chargebackStatusConfig[
                                                    item.status
                                                    ];

                                                return (

                                                    <TableRow
                                                        key={
                                                            item.id
                                                        }
                                                        hover
                                                    >

                                                        <TableCell>

                                                            <Typography
                                                                fontWeight={800}
                                                            >
                                                                {
                                                                    item.id
                                                                }
                                                            </Typography>

                                                            <Typography
                                                                variant="caption"
                                                                color="text.secondary"
                                                            >
                                                                {
                                                                    item.gateway
                                                                }
                                                            </Typography>

                                                        </TableCell>


                                                        <TableCell>
                                                            {
                                                                item.customerName
                                                            }
                                                        </TableCell>


                                                        <TableCell>
                                                            {
                                                                item.orderId
                                                            }
                                                        </TableCell>


                                                        <TableCell>

                                                            <Typography
                                                                fontWeight={800}
                                                            >
                                                                ¥
                                                                {item.amount.toLocaleString()}
                                                            </Typography>

                                                        </TableCell>


                                                        <TableCell>

                                                            <Typography
                                                                variant="body2"
                                                            >
                                                                {
                                                                    reasonLabels[
                                                                    item.reason
                                                                    ]
                                                                }
                                                            </Typography>

                                                        </TableCell>


                                                        <TableCell>

                                                            <Chip
                                                                size="small"
                                                                label={
                                                                    status.label
                                                                }
                                                                color={
                                                                    status.color
                                                                }
                                                            />

                                                        </TableCell>


                                                        <TableCell>
                                                            {
                                                                item.dueDate
                                                            }
                                                        </TableCell>


                                                        <TableCell>

                                                            <IconButton
                                                                size="small"
                                                                onClick={() =>
                                                                    setSelectedChargeback(
                                                                        item
                                                                    )
                                                                }
                                                            >
                                                                <VisibilityRounded />
                                                            </IconButton>

                                                        </TableCell>

                                                    </TableRow>

                                                );
                                            }
                                        )}

                                </TableBody>

                            </Table>

                        </TableContainer>


                        <TablePagination
                            component="div"
                            count={
                                activeDataLength
                            }
                            page={page}
                            rowsPerPage={
                                rowsPerPage
                            }
                            onPageChange={(
                                _,
                                newPage
                            ) =>
                                setPage(
                                    newPage
                                )
                            }
                            onRowsPerPageChange={
                                event => {

                                    setRowsPerPage(
                                        parseInt(
                                            event.target
                                                .value,
                                            10
                                        )
                                    );

                                    setPage(0);
                                }
                            }
                            rowsPerPageOptions={[
                                5,
                                10,
                                25,
                                50,
                            ]}
                        />

                    </Paper>

                )}


            {/* =================================================
                MOBILE CHARGEBACK NOTICE
            ================================================= */}

            {activeTab ===
                "CHARGEBACKS" && (

                    <Alert
                        severity="info"
                        sx={{
                            mt: 2,
                        }}
                    >
                        Chargebacks require careful evidence
                        management. Keep order details, delivery
                        proof, payment records, and customer
                        communication available for dispute
                        responses.
                    </Alert>

                )}


            {/* =================================================
                DETAIL DIALOG
            ================================================= */}

            <ChargebackDetailDialog
                chargeback={
                    selectedChargeback
                }
                onClose={() =>
                    setSelectedChargeback(
                        null
                    )
                }
            />

        </Box>
    );
}