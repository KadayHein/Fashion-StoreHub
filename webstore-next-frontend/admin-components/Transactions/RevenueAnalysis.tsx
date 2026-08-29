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
    AssessmentRounded,
    AttachMoneyRounded,
    BarChartRounded,
    CreditCardRounded,
    DownloadRounded,
    PaidRounded,
    PaymentRounded,
    PercentRounded,
    ReceiptLongRounded,
    RefreshRounded,
    SavingsRounded,
    TrendingUpRounded,
} from "@mui/icons-material";


// =====================================================
// TYPES
// =====================================================

type TabValue =
    | "REVENUE_REPORTS"
    | "SETTLEMENT_REPORTS"
    | "TRANSACTION_FEES"
    | "PAYMENT_ANALYSIS"
    | "REVENUE_ANALYSIS"
    | "PAYMENT_METHOD_ANALYSIS";


type RevenueReport = {
    id: string;
    period: string;
    grossRevenue: number;
    refunds: number;
    discounts: number;
    netRevenue: number;
    transactions: number;
};


type SettlementReport = {
    id: string;
    settlementDate: string;
    gateway: string;
    grossAmount: number;
    fees: number;
    refunds: number;
    netAmount: number;
    status: "SETTLED" | "PENDING" | "PROCESSING";
};


type TransactionFee = {
    id: string;
    transactionId: string;
    gateway: string;
    amount: number;
    feeRate: number;
    feeAmount: number;
    date: string;
};


type PaymentAnalysis = {
    period: string;
    transactions: number;
    successful: number;
    failed: number;
    pending: number;
    successRate: number;
};


type RevenueAnalysisData = {
    period: string;
    grossRevenue: number;
    refunds: number;
    discounts: number;
    fees: number;
    netRevenue: number;
};


type PaymentMethodAnalysis = {
    method: string;
    transactions: number;
    revenue: number;
    percentage: number;
    averageOrderValue: number;
};


// =====================================================
// MOCK DATA
// =====================================================

const revenueReports: RevenueReport[] = [
    {
        id: "REV-202608-001",
        period: "August 2026",
        grossRevenue: 4285000,
        refunds: 185000,
        discounts: 92000,
        netRevenue: 4008000,
        transactions: 1284,
    },
    {
        id: "REV-202607-001",
        period: "July 2026",
        grossRevenue: 3950000,
        refunds: 142000,
        discounts: 78000,
        netRevenue: 3730000,
        transactions: 1172,
    },
    {
        id: "REV-202606-001",
        period: "June 2026",
        grossRevenue: 3620000,
        refunds: 121000,
        discounts: 64000,
        netRevenue: 3435000,
        transactions: 1098,
    },
    {
        id: "REV-202605-001",
        period: "May 2026",
        grossRevenue: 3410000,
        refunds: 98000,
        discounts: 58000,
        netRevenue: 3254000,
        transactions: 1031,
    },
];


const settlementReports: SettlementReport[] = [
    {
        id: "SET-10021",
        settlementDate: "2026-08-27",
        gateway: "Stripe",
        grossAmount: 1285000,
        fees: 38550,
        refunds: 22000,
        netAmount: 1224450,
        status: "SETTLED",
    },
    {
        id: "SET-10020",
        settlementDate: "2026-08-26",
        gateway: "PayPay",
        grossAmount: 895000,
        fees: 17800,
        refunds: 12000,
        netAmount: 865200,
        status: "SETTLED",
    },
    {
        id: "SET-10019",
        settlementDate: "2026-08-25",
        gateway: "Stripe",
        grossAmount: 1095000,
        fees: 32850,
        refunds: 15000,
        netAmount: 1047150,
        status: "SETTLED",
    },
    {
        id: "SET-10018",
        settlementDate: "2026-08-28",
        gateway: "PayPay",
        grossAmount: 742000,
        fees: 14840,
        refunds: 8000,
        netAmount: 719160,
        status: "PROCESSING",
    },
];


