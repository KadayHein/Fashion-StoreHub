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
    FormControlLabel,
    IconButton,
    MenuItem,
    Paper,
    Select,
    Stack,
    Switch,
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
    CheckCircleRounded,
    CloseRounded,
    CreditCardRounded,
    ErrorRounded,
    HistoryRounded,
    KeyRounded,
    LinkRounded,
    PaymentRounded,
    PaymentsRounded,
    RefreshRounded,
    SearchRounded,
    SettingsRounded,
    WarningAmberRounded,
    VisibilityRounded,
} from "@mui/icons-material";


// =====================================================
// TYPES
// =====================================================

type GatewayStatus =
    | "CONNECTED"
    | "DISCONNECTED"
    | "ERROR";

type GatewayEnvironment =
    | "LIVE"
    | "TEST";

type GatewayName =
    | "Stripe"
    | "PayPay"
    | "Bank Transfer";

type PaymentMethodType =
    | "CREDIT_CARD"
    | "DEBIT_CARD"
    | "PAYPAY"
    | "BANK_TRANSFER"
    | "CASH_ON_DELIVERY";

type LogLevel =
    | "INFO"
    | "SUCCESS"
    | "WARNING"
    | "ERROR";


type PaymentGateway = {
    id: string;
    name: GatewayName;
    description: string;

    status: GatewayStatus;

    environment: GatewayEnvironment;

    enabled: boolean;

    lastSync: string;

    merchantId: string;

    supportedMethods: PaymentMethodType[];
};


type PaymentMethod = {
    id: string;
    name: string;
    type: PaymentMethodType;

    enabled: boolean;

    gateway: GatewayName;

    transactionCount: number;

    feeRate: number;
};


type GatewayLog = {
    id: string;

    gateway: GatewayName;

    action: string;

    level: LogLevel;

    transactionId?: string;

    message: string;

    createdAt: string;
};


// =====================================================
// TAB
// =====================================================

type GatewayTab =
    | "SETTINGS"
    | "METHODS"
    | "LOGS";


// =====================================================
// MOCK DATA
// =====================================================

const initialGateways: PaymentGateway[] = [

    {
        id: "GW-001",

        name: "Stripe",

        description:
            "Credit and debit card payment processing.",

        status: "CONNECTED",

        environment: "LIVE",

        enabled: true,

        lastSync: "2026-08-27 10:42",

        merchantId: "acct_STRIPE_8291",

        supportedMethods: [
            "CREDIT_CARD",
            "DEBIT_CARD",
        ],
    },

    {
        id: "GW-002",

        name: "PayPay",

        description:
            "PayPay QR and wallet payment processing.",

        status: "CONNECTED",

        environment: "LIVE",

        enabled: true,

        lastSync: "2026-08-27 10:38",

        merchantId: "PAYPAY-MERCHANT-8821",

        supportedMethods: [
            "PAYPAY",
        ],
    },

    {
        id: "GW-003",

        name: "Bank Transfer",

        description:
            "Bank transfer payment processing and reconciliation.",

        status: "ERROR",

        environment: "LIVE",

        enabled: false,

        lastSync: "2026-08-27 09:51",

        merchantId: "BANK-ACCOUNT-001",

        supportedMethods: [
            "BANK_TRANSFER",
        ],
    },
];


const paymentMethods: PaymentMethod[] = [

    {
        id: "PM-001",

        name: "Credit Card",

        type: "CREDIT_CARD",

        enabled: true,

        gateway: "Stripe",

        transactionCount: 12842,

        feeRate: 3.24,
    },

    {
        id: "PM-002",

        name: "Debit Card",

        type: "DEBIT_CARD",

        enabled: true,

        gateway: "Stripe",

        transactionCount: 4218,

        feeRate: 3.10,
    },

    {
        id: "PM-003",

        name: "PayPay",

        type: "PAYPAY",

        enabled: true,

        gateway: "PayPay",

        transactionCount: 5821,

        feeRate: 2.95,
    },

    {
        id: "PM-004",

        name: "Bank Transfer",

        type: "BANK_TRANSFER",

        enabled: true,

        gateway: "Bank Transfer",

        transactionCount: 2189,

        feeRate: 1.20,
    },

    {
        id: "PM-005",

        name: "Cash on Delivery",

        type: "CASH_ON_DELIVERY",

        enabled: false,

        gateway: "Bank Transfer",

        transactionCount: 812,

        feeRate: 0,
    },
];


