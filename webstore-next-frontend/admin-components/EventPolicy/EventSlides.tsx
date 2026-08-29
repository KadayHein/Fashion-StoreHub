"use client";

import React, { useMemo, useState } from "react";

import {
    AddRounded,
    CalendarMonthRounded,
    CampaignRounded,
    CloseRounded,
    DeleteOutlineRounded,
    EditRounded,
    ImageRounded,
    VisibilityRounded,
    DragIndicatorRounded,
    SearchRounded,
} from "@mui/icons-material";

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
    Paper,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

type EventSlideStatus =
    | "ACTIVE"
    | "SCHEDULED"
    | "EXPIRED"
    | "PAUSED";

type EventSlide = {
    id: string;
    title: string;
    description: string;
    bannerImage: string;
    status: EventSlideStatus;
    startDate: string;
    endDate: string;
    displayOrder: number;
};

const initialEventSlides: EventSlide[] = [
    {
        id: "SLIDE-202608-001",

        title: "Summer Collection 2026",

        description:
            "Discover our latest summer collection.",

        bannerImage:
            "/images/slides/slide2.png",

        status: "ACTIVE",

        startDate: "2026-08-01",

        endDate: "2026-08-31",

        displayOrder: 1,
    },

    {
        id: "SLIDE-202609-002",

        title: "Autumn New Arrivals",

        description:
            "New autumn styles are coming soon.",

        bannerImage:
            "/images/slides/slide1.png",

        status: "SCHEDULED",

        startDate: "2026-09-01",

        endDate: "2026-09-30",

        displayOrder: 2,
    },

    {
        id: "SLIDE-202609-003",

        title: "Winter New Arrivals",

        description:
            "New winter styles are coming soon.",

        bannerImage:
            "/images/slides/slide3.png",

        status: "EXPIRED",

        startDate: "2026-09-05",

        endDate: "2026-10-30",

        displayOrder: 3,
    }
];

const statusConfig: Record<
    EventSlideStatus,
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

