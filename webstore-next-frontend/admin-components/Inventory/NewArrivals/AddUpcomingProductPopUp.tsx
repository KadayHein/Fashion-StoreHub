"use client";

import React, { useCallback, useRef, useState } from "react";

import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Paper,
    Stack,
    Switch,
    TextField,
    Typography,
} from "@mui/material";

import {
    AddRounded,
    CalendarMonthRounded,
    CloseRounded,
    CloudUploadRounded,
    DeleteOutlineRounded,
    DiscountRounded,
    ImageRounded,
    LocalOfferRounded,
} from "@mui/icons-material";
import DropableUploadBox from "@/base-components/uploader/DropableUploadBox";


// ============================================================
// TYPES
// ============================================================

export interface UpcomingProductForm {
    name: string;

    sku: string;

    image: File | null;

    availableOn: string;

    colors: string[];

    sizes: string[];

    price: string;

    firstSalesEnabled: boolean;

    firstSalesLimit: string;

    firstSalesDiscount: string;

    bulkPurchaseEnabled: boolean;

    bulkMinimum: string;

    bulkDiscount: string;

    description: string;
}


interface AddUpcomingProductDialogProps {
    open: boolean;

    onClose: () => void;

    onSubmit: (
        product: UpcomingProductForm
    ) => void;
}


// ============================================================
// COMPONENT
// ============================================================