const gatewayLogs: GatewayLog[] = [

    {
        id: "LOG-10001",

        gateway: "Stripe",

        action: "Payment Confirmation",

        level: "SUCCESS",

        transactionId:
            "TX-20260827-001",

        message:
            "Payment successfully confirmed.",

        createdAt:
            "2026-08-27 10:42:18",
    },

    {
        id: "LOG-10002",

        gateway: "PayPay",

        action: "Payment Callback",

        level: "SUCCESS",

        transactionId:
            "TX-20260827-002",

        message:
            "Payment callback received.",

        createdAt:
            "2026-08-27 10:38:42",
    },

    {
        id: "LOG-10003",

        gateway: "Stripe",

        action: "Payment Attempt",

        level: "ERROR",

        transactionId:
            "TX-20260827-003",

        message:
            "Card declined by issuer.",

        createdAt:
            "2026-08-27 10:22:09",
    },

    {
        id: "LOG-10004",

        gateway: "Bank Transfer",

        action: "Settlement Sync",

        level: "WARNING",

        message:
            "Settlement file has not been received yet.",

        createdAt:
            "2026-08-27 09:51:12",
    },

    {
        id: "LOG-10005",

        gateway: "Stripe",

        action: "Webhook",

        level: "INFO",

        message:
            "Webhook endpoint received a payment event.",

        createdAt:
            "2026-08-27 09:43:31",
    },

    {
        id: "LOG-10006",

        gateway: "PayPay",

        action: "Gateway Health Check",

        level: "SUCCESS",

        message:
            "Gateway connection is healthy.",

        createdAt:
            "2026-08-27 09:40:02",
    },

    {
        id: "LOG-10007",

        gateway: "Bank Transfer",

        action: "Connection Check",

        level: "ERROR",

        message:
            "Unable to connect to bank integration.",

        createdAt:
            "2026-08-27 09:35:48",
    },
];


// =====================================================
// LABEL HELPERS
// =====================================================

const paymentMethodLabel: Record<
    PaymentMethodType,
    string
> = {

    CREDIT_CARD:
        "Credit Card",

    DEBIT_CARD:
        "Debit Card",

    PAYPAY:
        "PayPay",

    BANK_TRANSFER:
        "Bank Transfer",

    CASH_ON_DELIVERY:
        "Cash on Delivery",
};


const statusConfig = {

    CONNECTED: {
        label: "Connected",
        color: "success" as const,
        icon:
            <CheckCircleRounded
                fontSize="small"
            />,
    },

    DISCONNECTED: {
        label: "Disconnected",
        color: "default" as const,
        icon:
            <WarningAmberRounded
                fontSize="small"
            />,
    },

    ERROR: {
        label: "Error",
        color: "error" as const,
        icon:
            <ErrorRounded
                fontSize="small"
            />,
    },
};


const logLevelConfig = {

    INFO: {
        color: "info" as const,
    },

    SUCCESS: {
        color: "success" as const,
    },

    WARNING: {
        color: "warning" as const,
    },

    ERROR: {
        color: "error" as const,
    },
};


// =====================================================
// GATEWAY STATUS CHIP
// =====================================================

