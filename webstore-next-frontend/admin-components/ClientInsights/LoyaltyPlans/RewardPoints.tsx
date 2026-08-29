"use client";

import React, { useMemo, useState } from "react";

import {
    Alert,
    Avatar,
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
    Grid,
    IconButton,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Stack,
    Tab,
    Tabs,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";

import {
    AddRounded,
    ArrowDownwardRounded,
    ArrowUpwardRounded,
    CloseRounded,
    EditRounded,
    HistoryRounded,
    LoyaltyRounded,
    PercentRounded,
    SettingsRounded,
    StarRounded,
    TrendingUpRounded,
} from "@mui/icons-material";


/* =========================================================
   TYPES
========================================================= */

type PointTransactionType =
    | "EARNED"
    | "REDEEMED"
    | "EXPIRED"
    | "ADJUSTED";

type TransactionStatus =
    | "COMPLETED"
    | "PENDING"
    | "CANCELLED";


interface RewardRule {
    id: string;
    name: string;

    type:
        | "PURCHASE"
        | "TIER_BONUS"
        | "BIRTHDAY"
        | "PROMOTION";

    pointsPerYen: number;

    minimumPurchase: number;

    status:
        | "ACTIVE"
        | "INACTIVE";

    description: string;
}


interface PointTransaction {
    id: string;

    customerName: string;
    customerId: string;

    type: PointTransactionType;

    points: number;

    orderId?: string;

    reason: string;

    createdAt: string;

    status: TransactionStatus;
}


/* =========================================================
   MOCK RULES
========================================================= */

const initialRules: RewardRule[] = [

    {
        id: "rule-1",

        name: "Standard Purchase",

        type: "PURCHASE",

        pointsPerYen: 0.01,

        minimumPurchase: 1000,

        status: "ACTIVE",

        description:
            "Customers earn 1 point for every ¥100 spent.",
    },

    {
        id: "rule-2",

        name: "Silver Tier Bonus",

        type: "TIER_BONUS",

        pointsPerYen: 0.0125,

        minimumPurchase: 0,

        status: "ACTIVE",

        description:
            "Silver members receive 1.25× points.",
    },

    {
        id: "rule-3",

        name: "Gold Tier Bonus",

        type: "TIER_BONUS",

        pointsPerYen: 0.015,

        minimumPurchase: 0,

        status: "ACTIVE",

        description:
            "Gold members receive 1.5× points.",
    },

    {
        id: "rule-4",

        name: "Birthday Bonus",

        type: "BIRTHDAY",

        pointsPerYen: 0,

        minimumPurchase: 0,

        status: "ACTIVE",

        description:
            "Special bonus points during the customer's birthday month.",
    },

];


/* =========================================================
   MOCK TRANSACTIONS
========================================================= */

const initialTransactions: PointTransaction[] = [

    {
        id: "PT-20260825-001",

        customerName: "Yuki Tanaka",
        customerId: "CUS-10231",

        type: "EARNED",

        points: 250,

        orderId: "ORD-20260825-1832",

        reason: "Purchase reward",

        createdAt: "2026-08-25 14:32",

        status: "COMPLETED",
    },

    {
        id: "PT-20260825-002",

        customerName: "Hiro Sato",
        customerId: "CUS-10482",

        type: "REDEEMED",

        points: -500,

        orderId: "ORD-20260825-1819",

        reason: "Points used for purchase",

        createdAt: "2026-08-25 13:51",

        status: "COMPLETED",
    },

    {
        id: "PT-20260825-003",

        customerName: "Mika Suzuki",
        customerId: "CUS-10091",

        type: "EARNED",

        points: 180,

        orderId: "ORD-20260825-1722",

        reason: "Purchase reward",

        createdAt: "2026-08-25 12:40",

        status: "COMPLETED",
    },

    {
        id: "PT-20260825-004",

        customerName: "Ken Watanabe",
        customerId: "CUS-10021",

        type: "EXPIRED",

        points: -300,

        reason: "Points expired",

        createdAt: "2026-08-25 10:20",

        status: "COMPLETED",
    },

    {
        id: "PT-20260824-015",

        customerName: "Aiko Yamamoto",
        customerId: "CUS-10522",

        type: "ADJUSTED",

        points: 100,

        reason: "Customer service compensation",

        createdAt: "2026-08-24 18:10",

        status: "COMPLETED",
    },

];


/* =========================================================
   HELPERS
========================================================= */

const formatPoints = (
    points: number
) => {

    return `${points > 0 ? "+" : ""}${points.toLocaleString()} pts`;

};


const transactionConfig = (
    type: PointTransactionType
) => {

    switch (type) {

        case "EARNED":
            return {
                label: "Earned",
                color: "success" as const,
                icon: (
                    <ArrowUpwardRounded />
                ),
            };

        case "REDEEMED":
            return {
                label: "Redeemed",
                color: "info" as const,
                icon: (
                    <ArrowDownwardRounded />
                ),
            };

        case "EXPIRED":
            return {
                label: "Expired",
                color: "warning" as const,
                icon: (
                    <HistoryRounded />
                ),
            };

        case "ADJUSTED":
            return {
                label: "Adjusted",
                color: "default" as const,
                icon: (
                    <SettingsRounded />
                ),
            };

    }

};


/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function RewardPoints() {

    const [
        rules,
        setRules
    ] = useState<RewardRule[]>(
        initialRules
    );


    const [
        transactions
    ] = useState<
        PointTransaction[]
    >(
        initialTransactions
    );


    const [
        activeTab,
        setActiveTab
    ] = useState(0);


    const [
        ruleDialogOpen,
        setRuleDialogOpen
    ] = useState(false);


    const [
        selectedRule,
        setSelectedRule
    ] = useState<RewardRule | null>(
        null
    );


    /* =====================================================
       SUMMARY
    ===================================================== */

    const totalIssued = useMemo(
        () =>
            transactions
                .filter(
                    item =>
                        item.type ===
                        "EARNED"
                )
                .reduce(
                    (sum, item) =>
                        sum +
                        item.points,
                    0
                ),
        [transactions]
    );


    const totalRedeemed = useMemo(
        () =>
            Math.abs(
                transactions
                    .filter(
                        item =>
                            item.type ===
                            "REDEEMED"
                    )
                    .reduce(
                        (sum, item) =>
                            sum +
                            item.points,
                        0
                    )
            ),
        [transactions]
    );


    const totalExpired = useMemo(
        () =>
            Math.abs(
                transactions
                    .filter(
                        item =>
                            item.type ===
                            "EXPIRED"
                    )
                    .reduce(
                        (sum, item) =>
                            sum +
                            item.points,
                        0
                    )
            ),
        [transactions]
    );


    const activeRules =
        rules.filter(
            rule =>
                rule.status ===
                "ACTIVE"
        ).length;


    /* =====================================================
       DIALOG
    ===================================================== */

    const openNewRule = () => {

        setSelectedRule(null);

        setRuleDialogOpen(true);

    };


    const openEditRule = (
        rule: RewardRule
    ) => {

        setSelectedRule(rule);

        setRuleDialogOpen(true);

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
                mb={4}
            >

                <Box>

                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                    >

                        <StarRounded fontSize="large"/>

                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >
                            Reward Points
                        </Typography>

                    </Stack>

                    <Typography
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                    >
                        Manage point earning,
                        redemption and customer
                        reward activity.
                    </Typography>

                </Box>


                <Button
                    variant="contained"
                    startIcon={
                        <AddRounded />
                    }
                    onClick={
                        openNewRule
                    }
                >
                    Add Reward Rule
                </Button>

            </Stack>


            {/* =================================================
                SUMMARY
            ================================================= */}

            <Grid
                container
                spacing={2}
                mb={4}
            >

                <Grid
                    size={{
                        xs: 6,
                        lg: 3,
                    }}
                >

                    <SummaryCard
                        title="Points Issued"
                        value={
                            totalIssued.toLocaleString()
                        }
                        subtitle="Points earned by customers"
                        icon={
                            <ArrowUpwardRounded />
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
                        title="Points Redeemed"
                        value={
                            totalRedeemed.toLocaleString()
                        }
                        subtitle="Points used by customers"
                        icon={
                            <ArrowDownwardRounded />
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
                        title="Points Expired"
                        value={
                            totalExpired.toLocaleString()
                        }
                        subtitle="Expired reward points"
                        icon={
                            <HistoryRounded />
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
                        title="Active Rules"
                        value={
                            activeRules.toString()
                        }
                        subtitle="Currently earning points"
                        icon={
                            <LoyaltyRounded />
                        }
                    />

                </Grid>

            </Grid>


            {/* =================================================
                MAIN TABS
            ================================================= */}

            <Paper
                variant="outlined"
                sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                }}
            >

                <Tabs
                    value={activeTab}
                    onChange={(
                        _,
                        value
                    ) =>
                        setActiveTab(
                            value
                        )
                    }
                    variant="scrollable"
                    scrollButtons="auto"
                >

                    <Tab
                        label="Point Overview"
                    />

                    <Tab
                        label="Reward Rules"
                    />

                    <Tab
                        label="Point Activity"
                    />

                </Tabs>


                <Divider />


                {/* =================================================
                    OVERVIEW
                ================================================= */}

                {activeTab === 0 && (

                    <Box sx={{ p: 3 }}>

                        <Grid
                            container
                            spacing={3}
                        >

                            <Grid
                                size={{
                                    xs: 12,
                                    md: 7,
                                }}
                            >

                                <Paper
                                    variant="outlined"
                                    sx={{
                                        p: 3,
                                        borderRadius: 3,
                                    }}
                                >

                                    <Typography
                                        variant="h6"
                                        fontWeight={700}
                                    >
                                        Reward Point Flow
                                    </Typography>

                                    <Typography
                                        color="text.secondary"
                                        variant="body2"
                                        sx={{
                                            mt: 0.5,
                                            mb: 3,
                                        }}
                                    >
                                        How customer
                                        points move
                                        through the
                                        loyalty system.
                                    </Typography>


                                    <Grid
                                        container
                                        spacing={2}
                                    >

                                        <Grid
                                            size={{
                                                xs: 12,
                                                sm: 6,
                                            }}
                                        >

                                            <FlowCard
                                                number="01"
                                                title="Earn"
                                                description="Customers receive points from eligible purchases."
                                                icon={
                                                    <ArrowUpwardRounded />
                                                }
                                            />

                                        </Grid>


                                        <Grid
                                            size={{
                                                xs: 12,
                                                sm: 6,
                                            }}
                                        >

                                            <FlowCard
                                                number="02"
                                                title="Balance"
                                                description="Points are stored in the customer's loyalty account."
                                                icon={
                                                    <LoyaltyRounded />
                                                }
                                            />

                                        </Grid>


                                        <Grid
                                            size={{
                                                xs: 12,
                                                sm: 6,
                                            }}
                                        >

                                            <FlowCard
                                                number="03"
                                                title="Redeem"
                                                description="Customers use available points during purchases."
                                                icon={
                                                    <PercentRounded />
                                                }
                                            />

                                        </Grid>


                                        <Grid
                                            size={{
                                                xs: 12,
                                                sm: 6,
                                            }}
                                        >

                                            <FlowCard
                                                number="04"
                                                title="Expire"
                                                description="Unused points may expire according to business rules."
                                                icon={
                                                    <HistoryRounded />
                                                }
                                            />

                                        </Grid>

                                    </Grid>

                                </Paper>

                            </Grid>


                            {/* QUICK ANALYSIS */}

                            <Grid
                                size={{
                                    xs: 12,
                                    md: 5,
                                }}
                            >

                                <Paper
                                    variant="outlined"
                                    sx={{
                                        p: 3,
                                        borderRadius: 3,
                                        height: "100%",
                                    }}
                                >

                                    <Typography
                                        variant="h6"
                                        fontWeight={700}
                                    >
                                        Point Analysis
                                    </Typography>


                                    <Stack
                                        spacing={2.5}
                                        sx={{
                                            mt: 3,
                                        }}
                                    >

                                        <AnalysisRow
                                            label="Issued"
                                            value={
                                                totalIssued
                                            }
                                        />

                                        <AnalysisRow
                                            label="Redeemed"
                                            value={
                                                totalRedeemed
                                            }
                                        />

                                        <AnalysisRow
                                            label="Expired"
                                            value={
                                                totalExpired
                                            }
                                        />


                                        <Divider />


                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                        >

                                            <Typography
                                                fontWeight={700}
                                            >
                                                Net Points
                                            </Typography>

                                            <Typography
                                                fontWeight={800}
                                            >
                                                {(
                                                    totalIssued -
                                                    totalRedeemed -
                                                    totalExpired
                                                ).toLocaleString()}
                                            </Typography>

                                        </Stack>

                                    </Stack>

                                </Paper>

                            </Grid>

                        </Grid>

                    </Box>

                )}


                {/* =================================================
                    REWARD RULES
                ================================================= */}

                {activeTab === 1 && (

                    <Box sx={{ p: 3 }}>

                        <Alert
                            severity="info"
                            sx={{
                                mb: 3,
                            }}
                        >
                            Reward rules determine
                            how many points customers
                            receive from purchases
                            and special events.
                        </Alert>


                        <Stack
                            spacing={2}
                        >

                            {rules.map(
                                rule => (

                                    <RewardRuleCard
                                        key={
                                            rule.id
                                        }
                                        rule={
                                            rule
                                        }
                                        onEdit={() =>
                                            openEditRule(
                                                rule
                                            )
                                        }
                                    />

                                )
                            )}

                        </Stack>

                    </Box>

                )}


                {/* =================================================
                    ACTIVITY
                ================================================= */}

                {activeTab === 2 && (

                    <Box sx={{ p: 3 }}>

                        <Stack
                            spacing={1.5}
                        >

                            {transactions.map(
                                transaction => (

                                    <TransactionRow
                                        key={
                                            transaction.id
                                        }
                                        transaction={
                                            transaction
                                        }
                                    />

                                )
                            )}

                        </Stack>

                    </Box>

                )}

            </Paper>


            {/* =================================================
                RULE DIALOG
            ================================================= */}

            <RewardRuleDialog
                open={
                    ruleDialogOpen
                }
                rule={
                    selectedRule
                }
                onClose={() =>
                    setRuleDialogOpen(
                        false
                    )
                }
                onSave={(
                    newRule
                ) => {

                    if (
                        selectedRule
                    ) {

                        setRules(
                            prev =>
                                prev.map(
                                    item =>
                                        item.id ===
                                        newRule.id
                                            ? newRule
                                            : item
                                )
                        );

                    } else {

                        setRules(
                            prev => [
                                ...prev,
                                newRule,
                            ]
                        );

                    }

                    setRuleDialogOpen(
                        false
                    );

                }}
            />

        </Box>

    );

}


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


                    <Avatar
                        variant="rounded"
                        sx={{
                            bgcolor:
                                "action.hover",
                            color:
                                "text.primary",
                        }}
                    >
                        {icon}
                    </Avatar>

                </Stack>

            </CardContent>

        </Card>

    );

}