export default function EventSlides() {

    const [
        slides,
        setSlides,
    ] = useState<EventSlide[]>(
        initialEventSlides
    );

    const [
        search,
        setSearch,
    ] = useState("");

    const [
        statusFilter,
        setStatusFilter,
    ] = useState<
        EventSlideStatus | "ALL"
    >("ALL");

    const [
        openCreate,
        setOpenCreate,
    ] = useState(false);

    const [
        editingSlide,
        setEditingSlide,
    ] = useState<EventSlide | null>(
        null
    );

    const [
        previewSlide,
        setPreviewSlide,
    ] = useState<EventSlide | null>(
        null
    );


    const filteredSlides =
        useMemo(() => {

            const query =
                search
                    .toLowerCase()
                    .trim();

            return slides.filter(
                slide => {

                    const matchesSearch =
                        !query ||
                        slide.title
                            .toLowerCase()
                            .includes(query) ||
                        slide.id
                            .toLowerCase()
                            .includes(query);

                    const matchesStatus =
                        statusFilter ===
                        "ALL" ||
                        slide.status ===
                        statusFilter;

                    return (
                        matchesSearch &&
                        matchesStatus
                    );
                }
            );

        }, [
            slides,
            search,
            statusFilter,
        ]);


    const handleDelete = (
        id: string
    ) => {

        setSlides(prev =>
            prev.filter(
                slide =>
                    slide.id !== id
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
                mb={4}
            >

                <Box>

                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                    >

                        <CampaignRounded fontSize="large" />

                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >
                            Event Slides
                        </Typography>

                    </Stack>

                    <Typography
                        color="text.secondary"
                        sx={{
                            mt: 0.5,
                        }}
                    >
                        Manage event banners displayed
                        on the customer landing page.
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
                    New Event Slide
                </Button>

            </Stack>


            {/* ========================================= */}
            {/* CUSTOMER SIDE WARNING */}
            {/* ========================================= */}

            <Alert
                severity="info"
                icon={
                    <VisibilityRounded />
                }
                sx={{
                    mb: 3,
                    borderRadius: 2,
                }}
            >
                Changes to active event slides
                will immediately affect the
                customer-facing landing page.
            </Alert>


            {/* ========================================= */}
            {/* SUMMARY */}
            {/* ========================================= */}

            <Grid
                container
                spacing={2}
                mb={3}
            >

                <SummaryCard
                    title="Active"
                    value={
                        slides.filter(
                            slide =>
                                slide.status ===
                                "ACTIVE"
                        ).length
                    }
                />

                <SummaryCard
                    title="Scheduled"
                    value={
                        slides.filter(
                            slide =>
                                slide.status ===
                                "SCHEDULED"
                        ).length
                    }
                />

                <SummaryCard
                    title="Paused"
                    value={
                        slides.filter(
                            slide =>
                                slide.status ===
                                "PAUSED"
                        ).length
                    }
                />

                <SummaryCard
                    title="Expired"
                    value={
                        slides.filter(
                            slide =>
                                slide.status ===
                                "EXPIRED"
                        ).length
                    }
                />

            </Grid>


            {/* ========================================= */}
            {/* SEARCH / FILTER */}
            {/* ========================================= */}

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
                    placeholder="Search event slide..."
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
                        value={
                            statusFilter
                        }
                        label="Status"
                        onChange={event =>
                            setStatusFilter(
                                event.target.value as
                                EventSlideStatus |
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


            {/* ========================================= */}
            {/* EVENT SLIDES */}
            {/* ========================================= */}

            <Grid
                container
                spacing={2}
            >

                {filteredSlides.map(
                    slide => (

                        <Grid
                            key={slide.id}
                            size={{
                                xs: 12,
                                md: 6,
                                lg: 4,
                            }}
                        >

                            <EventSlideCard
                                slide={slide}
                                onEdit={() =>
                                    setEditingSlide(
                                        slide
                                    )
                                }
                                onPreview={() =>
                                    setPreviewSlide(
                                        slide
                                    )
                                }
                                onDelete={() =>
                                    handleDelete(
                                        slide.id
                                    )
                                }
                            />

                        </Grid>

                    )
                )}

            </Grid>


            {/* ========================================= */}
            {/* CREATE */}
            {/* ========================================= */}

            <EventSlideDialog
                open={openCreate}
                onClose={() =>
                    setOpenCreate(false)
                }
                onSave={newSlide => {

                    setSlides(prev => [

                        {
                            ...newSlide,

                            id:
                                `SLIDE-${Date.now()}`,

                            status:
                                "SCHEDULED",

                            displayOrder:
                                prev.length + 1,
                        },

                        ...prev,
                    ]);

                    setOpenCreate(false);
                }}
            />


            {/* ========================================= */}
            {/* EDIT */}
            {/* ========================================= */}

            {editingSlide && (

                <EventSlideDialog
                    open
                    slide={
                        editingSlide
                    }
                    onClose={() =>
                        setEditingSlide(
                            null
                        )
                    }
                    onSave={updated => {

                        setSlides(prev =>
                            prev.map(
                                slide =>
                                    slide.id ===
                                        editingSlide.id
                                        ? {
                                            ...slide,
                                            ...updated,
                                        }
                                        : slide
                            )
                        );

                        setEditingSlide(
                            null
                        );
                    }}
                />

            )}


            {/* ========================================= */}
            {/* PREVIEW */}
            {/* ========================================= */}

            {previewSlide && (

                <EventPreviewDialog
                    slide={
                        previewSlide
                    }
                    onClose={() =>
                        setPreviewSlide(
                            null
                        )
                    }
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

function EventSlideCard({
    slide,
    onEdit,
    onPreview,
    onDelete,
}: {
    slide: EventSlide;

    onEdit: () => void;

    onPreview: () => void;

    onDelete: () => void;
}) {

    const config =
        statusConfig[
        slide.status
        ];


    return (

        <Card
            variant="outlined"
            sx={{
                height: "100%",
                borderRadius: 3,
                overflow: "hidden",

                transition:
                    "all .2s",

                "&:hover": {
                    transform:
                        "translateY(-2px)",
                    boxShadow: 3,
                },
            }}
        >

            {/* HERO IMAGE */}

            <Box
                sx={{
                    position: "relative",
                    height: 190,
                    bgcolor: "grey.200",
                    overflow: "hidden",
                }}
            >

                {slide.bannerImage ? (

                    <Box
                        component="img"
                        src={
                            slide.bannerImage
                        }
                        alt={
                            slide.title
                        }
                        sx={{
                            width: "100%",
                            height: "100%",
                            objectFit:
                                "cover",
                        }}
                    />

                ) : (

                    <Stack
                        height="100%"
                        alignItems="center"
                        justifyContent="center"
                    >

                        <ImageRounded
                            sx={{
                                fontSize: 50,
                                color:
                                    "text.disabled",
                            }}
                        />

                    </Stack>

                )}


                {/* STATUS */}

                <Chip
                    size="small"
                    label={
                        config.label
                    }
                    color={
                        config.color
                    }
                    sx={{
                        position:
                            "absolute",
                        top: 12,
                        right: 12,
                    }}
                />

            </Box>


            <CardContent>

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                >

                    <Box>

                        <Typography
                            variant="h6"
                            fontWeight={700}
                        >
                            {slide.title}
                        </Typography>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            {slide.id}
                        </Typography>

                    </Box>


                    <Chip
                        size="small"
                        label={`#${slide.displayOrder}`}
                        variant="outlined"
                    />

                </Stack>


                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mt: 1.5,
                        minHeight: 42,
                    }}
                >
                    {slide.description}
                </Typography>


                <Divider
                    sx={{
                        my: 2,
                    }}
                />


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
                        {slide.startDate}
                        {" → "}
                        {slide.endDate}
                    </Typography>

                </Stack>


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
                            <VisibilityRounded />
                        }
                        onClick={
                            onPreview
                        }
                    >
                        Preview
                    </Button>


                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={
                            <EditRounded />
                        }
                        onClick={
                            onEdit
                        }
                    >
                        Edit
                    </Button>


                    <IconButton
                        color="error"
                        onClick={
                            onDelete
                        }
                    >
                        <DeleteOutlineRounded />
                    </IconButton>

                </Stack>

            </CardContent>

        </Card>
    );
}

function ImagePreview({
    src,
    onRemove,
}: {
    src: string;

    onRemove: () => void;
}) {

    return (

        <Box
            sx={{
                position: "relative",
                aspectRatio: "1 / 1",
                borderRadius: 2,
                overflow: "hidden",
                bgcolor: "grey.100",
                border: "1px solid",
                borderColor: "divider",
            }}
        >

            <Box
                component="img"
                src={src}
                alt="Event"
                sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
            />


            <IconButton
                size="small"
                onClick={onRemove}
                sx={{
                    position:
                        "absolute",
                    top: 6,
                    right: 6,

                    bgcolor:
                        "rgba(0,0,0,.65)",

                    color: "white",

                    "&:hover": {
                        bgcolor:
                            "rgba(0,0,0,.85)",
                    },
                }}
            >
                <CloseRounded
                    fontSize="small"
                />
            </IconButton>

        </Box>
    );
}

function EventSlideDialog({
    open,
    onClose,
    onSave,
    slide,
}: {
    open: boolean;

    onClose: () => void;

    onSave: (
        slide: Omit<
            EventSlide,
            "id" |
            "status" |
            "displayOrder"
        >
    ) => void;

    slide?: EventSlide;
}) {

    const [
        title,
        setTitle,
    ] = useState(
        slide?.title ?? ""
    );

    const [
        description,
        setDescription,
    ] = useState(
        slide?.description ?? ""
    );

    const [
        startDate,
        setStartDate,
    ] = useState(
        slide?.startDate ?? ""
    );

    const [
        endDate,
        setEndDate,
    ] = useState(
        slide?.endDate ?? ""
    );


    // =========================================
    // BANNER IMAGE
    // =========================================

    const [
        bannerImage,
        setBannerImage,
    ] = useState<File | null>(null);

    const [
        existingBannerImage,
        setExistingBannerImage,
    ] = useState<string>(
        slide?.bannerImage ?? ""
    );


    const [
        error,
        setError,
    ] = useState("");


    // =========================================
    // IMAGE CHANGE
    // =========================================

    const handleBannerImageChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {

        const file =
            event.target.files?.[0];

        if (!file) return;


        if (!file.type.startsWith("image/")) {

            setError(
                "Please select a valid image file."
            );

            return;
        }


        // Optional: 10 MB limit

        if (file.size > 10 * 1024 * 1024) {

            setError(
                "Banner image must be smaller than 10 MB."
            );

            return;
        }


        setBannerImage(file);

        // New image replaces old image
        setExistingBannerImage("");

        setError("");
    };


    // =========================================
    // REMOVE IMAGE
    // =========================================

    const handleRemoveBanner = () => {

        setBannerImage(null);

        setExistingBannerImage("");

        setError("");
    };


    // =========================================
    // SAVE
    // =========================================

    const handleSave = () => {

        if (!title.trim()) {

            setError(
                "Event title is required."
            );

            return;
        }


        if (!startDate || !endDate) {

            setError(
                "Please select the available date range."
            );

            return;
        }


        if (endDate < startDate) {

            setError(
                "End date must be after start date."
            );

            return;
        }


        // =====================================
        // IMPORTANT
        // Existing image OR new image
        // =====================================

        if (
            !bannerImage &&
            !existingBannerImage
        ) {

            setError(
                "One event banner image is required."
            );

            return;
        }


        setError("");


        onSave({

            title:
                title.trim(),

            description:
                description.trim(),

            bannerImage:
                bannerImage
                    ? URL.createObjectURL(
                        bannerImage
                    )
                    : existingBannerImage,

            startDate,

            endDate,
        });
    };


    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >

            {/* ================================= */}
            {/* TITLE */}
            {/* ================================= */}

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
                            {slide
                                ? "Edit Event Slide"
                                : "New Event Slide"}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Configure the event
                            displayed on the
                            customer landing page.
                        </Typography>

                    </Box>


                    <IconButton
                        onClick={onClose}
                    >
                        <CloseRounded />
                    </IconButton>

                </Stack>

            </DialogTitle>


            {/* ================================= */}
            {/* CONTENT */}
            {/* ================================= */}

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
                    {/* TITLE */}
                    {/* ================================= */}

                    <Grid
                        size={{
                            xs: 12,
                        }}
                    >

                        <TextField
                            fullWidth
                            label="Event Title"
                            placeholder="e.g. Summer Collection 2026"
                            value={title}
                            onChange={event =>
                                setTitle(
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
                            placeholder="Describe this event..."
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
                    {/* DATE */}
                    {/* ================================= */}

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
                            Event Availability
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
                        />

                    </Grid>


                    {/* ================================= */}
                    {/* BANNER IMAGE */}
                    {/* ================================= */}

                    <Grid
                        size={{
                            xs: 12,
                        }}
                    >

                        <Typography
                            variant="subtitle1"
                            fontWeight={700}
                            sx={{
                                mb: 0.5,
                            }}
                        >
                            Event Banner Image
                        </Typography>


                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                mb: 2,
                            }}
                        >
                            Upload exactly one banner
                            image. Recommended ratio:
                            16:6.
                        </Typography>


                        {/* ============================= */}
                        {/* IMAGE BOX */}
                        {/* ============================= */}

                        <Box
                            sx={{
                                position:
                                    "relative",

                                width:
                                    "100%",

                                aspectRatio:
                                    "16 / 6",

                                borderRadius:
                                    3,

                                overflow:
                                    "hidden",

                                border:
                                    "2px dashed",

                                borderColor:
                                    bannerImage ||
                                        existingBannerImage
                                        ? "success.main"
                                        : "divider",

                                bgcolor:
                                    "grey.100",

                                display:
                                    "flex",

                                alignItems:
                                    "center",

                                justifyContent:
                                    "center",
                            }}
                        >

                            {/* ================================= */}
                            {/* NEW IMAGE */}
                            {/* ================================= */}

                            {bannerImage ? (

                                <Box
                                    component="img"
                                    src={
                                        URL.createObjectURL(
                                            bannerImage
                                        )
                                    }
                                    alt="New Event Banner"
                                    sx={{
                                        width:
                                            "100%",

                                        height:
                                            "100%",

                                        objectFit:
                                            "cover",
                                    }}
                                />

                            ) : existingBannerImage ? (

                                /* ================================= */
                                /* EXISTING IMAGE */
                                /* ================================= */

                                <Box
                                    component="img"
                                    src={
                                        existingBannerImage
                                    }
                                    alt="Event Banner"
                                    sx={{
                                        width:
                                            "100%",

                                        height:
                                            "100%",

                                        objectFit:
                                            "cover",
                                    }}
                                />

                            ) : (

                                /* ================================= */
                                /* EMPTY STATE */
                                /* ================================= */

                                <Stack
                                    alignItems="center"
                                    justifyContent="center"
                                    spacing={1}
                                >

                                    <ImageRounded
                                        sx={{
                                            fontSize: 50,
                                            color:
                                                "text.disabled",
                                        }}
                                    />

                                    <Typography
                                        color="text.secondary"
                                        fontWeight={600}
                                    >
                                        No Banner Image
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Upload one image
                                        for this event.
                                    </Typography>

                                </Stack>

                            )}


                            {/* ================================= */}
                            {/* REMOVE BUTTON */}
                            {/* ================================= */}

                            {(bannerImage ||
                                existingBannerImage) && (

                                    <IconButton
                                        onClick={
                                            handleRemoveBanner
                                        }
                                        sx={{
                                            position:
                                                "absolute",

                                            top: 10,

                                            right: 10,

                                            bgcolor:
                                                "rgba(0,0,0,.65)",

                                            color:
                                                "white",

                                            "&:hover": {
                                                bgcolor:
                                                    "rgba(0,0,0,.85)",
                                            },
                                        }}
                                    >

                                        <CloseRounded />

                                    </IconButton>

                                )}

                        </Box>


                        {/* ================================= */}
                        {/* UPLOAD / REPLACE BUTTON */}
                        {/* ================================= */}

                        <Button
                            component="label"
                            variant="outlined"
                            startIcon={
                                <ImageRounded />
                            }
                            sx={{
                                mt: 2,
                            }}
                        >

                            {bannerImage ||
                                existingBannerImage
                                ? "Replace Banner"
                                : "Upload Banner"}

                            <input
                                hidden
                                type="file"
                                accept="image/*"
                                onChange={
                                    handleBannerImageChange
                                }
                            />

                        </Button>

                    </Grid>

                </Grid>

            </DialogContent>


            {/* ================================= */}
            {/* ACTIONS */}
            {/* ================================= */}

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
                    onClick={
                        handleSave
                    }
                >
                    {slide
                        ? "Save Changes"
                        : "Create Event Slide"}
                </Button>

            </DialogActions>

        </Dialog>
    );
}

function EventPreviewDialog({
    slide,
    onClose,
}: {
    slide: EventSlide;

    onClose: () => void;
}) {

    return (

        <Dialog
            open
            onClose={onClose}
            fullWidth
            maxWidth="lg"
        >

            {/* ================================= */}
            {/* HEADER */}
            {/* ================================= */}

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
                            Customer Preview
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            This is how the event
                            may appear on the
                            landing page.
                        </Typography>

                    </Box>


                    <IconButton
                        onClick={onClose}
                    >
                        <CloseRounded />
                    </IconButton>

                </Stack>

            </DialogTitle>


            {/* ================================= */}
            {/* PREVIEW */}
            {/* ================================= */}

            <DialogContent dividers>

                <Box
                    sx={{
                        position: "relative",

                        aspectRatio: "16 / 6",

                        width: "100%",

                        overflow: "hidden",

                        borderRadius: 3,

                        bgcolor: "grey.900",

                        boxShadow: 3,
                    }}
                >

                    {/* ================================= */}
                    {/* SINGLE BANNER IMAGE */}
                    {/* ================================= */}

                    <Box
                        component="img"
                        src={
                            slide.bannerImage
                        }
                        alt={
                            slide.title
                        }
                        sx={{
                            width: "100%",

                            height: "100%",

                            objectFit: "cover",
                        }}
                    />


                    {/* ================================= */}
                    {/* DARK GRADIENT */}
                    {/* ================================= */}

                    <Box
                        sx={{
                            position: "absolute",

                            inset: 0,

                            background:
                                "linear-gradient(90deg, rgba(0,0,0,.72) 0%, rgba(0,0,0,.35) 45%, rgba(0,0,0,0) 80%)",
                        }}
                    />


                    {/* ================================= */}
                    {/* EVENT INFORMATION */}
                    {/* ================================= */}

                    <Box
                        sx={{
                            position: "absolute",

                            inset: 0,

                            display: "flex",

                            alignItems: "center",

                            px: {
                                xs: 2,
                                sm: 4,
                                md: 6,
                            },

                            color: "white",
                        }}
                    >

                        <Box
                            maxWidth={{
                                xs: "75%",
                                sm: 500,
                            }}
                        >

                            <Typography
                                variant="h3"
                                fontWeight={800}
                                sx={{
                                    fontSize: {
                                        xs: "1.5rem",
                                        sm: "2.2rem",
                                        md: "3rem",
                                    },
                                }}
                            >
                                {slide.title}
                            </Typography>


                            {slide.description && (

                                <Typography
                                    sx={{
                                        mt: 1,

                                        fontSize: {
                                            xs: ".8rem",
                                            sm: "1rem",
                                        },
                                    }}
                                >
                                    {
                                        slide.description
                                    }
                                </Typography>

                            )}

                        </Box>

                    </Box>

                </Box>


                {/* ================================= */}
                {/* EVENT DETAILS */}
                {/* ================================= */}

                <Stack
                    direction={{
                        xs: "column",
                        sm: "row",
                    }}
                    spacing={2}
                    justifyContent="space-between"
                    sx={{
                        mt: 3,
                    }}
                >

                    {/* AVAILABLE FROM */}

                    <Box>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            Available From
                        </Typography>

                        <Typography
                            fontWeight={600}
                        >
                            {slide.startDate}
                        </Typography>

                    </Box>


                    {/* AVAILABLE UNTIL */}

                    <Box>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            Available Until
                        </Typography>

                        <Typography
                            fontWeight={600}
                        >
                            {slide.endDate}
                        </Typography>

                    </Box>


                    {/* STATUS */}

                    <Box>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            Status
                        </Typography>

                        <Typography
                            fontWeight={600}
                        >
                            {slide.status}
                        </Typography>

                    </Box>


                    {/* DISPLAY ORDER */}

                    <Box>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            Display Order
                        </Typography>

                        <Typography
                            fontWeight={600}
                        >
                            #{slide.displayOrder}
                        </Typography>

                    </Box>

                </Stack>

            </DialogContent>

        </Dialog>
    );
}