import { CalendarMonthRounded, CloseRounded, DescriptionRounded, LocalPrintshopRounded } from '@mui/icons-material'
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import ReportDetail from './ReportDetail'
import ReportSummaryGrid from './ReportSummaryGrid'

export default function ReportDetailsPopUp({
    selectedReport, setSelectedReport, reportTypeConfig
}: {
    selectedReport: ReportItem;
    setSelectedReport: React.Dispatch<React.SetStateAction<ReportItem>>
    reportTypeConfig: Record<ReportType, {
        label: string;
    }>
}) {
    return (
        <Dialog
            open={Boolean(selectedReport)}
            onClose={() => setSelectedReport(null)}
            fullWidth
            maxWidth="sm"
        >
            {selectedReport && (
                <>
                    {/* ==========================================
                DIALOG HEADER
            ========================================== */}

                    <DialogTitle
                        sx={{
                            pb: 1,
                        }}
                    >

                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                        >

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
                                        bgcolor: "action.hover",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <DescriptionRounded />
                                </Box>


                                <Box>

                                    <Typography
                                        variant="h6"
                                        fontWeight={700}
                                    >
                                        {selectedReport.title}
                                    </Typography>

                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{
                                            wordBreak: "break-all",
                                        }}
                                    >
                                        {selectedReport.id}
                                    </Typography>

                                </Box>

                            </Stack>


                            <IconButton
                                onClick={() =>
                                    setSelectedReport(null)
                                }
                                size="small"
                            >
                                <CloseRounded />
                            </IconButton>

                        </Stack>

                    </DialogTitle>


                    <Divider />


                    {/* ==========================================
                DETAILS
            ========================================== */}

                    <DialogContent>

                        <Stack spacing={2}>

                            {/* REPORT STATUS / TYPE */}

                            <Stack
                                direction="row"
                                spacing={1}
                                flexWrap="wrap"
                            >

                                <Chip
                                    label={
                                        reportTypeConfig[
                                            selectedReport.type
                                        ].label
                                    }
                                    size="small"
                                    variant="outlined"
                                />

                                <Chip
                                    icon={
                                        <CalendarMonthRounded />
                                    }
                                    label={
                                        selectedReport.period
                                    }
                                    size="small"
                                />

                            </Stack>


                            {/* BASIC INFORMATION */}

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

                                <ReportDetail
                                    label="Report ID"
                                    value={
                                        selectedReport.id
                                    }
                                />

                                <ReportDetail
                                    label="Report Type"
                                    value={
                                        reportTypeConfig[
                                            selectedReport.type
                                        ].label
                                    }
                                />

                                <ReportDetail
                                    label="Submitted By"
                                    value={
                                        selectedReport.submittedBy
                                    }
                                />

                                <ReportDetail
                                    label="Submitted At"
                                    value={
                                        selectedReport.submittedAt
                                    }
                                />

                                <ReportDetail
                                    label="Reporting Period"
                                    value={
                                        selectedReport.period
                                    }
                                />

                            </Box>


                            <Divider />


                            {/* ==================================
                        REPORT CONTENT
                    ================================== */}

                            <Typography
                                variant="subtitle1"
                                fontWeight={700}
                            >
                                Report Details
                            </Typography>


                            {/* BALANCE */}

                            {selectedReport.type ===
                                "BALANCE" && (

                                    <ReportSummaryGrid
                                        items={[
                                            {
                                                label: "Opening Stock",
                                                value: "1,250 units",
                                            },
                                            {
                                                label: "Stock In",
                                                value: "+380 units",
                                            },
                                            {
                                                label: "Stock Out",
                                                value: "-295 units",
                                            },
                                            {
                                                label: "Closing Stock",
                                                value: "1,335 units",
                                            },
                                        ]}
                                    />

                                )}


                            {/* TRANSFER */}

                            {selectedReport.type ===
                                "TRANSFER" && (

                                    <ReportSummaryGrid
                                        items={[
                                            {
                                                label: "Total Transfers",
                                                value: "18",
                                            },
                                            {
                                                label: "Units Transferred",
                                                value: "245 units",
                                            },
                                            {
                                                label: "Completed",
                                                value: "16",
                                            },
                                            {
                                                label: "Pending",
                                                value: "2",
                                            },
                                        ]}
                                    />

                                )}


                            {/* ADJUSTMENT */}

                            {selectedReport.type ===
                                "ADJUSTMENT" && (

                                    <ReportSummaryGrid
                                        items={[
                                            {
                                                label: "Damaged",
                                                value: "8 units",
                                            },
                                            {
                                                label: "Lost",
                                                value: "2 units",
                                            },
                                            {
                                                label: "Count Error",
                                                value: "3 units",
                                            },
                                            {
                                                label: "Total Adjustment",
                                                value: "13 units",
                                            },
                                        ]}
                                    />

                                )}


                            {/* VALUATION */}

                            {selectedReport.type ===
                                "VALUATION" && (

                                    <ReportSummaryGrid
                                        items={[
                                            {
                                                label: "Total Units",
                                                value: "1,335",
                                            },
                                            {
                                                label: "Unit Cost",
                                                value: "¥2,850",
                                            },
                                            {
                                                label: "Total Cost",
                                                value: "¥3,804,750",
                                            },
                                            {
                                                label: "Valuation",
                                                value: "FIFO",
                                            },
                                        ]}
                                    />

                                )}

                        </Stack>

                    </DialogContent>


                    <Divider />


                    {/* ==========================================
                ACTIONS
            ========================================== */}

                    <DialogActions
                        sx={{
                            px: 3,
                            py: 2,
                        }}
                    >

                        <Button
                            variant="outlined"
                            onClick={() =>
                                setSelectedReport(null)
                            }
                        >
                            Close
                        </Button>


                        <Button
                            variant="contained"
                            startIcon={
                                <LocalPrintshopRounded />
                            }
                            onClick={() =>
                                window.print()
                            }
                        >
                            Print Report
                        </Button>

                    </DialogActions>

                </>
            )}

        </Dialog>
    )
}
