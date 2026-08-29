"use client";

import React, { useMemo, useState } from "react";

import {
    Box,
    ButtonBase,
    Card,
    CardContent,
    Chip,
    Divider,
    InputAdornment,
    Paper,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography,
} from "@mui/material";

import {
    AssessmentRounded,
    CalendarMonthRounded,
    DescriptionRounded,
    SearchRounded,
} from "@mui/icons-material";
import ReportDetailsPopUp from "./ReportDetailsPopUp";


// ============================================================
// MOCK DATA
// ============================================================

const reports: ReportItem[] = [

    {
        id: "20260824StockBalanceReport001",
        type: "BALANCE",
        title: "Stock Balance Report",
        submittedBy: "Staff - Kenta",
        submittedAt: "2026-08-24 09:15",
        period: "DAILY",
    },

    {
        id: "20260824StockTransferReport002",
        type: "TRANSFER",
        title: "Stock Transfer Report",
        submittedBy: "Staff - Yuki",
        submittedAt: "2026-08-24 10:30",
        period: "DAILY",
    },

    {
        id: "20260824StockAdjustmentReport003",
        type: "ADJUSTMENT",
        title: "Stock Adjustment Report",
        submittedBy: "Staff - Hiro",
        submittedAt: "2026-08-24 11:45",
        period: "DAILY",
    },

    {
        id: "20260824InventoryValuationReport004",
        type: "VALUATION",
        title: "Final Inventory Valuation Report",
        submittedBy: "Staff - Kenta",
        submittedAt: "2026-08-24 17:30",
        period: "DAILY",
    },

    {
        id: "20260823StockBalanceReport005",
        type: "BALANCE",
        title: "Stock Balance Report",
        submittedBy: "Staff - Yuki",
        submittedAt: "2026-08-23 18:00",
        period: "DAILY",
    },

    {
        id: "202608WeekStockBalanceReport001",
        type: "BALANCE",
        title: "Weekly Stock Balance Report",
        submittedBy: "Manager - Kaday",
        submittedAt: "2026-08-24 18:30",
        period: "WEEKLY",
    },

];


// ============================================================
// REPORT TYPE CONFIG
// ============================================================

const reportTypeConfig: Record<
    ReportType,
    {
        label: string;
    }
> = {

    BALANCE: {
        label: "Stock Balance",
    },

    TRANSFER: {
        label: "Stock Transfer",
    },

    ADJUSTMENT: {
        label: "Stock Adjustment",
    },

    VALUATION: {
        label: "Inventory Valuation",
    },

};


// ============================================================
// COMPONENT
// ============================================================

