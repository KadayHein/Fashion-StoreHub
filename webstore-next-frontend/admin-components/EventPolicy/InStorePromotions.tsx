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
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import {
    AddRounded,
    CalendarMonthRounded,
    CampaignRounded,
    CloseRounded,
    DeleteOutlineRounded,
    EditRounded,
    PercentRounded,
    SearchRounded,
    ShoppingBagRounded,
} from "@mui/icons-material";

type PromotionStatus =
    | "ACTIVE"
    | "SCHEDULED"
    | "EXPIRED"
    | "PAUSED";

type DiscountType =
    | "PERCENTAGE"
    | "FIXED";

type Promotion = {
    id: string;

    name: string;

    description: string;

    status: PromotionStatus;

    discountType: DiscountType;

    discountValue: number;

    minimumPurchase: number;

    maximumDiscount?: number;

    startDate: string;

    endDate: string;

    applicableProducts: string[];

    applicableCategories: string[];

    usageCount: number;

    usageLimit?: number;
};

const initialPromotions: Promotion[] = [

    {
        id: "PROMO-202608-001",

        name: "Summer Collection Sale",

        description:
            "Enjoy 10% off selected summer collection items.",

        status: "ACTIVE",

        discountType: "PERCENTAGE",

        discountValue: 10,

        minimumPurchase: 5000,

        maximumDiscount: 2000,

        startDate: "2026-08-01",

        endDate: "2026-08-31",

        applicableProducts: [
            "Oversized Cotton T-Shirt",
            "Relaxed Linen Shirt",
        ],

        applicableCategories: [
            "T-Shirts",
            "Shirts",
        ],

        usageCount: 182,

        usageLimit: 1000,
    },


    {
        id: "PROMO-202609-002",

        name: "Autumn New Arrival",

        description:
            "Special discount for selected autumn products.",

        status: "SCHEDULED",

        discountType: "PERCENTAGE",

        discountValue: 15,

        minimumPurchase: 8000,

        maximumDiscount: 3000,

        startDate: "2026-09-01",

        endDate: "2026-09-30",

        applicableProducts: [
            "Premium Knit Sweater",
            "Minimal Leather Jacket",
        ],

        applicableCategories: [
            "Jackets",
            "Sweaters",
        ],

        usageCount: 0,

        usageLimit: 500,
    },


    {
        id: "PROMO-202607-003",

        name: "Summer Clearance",

        description:
            "Clearance promotion for selected products.",

        status: "EXPIRED",

        discountType: "FIXED",

        discountValue: 1000,

        minimumPurchase: 5000,

        startDate: "2026-07-01",

        endDate: "2026-07-31",

        applicableProducts: [],

        applicableCategories: [
            "T-Shirts",
            "Pants",
        ],

        usageCount: 436,

        usageLimit: 500,
    },


    {
        id: "PROMO-202608-004",

        name: "Member Weekend Sale",

        description:
            "Special weekend promotion for registered customers.",

        status: "PAUSED",

        discountType: "PERCENTAGE",

        discountValue: 20,

        minimumPurchase: 10000,

        maximumDiscount: 5000,

        startDate: "2026-08-15",

        endDate: "2026-09-15",

        applicableProducts: [],

        applicableCategories: [
            "All Products",
        ],

        usageCount: 72,

        usageLimit: 300,
    },
];

const statusConfig: Record<
    PromotionStatus,
    {
        label: string;
        color:
            | "success"
            | "warning"
            | "error"
            | "default";
    }
> = {

    ACTIVE: {
        label: "Active",
        color: "success",
    },

    SCHEDULED: {
        label: "Scheduled",
        color: "warning",
    },

    EXPIRED: {
        label: "Expired",
        color: "error",
    },

    PAUSED: {
        label: "Paused",
        color: "default",
    },
};

