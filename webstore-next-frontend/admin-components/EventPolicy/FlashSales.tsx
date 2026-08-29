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
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    InputAdornment,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import {
    AddRounded,
    AccessTimeRounded,
    CloseRounded,
    DeleteOutlineRounded,
    EditRounded,
    LocalOfferRounded,
    PeopleAltRounded,
    SearchRounded,
    ShoppingBagRounded,
    FlashOnRounded,
    VisibilityRounded,
} from "@mui/icons-material";


// ======================================================
// TYPES
// ======================================================

type FlashSaleStatus =
    | "SCHEDULED"
    | "ACTIVE"
    | "ENDED"
    | "CANCELLED";

type DiscountType =
    | "PERCENTAGE"
    | "FIXED";

interface FlashSaleProduct {
    id: string;
    name: string;
    sku: string;
    image: string;
    originalPrice: number;
    salePrice: number;
}

interface FlashSale {
    id: string;

    name: string;

    description: string;

    startDate: string;
    startTime: string;

    endDate: string;
    endTime: string;

    discountType: DiscountType;

    discountValue: number;

    maxQuantity: number;

    soldQuantity: number;

    perCustomerLimit: number;

    products: FlashSaleProduct[];

    status: FlashSaleStatus;
}


// ======================================================
// MOCK PRODUCTS
// ======================================================

const products: FlashSaleProduct[] = [

    {
        id: "P001",
        name: "Oversized Cotton T-Shirt",
        sku: "TSH-OVR-001",
        image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        originalPrice: 3980,
        salePrice: 2786,
    },

    {
        id: "P002",
        name: "Classic Denim Jacket",
        sku: "JKT-DNM-001",
        image:
            "https://images.unsplash.com/photo-1551028719-00167b16eac5",
        originalPrice: 8980,
        salePrice: 6286,
    },

    {
        id: "P003",
        name: "Relaxed Fit Pants",
        sku: "PNT-RLX-001",
        image:
            "https://images.unsplash.com/photo-1506629905607-d9f297d1a4e4",
        originalPrice: 5980,
        salePrice: 4186,
    },

];


// ======================================================
// MOCK FLASH SALES
// ======================================================

const initialFlashSales: FlashSale[] = [

    {
        id: "FS-20260825-001",

        name: "Summer Night Flash Sale",

        description:
            "Limited-time discount on selected summer products.",

        startDate: "2026-08-25",
        startTime: "18:00",

        endDate: "2026-08-25",
        endTime: "22:00",

        discountType: "PERCENTAGE",

        discountValue: 30,

        maxQuantity: 100,

        soldQuantity: 67,

        perCustomerLimit: 2,

        products: [
            products[0],
            products[2],
        ],

        status: "ACTIVE",
    },

    {
        id: "FS-20260826-001",

        name: "Denim Rush",

        description:
            "Four-hour flash sale for denim collection.",

        startDate: "2026-08-26",
        startTime: "12:00",

        endDate: "2026-08-26",
        endTime: "16:00",

        discountType: "PERCENTAGE",

        discountValue: 25,

        maxQuantity: 50,

        soldQuantity: 0,

        perCustomerLimit: 1,

        products: [
            products[1],
        ],

        status: "SCHEDULED",
    },

    {
        id: "FS-20260820-001",

        name: "Weekend Clearance Rush",

        description:
            "Clearance flash sale for selected items.",

        startDate: "2026-08-20",
        startTime: "10:00",

        endDate: "2026-08-20",
        endTime: "14:00",

        discountType: "FIXED",

        discountValue: 1000,

        maxQuantity: 80,

        soldQuantity: 80,

        perCustomerLimit: 3,

        products: [
            products[2],
        ],

        status: "ENDED",
    },

];


// ======================================================
// STATUS CONFIG
// ======================================================

