"use client";

import React, {
    useMemo,
    useState,
} from "react";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    IconButton,
    InputAdornment,
    MenuItem,
    Paper,
    Stack,
    Tab,
    Tabs,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";

import {
    AddRounded,
    AssignmentRounded,
    CheckCircleRounded,
    HistoryRounded,
    Inventory2Rounded,
    LocalShippingRounded,
    SearchRounded,
    WarningAmberRounded,
} from "@mui/icons-material";
import { useMobileScroll } from "@/service/customHooks/useMobileScroll";


// =====================================================
// TYPES
// =====================================================

type ReplenishmentTab =
    | "REQUESTS"
    | "PLANNING"
    | "HISTORY";

type RequestStatus =
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "ORDERED";

type Priority =
    | "LOW"
    | "MEDIUM"
    | "HIGH"
    | "URGENT";

type PlanningStatus =
    | "PLANNED"
    | "ORDERED"
    | "IN_TRANSIT"
    | "RECEIVED";

type HistoryStatus =
    | "COMPLETED"
    | "PARTIAL"
    | "CANCELLED";


// =====================================================
// DATA TYPES
// =====================================================

interface RefillRequest {
    id: string;
    product: string;
    sku: string;
    warehouse: string;
    currentStock: number;
    reorderPoint: number;
    requestedQty: number;
    requestedBy: string;
    requestedAt: string;
    priority: Priority;
    status: RequestStatus;
}

interface ReorderPlan {
    id: string;
    product: string;
    sku: string;
    warehouse: string;
    supplier: string;
    currentStock: number;
    targetStock: number;
    orderQty: number;
    estimatedCost: number;
    expectedDate: string;
    createdBy: string;
    status: PlanningStatus;
}

interface ReplenishmentHistory {
    id: string;
    product: string;
    sku: string;
    warehouse: string;
    supplier: string;
    quantity: number;
    receivedQty: number;
    completedAt: string;
    handledBy: string;
    status: HistoryStatus;
}


// =====================================================
// MOCK DATA
// =====================================================

const refillRequests: RefillRequest[] = [

    {
        id: "REF-20260826-001",
        product: "Classic Oversized T-Shirt",
        sku: "TS-OVR-001",
        warehouse: "Osaka Warehouse",
        currentStock: 12,
        reorderPoint: 30,
        requestedQty: 80,
        requestedBy: "Tanaka",
        requestedAt: "2026-08-26 09:20",
        priority: "URGENT",
        status: "PENDING",
    },

    {
        id: "REF-20260826-002",
        product: "Slim Fit Denim",
        sku: "DN-SLM-021",
        warehouse: "Fukuoka Warehouse",
        currentStock: 18,
        reorderPoint: 25,
        requestedQty: 50,
        requestedBy: "Kobayashi",
        requestedAt: "2026-08-26 10:05",
        priority: "HIGH",
        status: "APPROVED",
    },

    {
        id: "REF-20260825-014",
        product: "Basic Hoodie",
        sku: "HD-BSC-011",
        warehouse: "Tokyo Warehouse",
        currentStock: 28,
        reorderPoint: 35,
        requestedQty: 40,
        requestedBy: "Sato",
        requestedAt: "2026-08-25 16:30",
        priority: "MEDIUM",
        status: "ORDERED",
    },
];


const reorderPlans: ReorderPlan[] = [

    {
        id: "ROP-20260826-001",
        product: "Classic Oversized T-Shirt",
        sku: "TS-OVR-001",
        warehouse: "Osaka Warehouse",
        supplier: "ABC Apparel Co.",
        currentStock: 12,
        targetStock: 120,
        orderQty: 108,
        estimatedCost: 324000,
        expectedDate: "2026-09-03",
        createdBy: "Manager",
        status: "PLANNED",
    },

    {
        id: "ROP-20260825-008",
        product: "Slim Fit Denim",
        sku: "DN-SLM-021",
        warehouse: "Fukuoka Warehouse",
        supplier: "Denim Factory Ltd.",
        currentStock: 18,
        targetStock: 80,
        orderQty: 62,
        estimatedCost: 403000,
        expectedDate: "2026-09-05",
        createdBy: "Manager",
        status: "ORDERED",
    },

    {
        id: "ROP-20260824-004",
        product: "Basic Hoodie",
        sku: "HD-BSC-011",
        warehouse: "Tokyo Warehouse",
        supplier: "Urban Wear Inc.",
        currentStock: 28,
        targetStock: 90,
        orderQty: 62,
        estimatedCost: 310000,
        expectedDate: "2026-09-01",
        createdBy: "Manager",
        status: "IN_TRANSIT",
    },
];


