"use client";

import React, { useMemo, useState } from "react";

import {
    Alert,
    Box,
    Card,
    CardContent,
    Chip,
    Divider,
    MenuItem,
    Paper,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography,
} from "@mui/material";

import {
    AssessmentRounded,
    AttachMoneyRounded,
    CheckCircleRounded,
    Inventory2Rounded,
    LocalShippingRounded,
    SpeedRounded,
    TrendingDownRounded,
    TrendingUpRounded,
    WarningAmberRounded,
} from "@mui/icons-material";
import { useMobileScroll } from "@/service/customHooks/useMobileScroll";


// =====================================================
// TYPES
// =====================================================

type AnalyticsTab =
    | "SUPPLIER"
    | "COST"
    | "REPLENISHMENT";

type Period =
    | "7D"
    | "30D"
    | "90D"
    | "1Y";


// =====================================================
// MOCK DATA
// =====================================================

interface SupplierPerformance {
    supplier: string;
    orders: number;
    onTimeRate: number;
    qualityRate: number;
    avgLeadTime: number;
    totalPurchase: number;
    status:
    | "EXCELLENT"
    | "GOOD"
    | "WARNING";
}

interface PurchaseCost {
    category: string;
    purchaseAmount: number;
    shippingCost: number;
    discount: number;
    finalCost: number;
    orders: number;
}

interface ReplenishmentAnalysis {
    product: string;
    sku: string;
    currentStock: number;
    reorderPoint: number;
    avgDailySales: number;
    leadTime: number;
    stockoutRisk: "LOW" | "MEDIUM" | "HIGH";
    reorderFrequency: number;
}


// =====================================================
// MOCK SUPPLIER DATA
// =====================================================

const supplierData: SupplierPerformance[] = [

    {
        supplier: "ABC Apparel Co.",
        orders: 42,
        onTimeRate: 96,
        qualityRate: 98,
        avgLeadTime: 4.2,
        totalPurchase: 4820000,
        status: "EXCELLENT",
    },

    {
        supplier: "Urban Wear Inc.",
        orders: 35,
        onTimeRate: 91,
        qualityRate: 95,
        avgLeadTime: 5.1,
        totalPurchase: 3650000,
        status: "GOOD",
    },

    {
        supplier: "Denim Factory Ltd.",
        orders: 28,
        onTimeRate: 83,
        qualityRate: 89,
        avgLeadTime: 7.4,
        totalPurchase: 2980000,
        status: "WARNING",
    },

    {
        supplier: "Fashion Source Ltd.",
        orders: 21,
        onTimeRate: 88,
        qualityRate: 92,
        avgLeadTime: 6.3,
        totalPurchase: 2140000,
        status: "GOOD",
    },
];


// =====================================================
// MOCK COST DATA
// =====================================================

const purchaseCostData: PurchaseCost[] = [

    {
        category: "T-Shirts",
        purchaseAmount: 2350000,
        shippingCost: 125000,
        discount: 180000,
        finalCost: 2295000,
        orders: 38,
    },

    {
        category: "Pants",
        purchaseAmount: 3180000,
        shippingCost: 165000,
        discount: 220000,
        finalCost: 3125000,
        orders: 31,
    },

    {
        category: "Hoodies",
        purchaseAmount: 2840000,
        shippingCost: 145000,
        discount: 190000,
        finalCost: 2795000,
        orders: 27,
    },

    {
        category: "Jackets",
        purchaseAmount: 3910000,
        shippingCost: 210000,
        discount: 310000,
        finalCost: 3810000,
        orders: 22,
    },
];


// =====================================================
// MOCK REPLENISHMENT DATA
// =====================================================

const replenishmentData: ReplenishmentAnalysis[] = [

    {
        product: "Classic Oversized T-Shirt",
        sku: "TS-OVR-001",
        currentStock: 12,
        reorderPoint: 30,
        avgDailySales: 9.5,
        leadTime: 4,
        stockoutRisk: "HIGH",
        reorderFrequency: 8,
    },

    {
        product: "Slim Fit Denim",
        sku: "DN-SLM-021",
        currentStock: 18,
        reorderPoint: 25,
        avgDailySales: 5.2,
        leadTime: 6,
        stockoutRisk: "MEDIUM",
        reorderFrequency: 5,
    },

    {
        product: "Basic Hoodie",
        sku: "HD-BSC-011",
        currentStock: 42,
        reorderPoint: 35,
        avgDailySales: 3.1,
        leadTime: 5,
        stockoutRisk: "LOW",
        reorderFrequency: 3,
    },

    {
        product: "Cotton Polo Shirt",
        sku: "PO-CTN-005",
        currentStock: 85,
        reorderPoint: 40,
        avgDailySales: 2.8,
        leadTime: 4,
        stockoutRisk: "LOW",
        reorderFrequency: 2,
    },
];