/* =========================================================
   FLOW CARD
========================================================= */

function FlowCard({
    number,
    title,
    description,
    icon,
}: {
    number: string;
    title: string;
    description: string;
    icon: React.ReactNode;
}) {

    return (

        <Paper
            variant="outlined"
            sx={{
                p: 2,
                borderRadius: 2,
                height: "100%",
            }}
        >

            <Stack
                direction="row"
                spacing={2}
            >

                <Avatar
                    variant="rounded"
                >
                    {icon}
                </Avatar>

                <Box>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                    >
                        STEP {number}
                    </Typography>

                    <Typography
                        fontWeight={700}
                    >
                        {title}
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            mt: 0.5,
                        }}
                    >
                        {description}
                    </Typography>

                </Box>

            </Stack>

        </Paper>

    );

}


/* =========================================================
   ANALYSIS ROW
========================================================= */

function AnalysisRow({
    label,
    value,
}: {
    label: string;
    value: number;
}) {

    return (

        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
        >

            <Typography
                color="text.secondary"
            >
                {label}
            </Typography>

            <Typography
                fontWeight={700}
            >
                {value.toLocaleString()} pts
            </Typography>

        </Stack>

    );

}


/* =========================================================
   REWARD RULE CARD
========================================================= */

function RewardRuleCard({
    rule,
    onEdit,
}: {
    rule: RewardRule;
    onEdit: () => void;
}) {

    return (

        <Paper
            variant="outlined"
            sx={{
                p: 2.5,
                borderRadius: 3,
            }}
        >

            <Stack
                direction={{
                    xs: "column",
                    md: "row",
                }}
                justifyContent="space-between"
                gap={2}
            >

                <Box>

                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                    >

                        <Typography
                            variant="h6"
                            fontWeight={700}
                        >
                            {rule.name}
                        </Typography>

                        <Chip
                            size="small"
                            label={
                                rule.status
                            }
                            color={
                                rule.status ===
                                "ACTIVE"
                                    ? "success"
                                    : "default"
                            }
                        />

                    </Stack>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            mt: 0.5,
                        }}
                    >
                        {rule.description}
                    </Typography>

                </Box>


                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                >

                    <Box
                        sx={{
                            textAlign: {
                                xs: "left",
                                md: "right",
                            },
                        }}
                    >

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            Points Rate
                        </Typography>

                        <Typography
                            fontWeight={800}
                        >
                            {rule.pointsPerYen > 0
                                ? `${(
                                    rule.pointsPerYen *
                                    100
                                ).toFixed(2)} pts / ¥100`
                                : "Special Bonus"}
                        </Typography>

                    </Box>


                    <Tooltip title="Edit Rule">

                        <IconButton
                            onClick={
                                onEdit
                            }
                        >
                            <EditRounded />
                        </IconButton>

                    </Tooltip>

                </Stack>

            </Stack>


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
                spacing={{
                    xs: 1,
                    sm: 4,
                }}
            >

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    Type:{" "}
                    <strong>
                        {rule.type}
                    </strong>
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    Minimum Purchase:{" "}
                    <strong>
                        ¥
                        {rule.minimumPurchase.toLocaleString()}
                    </strong>
                </Typography>

            </Stack>

        </Paper>

    );

}