const replenishmentHistory: ReplenishmentHistory[] = [

    {
        id: "REP-20260825-001",
        product: "Cotton Polo Shirt",
        sku: "PO-CTN-005",
        warehouse: "Osaka Warehouse",
        supplier: "ABC Apparel Co.",
        quantity: 100,
        receivedQty: 100,
        completedAt: "2026-08-25 14:20",
        handledBy: "Suzuki",
        status: "COMPLETED",
    },

    {
        id: "REP-20260823-012",
        product: "Cargo Pants",
        sku: "CP-CGO-031",
        warehouse: "Tokyo Warehouse",
        supplier: "Urban Wear Inc.",
        quantity: 80,
        receivedQty: 72,
        completedAt: "2026-08-23 11:40",
        handledBy: "Yamada",
        status: "PARTIAL",
    },

    {
        id: "REP-20260820-007",
        product: "Summer Jacket",
        sku: "JK-SMR-019",
        warehouse: "Fukuoka Warehouse",
        supplier: "Fashion Source Ltd.",
        quantity: 60,
        receivedQty: 0,
        completedAt: "2026-08-20 09:10",
        handledBy: "Ito",
        status: "CANCELLED",
    },
];


// =====================================================
// CONFIG
// =====================================================

const priorityConfig: Record<
    Priority,
    {
        label: string;
        color:
        | "default"
        | "success"
        | "warning"
        | "error";
    }
> = {

    LOW: {
        label: "Low",
        color: "default",
    },

    MEDIUM: {
        label: "Medium",
        color: "warning",
    },

    HIGH: {
        label: "High",
        color: "error",
    },

    URGENT: {
        label: "Urgent",
        color: "error",
    },
};