// =====================================================
// CONFIG
// =====================================================

const supplierStatusConfig = {
    EXCELLENT: {
        label: "Excellent",
        color: "success" as const,
    },

    GOOD: {
        label: "Good",
        color: "info" as const,
    },

    WARNING: {
        label: "Needs Review",
        color: "warning" as const,
    },
};

const riskConfig = {
    LOW: {
        label: "Low Risk",
        color: "success" as const,
    },

    MEDIUM: {
        label: "Medium Risk",
        color: "warning" as const,
    },

    HIGH: {
        label: "High Risk",
        color: "error" as const,
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
                height: "100%",
                borderRadius: 3,
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
// INFO ITEM
// =====================================================

function InfoItem({
    label,
    value,
}: {
    label: string;
    value: string;
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
                fontWeight={700}
                variant="body2"
                sx={{ mt: 0.25 }}
            >
                {value}
            </Typography>

        </Box>
    );
}


// =====================================================
// MAIN COMPONENT
// =====================================================

export default function ProcurementAnalytics() {

    const [
        activeTab,
        setActiveTab,
    ] = useState<AnalyticsTab>(
        "SUPPLIER"
    );

    const [
        period,
        setPeriod,
    ] = useState<Period>("30D");

    const {targetRef, scrollToTarget} = useMobileScroll()


    const totalPurchase =
        purchaseCostData.reduce(
            (sum, item) =>
                sum + item.finalCost,
            0
        );

    const avgOnTime =
        supplierData.reduce(
            (sum, item) =>
                sum + item.onTimeRate,
            0
        ) / supplierData.length;

    const avgQuality =
        supplierData.reduce(
            (sum, item) =>
                sum + item.qualityRate,
            0
        ) / supplierData.length;

    const highRiskProducts =
        replenishmentData.filter(
            item =>
                item.stockoutRisk ===
                "HIGH"
        ).length;


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

                        <AssessmentRounded fontSize="large"/>

                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >
                            Procurement Analytics
                        </Typography>

                    </Stack>

                    <Typography
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                    >
                        Analyze supplier performance,
                        purchasing costs, and stock
                        replenishment efficiency.
                    </Typography>

                </Box>


                <TextField
                    select
                    size="small"
                    label="Period"
                    value={period}
                    onChange={event =>
                        setPeriod(
                            event.target.value as Period
                        )
                    }
                    sx={{
                        minWidth: 150,
                    }}
                >

                    <MenuItem value="7D">
                        Last 7 Days
                    </MenuItem>

                    <MenuItem value="30D">
                        Last 30 Days
                    </MenuItem>

                    <MenuItem value="90D">
                        Last 90 Days
                    </MenuItem>

                    <MenuItem value="1Y">
                        Last 1 Year
                    </MenuItem>

                </TextField>

            </Stack>

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
                    title="Purchase Cost"
                    value={`¥${totalPurchase.toLocaleString()}`}
                    subtitle="Selected period"
                    icon={
                        <AttachMoneyRounded />
                    }
                />

                <SummaryCard
                    title="On-Time Delivery"
                    value={`${avgOnTime.toFixed(1)}%`}
                    subtitle="Average supplier performance"
                    icon={
                        <SpeedRounded />
                    }
                />

                <SummaryCard
                    title="Quality Rate"
                    value={`${avgQuality.toFixed(1)}%`}
                    subtitle="Average received quality"
                    icon={
                        <CheckCircleRounded />
                    }
                />

                <SummaryCard
                    title="Stockout Risk"
                    value={`${highRiskProducts}`}
                    subtitle="Products requiring attention"
                    icon={
                        <WarningAmberRounded />
                    }
                />

            </Box>

            <div ref={targetRef}></div>

            <Paper
                variant="outlined"
                sx={{
                    position: "sticky",
                    top: { xs: 70, md: 100 },
                    zIndex: 1100,
                    borderRadius: 3,
                    mb: 3,
                    overflow: "hidden",
                    bgcolor: "background.paper"
                }}
            >

                <Tabs
                    value={activeTab}
                    onChange={(_, value) => {
                        setActiveTab(value)
                        scrollToTarget()
                    }}
                    variant="fullWidth"
                >

                    <Tab
                        value="SUPPLIER"
                        icon={
                            <LocalShippingRounded />
                        }
                        iconPosition="start"
                        label="Supplier Performance"
                    />

                    <Tab
                        value="COST"
                        icon={
                            <AttachMoneyRounded />
                        }
                        iconPosition="start"
                        label="Purchase Cost"
                    />

                    <Tab
                        value="REPLENISHMENT"
                        icon={
                            <Inventory2Rounded />
                        }
                        iconPosition="start"
                        label="Replenishment Analysis"
                    />

                </Tabs>

            </Paper>


            {/* =================================================
                SUPPLIER PERFORMANCE
            ================================================= */}

            {activeTab === "SUPPLIER" && (

                <Stack spacing={2}>

                    <Alert
                        severity="info"
                        icon={
                            <LocalShippingRounded />
                        }
                    >
                        Compare suppliers using delivery
                        reliability, product quality,
                        lead time, and purchasing volume.
                    </Alert>


                    {supplierData.map(
                        supplier => (

                            <Card
                                key={supplier.supplier}
                                variant="outlined"
                                sx={{
                                    borderRadius: 3,
                                }}
                            >

                                <CardContent>

                                    <Stack
                                        direction={{
                                            xs: "column",
                                            md: "row",
                                        }}
                                        justifyContent="space-between"
                                        gap={2}
                                    >

                                        <Box>

                                            <Typography
                                                fontWeight={800}
                                            >
                                                {
                                                    supplier.supplier
                                                }
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {
                                                    supplier.orders
                                                }{" "}
                                                purchase orders
                                            </Typography>

                                        </Box>

                                        <Chip
                                            label={
                                                supplierStatusConfig[
                                                    supplier.status
                                                ].label
                                            }
                                            color={
                                                supplierStatusConfig[
                                                    supplier.status
                                                ].color
                                            }
                                        />

                                    </Stack>


                                    <Divider
                                        sx={{ my: 2 }}
                                    />


                                    <Box
                                        sx={{
                                            display:
                                                "grid",
                                            gridTemplateColumns:
                                            {
                                                xs:
                                                    "1fr 1fr",
                                                md:
                                                    "repeat(5, 1fr)",
                                            },
                                            gap: 2,
                                        }}
                                    >

                                        <InfoItem
                                            label="On-Time Delivery"
                                            value={`${supplier.onTimeRate}%`}
                                        />

                                        <InfoItem
                                            label="Quality Rate"
                                            value={`${supplier.qualityRate}%`}
                                        />

                                        <InfoItem
                                            label="Avg. Lead Time"
                                            value={`${supplier.avgLeadTime} days`}
                                        />

                                        <InfoItem
                                            label="Purchase Volume"
                                            value={`¥${supplier.totalPurchase.toLocaleString()}`}
                                        />

                                        <InfoItem
                                            label="Orders"
                                            value={`${supplier.orders}`}
                                        />

                                    </Box>

                                </CardContent>

                            </Card>

                        )
                    )}

                </Stack>
            )}


            {/* =================================================
                PURCHASE COST
            ================================================= */}

            {activeTab === "COST" && (

                <Stack spacing={2}>

                    <Alert
                        severity="info"
                        icon={
                            <AttachMoneyRounded />
                        }
                    >
                        Review purchasing expenditure,
                        shipping expenses, supplier
                        discounts, and final procurement
                        costs.
                    </Alert>


                    <Card
                        variant="outlined"
                        sx={{
                            borderRadius: 3,
                        }}
                    >

                        <CardContent>

                            <Typography
                                variant="h6"
                                fontWeight={800}
                                mb={2}
                            >
                                Cost by Category
                            </Typography>


                            <Stack spacing={2}>

                                {purchaseCostData.map(
                                    item => (

                                        <Paper
                                            key={
                                                item.category
                                            }
                                            variant="outlined"
                                            sx={{
                                                p: 2,
                                                borderRadius: 2,
                                            }}
                                        >

                                            <Stack
                                                direction={{
                                                    xs:
                                                        "column",
                                                    md:
                                                        "row",
                                                }}
                                                justifyContent="space-between"
                                                gap={2}
                                            >

                                                <Box>

                                                    <Typography
                                                        fontWeight={700}
                                                    >
                                                        {
                                                            item.category
                                                        }
                                                    </Typography>

                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        {
                                                            item.orders
                                                        }{" "}
                                                        orders
                                                    </Typography>

                                                </Box>


                                                <Box
                                                    sx={{
                                                        display:
                                                            "grid",
                                                        gridTemplateColumns:
                                                        {
                                                            xs:
                                                                "1fr 1fr",
                                                            md:
                                                                "repeat(4, auto)",
                                                        },
                                                        gap: {
                                                            xs: 2,
                                                            md: 4,
                                                        },
                                                    }}
                                                >

                                                    <InfoItem
                                                        label="Purchase"
                                                        value={`¥${item.purchaseAmount.toLocaleString()}`}
                                                    />

                                                    <InfoItem
                                                        label="Shipping"
                                                        value={`¥${item.shippingCost.toLocaleString()}`}
                                                    />

                                                    <InfoItem
                                                        label="Discount"
                                                        value={`-¥${item.discount.toLocaleString()}`}
                                                    />

                                                    <InfoItem
                                                        label="Final Cost"
                                                        value={`¥${item.finalCost.toLocaleString()}`}
                                                    />

                                                </Box>

                                            </Stack>

                                        </Paper>

                                    )
                                )}

                            </Stack>

                        </CardContent>

                    </Card>

                </Stack>
            )}


            {/* =================================================
                REPLENISHMENT ANALYSIS
            ================================================= */}

            {activeTab ===
                "REPLENISHMENT" && (

                    <Stack spacing={2}>

                        <Alert
                            severity={
                                highRiskProducts > 0
                                    ? "warning"
                                    : "success"
                            }
                            icon={
                                <Inventory2Rounded />
                            }
                        >
                            {highRiskProducts > 0
                                ? `${highRiskProducts} product(s) currently have a high stockout risk.`
                                : "No products currently have a high stockout risk."
                            }
                        </Alert>


                        {replenishmentData.map(
                            item => (

                                <Card
                                    key={item.sku}
                                    variant="outlined"
                                    sx={{
                                        borderRadius: 3,
                                    }}
                                >

                                    <CardContent>

                                        <Stack
                                            direction={{
                                                xs: "column",
                                                md: "row",
                                            }}
                                            justifyContent="space-between"
                                            gap={2}
                                        >

                                            <Box>

                                                <Typography
                                                    fontWeight={800}
                                                >
                                                    {
                                                        item.product
                                                    }
                                                </Typography>

                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    {
                                                        item.sku
                                                    }
                                                </Typography>

                                            </Box>

                                            <Chip
                                                label={
                                                    riskConfig[
                                                        item.stockoutRisk
                                                    ].label
                                                }
                                                color={
                                                    riskConfig[
                                                        item.stockoutRisk
                                                    ].color
                                                }
                                            />

                                        </Stack>


                                        <Divider
                                            sx={{ my: 2 }}
                                        />


                                        <Box
                                            sx={{
                                                display:
                                                    "grid",
                                                gridTemplateColumns:
                                                {
                                                    xs:
                                                        "1fr 1fr",
                                                    md:
                                                        "repeat(6, 1fr)",
                                                },
                                                gap: 2,
                                            }}
                                        >

                                            <InfoItem
                                                label="Current Stock"
                                                value={`${item.currentStock}`}
                                            />

                                            <InfoItem
                                                label="Reorder Point"
                                                value={`${item.reorderPoint}`}
                                            />

                                            <InfoItem
                                                label="Avg. Daily Sales"
                                                value={`${item.avgDailySales}`}
                                            />

                                            <InfoItem
                                                label="Lead Time"
                                                value={`${item.leadTime} days`}
                                            />

                                            <InfoItem
                                                label="Reorder Frequency"
                                                value={`${item.reorderFrequency} / month`}
                                            />

                                            <InfoItem
                                                label="Stockout Risk"
                                                value={
                                                    riskConfig[
                                                        item.stockoutRisk
                                                    ].label
                                                }
                                            />

                                        </Box>

                                    </CardContent>

                                </Card>

                            )
                        )}

                    </Stack>
                )}

        </Box>
    );
}