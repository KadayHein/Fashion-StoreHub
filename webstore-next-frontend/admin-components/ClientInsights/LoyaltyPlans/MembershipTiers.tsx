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
    LinearProgress,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";

import {
    AddRounded,
    CloseRounded,
    EditRounded,
    GroupsRounded,
    LoyaltyRounded,
    MoreVertRounded,
    PercentRounded,
    StarRounded,
    TrendingUpRounded,
} from "@mui/icons-material";


/* =========================================================
   TYPES
========================================================= */

type TierStatus =
    | "ACTIVE"
    | "INACTIVE";

interface MembershipTier {
    id: string;
    name: string;

    minSpend: number;
    maxSpend?: number;

    minOrders: number;

    discount: number;
    pointsMultiplier: number;

    customerCount: number;

    status: TierStatus;

    description: string;
}


/* =========================================================
   MOCK DATA
========================================================= */

const initialTiers: MembershipTier[] = [

    {
        id: "tier-1",
        name: "Bronze",

        minSpend: 0,
        maxSpend: 49999,

        minOrders: 0,

        discount: 0,
        pointsMultiplier: 1,

        customerCount: 1248,

        status: "ACTIVE",

        description:
            "Entry-level membership for all customers.",
    },

    {
        id: "tier-2",
        name: "Silver",

        minSpend: 50000,
        maxSpend: 149999,

        minOrders: 3,

        discount: 3,
        pointsMultiplier: 1.25,

        customerCount: 624,

        status: "ACTIVE",

        description:
            "Benefits for customers with regular purchases.",
    },

    {
        id: "tier-3",
        name: "Gold",

        minSpend: 150000,
        maxSpend: 299999,

        minOrders: 8,

        discount: 5,
        pointsMultiplier: 1.5,

        customerCount: 238,

        status: "ACTIVE",

        description:
            "Premium benefits for highly active customers.",
    },

    {
        id: "tier-4",
        name: "Platinum",

        minSpend: 300000,

        minOrders: 12,

        discount: 10,
        pointsMultiplier: 2,

        customerCount: 86,

        status: "ACTIVE",

        description:
            "Highest membership level with exclusive benefits.",
    },

];


/* =========================================================
   HELPERS
========================================================= */

const formatYen = (value: number) => {

    return `¥${value.toLocaleString()}`;

};


/* =========================================================
   TIER COLOR
========================================================= */

const tierColor = (name: string) => {

    switch (name) {

        case "Bronze":
            return "#A66A3F";

        case "Silver":
            return "#7A7A7A";

        case "Gold":
            return "#C99A00";

        case "Platinum":
            return "#52606D";

        default:
            return "#666";

    }

};


