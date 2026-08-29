"use client";

import React, { useMemo, useState } from "react";

import {
    Avatar,
    Box,
    Card,
    Chip,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Pagination,
    Paper,
    Select,
    SelectChangeEvent,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";

import {
    AttachMoneyRounded,
    EmojiEventsRounded,
    Inventory2Rounded,
    ReceiptLongRounded,
    SearchRounded,
    TrendingUpRounded,
} from "@mui/icons-material";


// ============================================================
// TYPES
// ============================================================

type SalesPeriod =
    | "TODAY"
    | "WEEK"
    | "MONTH"
    | "YEAR"
    | "ALL";

type SortType =
    | "ORDERS"
    | "QUANTITY"
    | "REVENUE";

interface BestSeller {
    id: number;

    name: string;

    sku: string;

    image: string;

    orders: number;

    quantitySold: number;

    revenue: number;

    averagePrice: number;

    stockRemaining: number;

    category: string;
}


// ============================================================
// MOCK DATA
// ============================================================

const bestSellerData: BestSeller[] = [

    {
        id: 1,
        name: "Oversized Cotton T-Shirt",
        sku: "TSH-OS-001",
        image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        orders: 342,
        quantitySold: 421,
        revenue: 1675580,
        averagePrice: 3980,
        stockRemaining: 82,
        category: "T-Shirts",
    },

    {
        id: 2,
        name: "Wide Leg Cargo Pants",
        sku: "PNT-WC-002",
        image:
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
        orders: 287,
        quantitySold: 319,
        revenue: 2225620,
        averagePrice: 6980,
        stockRemaining: 54,
        category: "Pants",
    },

    {
        id: 3,
        name: "Minimal Leather Jacket",
        sku: "JKT-LM-003",
        image:
            "https://images.unsplash.com/photo-1551028719-00167b16eac5",
        orders: 216,
        quantitySold: 231,
        revenue: 2956800,
        averagePrice: 12800,
        stockRemaining: 21,
        category: "Jackets",
    },

    {
        id: 4,
        name: "Relaxed Knit Sweater",
        sku: "SWT-RK-004",
        image:
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
        orders: 198,
        quantitySold: 244,
        revenue: 1459120,
        averagePrice: 5980,
        stockRemaining: 67,
        category: "Sweaters",
    },

    {
        id: 5,
        name: "Classic Denim Jacket",
        sku: "JKT-DN-005",
        image:
            "https://images.unsplash.com/photo-1543076447-215ad9ba6923",
        orders: 177,
        quantitySold: 184,
        revenue: 2022160,
        averagePrice: 10990,
        stockRemaining: 35,
        category: "Jackets",
    },

    {
        id: 6,
        name: "Basic Heavyweight Hoodie",
        sku: "HOD-BH-006",
        image:
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
        orders: 161,
        quantitySold: 203,
        revenue: 1201770,
        averagePrice: 5980,
        stockRemaining: 93,
        category: "Hoodies",
    },

    {
        id: 7,
        name: "Straight Fit Chino Pants",
        sku: "PNT-SC-007",
        image:
            "https://images.unsplash.com/photo-1473966968600-fa801b869a1a",
        orders: 143,
        quantitySold: 161,
        revenue: 1123780,
        averagePrice: 6980,
        stockRemaining: 44,
        category: "Pants",
    },

    {
        id: 8,
        name: "Premium Cotton Shirt",
        sku: "SHT-PC-008",
        image:
            "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
        orders: 129,
        quantitySold: 151,
        revenue: 901480,
        averagePrice: 5980,
        stockRemaining: 71,
        category: "Shirts",
    }
];


// ============================================================
// HELPERS
// ============================================================

const formatYen = (value: number) =>
    `¥${value.toLocaleString("ja-JP")}`;


// ============================================================
// COMPONENT
// ============================================================

export default function TopSellingProduct() {

    const [search, setSearch] =
        useState("");

    const [period, setPeriod] =
        useState<SalesPeriod>("MONTH");

    const [sortBy, setSortBy] =
        useState<SortType>("REVENUE");

    const [category, setCategory] =
        useState("ALL");

    const [page, setPage] =
        useState(1);

    const rowsPerPage = 6;


    // ========================================================
    // CATEGORY LIST
    // ========================================================

    const categories = [
        "ALL",
        ...Array.from(
            new Set(
                bestSellerData.map(
                    item => item.category
                )
            )
        ),
    ];


    // ========================================================
    // FILTER + SORT
    // ========================================================

    const filteredProducts = useMemo(() => {

        const result =
            bestSellerData.filter(
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


                    const categoryMatch =
                        category === "ALL" ||
                        product.category ===
                            category;


                    return (
                        searchMatch &&
                        categoryMatch
                    );
                }
            );


        result.sort(
            (a, b) => {

                if (
                    sortBy ===
                    "ORDERS"
                ) {
                    return (
                        b.orders -
                        a.orders
                    );
                }

                if (
                    sortBy ===
                    "QUANTITY"
                ) {
                    return (
                        b.quantitySold -
                        a.quantitySold
                    );
                }

                return (
                    b.revenue -
                    a.revenue
                );
            }
        );


        return result;

    }, [
        search,
        category,
        sortBy,
    ]);


    // ========================================================
    // PAGINATION
    // ========================================================

    const totalPages = Math.ceil(
        filteredProducts.length /
            rowsPerPage
    );


    const paginatedProducts =
        filteredProducts.slice(
            (page - 1) *
                rowsPerPage,

            page *
                rowsPerPage
        );


    // ========================================================
    // RESET PAGE WHEN FILTER CHANGES
    // ========================================================

    const handleSearch = (
        value: string
    ) => {

        setSearch(value);

        setPage(1);

    };


    const handleCategoryChange = (
        event: SelectChangeEvent
    ) => {

        setCategory(
            event.target.value
        );

        setPage(1);

    };


    const handleSortChange = (
        event: SelectChangeEvent
    ) => {

        setSortBy(
            event.target.value as SortType
        );

        setPage(1);

    };


    // ========================================================
    // SUMMARY DATA
    // ========================================================

    const totalOrders =
        filteredProducts.reduce(
            (sum, product) =>
                sum + product.orders,
            0
        );

    const totalRevenue =
        filteredProducts.reduce(
            (sum, product) =>
                sum + product.revenue,
            0
        );

    const totalQuantity =
        filteredProducts.reduce(
            (sum, product) =>
                sum +
                product.quantitySold,
            0
        );


    return (

        <Box>

            <Stack
                direction={"row"}
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

                        <EmojiEventsRounded fontSize="large" />

                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >
                            Best Sellers
                        </Typography>

                    </Stack>

                    <Typography
                        color="text.secondary"
                        sx={{
                            mt: 0.5,
                        }}
                    >
                        Analyze your top-selling
                        products and sales performance.
                    </Typography>

                </Box>


                {/* PERIOD */}

                <FormControl
                    size="small"
                    sx={{
                        minWidth: 150,
                    }}
                >

                    <InputLabel>
                        Period
                    </InputLabel>

                    <Select
                        value={period}
                        label="Period"
                        onChange={e =>
                            setPeriod(
                                e.target.value as SalesPeriod
                            )
                        }
                    >

                        <MenuItem value="TODAY">
                            Today
                        </MenuItem>

                        <MenuItem value="WEEK">
                            This Week
                        </MenuItem>

                        <MenuItem value="MONTH">
                            This Month
                        </MenuItem>

                        <MenuItem value="YEAR">
                            This Year
                        </MenuItem>

                        <MenuItem value="ALL">
                            All Time
                        </MenuItem>

                    </Select>

                </FormControl>

            </Stack>


            {/* =================================================
                SUMMARY CARDS
            ================================================= */}

            <Grid
                container
                spacing={2}
                mb={3}
            >

                <Grid
                    size={{
                        xs: 6,
                        sm: 4,
                    }}
                >

                    <SummaryCard
                        icon={
                            <ReceiptLongRounded />
                        }
                        label="Total Orders"
                        value={
                            totalOrders.toLocaleString()
                        }
                    />

                </Grid>


                <Grid
                    size={{
                        xs: 6,
                        sm: 4,
                    }}
                >

                    <SummaryCard
                        icon={
                            <Inventory2Rounded />
                        }
                        label="Units Sold"
                        value={
                            totalQuantity.toLocaleString()
                        }
                    />

                </Grid>


                <Grid
                    size={{
                        xs: 12,
                        sm: 4,
                    }}
                >

                    <SummaryCard
                        icon={
                            <TrendingUpRounded />
                        }
                        label="Revenue"
                        value={
                            formatYen(
                                totalRevenue
                            )
                        }
                    />

                </Grid>

            </Grid>


            {/* =================================================
                SEARCH + FILTER
            ================================================= */}

            <Card
                elevation={0}
                sx={{
                    border: "1px solid",
                    borderColor:
                        "divider",
                    borderRadius: 3,
                    mb: 2,
                }}
            >

                <Stack
                    direction={{
                        xs: "column",
                        md: "row",
                    }}
                    spacing={2}
                    p={2}
                >

                    {/* SEARCH */}

                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Search product name or SKU..."
                        value={search}
                        onChange={e =>
                            handleSearch(
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


                    {/* CATEGORY */}

                    <FormControl
                        size="small"
                        sx={{
                            minWidth: 160,
                        }}
                    >

                        <InputLabel>
                            Category
                        </InputLabel>

                        <Select
                            value={category}
                            label="Category"
                            onChange={
                                handleCategoryChange
                            }
                        >

                            {categories.map(
                                item => (

                                    <MenuItem
                                        key={item}
                                        value={item}
                                    >
                                        {item ===
                                        "ALL"
                                            ? "All Categories"
                                            : item}
                                    </MenuItem>

                                )
                            )}

                        </Select>

                    </FormControl>


                    {/* SORT */}

                    <FormControl
                        size="small"
                        sx={{
                            minWidth: 180,
                        }}
                    >

                        <InputLabel>
                            Sort By
                        </InputLabel>

                        <Select
                            value={sortBy}
                            label="Sort By"
                            onChange={
                                handleSortChange
                            }
                        >

                            <MenuItem value="REVENUE">
                                Revenue
                            </MenuItem>

                            <MenuItem value="ORDERS">
                                Orders
                            </MenuItem>

                            <MenuItem value="QUANTITY">
                                Units Sold
                            </MenuItem>

                        </Select>

                    </FormControl>

                </Stack>

            </Card>


            {/* =================================================
                TABLE
            ================================================= */}

            <Paper
                variant="outlined"
                sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                }}
            >

                <TableContainer>

                    <Table
                        sx={{
                            minWidth: 900,
                        }}
                    >

                        <TableHead>

                            <TableRow>

                                <TableCell>
                                    Rank
                                </TableCell>

                                <TableCell>
                                    Product
                                </TableCell>

                                <TableCell>
                                    SKU
                                </TableCell>

                                <TableCell
                                    align="right"
                                >
                                    Orders
                                </TableCell>

                                <TableCell
                                    align="right"
                                >
                                    Units Sold
                                </TableCell>

                                <TableCell
                                    align="right"
                                >
                                    Revenue
                                </TableCell>

                                <TableCell
                                    align="right"
                                >
                                    Avg. Price
                                </TableCell>

                                <TableCell
                                    align="right"
                                >
                                    Stock
                                </TableCell>

                            </TableRow>

                        </TableHead>


                        <TableBody>

                            {paginatedProducts.map(
                                (
                                    product,
                                    index
                                ) => {

                                    const rank =
                                        (page - 1) *
                                            rowsPerPage +
                                        index +
                                        1;


                                    return (

                                        <TableRow
                                            key={
                                                product.id
                                            }
                                            hover
                                        >

                                            {/* RANK */}

                                            <TableCell>

                                                {rank <=
                                                3 ? (

                                                    <Chip
                                                        icon={
                                                            <EmojiEventsRounded />
                                                        }
                                                        label={
                                                            `#${rank}`
                                                        }
                                                        size="small"
                                                        color={
                                                            rank ===
                                                            1
                                                                ? "warning"
                                                                : "default"
                                                        }
                                                        sx={{
                                                            fontWeight: 700,
                                                        }}
                                                    />

                                                ) : (

                                                    <Typography
                                                        variant="body2"
                                                        fontWeight={600}
                                                    >
                                                        #{rank}
                                                    </Typography>

                                                )}

                                            </TableCell>


                                            {/* PRODUCT */}

                                            <TableCell>

                                                <Stack
                                                    direction="row"
                                                    spacing={1.5}
                                                    alignItems="center"
                                                >

                                                    <Avatar
                                                        src={
                                                            product.image
                                                        }
                                                        variant="rounded"
                                                        sx={{
                                                            width: 48,
                                                            height: 48,
                                                        }}
                                                    />

                                                    <Box>

                                                        <Typography
                                                            fontWeight={700}
                                                        >
                                                            {
                                                                product.name
                                                            }
                                                        </Typography>

                                                        <Typography
                                                            variant="caption"
                                                            color="text.secondary"
                                                        >
                                                            {
                                                                product.category
                                                            }
                                                        </Typography>

                                                    </Box>

                                                </Stack>

                                            </TableCell>


                                            {/* SKU */}

                                            <TableCell>

                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    {
                                                        product.sku
                                                    }
                                                </Typography>

                                            </TableCell>


                                            {/* ORDERS */}

                                            <TableCell
                                                align="right"
                                            >

                                                <Typography
                                                    fontWeight={700}
                                                >
                                                    {product.orders.toLocaleString()}
                                                </Typography>

                                            </TableCell>


                                            {/* UNITS */}

                                            <TableCell
                                                align="right"
                                            >

                                                <Typography
                                                    fontWeight={600}
                                                >
                                                    {product.quantitySold.toLocaleString()}
                                                </Typography>

                                            </TableCell>


                                            {/* REVENUE */}

                                            <TableCell
                                                align="right"
                                            >

                                                <Typography
                                                    fontWeight={800}
                                                >
                                                    {
                                                        formatYen(
                                                            product.revenue
                                                        )
                                                    }
                                                </Typography>

                                            </TableCell>


                                            {/* AVG PRICE */}

                                            <TableCell
                                                align="right"
                                            >

                                                {
                                                    formatYen(
                                                        product.averagePrice
                                                    )
                                                }

                                            </TableCell>


                                            {/* STOCK */}

                                            <TableCell
                                                align="right"
                                            >

                                                <Chip
                                                    label={`${product.stockRemaining} units`}
                                                    size="small"
                                                    color={
                                                        product.stockRemaining <=
                                                        30
                                                            ? "error"
                                                            : product.stockRemaining <=
                                                              60
                                                            ? "warning"
                                                            : "success"
                                                    }
                                                    variant="outlined"
                                                />

                                            </TableCell>

                                        </TableRow>

                                    );
                                }
                            )}


                            {/* EMPTY */}

                            {paginatedProducts.length ===
                                0 && (

                                <TableRow>

                                    <TableCell
                                        colSpan={8}
                                        align="center"
                                        sx={{
                                            py: 8,
                                        }}
                                    >

                                        <SearchRounded
                                            sx={{
                                                fontSize: 45,
                                                color:
                                                    "text.disabled",
                                            }}
                                        />

                                        <Typography
                                            color="text.secondary"
                                        >
                                            No products
                                            found.
                                        </Typography>

                                    </TableCell>

                                </TableRow>

                            )}

                        </TableBody>

                    </Table>

                </TableContainer>


                {/* =================================================
                    PAGINATION
                ================================================= */}

                {totalPages > 0 && (

                    <Stack
                        direction={{
                            xs: "column",
                            sm: "row",
                        }}
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                        p={2}
                        borderTop="1px solid"
                        borderColor="divider"
                    >

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Showing{" "}
                            {
                                Math.min(
                                    (page - 1) *
                                        rowsPerPage +
                                        1,
                                    filteredProducts.length
                                )
                            }
                            –
                            {
                                Math.min(
                                    page *
                                        rowsPerPage,
                                    filteredProducts.length
                                )
                            }{" "}
                            of{" "}
                            {
                                filteredProducts.length
                            }{" "}
                            products
                        </Typography>


                        <Pagination
                            page={page}
                            count={totalPages}
                            onChange={(
                                _,
                                value
                            ) =>
                                setPage(
                                    value
                                )
                            }
                            color="primary"
                            shape="rounded"
                            showFirstButton
                            showLastButton
                        />

                    </Stack>

                )}

            </Paper>

        </Box>
    );
}


// ============================================================
// SUMMARY CARD
// ============================================================

function SummaryCard({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {

    return (

        <Card
            elevation={0}
            sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
            }}
        >

            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                p={2}
            >

                <Box
                    sx={{
                        width: 45,
                        height: 45,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "action.hover",
                    }}
                >
                    {icon}
                </Box>


                <Box>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        {label}
                    </Typography>

                    <Typography
                        variant="h6"
                        fontWeight={800}
                    >
                        {value}
                    </Typography>

                </Box>

            </Stack>

        </Card>
    );
}