export default function InStorePromotions() {

    const [
        promotions,
        setPromotions,
    ] = useState<Promotion[]>(
        initialPromotions
    );


    const [
        search,
        setSearch,
    ] = useState("");


    const [
        statusFilter,
        setStatusFilter,
    ] = useState<
        PromotionStatus | "ALL"
    >("ALL");


    const [
        openCreate,
        setOpenCreate,
    ] = useState(false);


    const [
        editingPromotion,
        setEditingPromotion,
    ] = useState<Promotion | null>(
        null
    );


    const filteredPromotions =
        useMemo(() => {

            const query =
                search
                    .toLowerCase()
                    .trim();

            return promotions.filter(
                promotion => {

                    const matchesSearch =
                        !query ||
                        promotion.name
                            .toLowerCase()
                            .includes(query) ||
                        promotion.id
                            .toLowerCase()
                            .includes(query);

                    const matchesStatus =
                        statusFilter ===
                            "ALL" ||
                        promotion.status ===
                            statusFilter;

                    return (
                        matchesSearch &&
                        matchesStatus
                    );
                }
            );

        }, [
            promotions,
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
                mb={4}
            >

                <Box>

                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                    >

                        <CampaignRounded fontSize="large"/>

                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >
                            In-store Promotions
                        </Typography>

                    </Stack>

                    <Typography
                        color="text.secondary"
                        sx={{
                            mt: 0.5,
                        }}
                    >
                        Create and manage promotional
                        campaigns for your store.
                    </Typography>

                </Box>


                <Button
                    variant="contained"
                    startIcon={
                        <AddRounded />
                    }
                    onClick={() =>
                        setOpenCreate(true)
                    }
                >
                    New Promotion
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

                <SummaryCard
                    title="Active"
                    value={
                        promotions.filter(
                            p =>
                                p.status ===
                                "ACTIVE"
                        ).length
                    }
                />

                <SummaryCard
                    title="Scheduled"
                    value={
                        promotions.filter(
                            p =>
                                p.status ===
                                "SCHEDULED"
                        ).length
                    }
                />

                <SummaryCard
                    title="Paused"
                    value={
                        promotions.filter(
                            p =>
                                p.status ===
                                "PAUSED"
                        ).length
                    }
                />

                <SummaryCard
                    title="Expired"
                    value={
                        promotions.filter(
                            p =>
                                p.status ===
                                "EXPIRED"
                        ).length
                    }
                />

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
                    placeholder="Search promotion..."
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


                <FormControl
                    sx={{
                        minWidth: 180,
                    }}
                >

                    <InputLabel>
                        Status
                    </InputLabel>

                    <Select
                        value={statusFilter}
                        label="Status"
                        onChange={event =>
                            setStatusFilter(
                                event.target.value as
                                    PromotionStatus |
                                    "ALL"
                            )
                        }
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

                        <MenuItem value="PAUSED">
                            Paused
                        </MenuItem>

                        <MenuItem value="EXPIRED">
                            Expired
                        </MenuItem>

                    </Select>

                </FormControl>

            </Stack>


            {/* ================================================= */}
            {/* PROMOTION LIST */}
            {/* ================================================= */}

            <Grid
                container
                spacing={2}
            >

                {filteredPromotions.map(
                    promotion => (

                        <Grid
                            key={promotion.id}
                            size={{
                                xs: 12,
                                md: 6,
                                lg: 4,
                            }}
                        >

                            <PromotionCard
                                promotion={
                                    promotion
                                }
                                onEdit={() =>
                                    setEditingPromotion(
                                        promotion
                                    )
                                }
                            />

                        </Grid>

                    )
                )}

            </Grid>


            {/* ================================================= */}
            {/* CREATE */}
            {/* ================================================= */}

            <PromotionDialog
                open={openCreate}
                onClose={() =>
                    setOpenCreate(false)
                }
                onSave={promotion => {

                    setPromotions(prev => [
                        {
                            ...promotion,
                            id:
                                `PROMO-${Date.now()}`,
                            status:
                                "SCHEDULED",
                            usageCount: 0,
                        },
                        ...prev,
                    ]);

                    setOpenCreate(false);
                }}
            />


            {/* ================================================= */}
            {/* EDIT */}
            {/* ================================================= */}

            {editingPromotion && (

                <PromotionDialog
                    open
                    promotion={
                        editingPromotion
                    }
                    onClose={() =>
                        setEditingPromotion(
                            null
                        )
                    }
                    onSave={updated => {

                        setPromotions(prev =>
                            prev.map(p =>
                                p.id ===
                                editingPromotion.id
                                    ? {
                                        ...p,
                                        ...updated,
                                    }
                                    : p
                            )
                        );

                        setEditingPromotion(
                            null
                        );
                    }}
                />

            )}

        </Box>
    );
}

function SummaryCard({
    title,
    value,
}: {
    title: string;
    value: number;
}) {

    return (

        <Grid
            size={3}
        >

            <Card
                variant="outlined"
                sx={{
                    borderRadius: 3,
                }}
            >

                <CardContent>

                    <Typography
                        color="text.secondary"
                    >
                        {title}
                    </Typography>

                    <Typography
                        variant="h4"
                        fontWeight={800}
                        sx={{
                            mt: 0.5,
                        }}
                    >
                        {value}
                    </Typography>

                </CardContent>

            </Card>

        </Grid>
    );
}

function PromotionCard({
    promotion,
    onEdit,
}: {
    promotion: Promotion;
    onEdit: () => void;
}) {

    const config =
        statusConfig[
            promotion.status
        ];


    return (

        <Card
            variant="outlined"
            sx={{
                height: "100%",
                borderRadius: 3,

                transition:
                    "all .2s",

                "&:hover": {
                    transform:
                        "translateY(-2px)",
                    boxShadow: 3,
                },
            }}
        >

            <CardContent>

                {/* HEADER */}

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    gap={1}
                >

                    <Box>

                        <Typography
                            variant="h6"
                            fontWeight={700}
                        >
                            {promotion.name}
                        </Typography>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            {promotion.id}
                        </Typography>

                    </Box>


                    <Chip
                        size="small"
                        label={
                            config.label
                        }
                        color={
                            config.color
                        }
                    />

                </Stack>


                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mt: 2,
                        minHeight: 42,
                    }}
                >
                    {promotion.description}
                </Typography>


                <Divider
                    sx={{
                        my: 2,
                    }}
                />


                {/* DISCOUNT */}

                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    mb={2}
                >

                    <PercentRounded
                        color="primary"
                    />

                    <Typography
                        variant="h5"
                        fontWeight={800}
                    >
                        {promotion.discountType ===
                        "PERCENTAGE"
                            ? `${promotion.discountValue}% OFF`
                            : `¥${promotion.discountValue.toLocaleString()} OFF`}
                    </Typography>

                </Stack>


                {/* DATE */}

                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                >

                    <CalendarMonthRounded
                        fontSize="small"
                        color="action"
                    />

                    <Typography
                        variant="body2"
                    >
                        {promotion.startDate}
                        {" → "}
                        {promotion.endDate}
                    </Typography>

                </Stack>


                {/* MINIMUM */}

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mt: 1,
                    }}
                >
                    Minimum purchase:
                    {" "}
                    ¥
                    {promotion.minimumPurchase.toLocaleString()}
                </Typography>


                {/* USAGE */}

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mt: 1,
                    }}
                >
                    Used:
                    {" "}
                    {promotion.usageCount}

                    {promotion.usageLimit
                        ? ` / ${promotion.usageLimit}`
                        : ""}
                </Typography>


                {/* ACTIONS */}

                <Stack
                    direction="row"
                    spacing={1}
                    mt={3}
                >

                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={
                            <EditRounded />
                        }
                        onClick={onEdit}
                    >
                        Edit
                    </Button>

                </Stack>

            </CardContent>

        </Card>
    );
}