const transactionFees: TransactionFee[] = [
    {
        id: "FEE-001",
        transactionId: "TXN-900821",
        gateway: "Stripe",
        amount: 12800,
        feeRate: 3.6,
        feeAmount: 460,
        date: "2026-08-27",
    },
    {
        id: "FEE-002",
        transactionId: "TXN-900820",
        gateway: "PayPay",
        amount: 5800,
        feeRate: 2.0,
        feeAmount: 116,
        date: "2026-08-27",
    },
    {
        id: "FEE-003",
        transactionId: "TXN-900819",
        gateway: "Stripe",
        amount: 22000,
        feeRate: 3.6,
        feeAmount: 792,
        date: "2026-08-26",
    },
    {
        id: "FEE-004",
        transactionId: "TXN-900818",
        gateway: "PayPay",
        amount: 9200,
        feeRate: 2.0,
        feeAmount: 184,
        date: "2026-08-26",
    },
];


const paymentAnalysis: PaymentAnalysis[] = [
    {
        period: "August 2026",
        transactions: 1284,
        successful: 1198,
        failed: 52,
        pending: 34,
        successRate: 93.3,
    },
    {
        period: "July 2026",
        transactions: 1172,
        successful: 1087,
        failed: 61,
        pending: 24,
        successRate: 92.8,
    },
    {
        period: "June 2026",
        transactions: 1098,
        successful: 1012,
        failed: 63,
        pending: 23,
        successRate: 92.2,
    },
    {
        period: "May 2026",
        transactions: 1031,
        successful: 956,
        failed: 54,
        pending: 21,
        successRate: 92.7,
    },
];


const revenueAnalysis: RevenueAnalysisData[] = [
    {
        period: "August 2026",
        grossRevenue: 4285000,
        refunds: 185000,
        discounts: 92000,
        fees: 128500,
        netRevenue: 3879500,
    },
    {
        period: "July 2026",
        grossRevenue: 3950000,
        refunds: 142000,
        discounts: 78000,
        fees: 118500,
        netRevenue: 3611500,
    },
    {
        period: "June 2026",
        grossRevenue: 3620000,
        refunds: 121000,
        discounts: 64000,
        fees: 108600,
        netRevenue: 3326400,
    },
    {
        period: "May 2026",
        grossRevenue: 3410000,
        refunds: 98000,
        discounts: 58000,
        fees: 102300,
        netRevenue: 3151700,
    },
];


const paymentMethodAnalysis: PaymentMethodAnalysis[] = [
    {
        method: "Credit Card",
        transactions: 682,
        revenue: 2385000,
        percentage: 55.7,
        averageOrderValue: 3496,
    },
    {
        method: "PayPay",
        transactions: 318,
        revenue: 925000,
        percentage: 21.6,
        averageOrderValue: 2912,
    },
    {
        method: "Bank Transfer",
        transactions: 146,
        revenue: 612000,
        percentage: 14.3,
        averageOrderValue: 4192,
    },
    {
        method: "Cash on Delivery",
        transactions: 98,
        revenue: 363000,
        percentage: 8.4,
        averageOrderValue: 3704,
    },
];


// =====================================================
// CONFIG
// =====================================================

const settlementStatusConfig = {
    SETTLED: {
        label: "Settled",
        color: "success" as const,
    },
    PENDING: {
        label: "Pending",
        color: "warning" as const,
    },
    PROCESSING: {
        label: "Processing",
        color: "info" as const,
    },
};


// =====================================================
// SUMMARY CARD
// =====================================================

