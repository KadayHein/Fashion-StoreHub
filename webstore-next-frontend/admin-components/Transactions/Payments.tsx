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
    CheckCircleRounded,
    CloseRounded,
    CreditCardRounded,
    ErrorRounded,
    HourglassTopRounded,
    PaymentsRounded,
    SearchRounded,
    VisibilityRounded,
    WarningAmberRounded,
} from "@mui/icons-material";


// =====================================================
// TYPES
// =====================================================

type PaymentStatus =
    | "SUCCESS"
    | "FAILED"
    | "PENDING";

type PaymentMethod =
    | "CREDIT_CARD"
    | "DEBIT_CARD"
    | "PAYPAY"
    | "BANK_TRANSFER"
    | "CASH_ON_DELIVERY";

type PaymentGateway =
    | "Stripe"
    | "PayPay"
    | "Bank"
    | "Internal";


type PaymentTransaction = {
    id: string;
    orderId: string;
    customer: string;
    email: string;

    amount: number;

    method: PaymentMethod;
    gateway: PaymentGateway;

    status: PaymentStatus;

    createdAt: string;

    failureReason?: string;

    reference?: string;
};


// =====================================================
// TAB
// =====================================================

type PaymentTab =
    | "ALL"
    | "SUCCESS"
    | "FAILED"
    | "PENDING";


// =====================================================
// MOCK DATA
// =====================================================

const mockTransactions: PaymentTransaction[] = [

    {
        id: "TX-20260827-001",
        orderId: "ORD-10582",
        customer: "Tanaka Hiroshi",
        email: "tanaka@example.com",
        amount: 12800,
        method: "CREDIT_CARD",
        gateway: "Stripe",
        status: "SUCCESS",
        createdAt: "2026-08-27 10:42",
        reference: "pi_3Q8A92",
    },

    {
        id: "TX-20260827-002",
        orderId: "ORD-10583",
        customer: "Yuki Sato",
        email: "yuki@example.com",
        amount: 8600,
        method: "PAYPAY",
        gateway: "PayPay",
        status: "SUCCESS",
        createdAt: "2026-08-27 10:31",
        reference: "PP-829102",
    },

    {
        id: "TX-20260827-003",
        orderId: "ORD-10584",
        customer: "Kenji Suzuki",
        email: "kenji@example.com",
        amount: 24500,
        method: "CREDIT_CARD",
        gateway: "Stripe",
        status: "FAILED",
        createdAt: "2026-08-27 10:22",
        failureReason:
            "Card declined by issuer",
        reference: "pi_3Q8B12",
    },

    {
        id: "TX-20260827-004",
        orderId: "ORD-10585",
        customer: "Aiko Nakamura",
        email: "aiko@example.com",
        amount: 15900,
        method: "BANK_TRANSFER",
        gateway: "Bank",
        status: "PENDING",
        createdAt: "2026-08-27 10:15",
        reference: "BT-881293",
    },

    {
        id: "TX-20260827-005",
        orderId: "ORD-10586",
        customer: "Ryo Yamamoto",
        email: "ryo@example.com",
        amount: 5200,
        method: "PAYPAY",
        gateway: "PayPay",
        status: "SUCCESS",
        createdAt: "2026-08-27 09:58",
        reference: "PP-829441",
    },

    {
        id: "TX-20260827-006",
        orderId: "ORD-10587",
        customer: "Mika Ito",
        email: "mika@example.com",
        amount: 32100,
        method: "CREDIT_CARD",
        gateway: "Stripe",
        status: "FAILED",
        createdAt: "2026-08-27 09:42",
        failureReason:
            "Insufficient funds",
        reference: "pi_3Q8C42",
    },

    {
        id: "TX-20260827-007",
        orderId: "ORD-10588",
        customer: "Daichi Watanabe",
        email: "daichi@example.com",
        amount: 9800,
        method: "DEBIT_CARD",
        gateway: "Stripe",
        status: "SUCCESS",
        createdAt: "2026-08-27 09:35",
        reference: "pi_3Q8D22",
    },

    {
        id: "TX-20260827-008",
        orderId: "ORD-10589",
        customer: "Sara Kobayashi",
        email: "sara@example.com",
        amount: 18400,
        method: "BANK_TRANSFER",
        gateway: "Bank",
        status: "PENDING",
        createdAt: "2026-08-27 09:18",
        reference: "BT-881421",
    },

    {
        id: "TX-20260827-009",
        orderId: "ORD-10590",
        customer: "Takumi Kato",
        email: "takumi@example.com",
        amount: 7600,
        method: "CREDIT_CARD",
        gateway: "Stripe",
        status: "FAILED",
        createdAt: "2026-08-27 09:04",
        failureReason:
            "Payment authentication failed",
        reference: "pi_3Q8E12",
    },

    {
        id: "TX-20260827-010",
        orderId: "ORD-10591",
        customer: "Hana Mori",
        email: "hana@example.com",
        amount: 41200,
        method: "CREDIT_CARD",
        gateway: "Stripe",
        status: "SUCCESS",
        createdAt: "2026-08-27 08:52",
        reference: "pi_3Q8F12",
    },
];


