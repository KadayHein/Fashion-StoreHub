"use client";

import React, { useMemo, useState } from "react";

import {
    Autocomplete,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    IconButton,
    InputAdornment,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import {
    ArrowDownwardRounded,
    ArrowForwardRounded,
    CloseRounded,
    Inventory2Rounded,
    LocationOnRounded,
    SearchRounded,
    SwapHorizRounded,
} from "@mui/icons-material";


// ============================================================
// TYPES
// ============================================================

interface Warehouse {
    id: string;
    name: string;
    address: string;
    stockCount: number;
}

interface TransferItem {
    id: string;
    name: string;
    sku: string;
    availableStock: number;
    quantity: number;
}


// ============================================================
// MOCK DATA
// ============================================================

const warehouses: Warehouse[] = [
    {
        id: "WH-001",
        name: "Main Warehouse",
        address: "Osaka Main Storage",
        stockCount: 1240,
    },
    {
        id: "WH-002",
        name: "Namba Branch",
        address: "Namba, Osaka",
        stockCount: 420,
    },
    {
        id: "WH-003",
        name: "Umeda Branch",
        address: "Umeda, Osaka",
        stockCount: 350,
    },
    {
        id: "WH-004",
        name: "Sakai Warehouse",
        address: "Sakai, Osaka",
        stockCount: 860,
    },
];

const products: TransferItem[] = [
    {
        id: "P-001",
        name: "Nike Shirt",
        sku: "NK-001",
        availableStock: 120,
        quantity: 0,
    },
    {
        id: "P-002",
        name: "Adidas Shoes",
        sku: "AD-002",
        availableStock: 80,
        quantity: 0,
    },
    {
        id: "P-003",
        name: "Puma Cap",
        sku: "PM-003",
        availableStock: 65,
        quantity: 0,
    },
];


// ============================================================
// COMPONENT
// ============================================================

export default function StockTransfers() {

    const [sourceWarehouse, setSourceWarehouse] =
        useState<Warehouse | null>(null);

    const [destinationWarehouse, setDestinationWarehouse] =
        useState<Warehouse | null>(null);

    const [transferItems, setTransferItems] =
        useState<TransferItem[]>([]);


    // --------------------------------------------------------
    // Available destination warehouses
    // --------------------------------------------------------

    const destinationOptions = useMemo(() => {
        return warehouses.filter(
            warehouse =>
                warehouse.id !== sourceWarehouse?.id
        );
    }, [sourceWarehouse]);


    // --------------------------------------------------------
    // Add Product
    // --------------------------------------------------------

    const addProduct = (product: TransferItem) => {

        const alreadyExists =
            transferItems.some(
                item => item.id === product.id
            );

        if (alreadyExists) return;

        setTransferItems(prev => [
            ...prev,
            {
                ...product,
                quantity: 1,
            },
        ]);
    };


    // --------------------------------------------------------
    // Remove Product
    // --------------------------------------------------------

    const removeProduct = (productId: string) => {

        setTransferItems(prev =>
            prev.filter(
                item => item.id !== productId
            )
        );
    };


    // --------------------------------------------------------
    // Change Quantity
    // --------------------------------------------------------

    const changeQuantity = (
        productId: string,
        quantity: number
    ) => {

        setTransferItems(prev =>
            prev.map(item => {

                if (item.id !== productId) {
                    return item;
                }

                return {
                    ...item,
                    quantity: Math.min(
                        Math.max(quantity, 1),
                        item.availableStock
                    ),
                };
            })
        );
    };


    // --------------------------------------------------------
    // Total Items
    // --------------------------------------------------------

    const totalQuantity =
        transferItems.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );


    return (
        <Box>
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
                mb={3}
            >

                <Box>

                    <Typography
                        variant="h4"
                        fontWeight={700}
                    >
                        Stock Transfers
                    </Typography>

                    <Typography
                        variant="body1"
                        color="text.secondary"
                    >
                        Move inventory between warehouses
                        and branches.
                    </Typography>

                </Box>

                <Chip
                    icon={
                        <SwapHorizRounded />
                    }
                    label="Inventory Transfer"
                    variant="outlined"
                />

            </Stack>


            {/* ==================================================
                WAREHOUSE ROUTE
            ================================================== */}

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

                    <Typography
                        variant="subtitle1"
                        fontWeight={700}
                        mb={2}
                    >
                        Transfer Route
                    </Typography>


                    <Grid
                        container
                        spacing={2}
                        alignItems="center"
                    >

                        {/* SOURCE */}
                        <Grid
                            size={{
                                xs: 12,
                                md: 5,
                            }}
                        >

                            <Autocomplete
                                options={warehouses}
                                value={sourceWarehouse}
                                onChange={(
                                    _,
                                    value
                                ) => {
                                    setSourceWarehouse(
                                        value
                                    );

                                    /*
                                     * Reset destination
                                     * if same warehouse
                                     */
                                    if (
                                        value?.id ===
                                        destinationWarehouse?.id
                                    ) {
                                        setDestinationWarehouse(
                                            null
                                        );
                                    }
                                }}
                                getOptionLabel={
                                    warehouse =>
                                        warehouse.name
                                }
                                isOptionEqualToValue={(
                                    option,
                                    value
                                ) =>
                                    option.id === value.id
                                }
                                filterOptions={(
                                    options,
                                    state
                                ) =>
                                    options.filter(
                                        warehouse =>
                                            warehouse.name
                                                .toLowerCase()
                                                .includes(
                                                    state.inputValue.toLowerCase()
                                                ) ||
                                            warehouse.address
                                                .toLowerCase()
                                                .includes(
                                                    state.inputValue.toLowerCase()
                                                )
                                    )
                                }
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        label="From"
                                        placeholder="Search warehouse..."
                                        InputProps={{
                                            ...params.InputProps,
                                            startAdornment: (
                                                <>
                                                    <InputAdornment position="start">
                                                        <LocationOnRounded />
                                                    </InputAdornment>

                                                    {
                                                        params
                                                            .InputProps
                                                            .startAdornment
                                                    }
                                                </>
                                            ),
                                        }}
                                    />
                                )}
                                renderOption={(
                                    props,
                                    warehouse
                                ) => (
                                    <Box
                                        component="li"
                                        {...props}
                                        key={
                                            warehouse.id
                                        }
                                    >

                                        <LocationOnRounded
                                            sx={{
                                                mr: 1.5,
                                                color:
                                                    "text.secondary",
                                            }}
                                        />

                                        <Box>

                                            <Typography
                                                fontWeight={600}
                                            >
                                                {
                                                    warehouse.name
                                                }
                                            </Typography>

                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                            >
                                                {
                                                    warehouse.address
                                                }
                                                {" • "}
                                                {
                                                    warehouse.stockCount
                                                }{" "}
                                                units
                                            </Typography>

                                        </Box>

                                    </Box>
                                )}
                            />

                        </Grid>


                        {/* ARROW */}
                        <Grid
                            size={{
                                xs: 12,
                                md: 2,
                            }}
                        >

                            <Stack
                                alignItems="center"
                                justifyContent="center"
                            >

                                <Box
                                    sx={{
                                        width: 48,
                                        height: 48,
                                        borderRadius:
                                            "50%",
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
                                    <ArrowForwardRounded />
                                </Box>

                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{
                                        mt: 0.5,
                                    }}
                                >
                                    Transfer
                                </Typography>

                            </Stack>

                        </Grid>


                        {/* DESTINATION */}
                        <Grid
                            size={{
                                xs: 12,
                                md: 5,
                            }}
                        >

                            <Autocomplete
                                options={
                                    destinationOptions
                                }
                                value={
                                    destinationWarehouse
                                }
                                disabled={
                                    !sourceWarehouse
                                }
                                onChange={(
                                    _,
                                    value
                                ) =>
                                    setDestinationWarehouse(
                                        value
                                    )
                                }
                                getOptionLabel={
                                    warehouse =>
                                        warehouse.name
                                }
                                isOptionEqualToValue={(
                                    option,
                                    value
                                ) =>
                                    option.id === value.id
                                }
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        label="To"
                                        placeholder={
                                            sourceWarehouse
                                                ? "Search warehouse..."
                                                : "Select source first"
                                        }
                                        InputProps={{
                                            ...params.InputProps,
                                            startAdornment: (
                                                <>
                                                    <InputAdornment position="start">
                                                        <LocationOnRounded />
                                                    </InputAdornment>

                                                    {
                                                        params
                                                            .InputProps
                                                            .startAdornment
                                                    }
                                                </>
                                            ),
                                        }}
                                    />
                                )}
                                renderOption={(
                                    props,
                                    warehouse
                                ) => (
                                    <Box
                                        component="li"
                                        {...props}
                                        key={
                                            warehouse.id
                                        }
                                    >

                                        <LocationOnRounded
                                            sx={{
                                                mr: 1.5,
                                                color:
                                                    "text.secondary",
                                            }}
                                        />

                                        <Box>

                                            <Typography
                                                fontWeight={600}
                                            >
                                                {
                                                    warehouse.name
                                                }
                                            </Typography>

                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                            >
                                                {
                                                    warehouse.address
                                                }
                                                {" • "}
                                                {
                                                    warehouse.stockCount
                                                }{" "}
                                                units
                                            </Typography>

                                        </Box>

                                    </Box>
                                )}
                            />

                        </Grid>

                    </Grid>

                </CardContent>

            </Card>


            {/* ==================================================
                PRODUCT SELECTION
            ================================================== */}

            <Grid
                container
                spacing={3}
            >

                {/* LEFT: PRODUCTS */}
                <Grid
                    size={{
                        xs: 12,
                        lg: 7,
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

                        <CardContent>

                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                mb={2}
                            >

                                <Box>

                                    <Typography
                                        variant="h6"
                                        fontWeight={700}
                                    >
                                        Products
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Select products
                                        to transfer.
                                    </Typography>

                                </Box>

                                <Chip
                                    label={`${products.length} products`}
                                    size="small"
                                />

                            </Stack>


                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Search product or SKU..."
                                sx={{
                                    mb: 2,
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchRounded />
                                        </InputAdornment>
                                    ),
                                }}
                            />


                            <Stack spacing={1}>

                                {products.map(product => {

                                    const selected =
                                        transferItems.some(
                                            item =>
                                                item.id ===
                                                product.id
                                        );

                                    return (
                                        <Paper
                                            key={
                                                product.id
                                            }
                                            variant="outlined"
                                            sx={{
                                                p: 1.5,
                                                borderRadius: 2,
                                            }}
                                        >

                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                justifyContent="space-between"
                                                gap={2}
                                            >

                                                <Stack
                                                    direction="row"
                                                    alignItems="center"
                                                    gap={1.5}
                                                >

                                                    <Box
                                                        sx={{
                                                            width: 42,
                                                            height: 42,
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
                                                        <Inventory2Rounded
                                                            color="action"
                                                        />
                                                    </Box>

                                                    <Box>

                                                        <Typography
                                                            fontWeight={600}
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
                                                                product.sku
                                                            }
                                                            {" • "}
                                                            {
                                                                product.availableStock
                                                            }{" "}
                                                            available
                                                        </Typography>

                                                    </Box>

                                                </Stack>


                                                <Button
                                                    size="small"
                                                    variant={
                                                        selected
                                                            ? "outlined"
                                                            : "contained"
                                                    }
                                                    disabled={
                                                        selected ||
                                                        !sourceWarehouse ||
                                                        !destinationWarehouse
                                                    }
                                                    onClick={() =>
                                                        addProduct(
                                                            product
                                                        )
                                                    }
                                                >
                                                    {selected
                                                        ? "Added"
                                                        : "Add"}
                                                </Button>

                                            </Stack>

                                        </Paper>
                                    );

                                })}

                            </Stack>

                        </CardContent>

                    </Card>

                </Grid>


                {/* RIGHT: TRANSFER CART */}
                <Grid
                    size={{
                        xs: 12,
                        lg: 5,
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

                        <CardContent>

                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                mb={2}
                            >

                                <Box>

                                    <Typography
                                        variant="h6"
                                        fontWeight={700}
                                    >
                                        Transfer Items
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {
                                            transferItems.length
                                        }{" "}
                                        products
                                    </Typography>

                                </Box>

                                <Chip
                                    label={`${totalQuantity} units`}
                                    color="primary"
                                />

                            </Stack>


                            {transferItems.length === 0 ? (

                                <Box
                                    sx={{
                                        py: 6,
                                        textAlign:
                                            "center",
                                    }}
                                >

                                    <Inventory2Rounded
                                        sx={{
                                            fontSize: 45,
                                            color:
                                                "text.disabled",
                                            mb: 1,
                                        }}
                                    />

                                    <Typography
                                        color="text.secondary"
                                    >
                                        No products
                                        selected
                                    </Typography>

                                    <Typography
                                        variant="caption"
                                        color="text.disabled"
                                    >
                                        Add products
                                        from the list
                                    </Typography>

                                </Box>

                            ) : (

                                <Stack spacing={1.5}>

                                    {transferItems.map(
                                        item => (

                                            <Paper
                                                key={
                                                    item.id
                                                }
                                                variant="outlined"
                                                sx={{
                                                    p: 1.5,
                                                    borderRadius:
                                                        2,
                                                }}
                                            >

                                                <Stack
                                                    direction="row"
                                                    justifyContent="space-between"
                                                    alignItems="center"
                                                    gap={2}
                                                >

                                                    <Box>

                                                        <Typography
                                                            fontWeight={
                                                                600
                                                            }
                                                        >
                                                            {
                                                                item.name
                                                            }
                                                        </Typography>

                                                        <Typography
                                                            variant="caption"
                                                            color="text.secondary"
                                                        >
                                                            {
                                                                item.sku
                                                            }
                                                        </Typography>

                                                    </Box>

                                                    <IconButton
                                                        size="small"
                                                        color="error"
                                                        onClick={() =>
                                                            removeProduct(
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        <CloseRounded />
                                                    </IconButton>

                                                </Stack>


                                                <Stack
                                                    direction="row"
                                                    alignItems="center"
                                                    gap={1}
                                                    mt={1.5}
                                                >

                                                    <TextField
                                                        size="small"
                                                        type="number"
                                                        label="Quantity"
                                                        value={
                                                            item.quantity
                                                        }
                                                        onChange={e =>
                                                            changeQuantity(
                                                                item.id,
                                                                Number(
                                                                    e.target
                                                                        .value
                                                                )
                                                            )
                                                        }
                                                        slotProps={{
                                                            htmlInput:
                                                                {
                                                                    min: 1,
                                                                    max:
                                                                        item.availableStock,
                                                                },
                                                        }}
                                                        fullWidth
                                                    />

                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                        sx={{
                                                            whiteSpace:
                                                                "nowrap",
                                                        }}
                                                    >
                                                        /{" "}
                                                        {
                                                            item.availableStock
                                                        }
                                                    </Typography>

                                                </Stack>

                                            </Paper>

                                        )
                                    )}

                                </Stack>

                            )}

                        </CardContent>

                        {transferItems.length > 0 && (

                            <>

                                <Divider />

                                <Box
                                    sx={{
                                        p: 2,
                                    }}
                                >

                                    <Button
                                        fullWidth
                                        size="large"
                                        variant="contained"
                                        disabled={
                                            !sourceWarehouse ||
                                            !destinationWarehouse ||
                                            transferItems.length ===
                                                0
                                        }
                                        startIcon={
                                            <SwapHorizRounded />
                                        }
                                    >
                                        Review Transfer
                                    </Button>

                                </Box>

                            </>

                        )}

                    </Card>

                </Grid>

            </Grid>

        </Box>
    );
}