function SummaryCard({
    title,
    value,
    subtitle,
    icon,
}: {
    title: string;
    value: string;
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


// =====================================================
// PAGE
// =====================================================

export default function RevenueAnalysis() {

    const [activeTab, setActiveTab] =
        useState<TabValue>(
            "REVENUE_REPORTS"
        );

    const [search, setSearch] =
        useState("");

    const [period, setPeriod] =
        useState("MONTHLY");

    const [page, setPage] =
        useState(0);

    const [rowsPerPage, setRowsPerPage] =
        useState(5);


    // =================================================
    // SUMMARY
    // =================================================

    const totalGrossRevenue =
        revenueReports.reduce(
            (sum, item) =>
                sum + item.grossRevenue,
            0
        );

    const totalNetRevenue =
        revenueReports.reduce(
            (sum, item) =>
                sum + item.netRevenue,
            0
        );

    const totalFees =
        transactionFees.reduce(
            (sum, item) =>
                sum + item.feeAmount,
            0
        );

    const currentSuccessRate =
        paymentAnalysis[0]
            ?.successRate ?? 0;


    // =================================================
    // TAB CHANGE
    // =================================================

    const handleTabChange = (
        _event: React.SyntheticEvent,
        value: TabValue
    ) => {
        setActiveTab(value);
        setSearch("");
        setPage(0);
    };


    // =================================================
    // FILTER
    // =================================================

    const filteredRevenueReports =
        useMemo(() => {

            const value =
                search
                    .trim()
                    .toLowerCase();

            return revenueReports.filter(
                item =>
                    !value ||
                    item.id
                        .toLowerCase()
                        .includes(value) ||
                    item.period
                        .toLowerCase()
                        .includes(value)
            );

        }, [search]);


    const filteredSettlementReports =
        useMemo(() => {

            const value =
                search
                    .trim()
                    .toLowerCase();

            return settlementReports.filter(
                item =>
                    !value ||
                    item.id
                        .toLowerCase()
                        .includes(value) ||
                    item.gateway
                        .toLowerCase()
                        .includes(value)
            );

        }, [search]);


    const filteredFees =
        useMemo(() => {

            const value =
                search
                    .trim()
                    .toLowerCase();

            return transactionFees.filter(
                item =>
                    !value ||
                    item.id
                        .toLowerCase()
                        .includes(value) ||
                    item.transactionId
                        .toLowerCase()
                        .includes(value) ||
                    item.gateway
                        .toLowerCase()
                        .includes(value)
            );

        }, [search]);


    // =================================================
    // EXPORT
    // =================================================

    const handleExport = () => {

        console.log(
            "Exporting:",
            activeTab
        );

        // Replace with API/CSV export.
    };


    // =================================================
    // PAGINATION COUNT
    // =================================================

    const paginationCount =
        activeTab === "REVENUE_REPORTS"
            ? filteredRevenueReports.length
            : activeTab === "SETTLEMENT_REPORTS"
                ? filteredSettlementReports.length
                : activeTab === "TRANSACTION_FEES"
                    ? filteredFees.length
                    : activeTab === "PAYMENT_ANALYSIS"
                        ? paymentAnalysis.length
                        : activeTab === "REVENUE_ANALYSIS"
                            ? revenueAnalysis.length
                            : paymentMethodAnalysis.length;


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

                        <TrendingUpRounded />

                        <Typography
                            variant="h4"
                            fontWeight={800}
                        >
                            Revenue & Analysis
                        </Typography>

                    </Stack>

                    <Typography
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                    >
                        Monitor revenue, settlements,
                        transaction fees, and payment
                        performance.
                    </Typography>

                </Box>


                <Stack
                    direction="row"
                    spacing={1}
                >

                    <Button
                        variant="outlined"
                        startIcon={
                            <RefreshRounded />
                        }
                    >
                        Refresh
                    </Button>

                    <Button
                        variant="contained"
                        startIcon={
                            <DownloadRounded />
                        }
                        onClick={
                            handleExport
                        }
                    >
                        Export
                    </Button>

                </Stack>

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
                    title="Gross Revenue"
                    value={`¥${totalGrossRevenue.toLocaleString()}`}
                    subtitle="Reported revenue"
                    icon={
                        <AttachMoneyRounded />
                    }
                />

                <SummaryCard
                    title="Net Revenue"
                    value={`¥${totalNetRevenue.toLocaleString()}`}
                    subtitle="After refunds & discounts"
                    icon={
                        <SavingsRounded />
                    }
                />

                <SummaryCard
                    title="Transaction Fees"
                    value={`¥${totalFees.toLocaleString()}`}
                    subtitle="Recorded gateway fees"
                    icon={
                        <PercentRounded />
                    }
                />

                <SummaryCard
                    title="Payment Success"
                    value={`${currentSuccessRate}%`}
                    subtitle="Current period"
                    icon={
                        <PaidRounded />
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
                        value="REVENUE_REPORTS"
                        icon={
                            <ReceiptLongRounded />
                        }
                        iconPosition="start"
                        label="Revenue Reports"
                    />

                    <Tab
                        value="SETTLEMENT_REPORTS"
                        icon={
                            <AccountBalanceRounded />
                        }
                        iconPosition="start"
                        label="Settlement Reports"
                    />

                    <Tab
                        value="TRANSACTION_FEES"
                        icon={
                            <PercentRounded />
                        }
                        iconPosition="start"
                        label="Transaction Fees"
                    />

                    <Tab
                        value="PAYMENT_ANALYSIS"
                        icon={
                            <PaymentRounded />
                        }
                        iconPosition="start"
                        label="Payment Analysis"
                    />

                    <Tab
                        value="REVENUE_ANALYSIS"
                        icon={
                            <BarChartRounded />
                        }
                        iconPosition="start"
                        label="Revenue Analysis"
                    />

                    <Tab
                        value="PAYMENT_METHOD_ANALYSIS"
                        icon={
                            <CreditCardRounded />
                        }
                        iconPosition="start"
                        label="Payment Method Analysis"
                    />

                </Tabs>

            </Paper>


            {/* =================================================
                FILTER
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
                            sm: "2fr 1fr auto",
                        },
                        gap: 2,
                        alignItems: "center",
                    }}
                >

                    <TextField
                        size="small"
                        placeholder="Search reports, transactions, gateways..."
                        value={search}
                        onChange={event => {
                            setSearch(
                                event.target.value
                            );
                            setPage(0);
                        }}
                    />


                    <TextField
                        select
                        size="small"
                        label="Period"
                        value={period}
                        onChange={event =>
                            setPeriod(
                                event.target.value
                            )
                        }
                    >

                        <MenuItem value="DAILY">
                            Daily
                        </MenuItem>

                        <MenuItem value="WEEKLY">
                            Weekly
                        </MenuItem>

                        <MenuItem value="MONTHLY">
                            Monthly
                        </MenuItem>

                        <MenuItem value="YEARLY">
                            Yearly
                        </MenuItem>

                    </TextField>


                    <Button
                        variant="outlined"
                        startIcon={
                            <DownloadRounded />
                        }
                        onClick={
                            handleExport
                        }
                    >
                        Export
                    </Button>

                </Box>

            </Paper>


            {/* =================================================
                REVENUE REPORTS
            ================================================= */}

            {activeTab ===
                "REVENUE_REPORTS" && (

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
                                        Report ID
                                    </TableCell>

                                    <TableCell>
                                        Period
                                    </TableCell>

                                    <TableCell align="right">
                                        Gross Revenue
                                    </TableCell>

                                    <TableCell align="right">
                                        Refunds
                                    </TableCell>

                                    <TableCell align="right">
                                        Discounts
                                    </TableCell>

                                    <TableCell align="right">
                                        Net Revenue
                                    </TableCell>

                                    <TableCell align="right">
                                        Transactions
                                    </TableCell>

                                </TableRow>

                            </TableHead>


                            <TableBody>

                                {filteredRevenueReports
                                    .slice(
                                        page *
                                            rowsPerPage,
                                        page *
                                            rowsPerPage +
                                            rowsPerPage
                                    )
                                    .map(item => (

                                        <TableRow
                                            hover
                                            key={item.id}
                                        >

                                            <TableCell>
                                                <Typography
                                                    fontWeight={700}
                                                >
                                                    {item.id}
                                                </Typography>
                                            </TableCell>

                                            <TableCell>
                                                {item.period}
                                            </TableCell>

                                            <TableCell align="right">
                                                ¥
                                                {item.grossRevenue.toLocaleString()}
                                            </TableCell>

                                            <TableCell align="right">
                                                ¥
                                                {item.refunds.toLocaleString()}
                                            </TableCell>

                                            <TableCell align="right">
                                                ¥
                                                {item.discounts.toLocaleString()}
                                            </TableCell>

                                            <TableCell align="right">

                                                <Typography
                                                    fontWeight={800}
                                                >
                                                    ¥
                                                    {item.netRevenue.toLocaleString()}
                                                </Typography>

                                            </TableCell>

                                            <TableCell align="right">
                                                {item.transactions.toLocaleString()}
                                            </TableCell>

                                        </TableRow>

                                    ))}

                            </TableBody>

                        </Table>

                    </TableContainer>

                    <TablePagination
                        component="div"
                        count={paginationCount}
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
                SETTLEMENT REPORTS
            ================================================= */}

            {activeTab ===
                "SETTLEMENT_REPORTS" && (

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
                                        Settlement ID
                                    </TableCell>

                                    <TableCell>
                                        Date
                                    </TableCell>

                                    <TableCell>
                                        Gateway
                                    </TableCell>

                                    <TableCell align="right">
                                        Gross
                                    </TableCell>

                                    <TableCell align="right">
                                        Fees
                                    </TableCell>

                                    <TableCell align="right">
                                        Refunds
                                    </TableCell>

                                    <TableCell align="right">
                                        Net Settlement
                                    </TableCell>

                                    <TableCell>
                                        Status
                                    </TableCell>

                                </TableRow>

                            </TableHead>


                            <TableBody>

                                {filteredSettlementReports
                                    .slice(
                                        page *
                                            rowsPerPage,
                                        page *
                                            rowsPerPage +
                                            rowsPerPage
                                    )
                                    .map(item => {

                                        const status =
                                            settlementStatusConfig[
                                                item.status
                                            ];

                                        return (

                                            <TableRow
                                                hover
                                                key={item.id}
                                            >

                                                <TableCell>
                                                    <Typography
                                                        fontWeight={700}
                                                    >
                                                        {item.id}
                                                    </Typography>
                                                </TableCell>

                                                <TableCell>
                                                    {item.settlementDate}
                                                </TableCell>

                                                <TableCell>
                                                    {item.gateway}
                                                </TableCell>

                                                <TableCell align="right">
                                                    ¥
                                                    {item.grossAmount.toLocaleString()}
                                                </TableCell>

                                                <TableCell align="right">
                                                    ¥
                                                    {item.fees.toLocaleString()}
                                                </TableCell>

                                                <TableCell align="right">
                                                    ¥
                                                    {item.refunds.toLocaleString()}
                                                </TableCell>

                                                <TableCell align="right">

                                                    <Typography
                                                        fontWeight={800}
                                                    >
                                                        ¥
                                                        {item.netAmount.toLocaleString()}
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

                                            </TableRow>

                                        );

                                    })}

                            </TableBody>

                        </Table>

                    </TableContainer>

                    <TablePagination
                        component="div"
                        count={paginationCount}
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
                TRANSACTION FEES
            ================================================= */}

            {activeTab ===
                "TRANSACTION_FEES" && (

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
                                        Fee ID
                                    </TableCell>

                                    <TableCell>
                                        Transaction
                                    </TableCell>

                                    <TableCell>
                                        Gateway
                                    </TableCell>

                                    <TableCell align="right">
                                        Transaction Amount
                                    </TableCell>

                                    <TableCell align="right">
                                        Fee Rate
                                    </TableCell>

                                    <TableCell align="right">
                                        Fee Amount
                                    </TableCell>

                                    <TableCell>
                                        Date
                                    </TableCell>

                                </TableRow>

                            </TableHead>


                            <TableBody>

                                {filteredFees
                                    .slice(
                                        page *
                                            rowsPerPage,
                                        page *
                                            rowsPerPage +
                                            rowsPerPage
                                    )
                                    .map(item => (

                                        <TableRow
                                            hover
                                            key={item.id}
                                        >

                                            <TableCell>
                                                {item.id}
                                            </TableCell>

                                            <TableCell>
                                                {item.transactionId}
                                            </TableCell>

                                            <TableCell>
                                                {item.gateway}
                                            </TableCell>

                                            <TableCell align="right">
                                                ¥
                                                {item.amount.toLocaleString()}
                                            </TableCell>

                                            <TableCell align="right">
                                                {item.feeRate}%
                                            </TableCell>

                                            <TableCell align="right">

                                                <Typography
                                                    fontWeight={800}
                                                >
                                                    ¥
                                                    {item.feeAmount.toLocaleString()}
                                                </Typography>

                                            </TableCell>

                                            <TableCell>
                                                {item.date}
                                            </TableCell>

                                        </TableRow>

                                    ))}

                            </TableBody>

                        </Table>

                    </TableContainer>

                    <TablePagination
                        component="div"
                        count={paginationCount}
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
                PAYMENT ANALYSIS
            ================================================= */}

            {activeTab ===
                "PAYMENT_ANALYSIS" && (

                <Stack spacing={2}>

                    <Alert severity="info">
                        Payment Analysis focuses on
                        payment success, failure, and
                        pending transaction performance.
                    </Alert>


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
                                            Period
                                        </TableCell>

                                        <TableCell align="right">
                                            Transactions
                                        </TableCell>

                                        <TableCell align="right">
                                            Successful
                                        </TableCell>

                                        <TableCell align="right">
                                            Failed
                                        </TableCell>

                                        <TableCell align="right">
                                            Pending
                                        </TableCell>

                                        <TableCell align="right">
                                            Success Rate
                                        </TableCell>

                                    </TableRow>

                                </TableHead>


                                <TableBody>

                                    {paymentAnalysis.map(
                                        item => (

                                            <TableRow
                                                hover
                                                key={
                                                    item.period
                                                }
                                            >

                                                <TableCell>
                                                    <Typography
                                                        fontWeight={700}
                                                    >
                                                        {
                                                            item.period
                                                        }
                                                    </Typography>
                                                </TableCell>

                                                <TableCell align="right">
                                                    {
                                                        item.transactions
                                                    }
                                                </TableCell>

                                                <TableCell align="right">
                                                    <Chip
                                                        size="small"
                                                        color="success"
                                                        label={
                                                            item.successful
                                                        }
                                                    />
                                                </TableCell>

                                                <TableCell align="right">
                                                    <Chip
                                                        size="small"
                                                        color="error"
                                                        label={
                                                            item.failed
                                                        }
                                                    />
                                                </TableCell>

                                                <TableCell align="right">
                                                    <Chip
                                                        size="small"
                                                        color="warning"
                                                        label={
                                                            item.pending
                                                        }
                                                    />
                                                </TableCell>

                                                <TableCell align="right">

                                                    <Typography
                                                        fontWeight={800}
                                                    >
                                                        {
                                                            item.successRate
                                                        }%
                                                    </Typography>

                                                </TableCell>

                                            </TableRow>

                                        )
                                    )}

                                </TableBody>

                            </Table>

                        </TableContainer>

                    </Paper>

                </Stack>

            )}


            {/* =================================================
                REVENUE ANALYSIS
            ================================================= */}

            {activeTab ===
                "REVENUE_ANALYSIS" && (

                <Stack spacing={2}>

                    <Alert severity="info">
                        Revenue Analysis compares gross
                        revenue against refunds, discounts,
                        payment fees, and final net revenue.
                    </Alert>


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
                                            Period
                                        </TableCell>

                                        <TableCell align="right">
                                            Gross Revenue
                                        </TableCell>

                                        <TableCell align="right">
                                            Refunds
                                        </TableCell>

                                        <TableCell align="right">
                                            Discounts
                                        </TableCell>

                                        <TableCell align="right">
                                            Fees
                                        </TableCell>

                                        <TableCell align="right">
                                            Net Revenue
                                        </TableCell>

                                    </TableRow>

                                </TableHead>


                                <TableBody>

                                    {revenueAnalysis.map(
                                        item => (

                                            <TableRow
                                                hover
                                                key={
                                                    item.period
                                                }
                                            >

                                                <TableCell>
                                                    <Typography
                                                        fontWeight={700}
                                                    >
                                                        {
                                                            item.period
                                                        }
                                                    </Typography>
                                                </TableCell>

                                                <TableCell align="right">
                                                    ¥
                                                    {item.grossRevenue.toLocaleString()}
                                                </TableCell>

                                                <TableCell align="right">
                                                    ¥
                                                    {item.refunds.toLocaleString()}
                                                </TableCell>

                                                <TableCell align="right">
                                                    ¥
                                                    {item.discounts.toLocaleString()}
                                                </TableCell>

                                                <TableCell align="right">
                                                    ¥
                                                    {item.fees.toLocaleString()}
                                                </TableCell>

                                                <TableCell align="right">

                                                    <Typography
                                                        fontWeight={800}
                                                    >
                                                        ¥
                                                        {item.netRevenue.toLocaleString()}
                                                    </Typography>

                                                </TableCell>

                                            </TableRow>

                                        )
                                    )}

                                </TableBody>

                            </Table>

                        </TableContainer>

                    </Paper>

                </Stack>

            )}


            {/* =================================================
                PAYMENT METHOD ANALYSIS
            ================================================= */}

            {activeTab ===
                "PAYMENT_METHOD_ANALYSIS" && (

                <Stack spacing={2}>

                    <Alert severity="info">
                        Compare payment methods by
                        transaction volume, revenue share,
                        and average order value.
                    </Alert>


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
                                            Payment Method
                                        </TableCell>

                                        <TableCell align="right">
                                            Transactions
                                        </TableCell>

                                        <TableCell align="right">
                                            Revenue
                                        </TableCell>

                                        <TableCell align="right">
                                            Revenue Share
                                        </TableCell>

                                        <TableCell align="right">
                                            Average Order
                                        </TableCell>

                                    </TableRow>

                                </TableHead>


                                <TableBody>

                                    {paymentMethodAnalysis.map(
                                        item => (

                                            <TableRow
                                                hover
                                                key={
                                                    item.method
                                                }
                                            >

                                                <TableCell>

                                                    <Stack
                                                        direction="row"
                                                        spacing={1}
                                                        alignItems="center"
                                                    >

                                                        <CreditCardRounded
                                                            fontSize="small"
                                                        />

                                                        <Typography
                                                            fontWeight={700}
                                                        >
                                                            {
                                                                item.method
                                                            }
                                                        </Typography>

                                                    </Stack>

                                                </TableCell>


                                                <TableCell align="right">
                                                    {
                                                        item.transactions.toLocaleString()
                                                    }
                                                </TableCell>


                                                <TableCell align="right">

                                                    <Typography
                                                        fontWeight={700}
                                                    >
                                                        ¥
                                                        {item.revenue.toLocaleString()}
                                                    </Typography>

                                                </TableCell>


                                                <TableCell align="right">

                                                    <Chip
                                                        size="small"
                                                        label={`${item.percentage}%`}
                                                    />

                                                </TableCell>


                                                <TableCell align="right">

                                                    ¥
                                                    {item.averageOrderValue.toLocaleString()}

                                                </TableCell>

                                            </TableRow>

                                        )
                                    )}

                                </TableBody>

                            </Table>

                        </TableContainer>

                    </Paper>

                </Stack>

            )}

        </Box>
    );
}