const statusConfig: Record<
    FlashSaleStatus,
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

    SCHEDULED: {
        label: "Scheduled",
        color: "info",
    },

    ACTIVE: {
        label: "Active",
        color: "success",
    },

    ENDED: {
        label: "Ended",
        color: "default",
    },

    CANCELLED: {
        label: "Cancelled",
        color: "error",
    },

};


// ======================================================
// MAIN COMPONENT
// ======================================================

export default function FlashSales() {

    const [
        flashSales,
        setFlashSales,
    ] = useState<FlashSale[]>(
        initialFlashSales
    );

    const [
        search,
        setSearch,
    ] = useState("");

    const [
        statusFilter,
        setStatusFilter,
    ] = useState<
        FlashSaleStatus | "ALL"
    >("ALL");

    const [
        dialogOpen,
        setDialogOpen,
    ] = useState(false);

    const [
        editingSale,
        setEditingSale,
    ] = useState<
        FlashSale | undefined
    >(undefined);

    const [
        previewSale,
        setPreviewSale,
    ] = useState<
        FlashSale | undefined
    >(undefined);


    // ==================================================
    // FILTER
    // ==================================================

    const filteredSales =
        useMemo(() => {

            return flashSales.filter(
                sale => {

                    const matchesSearch =
                        sale.name
                            .toLowerCase()
                            .includes(
                                search.toLowerCase()
                            ) ||
                        sale.id
                            .toLowerCase()
                            .includes(
                                search.toLowerCase()
                            );

                    const matchesStatus =
                        statusFilter === "ALL" ||
                        sale.status ===
                        statusFilter;

                    return (
                        matchesSearch &&
                        matchesStatus
                    );

                }
            );

        }, [
            flashSales,
            search,
            statusFilter,
        ]);


    // ==================================================
    // SUMMARY
    // ==================================================

    const activeCount =
        flashSales.filter(
            sale =>
                sale.status === "ACTIVE"
        ).length;

    const scheduledCount =
        flashSales.filter(
            sale =>
                sale.status === "SCHEDULED"
        ).length;

    const endedCount =
        flashSales.filter(
            sale =>
                sale.status === "ENDED"
        ).length;


    // ==================================================
    // CREATE / UPDATE
    // ==================================================

    const handleSave = (
        sale: FlashSale
    ) => {

        if (editingSale) {

            setFlashSales(
                previous =>
                    previous.map(
                        item =>
                            item.id === sale.id
                                ? sale
                                : item
                    )
            );

        } else {

            setFlashSales(
                previous => [
                    sale,
                    ...previous,
                ]
            );

        }

        setDialogOpen(false);
        setEditingSale(undefined);
    };


    // ==================================================
    // DELETE
    // ==================================================

    const handleDelete = (
        id: string
    ) => {

        setFlashSales(
            previous =>
                previous.filter(
                    sale =>
                        sale.id !== id
                )
        );

    };


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

                        <FlashOnRounded fontSize="large"/>

                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >
                            Flash Sales
                        </Typography>

                    </Stack>

                    <Typography
                        color="text.secondary"
                        sx={{
                            mt: 0.5,
                        }}
                    >
                        Manage short-term,
                        high-urgency product
                        discounts.
                    </Typography>

                </Box>


                <Button
                    variant="contained"
                    startIcon={
                        <AddRounded />
                    }
                    onClick={() => {

                        setEditingSale(
                            undefined
                        );

                        setDialogOpen(true);

                    }}
                >
                    New Flash Sale
                </Button>

            </Stack>


            {/* ================================================= */}
            {/* SUMMARY */}
            {/* ================================================= */}

            <Grid
                container
                spacing={2}
                mb={3}
            >

                <Grid
                    size={4}
                >

                    <SummaryCard
                        icon={
                            <FlashOnRounded />
                        }
                        label="Active"
                        value={activeCount}
                    />

                </Grid>


                <Grid
                    size={4}
                >

                    <SummaryCard
                        icon={
                            <AccessTimeRounded />
                        }
                        label="Scheduled"
                        value={scheduledCount}
                    />

                </Grid>


                <Grid
                    size={4}
                >

                    <SummaryCard
                        icon={
                            <ShoppingBagRounded />
                        }
                        label="Ended"
                        value={endedCount}
                    />

                </Grid>

            </Grid>


            {/* ================================================= */}
            {/* SEARCH / FILTER */}
            {/* ================================================= */}

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
                    placeholder="Search flash sale..."
                    value={search}
                    onChange={event =>
                        setSearch(
                            event.target.value
                        )
                    }
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchRounded />
                                </InputAdornment>
                            ),
                        },
                    }}
                />


                <Select
                    value={statusFilter}
                    onChange={event =>
                        setStatusFilter(
                            event.target.value as
                            FlashSaleStatus |
                            "ALL"
                        )
                    }
                    sx={{
                        minWidth: 180,
                    }}
                >

                    <MenuItem value="ALL">
                        All Status
                    </MenuItem>

                    <MenuItem value="ACTIVE">
                        Active
                    </MenuItem>

                    <MenuItem value="SCHEDULED">
                        Scheduled
                    </MenuItem>

                    <MenuItem value="ENDED">
                        Ended
                    </MenuItem>

                    <MenuItem value="CANCELLED">
                        Cancelled
                    </MenuItem>

                </Select>

            </Stack>


            {/* ================================================= */}
            {/* FLASH SALE LIST */}
            {/* ================================================= */}

            <Stack spacing={2}>

                {filteredSales.map(
                    sale => (

                        <FlashSaleCard
                            key={sale.id}
                            sale={sale}
                            onEdit={() => {

                                setEditingSale(
                                    sale
                                );

                                setDialogOpen(
                                    true
                                );

                            }}
                            onDelete={() =>
                                handleDelete(
                                    sale.id
                                )
                            }
                            onPreview={() =>
                                setPreviewSale(
                                    sale
                                )
                            }
                        />

                    )
                )}


                {filteredSales.length === 0 && (

                    <Alert severity="info">

                        No flash sales found.

                    </Alert>

                )}

            </Stack>


            {/* ================================================= */}
            {/* CREATE / EDIT */}
            {/* ================================================= */}

            <FlashSaleDialog
                open={dialogOpen}
                sale={editingSale}
                onClose={() => {

                    setDialogOpen(false);
                    setEditingSale(
                        undefined
                    );

                }}
                onSave={handleSave}
            />


            {/* ================================================= */}
            {/* PREVIEW */}
            {/* ================================================= */}

            {previewSale && (

                <FlashSalePreviewDialog
                    sale={previewSale}
                    onClose={() =>
                        setPreviewSale(
                            undefined
                        )
                    }
                />

            )}

        </Box>
    );
}