/* =========================================================
   TRANSACTION ROW
========================================================= */

function TransactionRow({
    transaction,
}: {
    transaction: PointTransaction;
}) {

    const config =
        transactionConfig(
            transaction.type
        );


    return (

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
                alignItems="center"
            >

                {/* CUSTOMER */}

                <Grid
                    size={{
                        xs: 12,
                        sm: 4,
                        md: 3,
                    }}
                >

                    <Stack
                        direction="row"
                        spacing={1.5}
                        alignItems="center"
                    >

                        <Avatar>
                            {transaction
                                .customerName
                                .charAt(0)}
                        </Avatar>

                        <Box>

                            <Typography
                                fontWeight={600}
                            >
                                {
                                    transaction.customerName
                                }
                            </Typography>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                {
                                    transaction.customerId
                                }
                            </Typography>

                        </Box>

                    </Stack>

                </Grid>


                {/* TYPE */}

                <Grid
                    size={{
                        xs: 6,
                        sm: 3,
                        md: 2,
                    }}
                >

                    <Chip
                        size="small"
                        icon={
                            config.icon
                        }
                        label={
                            config.label
                        }
                        color={
                            config.color
                        }
                    />

                </Grid>


                {/* POINTS */}

                <Grid
                    size={{
                        xs: 6,
                        sm: 2,
                        md: 2,
                    }}
                >

                    <Typography
                        fontWeight={800}
                        color={
                            transaction.points >= 0
                                ? "success.main"
                                : "error.main"
                        }
                    >
                        {
                            formatPoints(
                                transaction.points
                            )
                        }
                    </Typography>

                </Grid>


                {/* REASON */}

                <Grid
                    size={{
                        xs: 12,
                        md: 3,
                    }}
                >

                    <Typography
                        variant="body2"
                    >
                        {
                            transaction.reason
                        }
                    </Typography>

                    {transaction.orderId && (

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            {
                                transaction.orderId
                            }
                        </Typography>

                    )}

                </Grid>


                {/* DATE */}

                <Grid
                    size={{
                        xs: 12,
                        md: 2,
                    }}
                >

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        {
                            transaction.createdAt
                        }
                    </Typography>

                </Grid>

            </Grid>

        </Paper>

    );

}