const requestStatusConfig: Record<
    RequestStatus,
    {
        label: string;
        color:
        | "default"
        | "success"
        | "warning"
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


const planningStatusConfig: Record<
    PlanningStatus,
    {
        label: string;
        color:
        | "default"
        | "success"
        | "warning"
        | "info";
    }
> = {

    PLANNED: {
        label: "Planned",
        color: "warning",
    },

    ORDERED: {
        label: "Ordered",
        color: "info",
    },

    IN_TRANSIT: {
        label: "In Transit",
        color: "info",
    },

    RECEIVED: {
        label: "Received",
        color: "success",
    },
};


const historyStatusConfig: Record<
    HistoryStatus,
    {
        label: string;
        color:
        | "default"
        | "success"
        | "warning"
        | "error";
    }
> = {

    COMPLETED: {
        label: "Completed",
        color: "success",
    },

    PARTIAL: {
        label: "Partial",
        color: "warning",
    },

    CANCELLED: {
        label: "Cancelled",
        color: "error",
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
    selected,
    onClick,
}: {
    title: string;
    value: string | number;
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
                    "all .2s ease",

                "&:hover": onClick
                    ? {
                        borderColor:
                            "primary.main",
                        transform:
                            "translateY(-2px)",
                    }
                    : undefined,
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

                            bgcolor: selected
                                ? "primary.main"
                                : "action.hover",

                            color: selected
                                ? "primary.contrastText"
                                : "text.primary",
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
// MAIN PAGE
// =====================================================

export default function Replenishment() {

    const [
        activeTab,
        setActiveTab,
    ] = useState<ReplenishmentTab>(
        "REQUESTS"
    );

    const [
        search,
        setSearch,
    ] = useState("");

    const [
        statusFilter,
        setStatusFilter,
    ] = useState("ALL");

    const { targetRef, scrollToTarget } = useMobileScroll()


    const changeTab = (
        tab: ReplenishmentTab
    ) => {

        setActiveTab(tab);

        setSearch("");

        setStatusFilter("ALL");
    };


    const filteredRequests =
        useMemo(() => {

            return refillRequests.filter(
                item => {

                    const searchMatch =
                        !search ||
                        item.id
                            .toLowerCase()
                            .includes(
                                search.toLowerCase()
                            ) ||
                        item.product
                            .toLowerCase()
                            .includes(
                                search.toLowerCase()
                            ) ||
                        item.sku
                            .toLowerCase()
                            .includes(
                                search.toLowerCase()
                            );

                    const statusMatch =
                        statusFilter ===
                        "ALL" ||
                        item.status ===
                        statusFilter;

                    return (
                        searchMatch &&
                        statusMatch
                    );
                }
            );

        }, [
            search,
            statusFilter,
        ]);


    const filteredPlans =
        useMemo(() => {

            return reorderPlans.filter(
                item => {

                    const searchMatch =
                        !search ||
                        item.id
                            .toLowerCase()
                            .includes(
                                search.toLowerCase()
                            ) ||
                        item.product
                            .toLowerCase()
                            .includes(
                                search.toLowerCase()
                            ) ||
                        item.sku
                            .toLowerCase()
                            .includes(
                                search.toLowerCase()
                            );

                    const statusMatch =
                        statusFilter ===
                        "ALL" ||
                        item.status ===
                        statusFilter;

                    return (
                        searchMatch &&
                        statusMatch
                    );
                }
            );

        }, [
            search,
            statusFilter,
        ]);


    const filteredHistory =
        useMemo(() => {

            return replenishmentHistory.filter(
                item => {

                    const searchMatch =
                        !search ||
                        item.id
                            .toLowerCase()
                            .includes(
                                search.toLowerCase()
                            ) ||
                        item.product
                            .toLowerCase()
                            .includes(
                                search.toLowerCase()
                            ) ||
                        item.sku
                            .toLowerCase()
                            .includes(
                                search.toLowerCase()
                            );

                    const statusMatch =
                        statusFilter ===
                        "ALL" ||
                        item.status ===
                        statusFilter;

                    return (
                        searchMatch &&
                        statusMatch
                    );
                }
            );

        }, [
            search,
            statusFilter,
        ]);



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
                        alignItems="center"
                        spacing={1}
                    >

                        <Inventory2Rounded fontSize="large" />

                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >
                            Replenishment
                        </Typography>

                    </Stack>

                    <Typography
                        color="text.secondary"
                        sx={{
                            mt: 0.5,
                        }}
                    >
                        Monitor refill needs,
                        plan stock replenishment,
                        and review replenishment
                        history.
                    </Typography>

                </Box>


                <Button
                    variant="contained"
                    startIcon={
                        <AddRounded />
                    }
                    onClick={() => {
                        // Open create replenishment
                        // request dialog
                    }}
                >
                    New Refill Request
                </Button>

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
                    title="Pending Requests"
                    value={
                        refillRequests.filter(
                            item =>
                                item.status ===
                                "PENDING"
                        ).length
                    }
                    subtitle="Awaiting manager review"
                    icon={
                        <AssignmentRounded />
                    }
                    selected={
                        activeTab ===
                        "REQUESTS"
                    }
                    onClick={() =>
                        changeTab(
                            "REQUESTS"
                        )
                    }
                />

                <SummaryCard
                    title="Low Stock"
                    value={
                        refillRequests.filter(
                            item =>
                                item.currentStock <
                                item.reorderPoint
                        ).length
                    }
                    subtitle="Need replenishment"
                    icon={
                        <WarningAmberRounded />
                    }
                    selected={
                        activeTab ===
                        "PLANNING"
                    }
                    onClick={() =>
                        changeTab(
                            "PLANNING"
                        )
                    }
                />

                <SummaryCard
                    title="Active Plans"
                    value={
                        reorderPlans.filter(
                            item =>
                                item.status !==
                                "RECEIVED"
                        ).length
                    }
                    subtitle="Currently replenishing"
                    icon={
                        <LocalShippingRounded />
                    }
                    selected={
                        activeTab ===
                        "PLANNING"
                    }
                    onClick={() =>
                        changeTab(
                            "PLANNING"
                        )
                    }
                />

                <SummaryCard
                    title="Completed"
                    value={
                        replenishmentHistory.filter(
                            item =>
                                item.status ===
                                "COMPLETED"
                        ).length
                    }
                    subtitle="Recent replenishments"
                    icon={
                        <CheckCircleRounded />
                    }
                    selected={
                        activeTab ===
                        "HISTORY"
                    }
                    onClick={() =>
                        changeTab(
                            "HISTORY"
                        )
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
                    onChange={(
                        _,
                        value
                    ) => {
                        changeTab(value)
                        scrollToTarget()
                    }}
                    variant="fullWidth"
                >

                    <Tab
                        value="REQUESTS"
                        icon={
                            <AssignmentRounded />
                        }
                        iconPosition="start"
                        label="Refill Requests"
                    />

                    <Tab
                        value="PLANNING"
                        icon={
                            <Inventory2Rounded />
                        }
                        iconPosition="start"
                        label="Reorder Planning"
                    />

                    <Tab
                        value="HISTORY"
                        icon={
                            <HistoryRounded />
                        }
                        iconPosition="start"
                        label="Replenishment History"
                    />

                </Tabs>

            </Paper>


            {/* ========================================
                SEARCH / FILTER
            ======================================== */}

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
                    placeholder="Search ID, product or SKU..."
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
                    onChange={event =>
                        setStatusFilter(
                            event.target.value
                        )
                    }
                    sx={{
                        minWidth: {
                            sm: 200,
                        },
                    }}
                >

                    <MenuItem value="ALL">
                        All Status
                    </MenuItem>

                    {activeTab ===
                        "REQUESTS" && [
                            {
                                value: "PENDING",
                                label: "Pending"
                            },
                            {
                                value: "APPROVED",
                                label: "Approved"
                            },
                            {
                                value: "ORDERED",
                                label: "Ordered"
                            },
                            {
                                value: "REJECTED",
                                label: "Rejected"
                            },
                        ].map(status => 
                            <MenuItem value={status.value}>
                                {status.label}
                            </MenuItem>
                        )}

                    {activeTab ===
                        "PLANNING" && [
                            {
                                value: "PLANNED",
                                label: "Planned"
                            },
                            {
                                value: "ORDERED",
                                label: "Ordered"
                            },
                            {
                                value: "IN_TRANSIT",
                                label: "In Transit"
                            },
                            {
                                value: "RECEIVED",
                                label: "Received"
                            },
                        ].map(status => 
                            <MenuItem value={status.value}>
                                {status.label}
                            </MenuItem>
                        )}

                    {activeTab ===
                        "HISTORY" && [
                            {
                                value: "COMPLETED",
                                label: "Completed"
                            },
                            {
                                value: "PARTIAL",
                                label: "Partial"
                            },
                            {
                                value: "CANCELLED",
                                label: "Cancelled"
                            }
                        ].map(status => 
                            <MenuItem value={status.value}>
                                {status.label}
                            </MenuItem>
                        )}

                </TextField>

            </Stack>


            {/* ========================================
                REFILL REQUESTS
            ======================================== */}

            {activeTab ===
                "REQUESTS" && (

                    <Stack spacing={2}>

                        {filteredRequests.map(
                            request => (

                                <Card
                                    key={request.id}
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

                                                <Stack
                                                    direction="row"
                                                    spacing={1}
                                                    alignItems="center"
                                                >

                                                    <Typography
                                                        fontWeight={700}
                                                    >
                                                        {
                                                            request.product
                                                        }
                                                    </Typography>

                                                    <Chip
                                                        size="small"
                                                        label={
                                                            priorityConfig[
                                                                request.priority
                                                            ].label
                                                        }
                                                        color={
                                                            priorityConfig[
                                                                request.priority
                                                            ].color
                                                        }
                                                    />

                                                </Stack>

                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    {
                                                        request.sku
                                                    }
                                                    {" • "}
                                                    {
                                                        request.warehouse
                                                    }
                                                </Typography>

                                            </Box>

                                            <Chip
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

                                        </Stack>


                                        <Divider
                                            sx={{
                                                my: 2,
                                            }}
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
                                                        "repeat(4, 1fr)",
                                                },
                                                gap: 2,
                                            }}
                                        >

                                            <Info
                                                label="Current Stock"
                                                value={`${request.currentStock} units`}
                                            />

                                            <Info
                                                label="Reorder Point"
                                                value={`${request.reorderPoint} units`}
                                            />

                                            <Info
                                                label="Requested"
                                                value={`${request.requestedQty} units`}
                                            />

                                            <Info
                                                label="Requested By"
                                                value={request.requestedBy}
                                            />

                                        </Box>


                                        <Stack
                                            direction="row"
                                            justifyContent="flex-end"
                                            spacing={1}
                                            mt={2}
                                        >

                                            <Button
                                                size="small"
                                                variant="outlined"
                                            >
                                                View
                                            </Button>

                                            {request.status ===
                                                "PENDING" && (
                                                    <Button
                                                        size="small"
                                                        variant="contained"
                                                    >
                                                        Review
                                                    </Button>
                                                )}

                                        </Stack>

                                    </CardContent>

                                </Card>

                            )
                        )}

                    </Stack>

                )}


            {/* ========================================
                REORDER PLANNING
            ======================================== */}

            {activeTab ===
                "PLANNING" && (

                    <Stack spacing={2}>

                        <Alert
                            severity="info"
                            icon={
                                <Inventory2Rounded />
                            }
                        >
                            Reorder Planning is where
                            managers decide the target
                            stock level, order quantity,
                            supplier, and expected arrival
                            date.
                        </Alert>


                        {filteredPlans.map(
                            plan => (

                                <Card
                                    key={plan.id}
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
                                                    fontWeight={700}
                                                >
                                                    {
                                                        plan.product
                                                    }
                                                </Typography>

                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    {
                                                        plan.sku
                                                    }
                                                    {" • "}
                                                    {
                                                        plan.warehouse
                                                    }
                                                </Typography>

                                            </Box>

                                            <Chip
                                                label={
                                                    planningStatusConfig[
                                                        plan.status
                                                    ].label
                                                }
                                                color={
                                                    planningStatusConfig[
                                                        plan.status
                                                    ].color
                                                }
                                            />

                                        </Stack>


                                        <Divider
                                            sx={{
                                                my: 2,
                                            }}
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

                                            <Info
                                                label="Current"
                                                value={`${plan.currentStock}`}
                                            />

                                            <Info
                                                label="Target"
                                                value={`${plan.targetStock}`}
                                            />

                                            <Info
                                                label="Order Qty"
                                                value={`${plan.orderQty}`}
                                            />

                                            <Info
                                                label="Supplier"
                                                value={plan.supplier}
                                            />

                                            <Info
                                                label="Est. Cost"
                                                value={`¥${plan.estimatedCost.toLocaleString()}`}
                                            />

                                        </Box>


                                        <Stack
                                            direction="row"
                                            justifyContent="flex-end"
                                            spacing={1}
                                            mt={2}
                                        >

                                            <Button
                                                size="small"
                                                variant="outlined"
                                            >
                                                View Plan
                                            </Button>

                                            {plan.status ===
                                                "PLANNED" && (
                                                    <Button
                                                        size="small"
                                                        variant="contained"
                                                    >
                                                        Create PO
                                                    </Button>
                                                )}

                                        </Stack>

                                    </CardContent>

                                </Card>

                            )
                        )}

                    </Stack>

                )}


            {/* ========================================
                HISTORY
            ======================================== */}

            {activeTab ===
                "HISTORY" && (

                    <Stack spacing={2}>

                        {filteredHistory.map(
                            item => (

                                <Card
                                    key={item.id}
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
                                                    {
                                                        item.sku
                                                    }
                                                    {" • "}
                                                    {
                                                        item.warehouse
                                                    }
                                                </Typography>

                                            </Box>

                                            <Chip
                                                label={
                                                    historyStatusConfig[
                                                        item.status
                                                    ].label
                                                }
                                                color={
                                                    historyStatusConfig[
                                                        item.status
                                                    ].color
                                                }
                                            />

                                        </Stack>


                                        <Divider
                                            sx={{
                                                my: 2,
                                            }}
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

                                            <Info
                                                label="Supplier"
                                                value={item.supplier}
                                            />

                                            <Info
                                                label="Ordered"
                                                value={`${item.quantity}`}
                                            />

                                            <Info
                                                label="Received"
                                                value={`${item.receivedQty}`}
                                            />

                                            <Info
                                                label="Handled By"
                                                value={item.handledBy}
                                            />

                                            <Info
                                                label="Completed"
                                                value={item.completedAt}
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


// =====================================================
// INFO COMPONENT
// =====================================================

function Info({
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
                variant="body2"
                fontWeight={600}
                sx={{
                    mt: 0.25,
                }}
            >
                {value}
            </Typography>

        </Box>
    );
}