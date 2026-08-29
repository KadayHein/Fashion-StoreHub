"use client";

import React, { useMemo, useState } from "react";

import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import {
    AccessTimeRounded,
    AddRounded,
    DiscountRounded,
    Inventory2Rounded,
    SearchRounded,
    ShoppingBagRounded,
} from "@mui/icons-material";
import NewArrivalCard from "./NewArrivalCard";
import AddUpcomingProductPopUp from "./AddUpcomingProductPopUp";

// ============================================================
// MOCK DATA
// ============================================================

const newArrivals: NewArrival[] = [

    {
        id: 1,

        name: "Oversized Cotton T-Shirt",

        sku: "TSH-OS-001",

        image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",

        availableOn: "2026-08-28",

        status: "UPCOMING",

        colors: [
            "Black",
            "White",
            "Gray",
        ],

        sizes: [
            "S",
            "M",
            "L",
            "XL",
        ],

        price: 3980,

        discount: 15,

        promotionType: "BOTH",

        firstSalesLimit: 10,

        bulkMinimum: 2,

        bulkDiscount: 10,

        description:
            "Relaxed oversized cotton T-shirt with a heavyweight fabric.",
    },


    {
        id: 2,

        name: "Wide Leg Cargo Pants",

        sku: "PNT-WC-002",

        image:
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",

        availableOn: "2026-08-26",

        status: "UPCOMING",

        colors: [
            "Black",
            "Khaki",
        ],

        sizes: [
            "S",
            "M",
            "L",
        ],

        price: 6980,

        discount: 10,

        promotionType: "FIRST_SALES",

        firstSalesLimit: 10,

        description:
            "Wide-leg cargo pants designed for everyday streetwear.",
    },


    {
        id: 3,

        name: "Minimal Leather Jacket",

        sku: "JKT-LM-003",

        image:
            "https://images.unsplash.com/photo-1551028719-00167b16eac5",

        availableOn: "2026-08-25",

        status: "LIMITED",

        colors: [
            "Black",
            "Brown",
        ],

        sizes: [
            "M",
            "L",
            "XL",
        ],

        price: 12800,

        promotionType: "BULK",

        bulkMinimum: 2,

        bulkDiscount: 12,

        description:
            "Minimal leather jacket with a clean premium silhouette.",
    },


    {
        id: 4,

        name: "Relaxed Knit Sweater",

        sku: "SWT-RK-004",

        image:
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27",

        availableOn: "2026-09-02",

        status: "UPCOMING",

        colors: [
            "Cream",
            "Brown",
            "Navy",
        ],

        sizes: [
            "M",
            "L",
        ],

        price: 5980,

        discount: 8,

        promotionType: "BOTH",

        firstSalesLimit: 10,

        bulkMinimum: 2,

        bulkDiscount: 8,

        description:
            "Soft knit sweater suitable for autumn layering.",
    },

];


// ============================================================
// STATUS CONFIG
// ============================================================

const statusConfig: Record<
    ArrivalStatus,
    {
        label: string;
        color:
        | "default"
        | "success"
        | "warning";
    }
> = {

    UPCOMING: {
        label: "Coming Soon",
        color: "warning",
    },

    AVAILABLE: {
        label: "Available",
        color: "success",
    },

    LIMITED: {
        label: "Limited Stock",
        color: "warning",
    },

};

// ============================================================
// COMPONENT
// ============================================================

export default function NewArrivals() {

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState<ArrivalStatus | "ALL">("ALL");

    const [addUpcomingOpen, setAddUpcomingOpen] = useState(false);

    const filteredProducts = useMemo(() => {

        return newArrivals.filter(
            product => {

                const searchMatch =
                    product.name
                        .toLowerCase()
                        .includes(
                            search.toLowerCase()
                        ) ||
                    product.sku
                        .toLowerCase()
                        .includes(
                            search.toLowerCase()
                        );


                const statusMatch =
                    statusFilter === "ALL" ||
                    product.status ===
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

                        <ShoppingBagRounded />

                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >
                            New Arrivals
                        </Typography>
                    </Stack>

                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                            mt: 0.5,
                        }}
                    >
                        Preview upcoming products,
                        availability and promotional
                        offers.
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    startIcon={<AddRounded />}
                    onClick={() =>
                        setAddUpcomingOpen(true)
                    }
                >
                    Add Upcoming Product
                </Button>

                <AddUpcomingProductPopUp
                    open={addUpcomingOpen}
                    onClose={() =>
                        setAddUpcomingOpen(false)
                    }
                    onSubmit={(product) => {
                        alert(
                            "New Upcoming Product:"+product.name
                        );

                        // API call here
                    }}
                />

            </Stack>


            {/* =================================================
                FILTER BAR
            ================================================= */}

            <Card
                elevation={0}
                sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 3,
                    mb: 3,
                }}
            >

                <CardContent>

                    <Stack
                        direction={{
                            xs: "column",
                            sm: "row",
                        }}
                        spacing={2}
                    >

                        {/* SEARCH */}

                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Search product or SKU..."
                            value={search}
                            onChange={e =>
                                setSearch(
                                    e.target.value
                                )
                            }
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


                        {/* STATUS */}

                        <FormControl
                            size="small"
                            sx={{
                                minWidth: {
                                    sm: 180,
                                },
                            }}
                        >

                            <InputLabel>
                                Status
                            </InputLabel>

                            <Select
                                value={
                                    statusFilter
                                }
                                label="Status"
                                onChange={(
                                    event: SelectChangeEvent
                                ) =>
                                    setStatusFilter(
                                        event.target
                                            .value as
                                        | ArrivalStatus
                                        | "ALL"
                                    )
                                }
                            >

                                <MenuItem value="ALL">
                                    All Products
                                </MenuItem>

                                <MenuItem value="UPCOMING">
                                    Coming Soon
                                </MenuItem>

                                <MenuItem value="AVAILABLE">
                                    Available
                                </MenuItem>

                                <MenuItem value="LIMITED">
                                    Limited Stock
                                </MenuItem>

                            </Select>

                        </FormControl>

                    </Stack>

                </CardContent>

            </Card>


            {/* =================================================
                SUMMARY
            ================================================= */}

            <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                useFlexGap
                mb={3}
            >

                <Chip
                    icon={
                        <Inventory2Rounded />
                    }
                    label={`${filteredProducts.length} New Products`}
                />

                <Chip
                    icon={
                        <AccessTimeRounded />
                    }
                    label="Upcoming Releases"
                    variant="outlined"
                />

                <Chip
                    icon={
                        <DiscountRounded />
                    }
                    label="Promotional Offers"
                    variant="outlined"
                />

            </Stack>


            {/* =================================================
                PRODUCT GRID
            ================================================= */}

            <Grid
                container
                spacing={2.5}
            >
                {filteredProducts.map(
                    product => (
                        <Grid
                            key={product.id}
                            size={{
                                xs: 6,
                                sm: 6,
                                md: 4,
                                lg: 4,
                                xl: 3,
                            }}>
                            <NewArrivalCard
                                product={product}
                                statusConfig={statusConfig}
                            />
                        </Grid>
                    )
                )}
            </Grid>


            {/* EMPTY STATE */}

            {filteredProducts.length ===
                0 && (
                    <Box
                        sx={{
                            py: 10,
                            textAlign: "center",
                        }}
                    >
                        <SearchRounded
                            sx={{
                                fontSize: 50,
                                color:
                                    "text.disabled",
                            }}
                        />

                        <Typography
                            fontWeight={600}
                            color="text.secondary"
                        >
                            No new arrivals found
                        </Typography>
                    </Box>

                )}

        </Box>
    );
}