/* =========================================================
   REWARD RULE DIALOG
========================================================= */

function RewardRuleDialog({
    open,
    rule,
    onClose,
    onSave,
}: {
    open: boolean;

    rule: RewardRule | null;

    onClose: () => void;

    onSave: (
        rule: RewardRule
    ) => void;
}) {

    const [
        name,
        setName
    ] = useState(
        rule?.name ?? ""
    );


    const [
        type,
        setType
    ] = useState<
        RewardRule["type"]
    >(
        rule?.type ??
        "PURCHASE"
    );


    const [
        pointsPerYen,
        setPointsPerYen
    ] = useState(
        rule?.pointsPerYen.toString() ??
        "0.01"
    );


    const [
        minimumPurchase,
        setMinimumPurchase
    ] = useState(
        rule?.minimumPurchase.toString() ??
        "1000"
    );


    const [
        description,
        setDescription
    ] = useState(
        rule?.description ?? ""
    );


    const [
        status,
        setStatus
    ] = useState<
        RewardRule["status"]
    >(
        rule?.status ??
        "ACTIVE"
    );


    const handleSave = () => {

        const newRule: RewardRule = {

            id:
                rule?.id ??
                `rule-${Date.now()}`,

            name:
                name.trim(),

            type,

            pointsPerYen:
                Number(
                    pointsPerYen
                ) || 0,

            minimumPurchase:
                Number(
                    minimumPurchase
                ) || 0,

            status,

            description:
                description.trim(),

        };

        onSave(newRule);

    };


    return (

        <Dialog
            open={open}
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
                            fontWeight={700}
                        >
                            {rule
                                ? "Edit Reward Rule"
                                : "New Reward Rule"}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Define how customers
                            earn reward points.
                        </Typography>

                    </Box>


                    <IconButton
                        onClick={
                            onClose
                        }
                    >
                        <CloseRounded />
                    </IconButton>

                </Stack>

            </DialogTitle>


            <DialogContent dividers>

                <Stack spacing={2.5}>

                    <TextField
                        fullWidth
                        label="Rule Name"
                        placeholder="e.g. Standard Purchase"
                        value={name}
                        onChange={e =>
                            setName(
                                e.target.value
                            )
                        }
                    />


                    <TextField
                        fullWidth
                        select
                        label="Rule Type"
                        value={type}
                        onChange={e =>
                            setType(
                                e.target.value as
                                RewardRule["type"]
                            )
                        }
                    >

                        <MenuItem value="PURCHASE">
                            Purchase
                        </MenuItem>

                        <MenuItem value="TIER_BONUS">
                            Membership Tier Bonus
                        </MenuItem>

                        <MenuItem value="BIRTHDAY">
                            Birthday Bonus
                        </MenuItem>

                        <MenuItem value="PROMOTION">
                            Promotional Bonus
                        </MenuItem>

                    </TextField>


                    <TextField
                        fullWidth
                        type="number"
                        label="Points per ¥1"
                        helperText="Example: 0.01 = 1 point per ¥100"
                        value={
                            pointsPerYen
                        }
                        onChange={e =>
                            setPointsPerYen(
                                e.target.value
                            )
                        }
                        inputProps={{
                            min: 0,
                            step: 0.01,
                        }}
                    />


                    <TextField
                        fullWidth
                        type="number"
                        label="Minimum Purchase (¥)"
                        value={
                            minimumPurchase
                        }
                        onChange={e =>
                            setMinimumPurchase(
                                e.target.value
                            )
                        }
                    />


                    <TextField
                        fullWidth
                        select
                        label="Status"
                        value={status}
                        onChange={e =>
                            setStatus(
                                e.target.value as
                                RewardRule["status"]
                            )
                        }
                    >

                        <MenuItem value="ACTIVE">
                            Active
                        </MenuItem>

                        <MenuItem value="INACTIVE">
                            Inactive
                        </MenuItem>

                    </TextField>


                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Description"
                        placeholder="Explain how this rule works..."
                        value={
                            description
                        }
                        onChange={e =>
                            setDescription(
                                e.target.value
                            )
                        }
                    />

                </Stack>

            </DialogContent>


            <DialogActions
                sx={{
                    px: 3,
                    py: 2,
                }}
            >

                <Button
                    onClick={
                        onClose
                    }
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={
                        handleSave
                    }
                    disabled={
                        !name.trim()
                    }
                >
                    {rule
                        ? "Save Changes"
                        : "Create Rule"}
                </Button>

            </DialogActions>

        </Dialog>

    );

}