function GatewayStatusChip({
    status,
}: {
    status: GatewayStatus;
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
                            alignItems:
                                "center",
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
// GATEWAY DETAIL DIALOG
// =====================================================

function GatewayDialog({
    gateway,
    onClose,
}: {
    gateway:
    | PaymentGateway
    | null;

    onClose: () => void;
}) {

    if (!gateway) {
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
                            Gateway Settings
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {gateway.name}
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
                            Connection Status
                        </Typography>

                        <GatewayStatusChip
                            status={
                                gateway.status
                            }
                        />

                    </Stack>


                    <Divider />


                    <TextField
                        fullWidth
                        label="Gateway Name"
                        value={
                            gateway.name
                        }
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                    />


                    <TextField
                        fullWidth
                        label="Merchant ID"
                        value={
                            gateway.merchantId
                        }
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                    />


                    <TextField
                        select
                        fullWidth
                        label="Environment"
                        value={
                            gateway.environment
                        }
                    >

                        <MenuItem value="LIVE">
                            Live
                        </MenuItem>

                        <MenuItem value="TEST">
                            Test
                        </MenuItem>

                    </TextField>


                    <FormControlLabel
                        control={
                            <Switch
                                checked={
                                    gateway.enabled
                                }
                            />
                        }
                        label="Enable Gateway"
                    />


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
                            Supported Payment Methods
                        </Typography>

                        <Stack
                            direction="row"
                            spacing={1}
                            flexWrap="wrap"
                            useFlexGap
                            sx={{
                                mt: 1,
                            }}
                        >

                            {gateway.supportedMethods.map(
                                method => (

                                    <Chip
                                        key={method}
                                        label={
                                            paymentMethodLabel[
                                            method
                                            ]
                                        }
                                        size="small"
                                    />

                                )
                            )}

                        </Stack>

                    </Paper>


                    {gateway.status ===
                        "ERROR" && (

                            <Alert
                                severity="error"
                            >
                                Gateway connection requires
                                attention before payments can
                                be processed.
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
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    startIcon={
                        <SettingsRounded />
                    }
                >
                    Save Changes
                </Button>

            </DialogActions>

        </Dialog>
    );
}


// =====================================================
// MAIN COMPONENT
// =====================================================

export default function PaymentGateways() {

    const [
        activeTab,
        setActiveTab,
    ] = useState<GatewayTab>(
        "SETTINGS"
    );


    const [
        gateways,
        setGateways,
    ] = useState<
        PaymentGateway[]
    >(initialGateways);


    const [
        search,
        setSearch,
    ] = useState("");


    const [
        gatewayFilter,
        setGatewayFilter,
    ] = useState<
        GatewayName | "ALL"
    >("ALL");


    const [
        logLevelFilter,
        setLogLevelFilter,
    ] = useState<
        LogLevel | "ALL"
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
        selectedGateway,
        setSelectedGateway,
    ] = useState<
        PaymentGateway | null
    >(null);


    // =================================================
    // SUMMARY
    // =================================================

    const connectedCount =
        gateways.filter(
            gateway =>
                gateway.status ===
                "CONNECTED"
        ).length;


    const enabledCount =
        gateways.filter(
            gateway =>
                gateway.enabled
        ).length;


    const errorCount =
        gateways.filter(
            gateway =>
                gateway.status ===
                "ERROR"
        ).length;


    const enabledMethods =
        paymentMethods.filter(
            method =>
                method.enabled
        ).length;


    // =================================================
    // LOG FILTER
    // =================================================

    const filteredLogs =
        useMemo(() => {

            return gatewayLogs.filter(
                log => {

                    const searchValue =
                        search
                            .trim()
                            .toLowerCase();


                    const matchesSearch =
                        !searchValue ||
                        log.id
                            .toLowerCase()
                            .includes(
                                searchValue
                            ) ||
                        log.gateway
                            .toLowerCase()
                            .includes(
                                searchValue
                            ) ||
                        log.action
                            .toLowerCase()
                            .includes(
                                searchValue
                            ) ||
                        log.message
                            .toLowerCase()
                            .includes(
                                searchValue
                            ) ||
                        (
                            log.transactionId
                            ?? ""
                        )
                            .toLowerCase()
                            .includes(
                                searchValue
                            );


                    const matchesGateway =
                        gatewayFilter ===
                        "ALL" ||
                        log.gateway ===
                        gatewayFilter;


                    const matchesLevel =
                        logLevelFilter ===
                        "ALL" ||
                        log.level ===
                        logLevelFilter;


                    return (
                        matchesSearch &&
                        matchesGateway &&
                        matchesLevel
                    );
                }
            );

        }, [
            search,
            gatewayFilter,
            logLevelFilter,
        ]);


    const paginatedLogs =
        filteredLogs.slice(
            page * rowsPerPage,
            page * rowsPerPage +
            rowsPerPage
        );


    // =================================================
    // TAB CHANGE
    // =================================================

    const handleTabChange = (
        _:
            React.SyntheticEvent,
        value: GatewayTab
    ) => {

        setActiveTab(value);

        setPage(0);
    };


    // =================================================
    // TOGGLE GATEWAY
    // =================================================

    const toggleGateway = (
        id: string
    ) => {

        setGateways(
            previous =>
                previous.map(
                    gateway =>
                        gateway.id === id
                            ? {
                                ...gateway,
                                enabled:
                                    !gateway.enabled,
                            }
                            : gateway
                )
        );
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

                        <LinkRounded />

                        <Typography
                            variant="h4"
                            fontWeight={800}
                        >
                            Payment Gateways
                        </Typography>

                    </Stack>

                    <Typography
                        color="text.secondary"
                        sx={{
                            mt: 0.5,
                        }}
                    >
                        Manage payment integrations,
                        payment methods, and gateway
                        activity.
                    </Typography>

                </Box>


                <Button
                    variant="outlined"
                    startIcon={
                        <RefreshRounded />
                    }
                >
                    Sync Gateways
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
                    title="Connected"
                    value={`${connectedCount}`}
                    subtitle="Active gateway connections"
                    icon={
                        <CheckCircleRounded />
                    }
                    selected={
                        activeTab ===
                        "SETTINGS"
                    }
                    onClick={() =>
                        setActiveTab(
                            "SETTINGS"
                        )
                    }
                />


                <SummaryCard
                    title="Enabled"
                    value={`${enabledCount}`}
                    subtitle="Gateways accepting payments"
                    icon={
                        <PaymentsRounded />
                    }
                    selected={
                        activeTab ===
                        "SETTINGS"
                    }
                    onClick={() =>
                        setActiveTab(
                            "SETTINGS"
                        )
                    }
                />


                <SummaryCard
                    title="Payment Methods"
                    value={`${enabledMethods}`}
                    subtitle="Currently available"
                    icon={
                        <CreditCardRounded />
                    }
                    selected={
                        activeTab ===
                        "METHODS"
                    }
                    onClick={() =>
                        setActiveTab(
                            "METHODS"
                        )
                    }
                />


                <SummaryCard
                    title="Gateway Errors"
                    value={`${errorCount}`}
                    subtitle="Requires attention"
                    icon={
                        <ErrorRounded />
                    }
                    selected={
                        activeTab ===
                        "LOGS"
                    }
                    onClick={() =>
                        setActiveTab(
                            "LOGS"
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
                    variant="fullWidth"
                >

                    <Tab
                        value="SETTINGS"
                        icon={
                            <SettingsRounded />
                        }
                        iconPosition="start"
                        label="Gateway Settings"
                    />

                    <Tab
                        value="METHODS"
                        icon={
                            <CreditCardRounded />
                        }
                        iconPosition="start"
                        label="Payment Methods"
                    />

                    <Tab
                        value="LOGS"
                        icon={
                            <HistoryRounded />
                        }
                        iconPosition="start"
                        label="Gateway Logs"
                    />

                </Tabs>

            </Paper>


            {/* =================================================
                GATEWAY SETTINGS
            ================================================= */}

            {activeTab === "SETTINGS" && (

                <Stack spacing={2}>

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
                    >

                        <Box>

                            <Typography
                                variant="h6"
                                fontWeight={800}
                            >
                                Gateway Connections
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Manage payment providers
                                connected to your store.
                            </Typography>

                        </Box>

                    </Stack>


                    <Box
                        sx={{
                            display: "grid",

                            gridTemplateColumns: {
                                xs: "1fr",
                                md: "repeat(2, 1fr)",
                                lg: "repeat(3, 1fr)",
                            },

                            gap: 2,
                        }}
                    >

                        {gateways.map(
                            gateway => (

                                <Card
                                    key={
                                        gateway.id
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

                                                <Box
                                                    sx={{
                                                        width: 46,
                                                        height: 46,
                                                        borderRadius: 2,
                                                        display:
                                                            "flex",
                                                        alignItems:
                                                            "center",
                                                        justifyContent:
                                                            "center",
                                                        bgcolor:
                                                            "action.hover",
                                                    }}
                                                >
                                                    <PaymentRounded />
                                                </Box>

                                                <GatewayStatusChip
                                                    status={
                                                        gateway.status
                                                    }
                                                />

                                            </Stack>


                                            <Box>

                                                <Typography
                                                    variant="h6"
                                                    fontWeight={800}
                                                >
                                                    {
                                                        gateway.name
                                                    }
                                                </Typography>

                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{
                                                        mt: 0.5,
                                                    }}
                                                >
                                                    {
                                                        gateway.description
                                                    }
                                                </Typography>

                                            </Box>


                                            <Divider />


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
                                                        Environment
                                                    </Typography>

                                                    <Typography
                                                        fontWeight={700}
                                                    >
                                                        {
                                                            gateway.environment
                                                        }
                                                    </Typography>

                                                </Box>


                                                <Box>

                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                    >
                                                        Last Sync
                                                    </Typography>

                                                    <Typography
                                                        fontWeight={700}
                                                    >
                                                        {
                                                            gateway.lastSync
                                                        }
                                                    </Typography>

                                                </Box>

                                            </Box>


                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={
                                                            gateway.enabled
                                                        }
                                                        onChange={() =>
                                                            toggleGateway(
                                                                gateway.id
                                                            )
                                                        }
                                                    />
                                                }
                                                label={
                                                    gateway.enabled
                                                        ? "Enabled"
                                                        : "Disabled"
                                                }
                                            />


                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                startIcon={
                                                    <SettingsRounded />
                                                }
                                                onClick={() =>
                                                    setSelectedGateway(
                                                        gateway
                                                    )
                                                }
                                            >
                                                Manage Gateway
                                            </Button>

                                        </Stack>

                                    </CardContent>

                                </Card>

                            )
                        )}

                    </Box>

                </Stack>

            )}


            {/* =================================================
                PAYMENT METHODS
            ================================================= */}

            {activeTab === "METHODS" && (

                <Stack spacing={2}>

                    <Box>

                        <Typography
                            variant="h6"
                            fontWeight={800}
                        >
                            Payment Methods
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Control which payment methods
                            customers can use at checkout.
                        </Typography>

                    </Box>


                    {/* DESKTOP */}

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
                                            Payment Method
                                        </TableCell>

                                        <TableCell>
                                            Gateway
                                        </TableCell>

                                        <TableCell>
                                            Transactions
                                        </TableCell>

                                        <TableCell>
                                            Fee Rate
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

                                    {paymentMethods.map(
                                        method => (

                                            <TableRow
                                                key={
                                                    method.id
                                                }
                                                hover
                                            >

                                                <TableCell>

                                                    <Stack
                                                        direction="row"
                                                        spacing={1.5}
                                                        alignItems="center"
                                                    >

                                                        <CreditCardRounded />

                                                        <Box>

                                                            <Typography
                                                                fontWeight={700}
                                                            >
                                                                {
                                                                    method.name
                                                                }
                                                            </Typography>

                                                            <Typography
                                                                variant="caption"
                                                                color="text.secondary"
                                                            >
                                                                {
                                                                    method.id
                                                                }
                                                            </Typography>

                                                        </Box>

                                                    </Stack>

                                                </TableCell>


                                                <TableCell>
                                                    {
                                                        method.gateway
                                                    }
                                                </TableCell>


                                                <TableCell>
                                                    {method.transactionCount.toLocaleString()}
                                                </TableCell>


                                                <TableCell>
                                                    {
                                                        method.feeRate
                                                    }
                                                    %
                                                </TableCell>


                                                <TableCell>

                                                    <Chip
                                                        size="small"
                                                        label={
                                                            method.enabled
                                                                ? "Enabled"
                                                                : "Disabled"
                                                        }
                                                        color={
                                                            method.enabled
                                                                ? "success"
                                                                : "default"
                                                        }
                                                    />

                                                </TableCell>


                                                <TableCell align="right">

                                                    <Switch
                                                        checked={
                                                            method.enabled
                                                        }
                                                    />

                                                </TableCell>

                                            </TableRow>

                                        )
                                    )}

                                </TableBody>

                            </Table>

                        </TableContainer>

                    </Paper>


                    {/* MOBILE */}

                    <Box
                        sx={{
                            display: {
                                xs: "block",
                                md: "none",
                            },
                        }}
                    >

                        <Stack spacing={2}>

                            {paymentMethods.map(
                                method => (

                                    <Card
                                        key={
                                            method.id
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
                                                    alignItems="center"
                                                >

                                                    <Stack
                                                        direction="row"
                                                        spacing={1.5}
                                                        alignItems="center"
                                                    >

                                                        <CreditCardRounded />

                                                        <Box>

                                                            <Typography
                                                                fontWeight={800}
                                                            >
                                                                {
                                                                    method.name
                                                                }
                                                            </Typography>

                                                            <Typography
                                                                variant="caption"
                                                                color="text.secondary"
                                                            >
                                                                {
                                                                    method.gateway
                                                                }
                                                            </Typography>

                                                        </Box>

                                                    </Stack>

                                                    <Switch
                                                        checked={
                                                            method.enabled
                                                        }
                                                    />

                                                </Stack>


                                                <Divider />


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
                                                            Transactions
                                                        </Typography>

                                                        <Typography
                                                            fontWeight={800}
                                                        >
                                                            {method.transactionCount.toLocaleString()}
                                                        </Typography>

                                                    </Box>


                                                    <Box>

                                                        <Typography
                                                            variant="caption"
                                                            color="text.secondary"
                                                        >
                                                            Fee
                                                        </Typography>

                                                        <Typography
                                                            fontWeight={800}
                                                        >
                                                            {
                                                                method.feeRate
                                                            }
                                                            %
                                                        </Typography>

                                                    </Box>

                                                </Box>

                                            </Stack>

                                        </CardContent>

                                    </Card>

                                )
                            )}

                        </Stack>

                    </Box>

                </Stack>

            )}


            {/* =================================================
                GATEWAY LOGS
            ================================================= */}

            {activeTab === "LOGS" && (

                <Stack spacing={2}>

                    <Box>

                        <Typography
                            variant="h6"
                            fontWeight={800}
                        >
                            Gateway Logs
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Monitor gateway communication,
                            callbacks, errors, and payment
                            events.
                        </Typography>

                    </Box>


                    {/* FILTERS */}

                    <Paper
                        variant="outlined"
                        sx={{
                            p: 2,
                            borderRadius: 3,
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
                                size="small"
                                placeholder="Search logs, transaction, gateway..."
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
                                        | GatewayName
                                        | "ALL"
                                    );

                                    setPage(0);
                                }}
                            >
                                {
                                    [
                                        { value: "ALL", label: "All Gateways" },
                                        { value: "Stripe", label: "Stripe" },
                                        { value: "PayPay", label: "PayPay" },
                                        { value: "Bank Transfer", label: "Bank Transfer" },

                                    ].map(gateway =>
                                        <MenuItem value={gateway.value}>
                                            {gateway.label}
                                        </MenuItem>
                                    )
                                }

                            </TextField>


                            <TextField
                                select
                                size="small"
                                label="Log Level"
                                value={
                                    logLevelFilter
                                }
                                onChange={event => {

                                    setLogLevelFilter(
                                        event.target
                                            .value as
                                        | LogLevel
                                        | "ALL"
                                    );

                                    setPage(0);
                                }}
                            >
                                {
                                    [
                                        { value: "ALL", label: "All Levels" },
                                        { value: "INFO", label: "INFO" },
                                        { value: "SUCCESS", label: "SUCCESS" },
                                        { value: "WARNING", label: "WARNING" },
                                        { value: "ERROR", label: "ERROR" }
                                    ].map(logLv =>
                                        <MenuItem value={logLv.value}>
                                            {logLv.label}
                                        </MenuItem>
                                    )
                                }

                            </TextField>

                        </Box>

                    </Paper>


                    {/* DESKTOP LOG TABLE */}

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
                                            Log ID
                                        </TableCell>

                                        <TableCell>
                                            Gateway
                                        </TableCell>

                                        <TableCell>
                                            Action
                                        </TableCell>

                                        <TableCell>
                                            Transaction
                                        </TableCell>

                                        <TableCell>
                                            Level
                                        </TableCell>

                                        <TableCell>
                                            Message
                                        </TableCell>

                                        <TableCell>
                                            Date
                                        </TableCell>

                                        <TableCell />

                                    </TableRow>

                                </TableHead>


                                <TableBody>

                                    {paginatedLogs.map(
                                        log => (

                                            <TableRow
                                                key={
                                                    log.id
                                                }
                                                hover
                                            >

                                                <TableCell>
                                                    <Typography
                                                        fontWeight={700}
                                                    >
                                                        {
                                                            log.id
                                                        }
                                                    </Typography>
                                                </TableCell>


                                                <TableCell>
                                                    {
                                                        log.gateway
                                                    }
                                                </TableCell>


                                                <TableCell>
                                                    {
                                                        log.action
                                                    }
                                                </TableCell>


                                                <TableCell>

                                                    {log.transactionId ??
                                                        "—"}

                                                </TableCell>


                                                <TableCell>

                                                    <Chip
                                                        size="small"
                                                        label={
                                                            log.level
                                                        }
                                                        color={
                                                            logLevelConfig[
                                                                log.level
                                                            ].color
                                                        }
                                                    />

                                                </TableCell>


                                                <TableCell>

                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            maxWidth:
                                                                300,
                                                        }}
                                                    >
                                                        {
                                                            log.message
                                                        }
                                                    </Typography>

                                                </TableCell>


                                                <TableCell>
                                                    {
                                                        log.createdAt
                                                    }
                                                </TableCell>


                                                <TableCell>

                                                    <IconButton
                                                        size="small"
                                                    >
                                                        <VisibilityRounded />
                                                    </IconButton>

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
                                filteredLogs.length
                            }
                            page={page}
                            onPageChange={(
                                _,
                                newPage
                            ) =>
                                setPage(
                                    newPage
                                )
                            }
                            rowsPerPage={
                                rowsPerPage
                            }
                            onRowsPerPageChange={
                                event => {

                                    setRowsPerPage(
                                        parseInt(
                                            event
                                                .target
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


                    {/* MOBILE LOG CARDS */}

                    <Box
                        sx={{
                            display: {
                                xs: "block",
                                md: "none",
                            },
                        }}
                    >

                        <Stack spacing={2}>

                            {paginatedLogs.map(
                                log => (

                                    <Card
                                        key={
                                            log.id
                                        }
                                        variant="outlined"
                                        sx={{
                                            borderRadius: 3,
                                        }}
                                    >

                                        <CardContent>

                                            <Stack
                                                spacing={1.5}
                                            >

                                                <Stack
                                                    direction="row"
                                                    justifyContent="space-between"
                                                >

                                                    <Typography
                                                        fontWeight={800}
                                                    >
                                                        {
                                                            log.id
                                                        }
                                                    </Typography>

                                                    <Chip
                                                        size="small"
                                                        label={
                                                            log.level
                                                        }
                                                        color={
                                                            logLevelConfig[
                                                                log.level
                                                            ].color
                                                        }
                                                    />

                                                </Stack>


                                                <Typography
                                                    fontWeight={700}
                                                >
                                                    {
                                                        log.action
                                                    }
                                                </Typography>


                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    {
                                                        log.message
                                                    }
                                                </Typography>


                                                <Divider />


                                                <Box
                                                    sx={{
                                                        display:
                                                            "grid",
                                                        gridTemplateColumns:
                                                            "1fr 1fr",
                                                        gap: 1.5,
                                                    }}
                                                >

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
                                                                log.gateway
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
                                                                log.createdAt
                                                            }
                                                        </Typography>

                                                    </Box>

                                                </Box>


                                                {log.transactionId && (

                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                    >
                                                        Transaction:{" "}
                                                        {
                                                            log.transactionId
                                                        }
                                                    </Typography>

                                                )}

                                            </Stack>

                                        </CardContent>

                                    </Card>

                                )
                            )}

                        </Stack>


                        <TablePagination
                            component="div"
                            count={
                                filteredLogs.length
                            }
                            page={page}
                            onPageChange={(
                                _,
                                newPage
                            ) =>
                                setPage(
                                    newPage
                                )
                            }
                            rowsPerPage={
                                rowsPerPage
                            }
                            onRowsPerPageChange={
                                event => {

                                    setRowsPerPage(
                                        parseInt(
                                            event
                                                .target
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
                            ]}
                        />

                    </Box>

                </Stack>

            )}


            {/* =================================================
                GATEWAY DIALOG
            ================================================= */}

            <GatewayDialog
                gateway={
                    selectedGateway
                }
                onClose={() =>
                    setSelectedGateway(
                        null
                    )
                }
            />

        </Box>
    );
}