export default function StockReportsLog() {

    const [period, setPeriod] =
        useState<ReportPeriod>("DAILY");

    const [search, setSearch] =
        useState("");

    const [selectedReport, setSelectedReport] =
        useState<ReportItem | null>(null);


    // ========================================================
    // FILTER REPORTS
    // ========================================================

    const filteredReports = useMemo(() => {

        return reports.filter(report => {

            const periodMatch =
                report.period === period;

            const searchMatch =
                search.trim() === "" ||
                report.id
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );

            return (
                periodMatch &&
                searchMatch
            );

        });

    }, [
        period,
        search,
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

                        <AssessmentRounded />

                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >
                            Submitted Report Log
                        </Typography>

                    </Stack>


                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                            mt: 0.5,
                        }}
                    >
                        Search and review reports
                        submitted by operation staff.
                    </Typography>

                </Box>


                {/* SEARCH BOX */}

                <TextField
                    size="small"
                    value={search}
                    onChange={e =>
                        setSearch(
                            e.target.value
                        )
                    }
                    placeholder="Search Report ID..."
                    sx={{
                        width: {
                            xs: "100%",
                            sm: 350,
                        },
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

            </Stack>


            {/* =================================================
                PERIOD TABS
            ================================================= */}

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

                <Tabs
                    value={period}
                    onChange={(
                        _,
                        value
                    ) =>
                        setPeriod(value)
                    }
                    variant="scrollable"
                    scrollButtons="auto"
                >

                    <Tab
                        value="DAILY"
                        label="Daily"
                    />

                    <Tab
                        value="WEEKLY"
                        label="Weekly"
                    />

                    <Tab
                        value="MONTHLY"
                        label="Monthly"
                    />

                    <Tab
                        value="YEARLY"
                        label="Yearly"
                    />

                </Tabs>

            </Card>


            {/* =================================================
                REPORT SEARCH RESULTS
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

                {/* CARD HEADER */}

                <CardContent>

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
                        gap={1}
                    >

                        <Box>

                            <Typography
                                variant="h6"
                                fontWeight={700}
                            >
                                Report Search Results
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Previously submitted
                                inventory reports.
                            </Typography>

                        </Box>


                        <Chip
                            icon={
                                <CalendarMonthRounded />
                            }
                            label={`${filteredReports.length} Reports`}
                            size="small"
                        />

                    </Stack>

                </CardContent>


                <Divider />


                {/* =================================================
                    REPORT LIST
                ================================================= */}

                <CardContent>

                    {filteredReports.length ===
                        0 ? (

                        <Box
                            sx={{
                                py: 8,
                                textAlign:
                                    "center",
                            }}
                        >

                            <SearchRounded
                                sx={{
                                    fontSize: 48,
                                    color:
                                        "text.disabled",
                                    mb: 1,
                                }}
                            />

                            <Typography
                                fontWeight={600}
                                color="text.secondary"
                            >
                                No reports found
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.disabled"
                            >
                                Try another Report ID
                                or reporting period.
                            </Typography>

                        </Box>

                    ) : (

                        <Stack spacing={1.5}>
                            {filteredReports.map(
                                report => (
                                    <ReportLogItem
                                        key={report.id}
                                        report={report}
                                        onClick={() => setSelectedReport(report)}
                                    />
                                )
                            )}
                            <ReportDetailsPopUp selectedReport={selectedReport} setSelectedReport={setSelectedReport} reportTypeConfig={reportTypeConfig}/>
                        </Stack>

                    )}

                </CardContent>

            </Card>

        </Box>
    );
}


// ============================================================
// REPORT LOG ITEM
// ============================================================

function ReportLogItem({
    report,
    onClick
}: {
    report: ReportItem;
    onClick: () => void;
}) {

    const type =
        reportTypeConfig[
        report.type
        ];


    return (

        <Paper
            variant="outlined"
            sx={{
                borderRadius: 2,
                overflow: "hidden"
            }}
        >
            <ButtonBase

                onClick={onClick}

                sx={{

                    width: "100%",

                    p: 2,

                    textAlign: "left",

                    display: "block",

                    transition:

                        "background-color .2s, transform .2s",

                    "&:hover": {

                        bgcolor: "action.hover",

                    },

                    "&:active": {

                        transform: "scale(0.995)",

                    },

                    "&:focus-visible": {

                        outline:

                            "2px solid",

                        outlineColor:

                            "primary.main",

                        outlineOffset: -2,

                    },

                }}

            >

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

                    {/* LEFT */}

                    <Stack
                        direction="row"
                        spacing={1.5}
                        alignItems="center"
                    >

                        <Box
                            sx={{
                                width: 44,
                                height: 44,
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

                            <DescriptionRounded />

                        </Box>


                        <Box>

                            <Typography
                                fontWeight={700}
                            >
                                {report.title}
                            </Typography>


                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{
                                    wordBreak:
                                        "break-all",
                                }}
                            >
                                {report.id}
                            </Typography>

                        </Box>

                    </Stack>


                    {/* RIGHT */}

                    <Stack
                        direction={{
                            xs: "column",
                            sm: "row",
                        }}
                        alignItems={{
                            xs: "flex-start",
                            sm: "center",
                        }}
                        spacing={{
                            xs: 0.5,
                            sm: 2,
                        }}
                    >

                        <Chip
                            label={type.label}
                            size="small"
                            variant="outlined"
                        />


                        <Box
                            sx={{
                                minWidth: {
                                    sm: 150,
                                },
                            }}
                        >

                            <Typography
                                variant="body2"
                                fontWeight={600}
                            >
                                {report.submittedBy}
                            </Typography>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                {report.submittedAt}
                            </Typography>

                        </Box>

                    </Stack>

                </Stack>
            </ButtonBase>
        </Paper>

    );
}