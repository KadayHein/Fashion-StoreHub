"use client";

import React, { useMemo, useState } from "react";

import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    LinearProgress,
    MenuItem,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

import {
    ArrowForwardRounded,
    Inventory2Rounded,
    LocalShippingRounded,
    RefreshRounded,
    TrendingDownRounded,
    TrendingUpRounded,
    WarningAmberRounded,
} from "@mui/icons-material";


// ============================================================
// TYPES
// ============================================================

type AlertLevel =
    | "CRITICAL"
    | "LOW"
    | "AT_RISK"
    | "HEALTHY";

type RecommendationType =
    | "TRANSFER"
    | "RESTOCK"
    | "MONITOR";

interface LowStockItem {
    id: string;

    product: string;
    sku: string;

    warehouse: string;

    currentStock: number;
    minimumStock: number;
    targetStock: number;

    averageDailySales: number;

    daysRemaining: number;

    alertLevel: AlertLevel;

    recommendedQuantity: number;

    recommendation: RecommendationType;

    sourceWarehouse?: string;
}


// ============================================================
// MOCK DATA
// ============================================================

const lowStockData: LowStockItem[] = [

    {
        id: "LS-001",

        product: "Nike Shirt",
        sku: "NK-001",

        warehouse: "Namba Branch",

        currentStock: 12,
        minimumStock: 30,
        targetStock: 80,

        averageDailySales: 5,

        daysRemaining: 2,

        alertLevel: "CRITICAL",

        recommendedQuantity: 68,

        recommendation: "TRANSFER",

        sourceWarehouse: "Main Warehouse",
    },

    {
        id: "LS-002",

        product: "Adidas Shoes",
        sku: "AD-002",

        warehouse: "Umeda Branch",

        currentStock: 18,
        minimumStock: 25,
        targetStock: 60,

        averageDailySales: 2,

        daysRemaining: 9,

        alertLevel: "LOW",

        recommendedQuantity: 42,

        recommendation: "TRANSFER",

        sourceWarehouse: "Main Warehouse",
    },

    {
        id: "LS-003",

        product: "Puma Cap",
        sku: "PM-003",

        warehouse: "Sakai Warehouse",

        currentStock: 25,
        minimumStock: 40,
        targetStock: 100,

        averageDailySales: 1,

        daysRemaining: 25,

        alertLevel: "AT_RISK",

        recommendedQuantity: 75,

        recommendation: "RESTOCK",
    },

    {
        id: "LS-004",

        product: "Uniqlo Jacket",
        sku: "UN-004",

        warehouse: "Main Warehouse",

        currentStock: 75,
        minimumStock: 50,
        targetStock: 120,

        averageDailySales: 3,

        daysRemaining: 25,

        alertLevel: "HEALTHY",

        recommendedQuantity: 0,

        recommendation: "MONITOR",
    },

];


// ============================================================
// CONFIG
// ============================================================

const alertConfig: Record<
    AlertLevel,
    {
        label: string;
        color:
            | "error"
            | "warning"
            | "info"
            | "success";
    }
> = {

    CRITICAL: {
        label: "Critical",
        color: "error",
    },

    LOW: {
        label: "Low",
        color: "warning",
    },

    AT_RISK: {
        label: "At Risk",
        color: "info",
    },

    HEALTHY: {
        label: "Healthy",
        color: "success",
    },

};


// ============================================================
// PAGE
// ============================================================