/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function MembershipTiers() {

    const [
        tiers,
        setTiers
    ] = useState<MembershipTier[]>(
        initialTiers
    );

    const [
        selectedTier,
        setSelectedTier
    ] = useState<MembershipTier | null>(
        null
    );

    const [
        dialogOpen,
        setDialogOpen
    ] = useState(false);


    const [
        statusFilter,
        setStatusFilter
    ] = useState<"ALL" | TierStatus>(
        "ALL"
    );


    /* -------------------------------------------------------
       SUMMARY
    ------------------------------------------------------- */

    const totalCustomers = useMemo(
        () =>
            tiers.reduce(
                (sum, tier) =>
                    sum + tier.customerCount,
                0
            ),
        [tiers]
    );


    const activeTiers = tiers.filter(
        tier =>
            tier.status === "ACTIVE"
    ).length;


    const highestTier =
        tiers[tiers.length - 1];


    /* -------------------------------------------------------
       FILTER
    ------------------------------------------------------- */

    const filteredTiers =
        tiers.filter(tier => {

            if (
                statusFilter === "ALL"
            ) {
                return true;
            }

            return (
                tier.status ===
                statusFilter
            );

        });


    /* -------------------------------------------------------
       EDIT
    ------------------------------------------------------- */

    const handleEdit = (
        tier: MembershipTier
    ) => {

        setSelectedTier(tier);

        setDialogOpen(true);

    };


    /* -------------------------------------------------------
       CREATE
    ------------------------------------------------------- */

    const handleCreate = () => {

        setSelectedTier(null);

        setDialogOpen(true);

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

                        <LoyaltyRounded fontSize="large"/>

                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >
                            Membership Tiers
                        </Typography>

                    </Stack>

                    <Typography
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                    >
                        Configure membership levels,
                        qualification rules and
                        customer benefits.
                    </Typography>

                </Box>


                <Button
                    variant="contained"
                    startIcon={
                        <AddRounded />
                    }
                    onClick={
                        handleCreate
                    }
                >
                    Add Membership Tier
                </Button>

            </Stack>


            {/* =================================================
                SUMMARY CARDS
            ================================================= */}

            <Grid
                container
                spacing={2}
                mb={4}
            >

                {/* TOTAL CUSTOMERS */}

                <Grid
                    size={{
                        xs: 6,
                        lg: 3,
                    }}
                >

                    <SummaryCard
                        title="Members"
                        value={
                            totalCustomers.toLocaleString()
                        }
                        subtitle="Total loyalty members"
                        icon={
                            <GroupsRounded />
                        }
                    />

                </Grid>


                {/* ACTIVE TIERS */}

                <Grid
                    size={{
                        xs: 6,
                        lg: 3,
                    }}
                >

                    <SummaryCard
                        title="Active Tiers"
                        value={
                            activeTiers.toString()
                        }
                        subtitle="Currently available"
                        icon={
                            <LoyaltyRounded />
                        }
                    />

                </Grid>


                {/* HIGHEST TIER */}

                <Grid
                    size={{
                        xs: 6,
                        lg: 3,
                    }}
                >

                    <SummaryCard
                        title="Highest Tier"
                        value={
                            highestTier?.name ??
                            "-"
                        }
                        subtitle="Top membership level"
                        icon={
                            <StarRounded />
                        }
                    />

                </Grid>


                {/* DISCOUNT */}

                <Grid
                    size={{
                        xs: 6,
                        lg: 3,
                    }}
                >

                    <SummaryCard
                        title="Top Discount"
                        value={
                            `${highestTier?.discount ?? 0}%`
                        }
                        subtitle="Maximum member discount"
                        icon={
                            <PercentRounded />
                        }
                    />

                </Grid>

            </Grid>


            {/* =================================================
                FILTER BAR
            ================================================= */}

            <Paper
                variant="outlined"
                sx={{
                    p: 2,
                    mb: 3,
                    borderRadius: 3,
                }}
            >

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

                    <Box>

                        <Typography
                            fontWeight={700}
                        >
                            Membership Structure
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Manage customer
                            qualification levels.
                        </Typography>

                    </Box>


                    <Select
                        size="small"
                        value={statusFilter}
                        onChange={(
                            event: SelectChangeEvent
                        ) =>
                            setStatusFilter(
                                event.target.value as
                                "ALL" |
                                TierStatus
                            )
                        }
                        sx={{
                            minWidth: 150,
                        }}
                    >

                        <MenuItem value="ALL">
                            All Tiers
                        </MenuItem>

                        <MenuItem value="ACTIVE">
                            Active
                        </MenuItem>

                        <MenuItem value="INACTIVE">
                            Inactive
                        </MenuItem>

                    </Select>

                </Stack>

            </Paper>


            {/* =================================================
                TIER CARDS
            ================================================= */}

            <Grid
                container
                spacing={2.5}
            >

                {filteredTiers.map(
                    (tier, index) => (

                        <Grid
                            key={tier.id}
                            size={{
                                xs: 12,
                                md: 6,
                                xl: 3,
                            }}
                        >

                            <TierCard
                                tier={tier}
                                index={index}
                                totalCustomers={
                                    totalCustomers
                                }
                                onEdit={() =>
                                    handleEdit(tier)
                                }
                            />

                        </Grid>

                    )
                )}

            </Grid>


            {/* =================================================
                DIALOG
            ================================================= */}

            <TierDialog
                open={dialogOpen}
                tier={selectedTier}
                onClose={() =>
                    setDialogOpen(false)
                }
                onSave={(tier) => {

                    if (selectedTier) {

                        setTiers(prev =>
                            prev.map(item =>
                                item.id ===
                                tier.id
                                    ? tier
                                    : item
                            )
                        );

                    } else {

                        setTiers(prev => [
                            ...prev,
                            tier,
                        ]);

                    }

                    setDialogOpen(false);

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
   TIER CARD
========================================================= */

function TierCard({
    tier,
    index,
    totalCustomers,
    onEdit,
}: {
    tier: MembershipTier;
    index: number;
    totalCustomers: number;
    onEdit: () => void;
}) {

    const percentage =
        totalCustomers > 0
            ? (
                tier.customerCount /
                totalCustomers
            ) * 100
            : 0;


    return (

        <Card
            variant="outlined"
            sx={{
                borderRadius: 3,
                height: "100%",
                position: "relative",
                overflow: "hidden",
            }}
        >

            {/* TIER HEADER */}

            <Box
                sx={{
                    height: 8,
                    bgcolor:
                        tierColor(
                            tier.name
                        ),
                }}
            />


            <CardContent>

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                >

                    <Box>

                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                        >

                            <Typography
                                variant="h5"
                                fontWeight={800}
                            >
                                {tier.name}
                            </Typography>

                            <Chip
                                size="small"
                                label={
                                    tier.status
                                }
                                color={
                                    tier.status ===
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
                            {tier.description}
                        </Typography>

                    </Box>


                    <Tooltip title="Edit Tier">

                        <IconButton
                            onClick={onEdit}
                        >
                            <EditRounded />
                        </IconButton>

                    </Tooltip>

                </Stack>


                <Divider
                    sx={{
                        my: 2,
                    }}
                />


                {/* QUALIFICATION */}

                <Typography
                    variant="subtitle2"
                    fontWeight={700}
                    sx={{
                        mb: 1,
                    }}
                >
                    Qualification
                </Typography>


                <Stack spacing={1}>

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                    >

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Minimum Spend
                        </Typography>

                        <Typography
                            variant="body2"
                            fontWeight={600}
                        >
                            {formatYen(
                                tier.minSpend
                            )}
                        </Typography>

                    </Stack>


                    {tier.maxSpend !==
                        undefined && (

                        <Stack
                            direction="row"
                            justifyContent="space-between"
                        >

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Maximum Spend
                            </Typography>

                            <Typography
                                variant="body2"
                                fontWeight={600}
                            >
                                {formatYen(
                                    tier.maxSpend
                                )}
                            </Typography>

                        </Stack>

                    )}


                    <Stack
                        direction="row"
                        justifyContent="space-between"
                    >

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Minimum Orders
                        </Typography>

                        <Typography
                            variant="body2"
                            fontWeight={600}
                        >
                            {tier.minOrders}
                        </Typography>

                    </Stack>

                </Stack>


                {/* BENEFITS */}

                <Typography
                    variant="subtitle2"
                    fontWeight={700}
                    sx={{
                        mt: 2,
                        mb: 1,
                    }}
                >
                    Benefits
                </Typography>


                <Stack spacing={1}>

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                    >

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Member Discount
                        </Typography>

                        <Chip
                            size="small"
                            icon={
                                <PercentRounded />
                            }
                            label={`${tier.discount}%`}
                        />

                    </Stack>


                    <Stack
                        direction="row"
                        justifyContent="space-between"
                    >

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Points Multiplier
                        </Typography>

                        <Chip
                            size="small"
                            icon={
                                <StarRounded />
                            }
                            label={`${tier.pointsMultiplier}×`}
                        />

                    </Stack>

                </Stack>


                <Divider
                    sx={{
                        my: 2,
                    }}
                />


                {/* CUSTOMER DISTRIBUTION */}

                <Stack spacing={1}>

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                    >

                        <Typography
                            variant="body2"
                            fontWeight={600}
                        >
                            Members
                        </Typography>

                        <Typography
                            variant="body2"
                            fontWeight={700}
                        >
                            {tier.customerCount.toLocaleString()}
                        </Typography>

                    </Stack>


                    <LinearProgress
                        variant="determinate"
                        value={Math.min(
                            percentage,
                            100
                        )}
                        sx={{
                            height: 6,
                            borderRadius: 10,
                        }}
                    />


                    <Typography
                        variant="caption"
                        color="text.secondary"
                    >
                        {percentage.toFixed(1)}%
                        {" "}of all members
                    </Typography>

                </Stack>


                <Button
                    fullWidth
                    variant="outlined"
                    sx={{
                        mt: 2,
                    }}
                    onClick={onEdit}
                >
                    Manage Tier
                </Button>

            </CardContent>

        </Card>

    );

}


/* =========================================================
   TIER DIALOG
========================================================= */

function TierDialog({
    open,
    tier,
    onClose,
    onSave,
}: {
    open: boolean;

    tier: MembershipTier | null;

    onClose: () => void;

    onSave: (
        tier: MembershipTier
    ) => void;
}) {

    const [name, setName] =
        useState(
            tier?.name ?? ""
        );

    const [description, setDescription] =
        useState(
            tier?.description ?? ""
        );

    const [minSpend, setMinSpend] =
        useState(
            tier?.minSpend.toString() ??
            ""
        );

    const [maxSpend, setMaxSpend] =
        useState(
            tier?.maxSpend?.toString() ??
            ""
        );

    const [minOrders, setMinOrders] =
        useState(
            tier?.minOrders.toString() ??
            "0"
        );

    const [discount, setDiscount] =
        useState(
            tier?.discount.toString() ??
            "0"
        );

    const [pointsMultiplier, setPointsMultiplier] =
        useState(
            tier?.pointsMultiplier.toString() ??
            "1"
        );

    const [status, setStatus] =
        useState<TierStatus>(
            tier?.status ??
            "ACTIVE"
        );


    const handleSave = () => {

        const newTier: MembershipTier = {

            id:
                tier?.id ??
                `tier-${Date.now()}`,

            name:
                name.trim(),

            description:
                description.trim(),

            minSpend:
                Number(minSpend) || 0,

            maxSpend:
                maxSpend
                    ? Number(maxSpend)
                    : undefined,

            minOrders:
                Number(minOrders) || 0,

            discount:
                Number(discount) || 0,

            pointsMultiplier:
                Number(pointsMultiplier) || 1,

            customerCount:
                tier?.customerCount ??
                0,

            status,

        };

        onSave(newTier);

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
                            {tier
                                ? "Edit Membership Tier"
                                : "Create Membership Tier"}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Configure qualification
                            rules and member benefits.
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

                <Grid
                    container
                    spacing={2.5}
                >

                    {/* BASIC INFO */}

                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                        }}
                    >

                        <TextField
                            fullWidth
                            label="Tier Name"
                            placeholder="e.g. Gold"
                            value={name}
                            onChange={e =>
                                setName(
                                    e.target.value
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

                        <Select
                            fullWidth
                            value={status}
                            onChange={e =>
                                setStatus(
                                    e.target.value as
                                    TierStatus
                                )
                            }
                        >

                            <MenuItem value="ACTIVE">
                                Active
                            </MenuItem>

                            <MenuItem value="INACTIVE">
                                Inactive
                            </MenuItem>

                        </Select>

                    </Grid>


                    <Grid
                        size={{
                            xs: 12,
                        }}
                    >

                        <TextField
                            fullWidth
                            multiline
                            rows={2}
                            label="Description"
                            value={
                                description
                            }
                            onChange={e =>
                                setDescription(
                                    e.target.value
                                )
                            }
                        />

                    </Grid>


                    {/* QUALIFICATION */}

                    <Grid
                        size={{
                            xs: 12,
                        }}
                    >

                        <Typography
                            fontWeight={700}
                        >
                            Qualification Rules
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
                            label="Minimum Spend (¥)"
                            value={
                                minSpend
                            }
                            onChange={e =>
                                setMinSpend(
                                    e.target.value
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
                            label="Maximum Spend (¥)"
                            helperText="Leave empty for no limit."
                            value={
                                maxSpend
                            }
                            onChange={e =>
                                setMaxSpend(
                                    e.target.value
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
                            label="Minimum Orders"
                            value={
                                minOrders
                            }
                            onChange={e =>
                                setMinOrders(
                                    e.target.value
                                )
                            }
                        />

                    </Grid>


                    {/* BENEFITS */}

                    <Grid
                        size={{
                            xs: 12,
                        }}
                    >

                        <Typography
                            fontWeight={700}
                            sx={{
                                mt: 1,
                            }}
                        >
                            Member Benefits
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
                            label="Member Discount (%)"
                            value={
                                discount
                            }
                            onChange={e =>
                                setDiscount(
                                    e.target.value
                                )
                            }
                            inputProps={{
                                min: 0,
                                max: 100,
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
                            type="number"
                            label="Points Multiplier"
                            value={
                                pointsMultiplier
                            }
                            onChange={e =>
                                setPointsMultiplier(
                                    e.target.value
                                )
                            }
                            inputProps={{
                                min: 1,
                                step: 0.25,
                            }}
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
                    onClick={
                        handleSave
                    }
                    disabled={
                        !name.trim()
                    }
                >
                    {tier
                        ? "Save Changes"
                        : "Create Tier"}
                </Button>

            </DialogActions>

        </Dialog>

    );

}