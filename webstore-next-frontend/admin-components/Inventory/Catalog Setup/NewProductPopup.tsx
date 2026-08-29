"use client";

import React, { useState } from "react";

import {
    Modal,
    Fade,
    Backdrop,
    Box,
    Grid,
    Typography,
    TextField,
    Button,
    Divider,
    Stack,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
    Chip,
    InputAdornment,
    Alert,
} from "@mui/material";

import {
    Inventory2Rounded,
    CloseRounded,
} from "@mui/icons-material";
import { client } from "@/lib/apolloClient";
import { enqueueSnackbar } from "notistack";
import { gql } from "@apollo/client";
import GalleryImageUploader from "@/base-components/uploader/GalleryImageUploader";

interface NewProductPopUpProps {
    open: boolean;
    close: () => void;
    categoryId?: number;
}

interface ProductForm {
    name: string;
    code: string;
    description: string;
    price: string;
    discount: string;
    quantity: string;
    color: string;
    size: string;
    brand: string;
    material: string;
    status: string;
    galleryImages: File[]
}

export default function NewProductPopUp({
    open,
    close,
    categoryId,
}: NewProductPopUpProps) {

    const [galleryImages, setGalleryImages] =
        useState<(File | null)[]>([
            null,
            null,
            null,
            null
        ]);

    const [form, setForm] = useState<ProductForm>({
        name: "",
        code: "",
        description: "",
        price: "",
        discount: "0",
        quantity: "",
        color: "",
        size: "",
        brand: "",
        material: "",
        status: "ACTIVE",
        galleryImages: []
    });


    const [error, setError] = useState<string>("");

    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement
        >
    ) => {

        const {
            name,
            value,
        } = event.target;

        setForm(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const addProduct = async () => {
        setError("");
        setForm(formPrev => ({
            ...formPrev,
            galleryImages: galleryImages
        }));

        if (!form.name.trim()) {
            setError("Product name is required.");
            return;
        }

        if (!form.code.trim()) {
            setError("Product code is required.");
            return;
        }

        if (!form.price) {
            setError("Product price is required.");
            return;
        }

        if (form.galleryImages.every(image => image == null)) {
            setError("At least One Product Image is required.");
            return;
        }


        const productData = {
            categoryId,
            name: form.name,
            code: form.code,
            description: form.description,
            price: Number(form.price),
            discount: Number(form.discount),
            quantity: Number(form.quantity),
            color: form.color,
            size: form.size,
            brand: form.brand,
            material: form.material,
            status: form.status,
            galleryImages:
                galleryImages.filter(
                    image => image !== null
                )
        };


        console.log(
            "NEW PRODUCT:",
            productData
        );


        /*Add Product Mutation Vro*/

        enqueueSnackbar("Product Uploaded Successfully!", { variant: "success" })
        close();
    };



    return (

        <Modal
            aria-labelledby="new-product-modal-title"
            aria-describedby="new-product-modal-description"
            open={open}
            onClose={close}
            closeAfterTransition
            slots={{
                backdrop: Backdrop,
            }}
            slotProps={{
                backdrop: { timeout: 500 }
            }}
        >

            <Fade in={open}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: {
                            xs: "96%",
                            sm: "92%",
                            md: 1000,
                            lg: 1100,
                        },
                        maxHeight: "94vh",
                        overflowY: "auto",
                        bgcolor: "background.paper",
                        borderRadius: 3,
                        boxShadow: 24,
                        p: {
                            xs: 2,
                            sm: 3,
                            md: 4,
                        }
                    }}
                >

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent:
                                "space-between",

                            mb: 2
                        }}
                    >
                        <Box>
                            <Typography
                                id="new-product-modal-title"
                                variant="h5"
                                fontWeight={700}
                            >
                                Add New Product
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 0.5 }}
                            >
                                Add product information,
                                pricing, inventory and
                                product images.
                            </Typography>
                        </Box>

                        <IconButton onClick={close}>
                            <CloseRounded />
                        </IconButton>

                    </Box>


                    <Divider sx={{ mb: 3 }} />

                    {error && (

                        <Alert
                            severity="error"
                            sx={{ mb: 2 }}
                        >
                            {error}
                        </Alert>

                    )}

                    {/* MAIN GRID */}
                    <Grid
                        container
                        spacing={{
                            xs: 3,
                            md: 4,
                        }}
                    >

                        {/* LEFT : MULPITLE IMAGES GALLERY */}

                        <Grid size={{ xs: 12, md: 6 }}>
                            <GalleryImageUploader key={1} galleryImages={galleryImages} setGalleryImages={setGalleryImages} />
                        </Grid>


                        {/* ================================= */}
                        {/* RIGHT : PRODUCT INFO */}
                        {/* ================================= */}

                        <Grid
                            size={{
                                xs: 12,
                                md: 6,
                            }}
                        >

                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection:
                                        "column",

                                    gap: 2,
                                }}
                            >

                                <Typography
                                    variant="h6"
                                    fontWeight={600}
                                >
                                    Product Information
                                </Typography>


                                {/* Product Name */}

                                <TextField
                                    required
                                    fullWidth
                                    label="Product Name"
                                    name="name"
                                    value={form.name}
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="e.g. Classic Cotton T-Shirt"
                                />


                                {/* Product Code */}

                                <TextField
                                    required
                                    fullWidth
                                    label="Product Code / SKU"
                                    name="code"
                                    value={form.code}
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="e.g. TS-BLK-001"
                                    helperText="Use a unique code for inventory management."
                                />


                                {/* Brand */}

                                <TextField
                                    fullWidth
                                    label="Brand"
                                    name="brand"
                                    value={form.brand}
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="e.g. GD Fashion"
                                />


                                {/* Price + Discount */}

                                <Grid
                                    container
                                    spacing={2}
                                >

                                    <Grid
                                        size={{
                                            xs: 6,
                                        }}
                                    >

                                        <TextField
                                            required
                                            fullWidth
                                            type="number"
                                            label="Price"
                                            name="price"
                                            value={
                                                form.price
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            slotProps={{
                                                input: {
                                                    startAdornment:
                                                        <InputAdornment position="start">
                                                            ¥
                                                        </InputAdornment>,
                                                },
                                            }}
                                        />

                                    </Grid>


                                    <Grid
                                        size={{
                                            xs: 6,
                                        }}
                                    >

                                        <TextField
                                            fullWidth
                                            type="number"
                                            label="Discount"
                                            name="discount"
                                            value={
                                                form.discount
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            slotProps={{
                                                input: {
                                                    endAdornment:
                                                        <InputAdornment position="end">
                                                            %
                                                        </InputAdornment>,
                                                },
                                            }}
                                        />

                                    </Grid>

                                </Grid>


                                {/* Quantity */}

                                <TextField
                                    required
                                    fullWidth
                                    type="number"
                                    label="Initial Stock Quantity"
                                    name="quantity"
                                    value={
                                        form.quantity
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    slotProps={{
                                        input: {
                                            startAdornment:
                                                <InputAdornment position="start">
                                                    Units
                                                </InputAdornment>,
                                        },
                                    }}
                                />


                                <Divider />


                                {/* Size + Color */}

                                <Grid
                                    container
                                    spacing={2}
                                >

                                    <Grid
                                        size={{
                                            xs: 6,
                                        }}
                                    >

                                        <FormControl
                                            fullWidth
                                        >

                                            <InputLabel>
                                                Size
                                            </InputLabel>

                                            <Select
                                                label="Size"
                                                name="size"
                                                value={
                                                    form.size
                                                }
                                                onChange={(
                                                    event
                                                ) =>
                                                    setForm(
                                                        prev => ({
                                                            ...prev,
                                                            size:
                                                                event
                                                                    .target
                                                                    .value,
                                                        })
                                                    )
                                                }
                                            >

                                                <MenuItem value="">
                                                    Select Size
                                                </MenuItem>

                                                <MenuItem value="S">
                                                    Small
                                                </MenuItem>

                                                <MenuItem value="M">
                                                    Medium
                                                </MenuItem>

                                                <MenuItem value="L">
                                                    Large
                                                </MenuItem>

                                                <MenuItem value="XL">
                                                    Extra Large
                                                </MenuItem>

                                                <MenuItem value="2XL">
                                                    2XL
                                                </MenuItem>

                                            </Select>

                                        </FormControl>

                                    </Grid>


                                    <Grid
                                        size={{
                                            xs: 6,
                                        }}
                                    >

                                        <TextField
                                            fullWidth
                                            label="Color"
                                            name="color"
                                            value={
                                                form.color
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="e.g. Navy Blue"
                                        />

                                    </Grid>

                                </Grid>


                                {/* Material */}

                                <TextField
                                    fullWidth
                                    label="Material"
                                    name="material"
                                    value={
                                        form.material
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="e.g. 100% Cotton"
                                />


                                {/* Description */}

                                <TextField
                                    fullWidth
                                    multiline
                                    minRows={3}
                                    label="Product Description"
                                    name="description"
                                    value={
                                        form.description
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Describe the product, features, materials, etc."
                                />


                                {/* Status */}

                                <FormControl
                                    fullWidth
                                >

                                    <InputLabel>
                                        Product Status
                                    </InputLabel>

                                    <Select
                                        label="Product Status"
                                        name="status"
                                        value={
                                            form.status
                                        }
                                        onChange={(
                                            event
                                        ) =>
                                            setForm(
                                                prev => ({
                                                    ...prev,
                                                    status:
                                                        event
                                                            .target
                                                            .value,
                                                })
                                            )
                                        }
                                    >

                                        <MenuItem value="ACTIVE">
                                            Active
                                        </MenuItem>

                                        <MenuItem value="DRAFT">
                                            Draft
                                        </MenuItem>

                                        <MenuItem value="OUT_OF_STOCK">
                                            Out of Stock
                                        </MenuItem>

                                    </Select>

                                </FormControl>


                                {/* ================================= */}
                                {/* ADD PRODUCT */}
                                {/* ================================= */}

                                <Box
                                    sx={{
                                        mt: {
                                            xs: 1,
                                            md: "auto",
                                        },

                                        pt: 1,
                                    }}
                                >

                                    <Button
                                        fullWidth
                                        variant="contained"
                                        size="large"
                                        startIcon={
                                            <Inventory2Rounded />
                                        }
                                        onClick={
                                            addProduct
                                        }
                                        sx={{
                                            py: 1.5,
                                            borderRadius: 2,
                                            fontSize:
                                                "1rem",
                                            fontWeight:
                                                600,
                                            textTransform:
                                                "none",
                                        }}
                                    >
                                        Add Product
                                    </Button>

                                </Box>

                            </Box>

                        </Grid>

                    </Grid>

                </Box>

            </Fade>

        </Modal>
    );
}