// ======================================================
// SUMMARY CARD
// ======================================================

function SummaryCard({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: number;
}) {

    return (

        <Card variant="outlined">

            <CardContent>

                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                >

                    {icon}

                    <Box>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {label}
                        </Typography>

                        <Typography
                            variant="h5"
                            fontWeight={700}
                        >
                            {value}
                        </Typography>

                    </Box>

                </Stack>

            </CardContent>

        </Card>
    );
}


// ======================================================
// FLASH SALE CARD
// ======================================================

function FlashSaleCard({
    sale,
    onEdit,
    onDelete,
    onPreview,
}: {
    sale: FlashSale;

    onEdit: () => void;

    onDelete: () => void;

    onPreview: () => void;
}) {

    const progress =
        sale.maxQuantity > 0
            ? Math.min(
                100,
                (sale.soldQuantity /
                    sale.maxQuantity) *
                100
            )
            : 0;


    return (

        <Card
            variant="outlined"
            sx={{
                borderRadius: 3,
            }}
        >

            <CardContent>

                <Grid
                    container
                    spacing={2}
                    alignItems="center"
                >

                    {/* ================================= */}
                    {/* BASIC INFO */}
                    {/* ================================= */}

                    <Grid
                        size={{
                            xs: 12,
                            md: 5,
                        }}
                    >

                        <Stack spacing={1}>

                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                            >

                                <Typography
                                    variant="h6"
                                    fontWeight={700}
                                >
                                    {sale.name}
                                </Typography>

                                <Chip
                                    size="small"
                                    label={
                                        statusConfig[
                                            sale.status
                                        ].label
                                    }
                                    color={
                                        statusConfig[
                                            sale.status
                                        ].color
                                    }
                                />

                            </Stack>


                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                {sale.description}
                            </Typography>


                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                ID: {sale.id}
                            </Typography>

                        </Stack>

                    </Grid>


                    {/* ================================= */}
                    {/* TIME */}
                    {/* ================================= */}

                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                            md: 3,
                        }}
                    >

                        <Stack spacing={0.5}>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Availability
                            </Typography>

                            <Typography
                                fontWeight={600}
                            >
                                {sale.startDate}
                                {" "}
                                {sale.startTime}
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                →
                                {" "}
                                {sale.endDate}
                                {" "}
                                {sale.endTime}
                            </Typography>

                        </Stack>

                    </Grid>


                    {/* ================================= */}
                    {/* DISCOUNT */}
                    {/* ================================= */}

                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                            md: 2,
                        }}
                    >

                        <Stack spacing={0.5}>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Discount
                            </Typography>

                            <Typography
                                variant="h6"
                                fontWeight={800}
                            >
                                {sale.discountType ===
                                    "PERCENTAGE"
                                    ? `${sale.discountValue}% OFF`
                                    : `¥${sale.discountValue.toLocaleString()} OFF`
                                }
                            </Typography>

                        </Stack>

                    </Grid>


                    {/* ================================= */}
                    {/* ACTIONS */}
                    {/* ================================= */}

                    <Grid
                        size={{
                            xs: 12,
                            md: 2,
                        }}
                    >

                        <Stack
                            direction="row"
                            justifyContent={{
                                xs: "flex-start",
                                md: "flex-end",
                            }}
                        >

                            <IconButton
                                onClick={
                                    onPreview
                                }
                            >
                                <VisibilityRounded />
                            </IconButton>

                            <IconButton
                                onClick={
                                    onEdit
                                }
                            >
                                <EditRounded />
                            </IconButton>

                            <IconButton
                                color="error"
                                onClick={
                                    onDelete
                                }
                            >
                                <DeleteOutlineRounded />
                            </IconButton>

                        </Stack>

                    </Grid>


                    {/* ================================= */}
                    {/* PRODUCT + QUANTITY */}
                    {/* ================================= */}

                    <Grid
                        size={{
                            xs: 12,
                        }}
                    >

                        <Divider
                            sx={{
                                my: 1,
                            }}
                        />

                        <Stack
                            direction={{
                                xs: "column",
                                sm: "row",
                            }}
                            spacing={3}
                            justifyContent="space-between"
                        >

                            <Box>

                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    Target Products
                                </Typography>

                                <Typography
                                    fontWeight={600}
                                >
                                    {
                                        sale.products
                                            .map(
                                                product =>
                                                    product.name
                                            )
                                            .join(
                                                ", "
                                            )
                                    }
                                </Typography>

                            </Box>


                            <Box>

                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    Sale Quantity
                                </Typography>

                                <Typography
                                    fontWeight={600}
                                >
                                    {sale.soldQuantity}
                                    {" / "}
                                    {sale.maxQuantity}
                                    {" units"}
                                </Typography>

                            </Box>


                            <Box>

                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    Per Customer
                                </Typography>

                                <Typography
                                    fontWeight={600}
                                >
                                    Max{" "}
                                    {
                                        sale.perCustomerLimit
                                    }{" "}
                                    units
                                </Typography>

                            </Box>

                        </Stack>


                        {/* ================================= */}
                        {/* PROGRESS */}
                        {/* ================================= */}

                        <Box
                            sx={{
                                mt: 2,
                            }}
                        >

                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                mb={0.5}
                            >

                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    Sale Progress
                                </Typography>

                                <Typography
                                    variant="caption"
                                    fontWeight={600}
                                >
                                    {Math.round(
                                        progress
                                    )}%
                                </Typography>

                            </Stack>

                            <Box
                                sx={{
                                    height: 7,
                                    borderRadius: 5,
                                    bgcolor:
                                        "action.hover",
                                    overflow:
                                        "hidden",
                                }}
                            >

                                <Box
                                    sx={{
                                        width:
                                            `${progress}%`,
                                        height:
                                            "100%",
                                        bgcolor:
                                            progress >=
                                                90
                                                ? "error.main"
                                                : "primary.main",
                                        transition:
                                            "width .3s",
                                    }}
                                />

                            </Box>

                        </Box>

                    </Grid>

                </Grid>

            </CardContent>

        </Card>
    );
}