export default function LowStockAlerts() {

    const [warehouse, setWarehouse] = useState("ALL");

    const [alertLevel, setAlertLevel] = useState("ALL");


    // --------------------------------------------------------
    // FILTER
    // --------------------------------------------------------

    const filteredData = useMemo(() => {

        return lowStockData.filter(item => {

            const warehouseMatch =
                warehouse === "ALL" ||
                item.warehouse === warehouse;

            const alertMatch =
                alertLevel === "ALL" ||
                item.alertLevel === alertLevel;

            return (
                warehouseMatch &&
                alertMatch
            );

        });

    }, [warehouse, alertLevel]);


    // --------------------------------------------------------
    // SUMMARY
    // --------------------------------------------------------

    const criticalCount =
        lowStockData.filter(
            item =>
                item.alertLevel ===
                "CRITICAL"
        ).length;


    const lowCount =
        lowStockData.filter(
            item =>
                item.alertLevel ===
                "LOW"
        ).length;


    const atRiskCount =
        lowStockData.filter(
            item =>
                item.alertLevel ===
                "AT_RISK"
        ).length;


    const totalRecommended =
        lowStockData.reduce(
            (sum, item) =>
                sum +
                item.recommendedQuantity,
            0
        );


    return (

        <Box>
            <Stack
                direction={"row"}
                justifyContent="space-between"
                alignItems={{
                    xs: "flex-start",
                    sm: "center",
                }}
                gap={2}
                mb={3}
            >
                <Box>
                    <Typography
                        variant="h4"
                        fontWeight={700}
                    >
                        Low Stock Alerts
                    </Typography>

                    <Typography
                        variant="body1"
                        color="text.secondary"
                    >
                        Analyze inventory levels
                        and identify where
                        stock needs to be refilled.
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
                SUMMARY CARDS
            ================================================= */}

            <Grid
                container
                spacing={2}
                mb={3}
            >

                <Grid
                    size={{
                        xs: 6,
                        md: 3,
                        lg: 3
                    }}
                >

                    <SummaryCard
                        title="Critical"
                        value={criticalCount}
                        subtitle="Immediate action"
                        icon={
                            <WarningAmberRounded />
                        }
                    />

                </Grid>


                <Grid
                    size={{
                        xs: 6,
                        md: 3,
                        lg: 3
                    }}
                >

                    <SummaryCard
                        title="Low Stock"
                        value={lowCount}
                        subtitle="Needs refill"
                        icon={
                            <TrendingDownRounded />
                        }
                    />

                </Grid>


                <Grid
                    size={{
                        xs: 6,
                        md: 3,
                        lg: 3
                    }}
                >

                    <SummaryCard
                        title="At Risk"
                        value={atRiskCount}
                        subtitle="Monitor closely"
                        icon={
                            <TrendingUpRounded />
                        }
                    />

                </Grid>


                <Grid
                    size={{
                        xs: 6,
                        md: 3,
                        lg: 3
                    }}
                >

                    <SummaryCard
                        title="Suggested Refill"
                        value={
                            totalRecommended
                        }
                        subtitle="Total units"
                        icon={
                            <LocalShippingRounded />
                        }
                    />

                </Grid>

            </Grid>

            <Card
                elevation={0}
                sx={{
                    border: "1px solid",
                    borderColor:
                        "divider",
                    borderRadius: 3,
                    mb: 3,
                }}
            >
                <CardContent>

                    <Stack
                        direction={{
                            xs: "column",
                            md: "row",
                        }}
                        spacing={2}
                    >

                        <FormControl
                            size="small"
                            sx={{
                                minWidth: 220,
                            }}
                        >

                            <InputLabel>
                                Warehouse
                            </InputLabel>

                            <Select
                                label="Warehouse"
                                value={warehouse}
                                onChange={e =>
                                    setWarehouse(
                                        e.target.value
                                    )
                                }
                            >

                                <MenuItem value="ALL">
                                    All Warehouses
                                </MenuItem>

                                <MenuItem value="Main Warehouse">
                                    Main Warehouse
                                </MenuItem>

                                <MenuItem value="Namba Branch">
                                    Namba Branch
                                </MenuItem>

                                <MenuItem value="Umeda Branch">
                                    Umeda Branch
                                </MenuItem>

                                <MenuItem value="Sakai Warehouse">
                                    Sakai Warehouse
                                </MenuItem>

                            </Select>

                        </FormControl>


                        <FormControl
                            size="small"
                            sx={{
                                minWidth: 180,
                            }}
                        >

                            <InputLabel>
                                Alert Level
                            </InputLabel>

                            <Select
                                label="Alert Level"
                                value={
                                    alertLevel
                                }
                                onChange={e =>
                                    setAlertLevel(
                                        e.target.value
                                    )
                                }
                            >

                                <MenuItem value="ALL">
                                    All Levels
                                </MenuItem>

                                <MenuItem value="CRITICAL">
                                    Critical
                                </MenuItem>

                                <MenuItem value="LOW">
                                    Low
                                </MenuItem>

                                <MenuItem value="AT_RISK">
                                    At Risk
                                </MenuItem>

                                <MenuItem value="HEALTHY">
                                    Healthy
                                </MenuItem>

                            </Select>

                        </FormControl>

                    </Stack>

                </CardContent>

            </Card>


            {/* =================================================
                ANALYSIS TABLE
            ================================================= */}

            <Card
                elevation={0}
                sx={{
                    border: "1px solid",
                    borderColor:
                        "divider",
                    borderRadius: 3,
                }}
            >

                <CardContent
                    sx={{
                        pb: 1,
                    }}
                >

                    <Typography
                        variant="h6"
                        fontWeight={700}
                    >
                        Inventory Risk Analysis
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Stock levels compared
                        with demand and
                        replenishment targets.
                    </Typography>

                </CardContent>


                <TableContainer>

                    <Table>

                        <TableHead>

                            <TableRow>

                                <TableCell>
                                    Product
                                </TableCell>

                                <TableCell>
                                    Warehouse
                                </TableCell>

                                <TableCell>
                                    Stock
                                </TableCell>

                                <TableCell>
                                    Daily Demand
                                </TableCell>

                                <TableCell>
                                    Days Remaining
                                </TableCell>

                                <TableCell>
                                    Alert
                                </TableCell>

                                <TableCell>
                                    Recommendation
                                </TableCell>

                            </TableRow>

                        </TableHead>


                        <TableBody>

                            {filteredData.map(
                                item => {

                                    const config =
                                        alertConfig[
                                            item.alertLevel
                                        ];


                                    const stockPercentage =
                                        Math.min(
                                            (
                                                item.currentStock /
                                                item.targetStock
                                            ) * 100,
                                            100
                                        );


                                    return (

                                        <TableRow
                                            key={
                                                item.id
                                            }
                                            hover
                                        >

                                            {/* PRODUCT */}

                                            <TableCell>

                                                <Stack
                                                    direction="row"
                                                    spacing={1.5}
                                                    alignItems="center"
                                                >

                                                    <Box
                                                        sx={{
                                                            width: 40,
                                                            height: 40,
                                                            borderRadius: 2,
                                                            bgcolor:
                                                                "action.hover",
                                                            display:
                                                                "flex",
                                                            alignItems:
                                                                "center",
                                                            justifyContent:
                                                                "center",
                                                        }}
                                                    >

                                                        <Inventory2Rounded />

                                                    </Box>


                                                    <Box>

                                                        <Typography
                                                            fontWeight={600}
                                                        >
                                                            {
                                                                item.product
                                                            }
                                                        </Typography>

                                                        <Typography
                                                            variant="caption"
                                                            color="text.secondary"
                                                        >
                                                            {
                                                                item.sku
                                                            }
                                                        </Typography>

                                                    </Box>

                                                </Stack>

                                            </TableCell>


                                            {/* WAREHOUSE */}

                                            <TableCell>

                                                <Typography
                                                    fontWeight={500}
                                                >
                                                    {
                                                        item.warehouse
                                                    }
                                                </Typography>

                                            </TableCell>


                                            {/* STOCK */}

                                            <TableCell
                                                sx={{
                                                    minWidth: 150,
                                                }}
                                            >

                                                <Stack
                                                    spacing={
                                                        0.5
                                                    }
                                                >

                                                    <Stack
                                                        direction="row"
                                                        justifyContent="space-between"
                                                    >

                                                        <Typography
                                                            variant="body2"
                                                            fontWeight={
                                                                600
                                                            }
                                                        >
                                                            {
                                                                item.currentStock
                                                            }
                                                        </Typography>

                                                        <Typography
                                                            variant="caption"
                                                            color="text.secondary"
                                                        >
                                                            /
                                                            {
                                                                item.targetStock
                                                            }
                                                        </Typography>

                                                    </Stack>


                                                    <LinearProgress
                                                        variant="determinate"
                                                        value={
                                                            stockPercentage
                                                        }
                                                        color={
                                                            item.alertLevel ===
                                                            "CRITICAL"
                                                                ? "error"
                                                                : item.alertLevel ===
                                                                    "LOW"
                                                                ? "warning"
                                                                : "success"
                                                        }
                                                        sx={{
                                                            height: 6,
                                                            borderRadius: 5,
                                                        }}
                                                    />

                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                    >
                                                        Minimum:{" "}
                                                        {
                                                            item.minimumStock
                                                        }
                                                    </Typography>

                                                </Stack>

                                            </TableCell>


                                            {/* DEMAND */}

                                            <TableCell>

                                                <Typography
                                                    fontWeight={600}
                                                >
                                                    {
                                                        item.averageDailySales
                                                    }

                                                </Typography>

                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >
                                                    units/day
                                                </Typography>

                                            </TableCell>


                                            {/* DAYS */}

                                            <TableCell>

                                                <Typography
                                                    fontWeight={700}
                                                    color={
                                                        item.daysRemaining <=
                                                        3
                                                            ? "error.main"
                                                            : item.daysRemaining <=
                                                                10
                                                            ? "warning.main"
                                                            : "text.primary"
                                                    }
                                                >
                                                    {
                                                        item.daysRemaining
                                                    }{" "}
                                                    days
                                                </Typography>

                                            </TableCell>


                                            {/* ALERT */}

                                            <TableCell>

                                                <Chip
                                                    size="small"
                                                    label={
                                                        config.label
                                                    }
                                                    color={
                                                        config.color
                                                    }
                                                />

                                            </TableCell>


                                            {/* RECOMMENDATION */}

                                            <TableCell>

                                                <Recommendation
                                                    item={
                                                        item
                                                    }
                                                />

                                            </TableCell>

                                        </TableRow>

                                    );

                                }
                            )}

                        </TableBody>

                    </Table>

                </TableContainer>

            </Card>

        </Box>
    );
}


