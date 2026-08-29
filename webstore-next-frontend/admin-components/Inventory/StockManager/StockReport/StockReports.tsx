"use client";

import React, { useMemo, useRef, useState } from "react";

import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography,
} from "@mui/material";

import {
    AssessmentRounded,
    CalendarMonthRounded,
    Inventory2Rounded,
    LocalPrintshopRounded,
    SearchRounded,
    SwapHorizRounded,
    TuneRounded,
    WarningAmberRounded,
    AccountBalanceRounded,
    DescriptionRounded,
    HistoryRounded,
    ArrowForwardRounded,
} from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "@/i18n/navigation";
import { useMobileScroll } from "@/service/customHooks/useMobileScroll";


// ============================================================
// TYPES
// ============================================================

type ReportType =
    | "BALANCE"
    | "TRANSFER"
    | "ADJUSTMENT"
    | "VALUATION";

type ReportPeriod =
    | "DAILY"
    | "WEEKLY"
    | "MONTHLY"
    | "YEARLY";


interface ReportItem {
    id: string;
    type: ReportType;
    title: string;
    submittedBy: string;
    submittedAt: string;
}


// ============================================================
// MOCK REPORT DATA
// ============================================================

const reports: ReportItem[] = [

    {
        id: "20260824StockBalanceReport001",
        type: "BALANCE",
        title: "Stock Balance Report",
        submittedBy: "Staff - Kenta",
        submittedAt: "2026-08-24 09:15",
    },

    {
        id: "20260824StockTransferReport002",
        type: "TRANSFER",
        title: "Stock Transfer Report",
        submittedBy: "Staff - Yuki",
        submittedAt: "2026-08-24 10:30",
    },

    {
        id: "20260824StockAdjustmentReport003",
        type: "ADJUSTMENT",
        title: "Stock Adjustment Report",
        submittedBy: "Staff - Hiro",
        submittedAt: "2026-08-24 11:45",
    },

    {
        id: "20260824InventoryValuationReport004",
        type: "VALUATION",
        title: "Final Inventory Valuation Report",
        submittedBy: "Staff - Kenta",
        submittedAt: "2026-08-24 17:30",
    },

];


// ============================================================
// REPORT CONFIG
// ============================================================

const reportConfig: Record<
    ReportType,
    {
        title: string;
        description: string;
        icon: React.ReactNode;
    }
> = {

    BALANCE: {
        title: "Stock Balance Report",
        description:
            "Analyze stock inflow, outflow and remaining inventory.",
        icon: <Inventory2Rounded />,
    },

    TRANSFER: {
        title: "Stock Transfer Report",
        description:
            "Review inventory transfers between warehouses.",
        icon: <SwapHorizRounded />,
    },

    ADJUSTMENT: {
        title: "Stock Adjustment Report",
        description:
            "Review damaged, lost and manually adjusted stock.",
        icon: <WarningAmberRounded />,
    },

    VALUATION: {
        title: "Final Inventory Valuation Report",
        description:
            "Analyze unit cost and total inventory value.",
        icon: <AccountBalanceRounded />,
    },

};


// ============================================================
// MAIN COMPONENT
// ============================================================