// ======================================================
// CREATE / EDIT DIALOG
// ======================================================

function FlashSaleDialog({
    open,
    sale,
    onClose,
    onSave,
}: {
    open: boolean;

    sale?: FlashSale;

    onClose: () => void;

    onSave: (
        sale: FlashSale
    ) => void;
}) {

    const [
        name,
        setName,
    ] = useState(
        sale?.name ?? ""
    );

    const [
        description,
        setDescription,
    ] = useState(
        sale?.description ?? ""
    );

    const [
        startDate,
        setStartDate,
    ] = useState(
        sale?.startDate ?? ""
    );

    const [
        startTime,
        setStartTime,
    ] = useState(
        sale?.startTime ?? ""
    );

    const [
        endDate,
        setEndDate,
    ] = useState(
        sale?.endDate ?? ""
    );

    const [
        endTime,
        setEndTime,
    ] = useState(
        sale?.endTime ?? ""
    );

    const [
        discountType,
        setDiscountType,
    ] = useState<DiscountType>(
        sale?.discountType ??
        "PERCENTAGE"
    );

    const [
        discountValue,
        setDiscountValue,
    ] = useState(
        sale?.discountValue?.toString() ??
        ""
    );

    const [
        maxQuantity,
        setMaxQuantity,
    ] = useState(
        sale?.maxQuantity?.toString() ??
        ""
    );

    const [
        perCustomerLimit,
        setPerCustomerLimit,
    ] = useState(
        sale?.perCustomerLimit?.toString() ??
        ""
    );

    const [
        selectedProductIds,
        setSelectedProductIds,
    ] = useState<string[]>(
        sale?.products.map(
            product =>
                product.id
        ) ?? []
    );

    const [
        error,
        setError,
    ] = useState("");


    // ==================================================
    // SAVE
    // ==================================================

    const handleSave = () => {

        if (!name.trim()) {

            setError(
                "Flash sale name is required."
            );

            return;
        }


        if (
            !startDate ||
            !startTime ||
            !endDate ||
            !endTime
        ) {

            setError(
                "Please select the complete availability period."
            );

            return;
        }


        const start =
            new Date(
                `${startDate}T${startTime}`
            );

        const end =
            new Date(
                `${endDate}T${endTime}`
            );


        if (end <= start) {

            setError(
                "End date/time must be after start date/time."
            );

            return;
        }


        if (
            selectedProductIds.length === 0
        ) {

            setError(
                "Select at least one product."
            );

            return;
        }


        const discount =
            Number(
                discountValue
            );

        if (
            !discount ||
            discount <= 0
        ) {

            setError(
                "Enter a valid discount."
            );

            return;
        }


        if (
            discountType ===
            "PERCENTAGE" &&
            discount > 100
        ) {

            setError(
                "Percentage discount cannot exceed 100%."
            );

            return;
        }


        const quantity =
            Number(
                maxQuantity
            );

        if (
            !quantity ||
            quantity <= 0
        ) {

            setError(
                "Enter a valid maximum quantity."
            );

            return;
        }


        const customerLimit =
            Number(
                perCustomerLimit
            );

        if (
            !customerLimit ||
            customerLimit <= 0
        ) {

            setError(
                "Enter a valid customer limit."
            );

            return;
        }


        const selectedProducts =
            products.filter(
                product =>
                    selectedProductIds.includes(
                        product.id
                    )
            );


        const newSale: FlashSale = {

            id:
                sale?.id ??
                `FS-${Date.now()}`,

            name:
                name.trim(),

            description:
                description.trim(),

            startDate,

            startTime,

            endDate,

            endTime,

            discountType,

            discountValue:
                discount,

            maxQuantity:
                quantity,

            soldQuantity:
                sale?.soldQuantity ??
                0,

            perCustomerLimit:
                customerLimit,

            products:
                selectedProducts,

            status:
                sale?.status ??
                "SCHEDULED",
        };


        onSave(newSale);
    };


    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
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
                            {sale
                                ? "Edit Flash Sale"
                                : "New Flash Sale"}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Create a short-term
                            promotional campaign.
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

                {error && (

                    <Alert
                        severity="error"
                        sx={{
                            mb: 3,
                        }}
                    >
                        {error}
                    </Alert>

                )}


                <Grid
                    container
                    spacing={2.5}
                >

                    {/* ================================= */}
                    {/* NAME */}
                    {/* ================================= */}

                    <Grid
                        size={{
                            xs: 12,
                        }}
                    >

                        <TextField
                            fullWidth
                            label="Flash Sale Name"
                            placeholder="e.g. Summer Night Flash Sale"
                            value={name}
                            onChange={event =>
                                setName(
                                    event.target.value
                                )
                            }
                        />

                    </Grid>


                    {/* ================================= */}
                    {/* DESCRIPTION */}
                    {/* ================================= */}

                    <Grid
                        size={{
                            xs: 12,
                        }}
                    >

                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            label="Description"
                            placeholder="Describe this flash sale..."
                            value={
                                description
                            }
                            onChange={event =>
                                setDescription(
                                    event.target.value
                                )
                            }
                        />

                    </Grid>


                    {/* ================================= */}
                    {/* AVAILABILITY */}
                    {/* ================================= */}

                    <Grid
                        size={{
                            xs: 12,
                        }}
                    >

                        <Typography
                            fontWeight={700}
                        >
                            Flash Sale Availability
                        </Typography>

                    </Grid>


                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                        }}
                    >

                        <TextField
                            fullWidth
                            type="date"
                            label="Start Date"
                            value={
                                startDate
                            }
                            onChange={event =>
                                setStartDate(
                                    event.target.value
                                )
                            }
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
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

                        <TextField
                            fullWidth
                            type="time"
                            label="Start Time"
                            value={
                                startTime
                            }
                            onChange={event =>
                                setStartTime(
                                    event.target.value
                                )
                            }
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
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

                        <TextField
                            fullWidth
                            type="date"
                            label="End Date"
                            value={
                                endDate
                            }
                            onChange={event =>
                                setEndDate(
                                    event.target.value
                                )
                            }
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
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

                        <TextField
                            fullWidth
                            type="time"
                            label="End Time"
                            value={
                                endTime
                            }
                            onChange={event =>
                                setEndTime(
                                    event.target.value
                                )
                            }
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        />

                    </Grid>


                    {/* ================================= */}
                    {/* DISCOUNT */}
                    {/* ================================= */}

                    <Grid
                        size={{
                            xs: 12,
                        }}
                    >

                        <Typography
                            fontWeight={700}
                        >
                            Discount Rule
                        </Typography>

                    </Grid>


                    <Grid
                        size={{
                            xs: 12,
                            sm: 5,
                        }}
                    >

                        <Select
                            fullWidth
                            value={
                                discountType
                            }
                            onChange={event =>
                                setDiscountType(
                                    event.target.value as
                                    DiscountType
                                )
                            }
                        >

                            <MenuItem value="PERCENTAGE">
                                Percentage (%)
                            </MenuItem>

                            <MenuItem value="FIXED">
                                Fixed Amount (¥)
                            </MenuItem>

                        </Select>

                    </Grid>


                    <Grid
                        size={{
                            xs: 12,
                            sm: 7,
                        }}
                    >

                        <TextField
                            fullWidth
                            type="number"
                            label={
                                discountType ===
                                    "PERCENTAGE"
                                    ? "Discount Percentage"
                                    : "Discount Amount"
                            }
                            value={
                                discountValue
                            }
                            onChange={event =>
                                setDiscountValue(
                                    event.target.value
                                )
                            }
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {discountType ===
                                                "PERCENTAGE"
                                                ? "%"
                                                : "¥"
                                            }
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />

                    </Grid>


                    {/* ================================= */}
                    {/* PRODUCTS */}
                    {/* ================================= */}

                    <Grid
                        size={{
                            xs: 12,
                        }}
                    >

                        <Typography
                            fontWeight={700}
                            sx={{
                                mb: 1,
                            }}
                        >
                            Target Products
                        </Typography>


                        <Select
                            fullWidth
                            multiple
                            value={
                                selectedProductIds
                            }
                            onChange={event =>
                                setSelectedProductIds(
                                    event.target.value as
                                    string[]
                                )
                            }
                            displayEmpty
                        >

                            {products.map(
                                product => (

                                    <MenuItem
                                        key={
                                            product.id
                                        }
                                        value={
                                            product.id
                                        }
                                    >
                                        {product.name}
                                        {" — "}
                                        {product.sku}
                                    </MenuItem>

                                )
                            )}

                        </Select>

                    </Grid>


                    {/* ================================= */}
                    {/* QUANTITY LIMITS */}
                    {/* ================================= */}

                    <Grid
                        size={{
                            xs: 12,
                        }}
                    >

                        <Typography
                            fontWeight={700}
                        >
                            Sale Limits
                        </Typography>

                    </Grid>


                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                        }}
                    >

                        <TextField
                            fullWidth
                            type="number"
                            label="Maximum Sale Quantity"
                            helperText="Total units available for this flash sale."
                            value={
                                maxQuantity
                            }
                            onChange={event =>
                                setMaxQuantity(
                                    event.target.value
                                )
                            }
                        />

                    </Grid>


                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                        }}
                    >

                        <TextField
                            fullWidth
                            type="number"
                            label="Per Customer Limit"
                            helperText="Maximum units one customer can purchase."
                            value={
                                perCustomerLimit
                            }
                            onChange={event =>
                                setPerCustomerLimit(
                                    event.target.value
                                )
                            }
                        />

                    </Grid>

                </Grid>

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
                        <FlashOnRounded />
                    }
                    onClick={
                        handleSave
                    }
                >
                    {sale
                        ? "Save Changes"
                        : "Create Flash Sale"}
                </Button>

            </DialogActions>

        </Dialog>
    );
}