// =====================================================
// STATUS CONFIG
// =====================================================

const statusConfig = {
    SUCCESS: {
        label: "Successful",
        color: "success" as const,
        icon: <CheckCircleRounded fontSize="small" />,
    },

    FAILED: {
        label: "Failed",
        color: "error" as const,
        icon: <ErrorRounded fontSize="small" />,
    },

    PENDING: {
        label: "Pending",
        color: "warning" as const,
        icon: <HourglassTopRounded fontSize="small" />,
    },
};


// =====================================================
// PAYMENT METHOD LABEL
// =====================================================

const paymentMethodLabel: Record<
    PaymentMethod,
    string
> = {

    CREDIT_CARD: "Credit Card",

    DEBIT_CARD: "Debit Card",

    PAYPAY: "PayPay",

    BANK_TRANSFER: "Bank Transfer",

    CASH_ON_DELIVERY:
        "Cash on Delivery",
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
                height: "100%",
                borderRadius: 3,

                cursor: onClick
                    ? "pointer"
                    : "default",

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
                            justifyContent:
                                "center",

                            bgcolor:
                                "action.hover",
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
// TRANSACTION STATUS
// =====================================================

function PaymentStatusChip({
    status,
}: {
    status: PaymentStatus;
}) {

    const config =
        statusConfig[status];

    return (

        <Chip
            size="small"
            icon={config.icon}
            label={config.label}
            color={config.color}
        />
    );
}


// =====================================================
// DETAIL DIALOG
// =====================================================

function TransactionDetailsDialog({
    transaction,
    onClose,
}: {
    transaction:
        | PaymentTransaction
        | null;

    onClose: () => void;
}) {

    if (!transaction) {
        return null;
    }

    return (

        <Dialog
            open
            onClose={onClose}
            fullWidth
            maxWidth="sm"
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
                            Transaction Details
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {transaction.id}
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

                <Stack spacing={2.5}>

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >

                        <Typography
                            color="text.secondary"
                        >
                            Payment Status
                        </Typography>

                        <PaymentStatusChip
                            status={
                                transaction.status
                            }
                        />

                    </Stack>


                    <Divider />


                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns:
                                "1fr 1fr",
                            gap: 2,
                        }}
                    >

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
                                {transaction.id}
                            </Typography>

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
                                {transaction.orderId}
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
                                {transaction.customer}
                            </Typography>

                        </Box>


                        <Box>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Email
                            </Typography>

                            <Typography
                                fontWeight={700}
                                sx={{
                                    wordBreak:
                                        "break-word",
                                }}
                            >
                                {transaction.email}
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
                                {transaction.amount.toLocaleString()}
                            </Typography>

                        </Box>


                        <Box>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Payment Method
                            </Typography>

                            <Typography
                                fontWeight={700}
                            >
                                {
                                    paymentMethodLabel[
                                        transaction.method
                                    ]
                                }
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
                                {transaction.gateway}
                            </Typography>

                        </Box>


                        <Box>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Date & Time
                            </Typography>

                            <Typography
                                fontWeight={700}
                            >
                                {transaction.createdAt}
                            </Typography>

                        </Box>

                    </Box>


                    {transaction.reference && (

                        <Paper
                            variant="outlined"
                            sx={{
                                p: 2,
                                borderRadius: 2,
                            }}
                        >

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Gateway Reference
                            </Typography>

                            <Typography
                                fontWeight={700}
                                sx={{
                                    mt: 0.5,
                                    wordBreak:
                                        "break-all",
                                }}
                            >
                                {
                                    transaction.reference
                                }
                            </Typography>

                        </Paper>

                    )}


                    {transaction.failureReason && (

                        <Alert
                            severity="error"
                            icon={
                                <ErrorRounded />
                            }
                        >
                            <Typography
                                fontWeight={700}
                            >
                                Payment Failed
                            </Typography>

                            <Typography
                                variant="body2"
                            >
                                {
                                    transaction.failureReason
                                }
                            </Typography>

                        </Alert>

                    )}

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

            </DialogActions>

        </Dialog>
    );
}