export default function StockReports() {

    const [period, setPeriod] = useState<ReportPeriod>("DAILY");

    const [search, setSearch] = useState("");

    const [selectedType, setSelectedType] = useState<ReportType>("BALANCE");

    const filteredReports = useMemo(() => {

        if (!search.trim()) {
            return reports;
        }

        return reports.filter(report =>
            report.id
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );

    }, [search]);


    // --------------------------------------------------------
    // Current Report Config
    // --------------------------------------------------------

    const currentReport =
        reportConfig[selectedType];


    // --------------------------------------------------------
    // Print
    // --------------------------------------------------------

    const handlePrint = () => {
        window.print();
    };

    const currentPath = usePathname()

    const {targetRef, scrollToTarget } = useMobileScroll();

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
                {/* HEADER */}

                <Box>
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                    >
                        <AssessmentRounded />

                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >
                            Stock Reports
                        </Typography>
                    </Stack>

                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                    >
                        Review staff reports and
                        analyze daily inventory activity.
                    </Typography>
                </Box>


                {/* HISTORY LOG */}

                <Button
                    component={Link}
                    href={`${currentPath}/logs`}
                    variant="outlined"
                    startIcon={<HistoryRounded />}
                    endIcon={<ArrowForwardRounded />}
                    sx={{
                        borderRadius: 2,
                        px: 2,
                        py: 1
                    }}
                >
                    History Log
                </Button>

            </Stack>


            {/* =================================================
                MAIN WORKSPACE
            ================================================= */}

            <Grid
                container
                spacing={2}
            >

                {/* =================================================
                    LEFT : REPORT TYPES
                ================================================= */}

                <Grid
                    size={{
                        xs: 12,
                        md: 3,
                    }}
                >

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
                                p: 2,
                            }}
                        >

                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1}
                                mb={2}
                            >

                                <TuneRounded
                                    fontSize="small"
                                />

                                <Typography
                                    fontWeight={700}
                                >
                                    Report Types
                                </Typography>

                            </Stack>


                            <Stack spacing={1}>

                                {(
                                    Object.keys(
                                        reportConfig
                                    ) as ReportType[]
                                ).map(type => {

                                    const config =
                                        reportConfig[
                                        type
                                        ];

                                    const selected =
                                        selectedType ===
                                        type;


                                    return (

                                        <Paper
                                            key={type}
                                            elevation={0}
                                            onClick={() => {
                                                setSelectedType(type);
                                                scrollToTarget();
                                            }}
                                            sx={{
                                                p: 1.5,
                                                cursor:
                                                    "pointer",

                                                borderRadius: 2,

                                                bgcolor:
                                                    selected
                                                        ? "black"
                                                        : "transparent",

                                                color:
                                                    selected
                                                        ? "white"
                                                        : "inherit",

                                                border:
                                                    "1px solid",

                                                borderColor:
                                                    selected
                                                        ? "black"
                                                        : "divider",

                                                transition:
                                                    "all .2s",

                                                "&:hover":
                                                {
                                                    bgcolor:
                                                        selected
                                                            ? "black"
                                                            : "action.hover",
                                                },

                                                "& .MuiSvgIcon-root":
                                                {
                                                    color:
                                                        "inherit",
                                                },
                                            }}
                                        >

                                            <Stack
                                                direction="row"
                                                spacing={1.5}
                                                alignItems="center"
                                            >

                                                <Box
                                                    sx={{
                                                        width: 38,
                                                        height: 38,
                                                        borderRadius: 2,
                                                        display:
                                                            "flex",
                                                        alignItems:
                                                            "center",
                                                        justifyContent:
                                                            "center",
                                                        bgcolor:
                                                            selected
                                                                ? "rgba(255,255,255,.12)"
                                                                : "action.hover",
                                                    }}
                                                >

                                                    {
                                                        config.icon
                                                    }

                                                </Box>


                                                <Box>

                                                    <Typography
                                                        variant="body2"
                                                        fontWeight={
                                                            700
                                                        }
                                                    >
                                                        {
                                                            config.title
                                                        }
                                                    </Typography>

                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            color:
                                                                selected
                                                                    ? "rgba(255,255,255,.7)"
                                                                    : "text.secondary",
                                                            display:
                                                                "block",
                                                            mt: 0.3,
                                                        }}
                                                    >
                                                        Report
                                                        details
                                                    </Typography>

                                                </Box>

                                            </Stack>

                                        </Paper>

                                    );

                                })}

                            </Stack>

                        </CardContent>

                    </Card>

                </Grid>


                {/* =================================================
                    RIGHT : REPORT REQUEST
                ================================================= */}

                <Grid ref={targetRef}
                    size={{
                        xs: 12,
                        md: 9,
                    }}
                >
                    <Card
                        elevation={0}
                        sx={{
                            border: "1px solid",
                            borderColor:
                                "divider",
                            borderRadius: 3,
                            minHeight: 600,
                        }}
                    >
                        <CardContent >

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
                                    spacing={1.5}
                                    alignItems="center"
                                >

                                    <Box
                                        sx={{
                                            width: 48,
                                            height: 48,
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

                                        {
                                            currentReport.icon
                                        }

                                    </Box>


                                    <Box>

                                        <Typography
                                            variant="h6"
                                            fontWeight={700}
                                        >
                                            {
                                                currentReport.title
                                            }
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {
                                                currentReport.description
                                            }
                                        </Typography>

                                    </Box>

                                </Stack>


                                <Chip
                                    icon={
                                        <CalendarMonthRounded />
                                    }
                                    label={
                                        period
                                    }
                                    variant="outlined"
                                />

                            </Stack>

                        </CardContent>


                        <Divider />


                        {/* =================================================
                            REQUEST FORM
                        ================================================= */}

                        <CardContent>

                            <Typography
                                variant="subtitle1"
                                fontWeight={700}
                                mb={2}
                            >
                                Report Parameters
                            </Typography>


                            {/* =============================================
                                COMMON FILTERS
                            ============================================= */}

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

                                    <TextField
                                        fullWidth
                                        type="date"
                                        label="Report Date"
                                        defaultValue="2026-08-24"
                                        slotProps={{
                                            inputLabel:
                                            {
                                                shrink:
                                                    true,
                                            },
                                        }}
                                    />

                                </Grid>


                                <Grid
                                    size={{
                                        xs: 12,
                                        sm: 6,
                                    }}
                                >

                                    <FormControl
                                        fullWidth
                                    >

                                        <InputLabel>
                                            Warehouse
                                        </InputLabel>

                                        <Select
                                            label="Warehouse"
                                            defaultValue="ALL"
                                        >

                                            <MenuItem value="ALL">
                                                All Warehouses
                                            </MenuItem>

                                            <MenuItem value="MAIN">
                                                Main Warehouse
                                            </MenuItem>

                                            <MenuItem value="NAMBA">
                                                Namba Branch
                                            </MenuItem>

                                            <MenuItem value="UMEDA">
                                                Umeda Branch
                                            </MenuItem>

                                        </Select>

                                    </FormControl>

                                </Grid>


                                {/* =========================================
                                    BALANCE REPORT
                                ========================================= */}

                                {selectedType ===
                                    "BALANCE" && (

                                        <>

                                            <Grid
                                                size={{
                                                    xs: 12,
                                                    sm: 6,
                                                }}
                                            >

                                                <FormControl
                                                    fullWidth
                                                >

                                                    <InputLabel>
                                                        Stock Flow
                                                    </InputLabel>

                                                    <Select
                                                        label="Stock Flow"
                                                        defaultValue="ALL"
                                                    >

                                                        <MenuItem value="ALL">
                                                            All
                                                        </MenuItem>

                                                        <MenuItem value="IN">
                                                            Stock In
                                                        </MenuItem>

                                                        <MenuItem value="OUT">
                                                            Stock Out
                                                        </MenuItem>

                                                        <MenuItem value="ADJUSTMENT">
                                                            Adjustment
                                                        </MenuItem>

                                                    </Select>

                                                </FormControl>

                                            </Grid>


                                            <Grid
                                                size={{
                                                    xs: 12,
                                                    sm: 6,
                                                }}
                                            >

                                                <TextField
                                                    fullWidth
                                                    label="Product / SKU"
                                                    placeholder="Search product..."
                                                />

                                            </Grid>

                                        </>

                                    )}


                                {/* =========================================
                                    TRANSFER REPORT
                                ========================================= */}

                                {selectedType ===
                                    "TRANSFER" && (

                                        <>

                                            <Grid
                                                size={{
                                                    xs: 12,
                                                    sm: 6,
                                                }}
                                            >

                                                <FormControl
                                                    fullWidth
                                                >

                                                    <InputLabel>
                                                        Transfer Status
                                                    </InputLabel>

                                                    <Select
                                                        label="Transfer Status"
                                                        defaultValue="ALL"
                                                    >

                                                        <MenuItem value="ALL">
                                                            All
                                                        </MenuItem>

                                                        <MenuItem value="PENDING">
                                                            Pending
                                                        </MenuItem>

                                                        <MenuItem value="COMPLETED">
                                                            Completed
                                                        </MenuItem>

                                                        <MenuItem value="CANCELLED">
                                                            Cancelled
                                                        </MenuItem>

                                                    </Select>

                                                </FormControl>

                                            </Grid>


                                            <Grid
                                                size={{
                                                    xs: 12,
                                                    sm: 6,
                                                }}
                                            >

                                                <TextField
                                                    fullWidth
                                                    label="Staff"
                                                    placeholder="Search staff..."
                                                />

                                            </Grid>


                                            <Grid
                                                size={{
                                                    xs: 12,
                                                }}
                                            >

                                                <TextField
                                                    fullWidth
                                                    label="Transfer ID"
                                                    placeholder="TRF-20260824..."
                                                />

                                            </Grid>

                                        </>

                                    )}


                                {/* =========================================
                                    ADJUSTMENT REPORT
                                ========================================= */}

                                {selectedType ===
                                    "ADJUSTMENT" && (

                                        <>

                                            <Grid
                                                size={{
                                                    xs: 12,
                                                    sm: 6,
                                                }}
                                            >

                                                <FormControl
                                                    fullWidth
                                                >

                                                    <InputLabel>
                                                        Adjustment Reason
                                                    </InputLabel>

                                                    <Select
                                                        label="Adjustment Reason"
                                                        defaultValue="ALL"
                                                    >

                                                        <MenuItem value="ALL">
                                                            All Reasons
                                                        </MenuItem>

                                                        <MenuItem value="DAMAGED">
                                                            Damaged
                                                        </MenuItem>

                                                        <MenuItem value="LOST">
                                                            Lost
                                                        </MenuItem>

                                                        <MenuItem value="EXPIRED">
                                                            Expired
                                                        </MenuItem>

                                                        <MenuItem value="COUNT_ERROR">
                                                            Count Error
                                                        </MenuItem>

                                                        <MenuItem value="OTHER">
                                                            Other
                                                        </MenuItem>

                                                    </Select>

                                                </FormControl>

                                            </Grid>


                                            <Grid
                                                size={{
                                                    xs: 12,
                                                    sm: 6,
                                                }}
                                            >

                                                <TextField
                                                    fullWidth
                                                    label="Staff"
                                                    placeholder="Search staff..."
                                                />

                                            </Grid>


                                            <Grid
                                                size={{
                                                    xs: 12,
                                                }}
                                            >

                                                <TextField
                                                    fullWidth
                                                    multiline
                                                    minRows={3}
                                                    label="Adjustment Details"
                                                    placeholder="Enter reason or notes..."
                                                />

                                            </Grid>

                                        </>

                                    )}


                                {/* =========================================
                                    VALUATION REPORT
                                ========================================= */}

                                {selectedType ===
                                    "VALUATION" && (

                                        <>

                                            <Grid
                                                size={{
                                                    xs: 12,
                                                    sm: 6,
                                                }}
                                            >

                                                <FormControl
                                                    fullWidth
                                                >

                                                    <InputLabel>
                                                        Valuation Method
                                                    </InputLabel>

                                                    <Select
                                                        label="Valuation Method"
                                                        defaultValue="FIFO"
                                                    >

                                                        <MenuItem value="FIFO">
                                                            FIFO
                                                        </MenuItem>

                                                        <MenuItem value="AVERAGE">
                                                            Weighted Average
                                                        </MenuItem>

                                                    </Select>

                                                </FormControl>

                                            </Grid>


                                            <Grid
                                                size={{
                                                    xs: 12,
                                                    sm: 6,
                                                }}
                                            >

                                                <FormControl
                                                    fullWidth
                                                >

                                                    <InputLabel>
                                                        Currency
                                                    </InputLabel>

                                                    <Select
                                                        label="Currency"
                                                        defaultValue="JPY"
                                                    >

                                                        <MenuItem value="JPY">
                                                            JPY
                                                        </MenuItem>

                                                        <MenuItem value="USD">
                                                            USD
                                                        </MenuItem>

                                                    </Select>

                                                </FormControl>

                                            </Grid>


                                            <Grid
                                                size={{
                                                    xs: 12,
                                                }}
                                            >

                                                <TextField
                                                    fullWidth
                                                    label="Minimum Stock Value"
                                                    type="number"
                                                    placeholder="0"
                                                />

                                            </Grid>

                                        </>

                                    )}

                            </Grid>

                        </CardContent>


                        <Divider />


                        {/* =================================================
                            REPORT ACTIONS
                        ================================================= */}

                        <CardContent>

                            <Stack
                                direction={{
                                    xs: "column",
                                    sm: "row",
                                }}
                                justifyContent="space-between"
                                alignItems={{
                                    xs: "stretch",
                                    sm: "center",
                                }}
                                gap={2}
                            >

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Report will be generated
                                    using the selected
                                    parameters.
                                </Typography>


                                <Stack
                                    direction="row"
                                    spacing={1}
                                >

                                    <Button
                                        variant="outlined"
                                        startIcon={
                                            <LocalPrintshopRounded />
                                        }
                                        onClick={
                                            handlePrint
                                        }
                                    >
                                        Print
                                    </Button>


                                    <Button
                                        variant="contained"
                                        startIcon={
                                            <AssessmentRounded />
                                        }
                                    >
                                        Generate Report
                                    </Button>

                                </Stack>

                            </Stack>

                        </CardContent>

                    </Card>

                </Grid>

            </Grid>

        </Box>
    );
}