// ======================================================
// PREVIEW DIALOG
// ======================================================

function FlashSalePreviewDialog({
    sale,
    onClose,
}: {
    sale: FlashSale;

    onClose: () => void;
}) {

    return (

        <Dialog
            open
            onClose={onClose}
            fullWidth
            maxWidth="md"
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
                            Flash Sale Preview
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Customer-facing preview
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

                <Card
                    sx={{
                        borderRadius: 3,
                        overflow: "hidden",
                    }}
                >

                    <Box
                        sx={{
                            p: {
                                xs: 3,
                                md: 5,
                            },
                            background:
                                "linear-gradient(135deg, #111, #333)",
                            color: "white",
                        }}
                    >

                        <Stack spacing={2}>

                            <Chip
                                icon={
                                    <FlashOnRounded />
                                }
                                label="FLASH SALE"
                                sx={{
                                    width: "fit-content",
                                    color: "white",
                                    bgcolor:
                                        "rgba(255,255,255,.15)",
                                }}
                            />


                            <Typography
                                variant="h3"
                                fontWeight={800}
                            >
                                {sale.name}
                            </Typography>


                            <Typography>
                                {sale.description}
                            </Typography>


                            <Typography
                                variant="h4"
                                fontWeight={800}
                            >
                                {sale.discountType ===
                                    "PERCENTAGE"
                                    ? `${sale.discountValue}% OFF`
                                    : `¥${sale.discountValue.toLocaleString()} OFF`
                                }
                            </Typography>


                            <Typography>
                                {sale.startDate}{" "}
                                {sale.startTime}
                                {" → "}
                                {sale.endDate}{" "}
                                {sale.endTime}
                            </Typography>

                        </Stack>

                    </Box>


                    <CardContent>

                        <Typography
                            variant="subtitle1"
                            fontWeight={700}
                            mb={2}
                        >
                            Included Products
                        </Typography>


                        <Stack spacing={1.5}>

                            {sale.products.map(
                                product => (

                                    <Stack
                                        key={
                                            product.id
                                        }
                                        direction="row"
                                        spacing={2}
                                        alignItems="center"
                                    >

                                        <Box
                                            component="img"
                                            src={
                                                product.image
                                            }
                                            alt={
                                                product.name
                                            }
                                            sx={{
                                                width: 60,
                                                height: 60,
                                                objectFit:
                                                    "cover",
                                                borderRadius: 2,
                                            }}
                                        />

                                        <Box>

                                            <Typography
                                                fontWeight={600}
                                            >
                                                {
                                                    product.name
                                                }
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                SKU:{" "}
                                                {
                                                    product.sku
                                                }
                                            </Typography>

                                        </Box>

                                    </Stack>

                                )
                            )}

                        </Stack>


                        <Divider
                            sx={{
                                my: 3,
                            }}
                        />


                        <Grid
                            container
                            spacing={2}
                        >

                            <Grid
                                size={{
                                    xs: 12,
                                    sm: 4,
                                }}
                            >

                                <Stack
                                    direction="row"
                                    spacing={1}
                                >

                                    <ShoppingBagRounded />

                                    <Box>

                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            Sale Stock
                                        </Typography>

                                        <Typography
                                            fontWeight={700}
                                        >
                                            {
                                                sale.maxQuantity
                                            }{" "}
                                            units
                                        </Typography>

                                    </Box>

                                </Stack>

                            </Grid>


                            <Grid
                                size={{
                                    xs: 12,
                                    sm: 4,
                                }}
                            >

                                <Stack
                                    direction="row"
                                    spacing={1}
                                >

                                    <PeopleAltRounded />

                                    <Box>

                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            Per Customer
                                        </Typography>

                                        <Typography
                                            fontWeight={700}
                                        >
                                            Max{" "}
                                            {
                                                sale.perCustomerLimit
                                            }
                                        </Typography>

                                    </Box>

                                </Stack>

                            </Grid>


                            <Grid
                                size={{
                                    xs: 12,
                                    sm: 4,
                                }}
                            >

                                <Stack
                                    direction="row"
                                    spacing={1}
                                >

                                    <LocalOfferRounded />

                                    <Box>

                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            Discount
                                        </Typography>

                                        <Typography
                                            fontWeight={700}
                                        >
                                            {sale.discountType ===
                                                "PERCENTAGE"
                                                ? `${sale.discountValue}%`
                                                : `¥${sale.discountValue.toLocaleString()}`
                                            }
                                        </Typography>

                                    </Box>

                                </Stack>

                            </Grid>

                        </Grid>

                    </CardContent>

                </Card>

            </DialogContent>

        </Dialog>
    );
}