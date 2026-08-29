"use client";

import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import {
    AddRounded,
    DeleteOutlineRounded,
    SaveRounded,
    CloseRounded,
    Inventory2Outlined,
} from "@mui/icons-material";

import { useState } from "react";
import NewProductPopUp from "./NewProductPopup";
import { useMobileScroll } from "@/service/customHooks/useMobileScroll";

type Product = {
    id: number;
    name: string;
    imageUrl: string;
};

type Genre = {
    id: number;
    name: string;
    products: Product[];
};

export default function NewCategorySetter() {

    const [categoryName, setCategoryName] = useState("");

    const [genres, setGenres] = useState<Genre[]>([]);

    const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);

    const [genreName, setGenreName] = useState("");

    const [productPopUpOpen, setProductPopUpOpen] = useState(false);
    const productPopUpClose = () => setProductPopUpOpen(false)

    const addGenre = () => {

        if (!genreName.trim()) {
            return;
        }

        const newGenre: Genre = {
            id: Date.now(),
            name: genreName.trim(),
            products: [],
        };

        setGenres(prev => [
            ...prev,
            newGenre,
        ]);
        setSelectedGenreId(newGenre.id);
        setGenreName("");
    };

    const selectGenre = (id: number) => {

        setSelectedGenreId(id);

        const genre = genres.find(
            item => item.id === id
        );

        if (genre) {
            setGenreName(genre.name);
        }
    };

    const deleteGenre = (
        id: number
    ) => {

        setGenres(prev =>
            prev.filter(
                genre => genre.id !== id
            )
        );

        if (selectedGenreId === id) {
            setSelectedGenreId(null);
            setGenreName("");
        }
    };

    const saveCategory = () => {

        if (!categoryName.trim()) {
            return;
        }

        if (genres.length === 0) {
            return;
        }

        console.log({
            categoryName,
            genres,
        });

        // GraphQL mutation here
    };

    const selectedGenre = genres.find(
        genre =>
            genre.id === selectedGenreId
    );

    const { targetRef, scrollToTarget } = useMobileScroll();



    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: 1200,
                mx: "auto"
            }}
        >
            <Box sx={{ mb: 4 }}>

                <Typography
                    variant="h4"
                    fontWeight={700}
                >
                    Create Inventory Category
                </Typography>

                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                >
                    Create a category, organize genres,
                    and assign products to your inventory.
                </Typography>

            </Box>

            <Grid
                container
                spacing={{
                    xs: 2,
                    md: 4,
                }}
            >
                <Grid
                    size={{
                        xs: 12,
                        md: 5,
                    }}
                >
                    <Card
                        elevation={2}
                        sx={{
                            borderRadius: 3,
                            height: "100%",
                        }}
                    >
                        <CardContent
                            sx={{ p: { xs: 2, sm: 3 } }}>
                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                                mb={2}
                            >
                                <Inventory2Outlined
                                    color="primary"
                                />
                                <Typography
                                    variant="h6"
                                    fontWeight={700}
                                >
                                    Category
                                </Typography>
                            </Stack>

                            <TextField
                                fullWidth
                                required
                                label="Category Name"
                                placeholder="Enter category name"
                                value={categoryName}
                                onChange={(e) =>
                                    setCategoryName(
                                        e.target.value
                                    )
                                }
                                sx={{ mb: 3 }}
                            />

                            <Divider sx={{ mb: 2 }} />

                            <Box>

                                <Typography
                                    variant="subtitle1"
                                    fontWeight={600}
                                >
                                    Genres
                                </Typography>

                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    At least one genre
                                    is required for a category.
                                </Typography>

                            </Box>


                            <Stack
                                direction={{
                                    xs: "column",
                                    sm: "row",
                                }}
                                spacing={1}
                                sx={{ mt: 2 }}
                            >

                                <TextField
                                    fullWidth
                                    size="small"
                                    label="New Genre"
                                    placeholder="Enter genre name"
                                    value={genreName}
                                    onChange={(e) =>
                                        setGenreName(
                                            e.target.value
                                        )
                                    }
                                />

                                <Button
                                    variant="contained"
                                    onClick={addGenre}
                                    sx={{
                                        minWidth: {
                                            xs: "100%",
                                            sm: 110,
                                        }
                                    }}
                                    startIcon={<AddRounded />}
                                >
                                    Add
                                </Button>
                            </Stack>

                            <Typography
                                variant="subtitle2"
                                color="text.secondary"
                                sx={{
                                    mt: 3,
                                    mb: 1,
                                }}
                            >
                                Existing Genres
                            </Typography>

                            <Box
                                sx={{
                                    border: "1px solid",
                                    borderColor:
                                        "divider",
                                    borderRadius: 2,
                                    overflow: "hidden",
                                }}
                            >

                                {genres.length === 0 ? (
                                    <Box
                                        sx={{
                                            py: 5,
                                            textAlign:
                                                "center",
                                            color:
                                                "text.secondary",
                                        }}
                                    >

                                        <Typography
                                            variant="body2"
                                        >
                                            No genres added yet.
                                        </Typography>

                                    </Box>

                                ) : (

                                    <Box
                                        sx={{
                                            height: 300,
                                            overflowY: "auto"
                                        }}
                                    >
                                        <List disablePadding>
                                            {genres.map(genre => (
                                                <ListItemButton
                                                    key={genre.id}
                                                    selected={selectedGenreId === genre.id}
                                                    onClick={() => {
                                                        selectGenre(genre.id)
                                                        scrollToTarget()
                                                    }}
                                                    sx={{
                                                        borderBottom: "1px solid",
                                                        borderColor: "divider"
                                                    }}
                                                >
                                                    <ListItemText
                                                        primary={genre.name}
                                                        secondary={`${genre.products.length} products`}
                                                    />

                                                    <IconButton
                                                        size="small"
                                                        color="error"
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            deleteGenre(genre.id);
                                                        }}
                                                    >
                                                        <DeleteOutlineRounded />
                                                    </IconButton>
                                                </ListItemButton>
                                            ))}
                                        </List>
                                    </Box>
                                )}

                            </Box>

                        </CardContent>

                    </Card>

                </Grid>


                {/* RIGHT : GENRE / PRODUCTS*/}

                <Grid ref={targetRef}
                    size={{
                        xs: 12,
                        md: 7,
                    }}
                >

                    <Card
                        elevation={2}
                        sx={{
                            borderRadius: 3,
                            minHeight: {
                                xs: "auto",
                                md: 550,
                            },
                        }}
                    >

                        <CardContent
                            sx={{
                                p: {
                                    xs: 2,
                                    sm: 3,
                                },
                            }}
                        >

                            {!selectedGenre ? (

                                <Box
                                    sx={{
                                        minHeight: 400,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        textAlign: "center",
                                        color: "text.secondary",
                                    }}
                                >

                                    <Inventory2Outlined
                                        sx={{
                                            fontSize: 60,
                                            opacity: 0.25,
                                            mb: 2,
                                        }}
                                    />

                                    <Typography
                                        variant="h6"
                                        fontWeight={600}
                                    >
                                        Select a Genre
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            mt: 0.5,
                                            maxWidth: 350,
                                        }}
                                    >
                                        Select an existing
                                        genre or create a new
                                        genre to manage its
                                        products.
                                    </Typography>

                                </Box>

                            ) : (
                                <>
                                    <Typography
                                        variant="h6"
                                        fontWeight={700}
                                        mb={2}
                                    >
                                        Genre Details
                                    </Typography>

                                    <Stack
                                        direction={{
                                            xs: "column",
                                            sm: "row",
                                        }}
                                        spacing={1.5}
                                        mb={3}
                                    >

                                        <TextField
                                            fullWidth
                                            label="Genre Name"
                                            value={
                                                genreName
                                            }
                                            onChange={(e) =>
                                                setGenreName(
                                                    e.target
                                                        .value
                                                )
                                            }
                                        />

                                        <Button
                                            variant="outlined"
                                            startIcon={
                                                <SaveRounded />
                                            }
                                            //onClick={() => EditGenreName()}
                                            sx={{
                                                minWidth: {
                                                    xs: "100%",
                                                    sm: 170,
                                                }
                                            }}
                                        >
                                            Save Name
                                        </Button>

                                    </Stack>


                                    <Divider sx={{ mb: 2 }} />

                                    <Typography
                                        variant="subtitle1"
                                        fontWeight={600}
                                    >
                                        Existing Products
                                    </Typography>

                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        Products assigned to{" "}
                                        <strong>
                                            {
                                                selectedGenre.name
                                            }
                                        </strong>
                                    </Typography>

                                    <Box sx={{ mt: 2 }}>

                                        {selectedGenre.products
                                            .length ===
                                            0 ? (

                                            <Box
                                                sx={{
                                                    py: 6,
                                                    textAlign:
                                                        "center",
                                                    border:
                                                        "1px dashed",
                                                    borderColor:
                                                        "divider",
                                                    borderRadius: 2,
                                                }}
                                            >

                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    No products assigned yet.
                                                </Typography>

                                                <Button
                                                    size="small"
                                                    startIcon={
                                                        <AddRounded />
                                                    }
                                                    sx={{
                                                        mt: 1,
                                                    }}
                                                    onClick={() =>
                                                        setProductPopUpOpen(true)
                                                    }
                                                >
                                                    Add Product
                                                </Button>

                                            </Box>

                                        ) : (

                                            <List>
                                                {selectedGenre.products.map(
                                                    product => (
                                                        <ListItemButton
                                                            key={
                                                                product.id
                                                            }
                                                        >

                                                            <ListItemText
                                                                primary={
                                                                    product.name
                                                                }
                                                            />

                                                        </ListItemButton>
                                                    )
                                                )}
                                            </List>

                                        )}

                                    </Box>

                                </>

                            )}

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Stack
                direction={{
                    xs: "column-reverse",
                    sm: "row",
                }}
                justifyContent="flex-end"
                spacing={1.5}
                sx={{ mt: 4 }}
            >

                <Button
                    variant="outlined"
                    color="inherit"
                    startIcon={
                        <CloseRounded />
                    }
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    startIcon={
                        <SaveRounded />
                    }
                    onClick={saveCategory}
                    disabled={
                        !categoryName.trim() ||
                        genres.length === 0
                    }
                >
                    Save Category
                </Button>

            </Stack>

            {
                productPopUpOpen &&
                <NewProductPopUp open={productPopUpOpen} close={productPopUpClose} categoryId={1} />
            }

        </Box>
    );
}