export default function AddUpcomingProductPopUp({
    open,
    onClose,
    onSubmit,
}: AddUpcomingProductDialogProps) {

    const fileInputRef =
        useRef<HTMLInputElement | null>(
            null
        );


    // ========================================================
    // FORM
    // ========================================================

    const [form, setForm] =
        useState<UpcomingProductForm>({
            name: "",
            sku: "",
            image: null,
            availableOn: "",
            colors: [],
            sizes: [],
            price: "",
            firstSalesEnabled: false,
            firstSalesLimit: "10",
            firstSalesDiscount: "",
            bulkPurchaseEnabled: false,
            bulkMinimum: "2",
            bulkDiscount: "",
            description: "",
        });

    const [colorInput, setColorInput] = useState("");

    const [sizeInput, setSizeInput] = useState("");

    const updateField = <
        K extends keyof UpcomingProductForm
    >(
        field: K,
        value: UpcomingProductForm[K]
    ) => {

        setForm(prev => ({
            ...prev,
            [field]: value,
        }));

    };

    const addColor = () => {

        const value =
            colorInput.trim();

        if (!value) return;

        if (
            form.colors.some(
                color =>
                    color.toLowerCase() ===
                    value.toLowerCase()
            )
        ) {
            return;
        }

        updateField(
            "colors",
            [
                ...form.colors,
                value,
            ]
        );

        setColorInput("");
    };

    const removeColor = (
        color: string
    ) => {

        updateField(
            "colors",
            form.colors.filter(
                item => item !== color
            )
        );

    };

    const addSize = () => {

        const value =
            sizeInput.trim();

        if (!value) return;

        if (
            form.sizes.some(
                size =>
                    size.toLowerCase() ===
                    value.toLowerCase()
            )
        ) {
            return;
        }

        updateField(
            "sizes",
            [
                ...form.sizes,
                value,
            ]
        );

        setSizeInput("");
    };

    const removeSize = (
        size: string
    ) => {

        updateField(
            "sizes",
            form.sizes.filter(
                item => item !== size
            )
        );

    };

    const handleImage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {

        const file = event.target.files?.[0];

        if (!file) return;

        updateField("image", file);
        setPreviewImage(file);
    };

    const handleSubmit = () => {

        if (!form.name.trim()) {
            return;
        }

        if (!form.availableOn) {
            return;
        }

        onSubmit(form);

        onClose();

    };

    const onDropCallback = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles?.[0];

        if (!file) return;

        updateField("image", file);
        setPreviewImage(file);
    }, []);

    const [previewImage, setPreviewImage] = useState<File | null>(null);


    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
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
                            Add Upcoming Product
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Declare a new product
                            before its release.
                        </Typography>
                    </Box>


                    <IconButton
                        onClick={onClose}
                    >
                        <CloseRounded />
                    </IconButton>

                </Stack>
            </DialogTitle>

            <Divider />

            <DialogContent>

                <Stack spacing={2.5}>
                    
                    <DropableUploadBox onChange={handleImage} onDrop={onDropCallback} previewImage={previewImage} />

                    <TextField
                        label="Product Name"
                        placeholder="Enter product name"
                        value={form.name}
                        onChange={e =>
                            updateField(
                                "name",
                                e.target.value
                            )
                        }
                        fullWidth
                        required
                    />


                    <TextField
                        label="SKU"
                        placeholder="Enter SKU"
                        value={form.sku}
                        onChange={e =>
                            updateField(
                                "sku",
                                e.target.value
                            )
                        }
                        fullWidth
                    />


                    {/* =================================================
                        AVAILABLE DATE
                    ================================================= */}

                    <TextField
                        label="Available On"
                        type="date"
                        value={
                            form.availableOn
                        }
                        onChange={e =>
                            updateField(
                                "availableOn",
                                e.target.value
                            )
                        }
                        fullWidth
                        required
                        InputLabelProps={{
                            shrink: true,
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


                    {/* =================================================
                        COLORS
                    ================================================= */}

                    <Box>

                        <Typography
                            variant="subtitle2"
                            fontWeight={700}
                            mb={1}
                        >
                            Available Colors
                        </Typography>


                        <Stack
                            direction="row"
                            spacing={1}
                        >

                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Enter Color"
                                value={
                                    colorInput
                                }
                                onChange={e =>
                                    setColorInput(
                                        e.target
                                            .value
                                    )
                                }
                                onKeyDown={e => {

                                    if (
                                        e.key ===
                                        "Enter"
                                    ) {

                                        e.preventDefault();

                                        addColor();

                                    }

                                }}
                            />


                            <Button
                                variant="outlined"
                                onClick={
                                    addColor
                                }
                                sx={{
                                    minWidth: 45,
                                }}
                            >
                                <AddRounded />
                            </Button>

                        </Stack>


                        <Stack
                            direction="row"
                            spacing={0.75}
                            flexWrap="wrap"
                            useFlexGap
                            sx={{
                                mt: 1,
                            }}
                        >

                            {form.colors.map(
                                color => (

                                    <Chip
                                        key={color}
                                        label={
                                            color
                                        }
                                        onDelete={() =>
                                            removeColor(
                                                color
                                            )
                                        }
                                        deleteIcon={
                                            <DeleteOutlineRounded />
                                        }
                                    />

                                )
                            )}

                        </Stack>

                    </Box>


                    {/* =================================================
                        SIZES
                    ================================================= */}

                    <Box>

                        <Typography
                            variant="subtitle2"
                            fontWeight={700}
                            mb={1}
                        >
                            Available Sizes
                        </Typography>


                        <Stack
                            direction="row"
                            spacing={1}
                        >

                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Enter Size"
                                value={
                                    sizeInput
                                }
                                onChange={e =>
                                    setSizeInput(
                                        e.target
                                            .value
                                    )
                                }
                                onKeyDown={e => {

                                    if (
                                        e.key ===
                                        "Enter"
                                    ) {

                                        e.preventDefault();

                                        addSize();

                                    }

                                }}
                            />


                            <Button
                                variant="outlined"
                                onClick={
                                    addSize
                                }
                                sx={{
                                    minWidth: 45,
                                }}
                            >
                                <AddRounded />
                            </Button>

                        </Stack>


                        <Stack
                            direction="row"
                            spacing={0.75}
                            flexWrap="wrap"
                            useFlexGap
                            sx={{
                                mt: 1,
                            }}
                        >

                            {form.sizes.map(
                                size => (

                                    <Chip
                                        key={size}
                                        label={
                                            size
                                        }
                                        onDelete={() =>
                                            removeSize(
                                                size
                                            )
                                        }
                                        deleteIcon={
                                            <DeleteOutlineRounded />
                                        }
                                    />

                                )
                            )}

                        </Stack>

                    </Box>


                    {/* =================================================
                        PRICE
                    ================================================= */}

                    <TextField
                        label="Price"
                        type="number"
                        value={form.price}
                        onChange={e =>
                            updateField(
                                "price",
                                e.target.value
                            )
                        }
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment
                                    position="start"
                                >
                                    ¥
                                </InputAdornment>
                            ),
                        }}
                    />


                    <Divider />


                    {/* =================================================
                        FIRST 10 SALES
                    ================================================= */}

                    <Paper
                        variant="outlined"
                        sx={{
                            p: 2,
                            borderRadius: 2,
                        }}
                    >

                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >

                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                            >

                                <DiscountRounded />

                                <Box>

                                    <Typography
                                        fontWeight={700}
                                    >
                                        First Sales
                                        Promotion
                                    </Typography>

                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        Special discount
                                        for early buyers.
                                    </Typography>

                                </Box>

                            </Stack>


                            <FormControlLabel
                                label=""
                                control={
                                    <Switch
                                        checked={
                                            form.firstSalesEnabled
                                        }
                                        onChange={e =>
                                            updateField(
                                                "firstSalesEnabled",
                                                e.target
                                                    .checked
                                            )
                                        }
                                    />
                                }
                            />

                        </Stack>


                        {form.firstSalesEnabled && (

                            <Stack
                                direction={{
                                    xs: "column",
                                    sm: "row",
                                }}
                                spacing={2}
                                mt={2}
                            >

                                <TextField
                                    label="First Sales Limit"
                                    type="number"
                                    value={
                                        form.firstSalesLimit
                                    }
                                    onChange={e =>
                                        updateField(
                                            "firstSalesLimit",
                                            e.target
                                                .value
                                        )
                                    }
                                    fullWidth
                                    helperText="Example: First 10 sales"
                                />


                                <TextField
                                    label="Discount"
                                    type="number"
                                    value={
                                        form.firstSalesDiscount
                                    }
                                    onChange={e =>
                                        updateField(
                                            "firstSalesDiscount",
                                            e.target
                                                .value
                                        )
                                    }
                                    fullWidth
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                %
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                            </Stack>

                        )}

                    </Paper>


                    {/* =================================================
                        BULK PURCHASE
                    ================================================= */}

                    <Paper
                        variant="outlined"
                        sx={{
                            p: 2,
                            borderRadius: 2,
                        }}
                    >

                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >

                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                            >

                                <LocalOfferRounded />

                                <Box>

                                    <Typography
                                        fontWeight={700}
                                    >
                                        Bulk Purchase
                                        Promotion
                                    </Typography>

                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        Discount when buying
                                        multiple products.
                                    </Typography>

                                </Box>

                            </Stack>


                            <FormControlLabel
                                label=""
                                control={
                                    <Switch
                                        checked={
                                            form.bulkPurchaseEnabled
                                        }
                                        onChange={e =>
                                            updateField(
                                                "bulkPurchaseEnabled",
                                                e.target
                                                    .checked
                                            )
                                        }
                                    />
                                }
                            />

                        </Stack>


                        {form.bulkPurchaseEnabled && (

                            <Stack
                                direction={{
                                    xs: "column",
                                    sm: "row",
                                }}
                                spacing={2}
                                mt={2}
                            >

                                <TextField
                                    label="Minimum Quantity"
                                    type="number"
                                    value={
                                        form.bulkMinimum
                                    }
                                    onChange={e =>
                                        updateField(
                                            "bulkMinimum",
                                            e.target
                                                .value
                                        )
                                    }
                                    fullWidth
                                    helperText="Example: Buy 2 or more"
                                />


                                <TextField
                                    label="Discount"
                                    type="number"
                                    value={
                                        form.bulkDiscount
                                    }
                                    onChange={e =>
                                        updateField(
                                            "bulkDiscount",
                                            e.target
                                                .value
                                        )
                                    }
                                    fullWidth
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                %
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                            </Stack>

                        )}

                    </Paper>


                    {/* =================================================
                        DESCRIPTION
                    ================================================= */}

                    <TextField
                        label="Description"
                        placeholder="Describe the upcoming product..."
                        value={
                            form.description
                        }
                        onChange={e =>
                            updateField(
                                "description",
                                e.target.value
                            )
                        }
                        multiline
                        minRows={3}
                        fullWidth
                    />

                </Stack>

            </DialogContent>


            {/* =================================================
                ACTIONS
            ================================================= */}

            <DialogActions
                sx={{
                    px: 3,
                    py: 2,
                }}
            >

                <Button
                    onClick={onClose}
                    color="inherit"
                >
                    Cancel
                </Button>


                <Button
                    variant="contained"
                    startIcon={
                        <CloudUploadRounded />
                    }
                    onClick={
                        handleSubmit
                    }
                >
                    Add Upcoming Product
                </Button>

            </DialogActions>

        </Dialog>
    );
}