function PromotionDialog({
    open,
    onClose,
    onSave,
    promotion,
}: {
    open: boolean;

    onClose: () => void;

    onSave: (
        promotion: Omit<
            Promotion,
            "id" |
            "status" |
            "usageCount"
        >
    ) => void;

    promotion?: Promotion;
}) {

    const [
        name,
        setName,
    ] = useState(
        promotion?.name ?? ""
    );


    const [
        description,
        setDescription,
    ] = useState(
        promotion?.description ?? ""
    );


    const [
        discountType,
        setDiscountType,
    ] = useState<DiscountType>(
        promotion?.discountType ??
        "PERCENTAGE"
    );


    const [
        discountValue,
        setDiscountValue,
    ] = useState(
        promotion?.discountValue
            ?.toString() ?? ""
    );


    const [
        minimumPurchase,
        setMinimumPurchase,
    ] = useState(
        promotion?.minimumPurchase
            ?.toString() ?? ""
    );


    const [
        maximumDiscount,
        setMaximumDiscount,
    ] = useState(
        promotion?.maximumDiscount
            ?.toString() ?? ""
    );


    const [
        startDate,
        setStartDate,
    ] = useState(
        promotion?.startDate ?? ""
    );


    const [
        endDate,
        setEndDate,
    ] = useState(
        promotion?.endDate ?? ""
    );


    const [
        usageLimit,
        setUsageLimit,
    ] = useState(
        promotion?.usageLimit
            ?.toString() ?? ""
    );


    const [
        error,
        setError,
    ] = useState("");


    const handleSave = () => {

        if (!name.trim()) {
            setError(
                "Promotion name is required."
            );
            return;
        }


        if (!startDate || !endDate) {
            setError(
                "Please select the promotion date range."
            );
            return;
        }


        if (endDate < startDate) {
            setError(
                "End date must be after start date."
            );
            return;
        }


        if (!discountValue) {
            setError(
                "Discount value is required."
            );
            return;
        }


        setError("");


        onSave({

            name,

            description,

            discountType,

            discountValue:
                Number(discountValue),

            minimumPurchase:
                Number(minimumPurchase) || 0,

            maximumDiscount:
                maximumDiscount
                    ? Number(
                        maximumDiscount
                    )
                    : undefined,

            startDate,

            endDate,

            applicableProducts: [],

            applicableCategories: [],

            usageLimit:
                usageLimit
                    ? Number(usageLimit)
                    : undefined,
        });
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
                            {promotion
                                ? "Edit Promotion"
                                : "New Promotion"}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Define promotion rules
                            and availability period.
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

                    {/* NAME */}

                    <Grid
                        size={{
                            xs: 12,
                        }}
                    >

                        <TextField
                            fullWidth
                            label="Promotion Name"
                            placeholder="e.g. Summer Collection Sale"
                            value={name}
                            onChange={event =>
                                setName(
                                    event.target.value
                                )
                            }
                        />

                    </Grid>


                    {/* DESCRIPTION */}

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
                            placeholder="Describe this promotion..."
                            value={description}
                            onChange={event =>
                                setDescription(
                                    event.target.value
                                )
                            }
                        />

                    </Grid>


                    {/* DISCOUNT TYPE */}

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
                                Discount Type
                            </InputLabel>

                            <Select
                                value={
                                    discountType
                                }
                                label="Discount Type"
                                onChange={event =>
                                    setDiscountType(
                                        event.target.value as
                                            DiscountType
                                    )
                                }
                            >

                                <MenuItem value="PERCENTAGE">
                                    Percentage
                                </MenuItem>

                                <MenuItem value="FIXED">
                                    Fixed Amount
                                </MenuItem>

                            </Select>

                        </FormControl>

                    </Grid>


                    {/* DISCOUNT */}

                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                        }}
                    >

                        <TextField
                            fullWidth
                            type="number"
                            label={
                                discountType ===
                                "PERCENTAGE"
                                    ? "Discount (%)"
                                    : "Discount (¥)"
                            }
                            value={
                                discountValue
                            }
                            onChange={event =>
                                setDiscountValue(
                                    event.target.value
                                )
                            }
                        />

                    </Grid>


                    {/* MINIMUM PURCHASE */}

                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                        }}
                    >

                        <TextField
                            fullWidth
                            type="number"
                            label="Minimum Purchase (¥)"
                            value={
                                minimumPurchase
                            }
                            onChange={event =>
                                setMinimumPurchase(
                                    event.target.value
                                )
                            }
                        />

                    </Grid>


                    {/* MAXIMUM DISCOUNT */}

                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                        }}
                    >

                        <TextField
                            fullWidth
                            type="number"
                            label="Maximum Discount (¥)"
                            value={
                                maximumDiscount
                            }
                            onChange={event =>
                                setMaximumDiscount(
                                    event.target.value
                                )
                            }
                        />

                    </Grid>


                    {/* DATE RANGE */}

                    <Grid
                        size={{
                            xs: 12,
                        }}
                    >

                        <Typography
                            variant="subtitle1"
                            fontWeight={700}
                            sx={{
                                mb: 1.5,
                            }}
                        >
                            Promotion Availability
                        </Typography>

                    </Grid>


                    {/* START DATE */}

                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                        }}
                    >

                        <TextField
                            fullWidth
                            type="date"
                            label="Available From"
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
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment
                                        position="start"
                                    >
                                        <CalendarMonthRounded />
                                    </InputAdornment>
                                ),
                            }}
                        />

                    </Grid>


                    {/* END DATE */}

                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                        }}
                    >

                        <TextField
                            fullWidth
                            type="date"
                            label="Available Until"
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
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment
                                        position="start"
                                    >
                                        <CalendarMonthRounded />
                                    </InputAdornment>
                                ),
                            }}
                        />

                    </Grid>


                    {/* USAGE LIMIT */}

                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                        }}
                    >

                        <TextField
                            fullWidth
                            type="number"
                            label="Usage Limit"
                            placeholder="Unlimited"
                            value={
                                usageLimit
                            }
                            onChange={event =>
                                setUsageLimit(
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
                        <AddRounded />
                    }
                    onClick={handleSave}
                >
                    {promotion
                        ? "Save Changes"
                        : "Create Promotion"}
                </Button>

            </DialogActions>

        </Dialog>
    );
}