// ============================================================
// SUMMARY CARD
// ============================================================

function SummaryCard({
    title,
    value,
    subtitle,
    icon,
}: {
    title: string;
    value: number;
    subtitle: string;
    icon: React.ReactNode;
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

            <CardContent>

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >

                    <Box>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {title}
                        </Typography>

                        <Typography
                            variant="h4"
                            fontWeight={700}
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
                            width: 46,
                            height: 46,
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

                </Stack>

            </CardContent>

        </Card>
    );
}


// ============================================================
// RECOMMENDATION
// ============================================================

function Recommendation({
    item,
}: {
    item: LowStockItem;
}) {

    if (
        item.recommendation ===
        "TRANSFER"
    ) {

        return (

            <Stack spacing={0.5}>

                <Chip
                    size="small"
                    icon={
                        <ArrowForwardRounded />
                    }
                    label="Transfer"
                    color="primary"
                    sx={{
                        width: "fit-content",
                    }}
                />

                <Typography
                    variant="caption"
                    color="text.secondary"
                >
                    From:{" "}
                    <strong>
                        {
                            item.sourceWarehouse
                        }
                    </strong>
                </Typography>

                <Typography
                    variant="caption"
                    fontWeight={700}
                >
                    +{item.recommendedQuantity}{" "}
                    units
                </Typography>

            </Stack>

        );
    }


    if (
        item.recommendation ===
        "RESTOCK"
    ) {

        return (

            <Stack spacing={0.5}>

                <Chip
                    size="small"
                    icon={
                        <LocalShippingRounded />
                    }
                    label="Restock"
                    color="warning"
                    sx={{
                        width: "fit-content",
                    }}
                />

                <Typography
                    variant="caption"
                    color="text.secondary"
                >
                    Recommended
                </Typography>

                <Typography
                    variant="caption"
                    fontWeight={700}
                >
                    +{item.recommendedQuantity}{" "}
                    units
                </Typography>

            </Stack>

        );
    }


    return (

        <Chip
            size="small"
            label="Monitor"
            variant="outlined"
        />

    );
}