// =====================================================
// MAIN COMPONENT
// =====================================================

export default function Payments() {

    const [
        activeTab,
        setActiveTab,
    ] = useState<PaymentTab>("ALL");


    const [
        search,
        setSearch,
    ] = useState("");


    const [
        methodFilter,
        setMethodFilter,
    ] = useState<
        PaymentMethod | "ALL"
    >("ALL");


    const [
        gatewayFilter,
        setGatewayFilter,
    ] = useState<
        PaymentGateway | "ALL"
    >("ALL");


    const [
        page,
        setPage,
    ] = useState(0);


    const [
        rowsPerPage,
        setRowsPerPage,
    ] = useState(5);


    const [
        selectedTransaction,
        setSelectedTransaction,
    ] = useState<
        PaymentTransaction | null
    >(null);


    // =================================================
    // COUNTS
    // =================================================

    const allCount =
        mockTransactions.length;

    const successCount =
        mockTransactions.filter(
            transaction =>
                transaction.status ===
                "SUCCESS"
        ).length;

    const failedCount =
        mockTransactions.filter(
            transaction =>
                transaction.status ===
                "FAILED"
        ).length;

    const pendingCount =
        mockTransactions.filter(
            transaction =>
                transaction.status ===
                "PENDING"
        ).length;


    const successfulRevenue =
        mockTransactions
            .filter(
                transaction =>
                    transaction.status ===
                    "SUCCESS"
            )
            .reduce(
                (sum, transaction) =>
                    sum + transaction.amount,
                0
            );


    // =================================================
    // FILTERING
    // =================================================

    const filteredTransactions =
        useMemo(() => {

            return mockTransactions.filter(
                transaction => {

                    const matchesTab =
                        activeTab === "ALL" ||
                        (activeTab ===
                            "SUCCESS" &&
                            transaction.status ===
                            "SUCCESS") ||
                        (activeTab ===
                            "FAILED" &&
                            transaction.status ===
                            "FAILED") ||
                        (activeTab ===
                            "PENDING" &&
                            transaction.status ===
                            "PENDING");


                    const searchValue =
                        search
                            .trim()
                            .toLowerCase();


                    const matchesSearch =
                        !searchValue ||
                        transaction.id
                            .toLowerCase()
                            .includes(
                                searchValue
                            ) ||
                        transaction.orderId
                            .toLowerCase()
                            .includes(
                                searchValue
                            ) ||
                        transaction.customer
                            .toLowerCase()
                            .includes(
                                searchValue
                            ) ||
                        transaction.email
                            .toLowerCase()
                            .includes(
                                searchValue
                            );


                    const matchesMethod =
                        methodFilter ===
                            "ALL" ||
                        transaction.method ===
                            methodFilter;


                    const matchesGateway =
                        gatewayFilter ===
                            "ALL" ||
                        transaction.gateway ===
                            gatewayFilter;


                    return (
                        matchesTab &&
                        matchesSearch &&
                        matchesMethod &&
                        matchesGateway
                    );
                }
            );

        }, [
            activeTab,
            search,
            methodFilter,
            gatewayFilter,
        ]);


    // =================================================
    // PAGINATION
    // =================================================

    const paginatedTransactions =
        filteredTransactions.slice(
            page * rowsPerPage,
            page * rowsPerPage +
            rowsPerPage
        );


    const handleTabChange = (
        _: React.SyntheticEvent,
        value: PaymentTab
    ) => {

        setActiveTab(value);

        setPage(0);
    };


    const handleSearchChange = (
        event:
            React.ChangeEvent<HTMLInputElement>
    ) => {

        setSearch(
            event.target.value
        );

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
                            Payments
                        </Typography>

                    </Stack>

                    <Typography
                        color="text.secondary"
                        sx={{
                            mt: 0.5,
                        }}
                    >
                        Monitor and investigate
                        customer payment transactions.
                    </Typography>

                </Box>

            </Stack>


            {/* =================================================
                SUMMARY CARDS
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
                    title="All Transactions"
                    value={`${allCount}`}
                    subtitle="All payment attempts"
                    icon={
                        <PaymentsRounded />
                    }
                    selected={
                        activeTab === "ALL"
                    }
                    onClick={() =>
                        handleTabChange(
                            null as any,
                            "ALL"
                        )
                    }
                />


                <SummaryCard
                    title="Successful"
                    value={`${successCount}`}
                    subtitle="Completed payments"
                    icon={
                        <CheckCircleRounded />
                    }
                    selected={
                        activeTab === "SUCCESS"
                    }
                    onClick={() =>
                        handleTabChange(
                            null as any,
                            "SUCCESS"
                        )
                    }
                />


                <SummaryCard
                    title="Failed"
                    value={`${failedCount}`}
                    subtitle="Payments requiring attention"
                    icon={
                        <ErrorRounded />
                    }
                    selected={
                        activeTab === "FAILED"
                    }
                    onClick={() =>
                        handleTabChange(
                            null as any,
                            "FAILED"
                        )
                    }
                />


                <SummaryCard
                    title="Pending"
                    value={`${pendingCount}`}
                    subtitle="Awaiting confirmation"
                    icon={
                        <HourglassTopRounded />
                    }
                    selected={
                        activeTab === "PENDING"
                    }
                    onClick={() =>
                        handleTabChange(
                            null as any,
                            "PENDING"
                        )
                    }
                />

            </Box>


            {/* =================================================
                REVENUE INFORMATION
            ================================================= */}

            <Alert
                severity="info"
                icon={
                    <CreditCardRounded />
                }
                sx={{
                    mb: 3,
                }}
            >
                Successful payment volume:
                {" "}
                <strong>
                    ¥
                    {successfulRevenue.toLocaleString()}
                </strong>
            </Alert>


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
                    variant="fullWidth"
                >

                    <Tab
                        value="ALL"
                        icon={
                            <PaymentsRounded />
                        }
                        iconPosition="start"
                        label="All Transactions"
                    />

                    <Tab
                        value="SUCCESS"
                        icon={
                            <CheckCircleRounded />
                        }
                        iconPosition="start"
                        label="Successful"
                    />

                    <Tab
                        value="FAILED"
                        icon={
                            <ErrorRounded />
                        }
                        iconPosition="start"
                        label="Failed"
                    />

                    <Tab
                        value="PENDING"
                        icon={
                            <HourglassTopRounded />
                        }
                        iconPosition="start"
                        label="Pending"
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
                    mb: 3,
                }}
            >

                <Box
                    sx={{
                        display: "grid",

                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "2fr 1fr 1fr",
                        },

                        gap: 2,
                    }}
                >

                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Search transaction, order, customer..."
                        value={search}
                        onChange={
                            handleSearchChange
                        }
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


                    <TextField
                        select
                        size="small"
                        label="Payment Method"
                        value={
                            methodFilter
                        }
                        onChange={event => {

                            setMethodFilter(
                                event.target
                                    .value as
                                    | PaymentMethod
                                    | "ALL"
                            );

                            setPage(0);
                        }}
                    >

                        <MenuItem value="ALL">
                            All Methods
                        </MenuItem>

                        <MenuItem value="CREDIT_CARD">
                            Credit Card
                        </MenuItem>

                        <MenuItem value="DEBIT_CARD">
                            Debit Card
                        </MenuItem>

                        <MenuItem value="PAYPAY">
                            PayPay
                        </MenuItem>

                        <MenuItem value="BANK_TRANSFER">
                            Bank Transfer
                        </MenuItem>

                    </TextField>


                    <TextField
                        select
                        size="small"
                        label="Gateway"
                        value={
                            gatewayFilter
                        }
                        onChange={event => {

                            setGatewayFilter(
                                event.target
                                    .value as
                                    | PaymentGateway
                                    | "ALL"
                            );

                            setPage(0);
                        }}
                    >

                        <MenuItem value="ALL">
                            All Gateways
                        </MenuItem>

                        <MenuItem value="Stripe">
                            Stripe
                        </MenuItem>

                        <MenuItem value="PayPay">
                            PayPay
                        </MenuItem>

                        <MenuItem value="Bank">
                            Bank
                        </MenuItem>

                        <MenuItem value="Internal">
                            Internal
                        </MenuItem>

                    </TextField>

                </Box>

            </Paper>


            {/* =================================================
                DESKTOP TABLE
            ================================================= */}

            <Paper
                variant="outlined"
                sx={{
                    display: {
                        xs: "none",
                        md: "block",
                    },

                    borderRadius: 3,
                    overflow: "hidden",
                }}
            >

                <TableContainer>

                    <Table>

                        <TableHead>

                            <TableRow>

                                <TableCell>
                                    Transaction
                                </TableCell>

                                <TableCell>
                                    Customer
                                </TableCell>

                                <TableCell>
                                    Amount
                                </TableCell>

                                <TableCell>
                                    Payment
                                </TableCell>

                                <TableCell>
                                    Gateway
                                </TableCell>

                                <TableCell>
                                    Date
                                </TableCell>

                                <TableCell>
                                    Status
                                </TableCell>

                                <TableCell align="right">
                                    Action
                                </TableCell>

                            </TableRow>

                        </TableHead>


                        <TableBody>

                            {paginatedTransactions.map(
                                transaction => (

                                    <TableRow
                                        key={
                                            transaction.id
                                        }
                                        hover
                                    >

                                        <TableCell>

                                            <Typography
                                                fontWeight={700}
                                                variant="body2"
                                            >
                                                {
                                                    transaction.id
                                                }
                                            </Typography>

                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                            >
                                                {
                                                    transaction.orderId
                                                }
                                            </Typography>

                                        </TableCell>


                                        <TableCell>

                                            <Typography
                                                fontWeight={600}
                                                variant="body2"
                                            >
                                                {
                                                    transaction.customer
                                                }
                                            </Typography>

                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                            >
                                                {
                                                    transaction.email
                                                }
                                            </Typography>

                                        </TableCell>


                                        <TableCell>

                                            <Typography
                                                fontWeight={800}
                                            >
                                                ¥
                                                {transaction.amount.toLocaleString()}
                                            </Typography>

                                        </TableCell>


                                        <TableCell>

                                            {
                                                paymentMethodLabel[
                                                    transaction.method
                                                ]
                                            }

                                        </TableCell>


                                        <TableCell>
                                            {
                                                transaction.gateway
                                            }
                                        </TableCell>


                                        <TableCell>
                                            {
                                                transaction.createdAt
                                            }
                                        </TableCell>


                                        <TableCell>

                                            <PaymentStatusChip
                                                status={
                                                    transaction.status
                                                }
                                            />

                                        </TableCell>


                                        <TableCell align="right">

                                            <IconButton
                                                size="small"
                                                onClick={() =>
                                                    setSelectedTransaction(
                                                        transaction
                                                    )
                                                }
                                            >

                                                <VisibilityRounded />

                                            </IconButton>

                                        </TableCell>

                                    </TableRow>

                                )
                            )}


                            {paginatedTransactions.length ===
                                0 && (

                                <TableRow>

                                    <TableCell
                                        colSpan={8}
                                        align="center"
                                    >

                                        <Stack
                                            alignItems="center"
                                            spacing={1}
                                            py={6}
                                        >

                                            <WarningAmberRounded />

                                            <Typography
                                                fontWeight={700}
                                            >
                                                No transactions found
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                Try changing your
                                                search or filters.
                                            </Typography>

                                        </Stack>

                                    </TableCell>

                                </TableRow>

                            )}

                        </TableBody>

                    </Table>

                </TableContainer>


                <TablePagination
                    component="div"
                    count={
                        filteredTransactions.length
                    }
                    page={page}
                    onPageChange={(
                        _,
                        newPage
                    ) =>
                        setPage(newPage)
                    }
                    rowsPerPage={
                        rowsPerPage
                    }
                    onRowsPerPageChange={event => {

                        setRowsPerPage(
                            parseInt(
                                event.target.value,
                                10
                            )
                        );

                        setPage(0);
                    }}
                    rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        50,
                    ]}
                />

            </Paper>


            {/* =================================================
                MOBILE CARDS
            ================================================= */}

            <Box
                sx={{
                    display: {
                        xs: "block",
                        md: "none",
                    },
                }}
            >

                <Stack spacing={2}>

                    {paginatedTransactions.map(
                        transaction => (

                            <Card
                                key={
                                    transaction.id
                                }
                                variant="outlined"
                                sx={{
                                    borderRadius: 3,
                                }}
                            >

                                <CardContent>

                                    <Stack
                                        spacing={2}
                                    >

                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="flex-start"
                                        >

                                            <Box>

                                                <Typography
                                                    fontWeight={800}
                                                >
                                                    {
                                                        transaction.id
                                                    }
                                                </Typography>

                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >
                                                    {
                                                        transaction.orderId
                                                    }
                                                </Typography>

                                            </Box>

                                            <PaymentStatusChip
                                                status={
                                                    transaction.status
                                                }
                                            />

                                        </Stack>


                                        <Divider />


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
                                                    transaction.customer
                                                }
                                            </Typography>

                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                            >
                                                {
                                                    transaction.email
                                                }
                                            </Typography>

                                        </Box>


                                        <Box
                                            sx={{
                                                display:
                                                    "grid",
                                                gridTemplateColumns:
                                                    "1fr 1fr",
                                                gap: 2,
                                            }}
                                        >

                                            <Box>

                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >
                                                    Amount
                                                </Typography>

                                                <Typography
                                                    fontWeight={800}
                                                >
                                                    ¥
                                                    {transaction.amount.toLocaleString()}
                                                </Typography>

                                            </Box>


                                            <Box>

                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >
                                                    Payment
                                                </Typography>

                                                <Typography
                                                    variant="body2"
                                                    fontWeight={700}
                                                >
                                                    {
                                                        paymentMethodLabel[
                                                            transaction.method
                                                        ]
                                                    }
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
                                                    variant="body2"
                                                    fontWeight={700}
                                                >
                                                    {
                                                        transaction.gateway
                                                    }
                                                </Typography>

                                            </Box>


                                            <Box>

                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >
                                                    Date
                                                </Typography>

                                                <Typography
                                                    variant="body2"
                                                    fontWeight={700}
                                                >
                                                    {
                                                        transaction.createdAt
                                                    }
                                                </Typography>

                                            </Box>

                                        </Box>


                                        {transaction.failureReason && (

                                            <Alert
                                                severity="error"
                                                icon={
                                                    <ErrorRounded />
                                                }
                                            >
                                                {
                                                    transaction.failureReason
                                                }
                                            </Alert>

                                        )}


                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            startIcon={
                                                <VisibilityRounded />
                                            }
                                            onClick={() =>
                                                setSelectedTransaction(
                                                    transaction
                                                )
                                            }
                                        >
                                            View Details
                                        </Button>

                                    </Stack>

                                </CardContent>

                            </Card>

                        )
                    )}


                    {paginatedTransactions.length ===
                        0 && (

                        <Paper
                            variant="outlined"
                            sx={{
                                p: 5,
                                borderRadius: 3,
                                textAlign:
                                    "center",
                            }}
                        >

                            <WarningAmberRounded />

                            <Typography
                                fontWeight={700}
                                sx={{ mt: 1 }}
                            >
                                No transactions found
                            </Typography>

                        </Paper>

                    )}

                </Stack>


                <TablePagination
                    component="div"
                    count={
                        filteredTransactions.length
                    }
                    page={page}
                    onPageChange={(
                        _,
                        newPage
                    ) =>
                        setPage(newPage)
                    }
                    rowsPerPage={
                        rowsPerPage
                    }
                    onRowsPerPageChange={event => {

                        setRowsPerPage(
                            parseInt(
                                event.target.value,
                                10
                            )
                        );

                        setPage(0);
                    }}
                    rowsPerPageOptions={[
                        5,
                        10,
                        25,
                    ]}
                />

            </Box>


            {/* =================================================
                DETAIL DIALOG
            ================================================= */}

            <TransactionDetailsDialog
                transaction={
                    selectedTransaction
                }
                onClose={() =>
                    setSelectedTransaction(
                        null
                    )
                }
            />

        </Box>
    );
}