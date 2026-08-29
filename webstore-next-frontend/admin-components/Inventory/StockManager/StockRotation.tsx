"use client";

import React, { useMemo, useState } from "react";
import {
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
    Drawer,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
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
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";

import {
    AccessTimeRounded,
    CloseRounded,
    Inventory2Rounded,
    RefreshRounded,
    SearchRounded,
    WarningAmberRounded,
} from "@mui/icons-material";

type StockStatus = "FRESH" | "AGING" | "CRITICAL";

interface StockBatch {
    id: string;
    product: string;
    sku: string;
    warehouse: string;
    quantity: number;
    receivedAt: string;
    ageDays: number;
    status: StockStatus;
}

const stockBatches: StockBatch[] = [
    {
        id: "ST-1023",
        product: "Nike Shirt",
        sku: "NK-001",
        warehouse: "Main Warehouse",
        quantity: 20,
        receivedAt: "2026-05-29",
        ageDays: 87,
        status: "CRITICAL",
    },
    {
        id: "ST-1055",
        product: "Adidas Shoes",
        sku: "AD-002",
        warehouse: "Main Warehouse",
        quantity: 35,
        receivedAt: "2026-06-22",
        ageDays: 63,
        status: "AGING",
    },
    {
        id: "ST-1082",
        product: "Puma Cap",
        sku: "PM-003",
        warehouse: "Main Warehouse",
        quantity: 80,
        receivedAt: "2026-07-30",
        ageDays: 25,
        status: "FRESH",
    },
    {
        id: "ST-1088",
        product: "Uniqlo Jacket",
        sku: "UN-004",
        warehouse: "Branch A",
        quantity: 45,
        receivedAt: "2026-07-10",
        ageDays: 45,
        status: "AGING",
    },
];

const statusConfig: Record<
    StockStatus,
    {
        label: string;
        color: "success" | "warning" | "error";
    }
> = {
    FRESH: {
        label: "Fresh",
        color: "success",
    },
    AGING: {
        label: "Aging",
        color: "warning",
    },
    CRITICAL: {
        label: "Critical",
        color: "error",
    },
};

export default function StockRotation() {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("ALL");
    const [warehouse, setWarehouse] = useState("ALL");

    const [selectedBatch, setSelectedBatch] =
        useState<StockBatch | null>(null);

    const filteredBatches = useMemo(() => {
        return stockBatches.filter(batch => {
            const matchesSearch =
                batch.product
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                batch.sku
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesStatus =
                status === "ALL" ||
                batch.status === status;

            const matchesWarehouse =
                warehouse === "ALL" ||
                batch.warehouse === warehouse;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesWarehouse
            );
        });
    }, [search, status, warehouse]);

    const totalStock = stockBatches.reduce(
        (sum, batch) => sum + batch.quantity,
        0
    );

    const freshStock = stockBatches
        .filter(batch => batch.status === "FRESH")
        .reduce((sum, batch) => sum + batch.quantity, 0);

    const agingStock = stockBatches
        .filter(batch => batch.status === "AGING")
        .reduce((sum, batch) => sum + batch.quantity, 0);

    const criticalStock = stockBatches
        .filter(batch => batch.status === "CRITICAL")
        .reduce((sum, batch) => sum + batch.quantity, 0);

    const getAgePercentage = (ageDays: number) =>
        Math.min((ageDays / 90) * 100, 100);

    return (
        <Box>

            {/* HEADER */}
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
                <Box >
                    <Typography
                        variant="h4"
                        fontWeight={700}
                    >
                        Stock Rotation
                    </Typography>

                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                    >
                        Monitor stock age and prioritize
                        older inventory.
                    </Typography>
                </Box>

                <Tooltip title="Refresh">
                    <IconButton>
                        <RefreshRounded />
                    </IconButton>
                </Tooltip>
            </Stack>

            {/* SUMMARY CARDS */}
            <Grid container spacing={2} mb={3}>

                <Grid size={{ xs: 6, md: 6, lg: 3 }}>
                    <SummaryCard
                        title="Total Stock"
                        value={totalStock}
                        subtitle="units"
                        icon={<Inventory2Rounded />}
                    />
                </Grid>

                <Grid size={{ xs: 6, md: 6, lg: 3 }}>
                    <SummaryCard
                        title="Fresh"
                        value={freshStock}
                        subtitle="units"
                        icon={<AccessTimeRounded />}
                    />
                </Grid>

                <Grid size={{ xs: 6, md: 6, lg: 3 }}>
                    <SummaryCard
                        title="Aging"
                        value={agingStock}
                        subtitle="units"
                        icon={<WarningAmberRounded />}
                    />
                </Grid>

                <Grid size={{ xs: 6, md: 6, lg: 3 }}>
                    <SummaryCard
                        title="Critical"
                        value={criticalStock}
                        subtitle="units"
                        icon={<WarningAmberRounded />}
                    />
                </Grid>

            </Grid>

            {/* FILTERS */}
            <Card
                elevation={0}
                sx={{
                    border: "1px solid",
                    borderColor: "divider",
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

                        <TextField
                            size="small"
                            placeholder="Search product or SKU..."
                            value={search}
                            onChange={e =>
                                setSearch(e.target.value)
                            }
                            sx={{
                                flex: 1,
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchRounded />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <FormControl
                            size="small"
                            sx={{ minWidth: 150 }}
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

                                <MenuItem value="Branch A">
                                    Branch A
                                </MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl
                            size="small"
                            sx={{ minWidth: 130 }}
                        >
                            <InputLabel>
                                Status
                            </InputLabel>

                            <Select
                                label="Status"
                                value={status}
                                onChange={e =>
                                    setStatus(
                                        e.target.value
                                    )
                                }
                            >
                                <MenuItem value="ALL">
                                    All
                                </MenuItem>

                                <MenuItem value="FRESH">
                                    Fresh
                                </MenuItem>

                                <MenuItem value="AGING">
                                    Aging
                                </MenuItem>

                                <MenuItem value="CRITICAL">
                                    Critical
                                </MenuItem>
                            </Select>
                        </FormControl>

                    </Stack>
                </CardContent>
            </Card>

            {/* TABLE */}
            <Card
                elevation={0}
                sx={{
                    border: "1px solid",
                    borderColor: "divider",
                }}
            >
                <CardContent
                    sx={{
                        pb: 1,
                    }}
                >
                    <Typography
                        variant="h6"
                        fontWeight={600}
                    >
                        Rotation Priority
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Older inventory should be
                        prioritized first.
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
                                    Batch
                                </TableCell>

                                <TableCell>
                                    Warehouse
                                </TableCell>

                                <TableCell>
                                    Quantity
                                </TableCell>

                                <TableCell>
                                    Received
                                </TableCell>

                                <TableCell>
                                    Age
                                </TableCell>

                                <TableCell>
                                    Priority
                                </TableCell>

                            </TableRow>
                        </TableHead>

                        <TableBody>

                            {filteredBatches.map(batch => {

                                const config =
                                    statusConfig[
                                    batch.status
                                    ];

                                return (
                                    <TableRow
                                        key={batch.id}
                                        hover
                                        onClick={() =>
                                            setSelectedBatch(
                                                batch
                                            )
                                        }
                                        sx={{
                                            cursor: "pointer",
                                        }}
                                    >

                                        <TableCell>
                                            <Typography
                                                fontWeight={600}
                                            >
                                                {batch.product}
                                            </Typography>

                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                            >
                                                {batch.sku}
                                            </Typography>
                                        </TableCell>

                                        <TableCell>
                                            {batch.id}
                                        </TableCell>

                                        <TableCell>
                                            {batch.warehouse}
                                        </TableCell>

                                        <TableCell>
                                            {batch.quantity}
                                        </TableCell>

                                        <TableCell>
                                            {batch.receivedAt}
                                        </TableCell>

                                        <TableCell
                                            sx={{
                                                minWidth: 150,
                                            }}
                                        >
                                            <Typography
                                                variant="body2"
                                                fontWeight={600}
                                            >
                                                {batch.ageDays} days
                                            </Typography>

                                            <LinearProgress
                                                variant="determinate"
                                                value={getAgePercentage(
                                                    batch.ageDays
                                                )}
                                                sx={{
                                                    mt: 0.5,
                                                    borderRadius: 5,
                                                }}
                                            />
                                        </TableCell>

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

                                    </TableRow>
                                );
                            })}

                        </TableBody>

                    </Table>
                </TableContainer>
            </Card>

            {/* STOCK DETAILS MODAL */}
            <Dialog
                open={Boolean(selectedBatch)}
                onClose={() => setSelectedBatch(null)}
                fullWidth
                maxWidth="sm"
                slotProps={{
                    paper: {
                        sx: {
                            borderRadius: 3,
                        },
                    },
                }}
            >
                {selectedBatch && (
                    <>
                        {/* HEADER */}
                        <DialogTitle
                            sx={{
                                pb: 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Box>
                                <Typography
                                    variant="h6"
                                    fontWeight={700}
                                >
                                    Stock Details
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Inventory batch information
                                </Typography>
                            </Box>

                            <IconButton
                                onClick={() => setSelectedBatch(null)}
                                size="small"
                            >
                                <CloseRounded />
                            </IconButton>
                        </DialogTitle>

                        <Divider />

                        {/* CONTENT */}
                        <DialogContent sx={{ pt: 3 }}>
                            {/* PRODUCT INFO */}
                            <Stack
                                direction="row"
                                spacing={2}
                                alignItems="center"
                                mb={3}
                            >
                                <Box
                                    sx={{
                                        width: 64,
                                        height: 64,
                                        borderRadius: 2,
                                        bgcolor: "action.hover",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Inventory2Rounded
                                        sx={{
                                            fontSize: 32,
                                            color: "text.secondary",
                                        }}
                                    />
                                </Box>

                                <Box>
                                    <Typography
                                        variant="h6"
                                        fontWeight={700}
                                    >
                                        {selectedBatch.product}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        SKU: {selectedBatch.sku}
                                    </Typography>
                                </Box>
                            </Stack>

                            {/* PRIORITY */}
                            <Box
                                sx={{
                                    p: 2,
                                    mb: 3,
                                    borderRadius: 2,
                                    bgcolor: "action.hover",
                                }}
                            >
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
                                            Rotation Priority
                                        </Typography>

                                        <Typography
                                            variant="body1"
                                            fontWeight={600}
                                        >
                                            {selectedBatch.ageDays} days old
                                        </Typography>
                                    </Box>

                                    <Chip
                                        size="small"
                                        label={
                                            statusConfig[
                                                selectedBatch.status
                                            ].label
                                        }
                                        color={
                                            statusConfig[
                                                selectedBatch.status
                                            ].color
                                        }
                                    />
                                </Stack>

                                <LinearProgress
                                    variant="determinate"
                                    value={Math.min(
                                        (selectedBatch.ageDays / 90) * 100,
                                        100
                                    )}
                                    sx={{
                                        mt: 1.5,
                                        borderRadius: 5,
                                        height: 6,
                                    }}
                                />
                            </Box>

                            {/* STOCK INFORMATION */}
                            <Typography
                                variant="subtitle1"
                                fontWeight={700}
                                mb={2}
                            >
                                Stock Information
                            </Typography>

                            <Stack spacing={2}>

                                <DetailRow
                                    label="Batch"
                                    value={selectedBatch.id}
                                />

                                <DetailRow
                                    label="Warehouse"
                                    value={selectedBatch.warehouse}
                                />

                                <DetailRow
                                    label="Quantity"
                                    value={`${selectedBatch.quantity} units`}
                                />

                                <DetailRow
                                    label="Received"
                                    value={selectedBatch.receivedAt}
                                />

                                <DetailRow
                                    label="Stock Age"
                                    value={`${selectedBatch.ageDays} days`}
                                />

                            </Stack>
                        </DialogContent>

                        <Divider />

                        {/* ACTIONS */}
                        <DialogActions sx={{ p: 2 }}>
                            <Button
                                variant="outlined"
                                onClick={() => setSelectedBatch(null)}
                            >
                                Close
                            </Button>

                            <Button
                                variant="contained"
                                startIcon={<RefreshRounded />}
                                onClick={() => {
                                    // Handle rotation action here
                                }}
                            >
                                Rotate Stock
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>

        </Box>
    );
}

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
                borderColor: "divider",
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
                            {value.toLocaleString()}
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
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 44,
                            height: 44,
                            borderRadius: 2,
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

function DetailRow({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
        >
            <Typography color="text.secondary">
                {label}
            </Typography>

            <Typography fontWeight={600}>
                {value}
            </Typography>
        </Stack>
    );
}