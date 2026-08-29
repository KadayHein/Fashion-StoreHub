import { CalendarMonthRounded, DiscountRounded, LocalOfferRounded } from '@mui/icons-material';
import { Box, Card, CardContent, Chip, Divider, Paper, Stack, Typography } from '@mui/material';
import React from 'react'

export default function NewArrivalCard({
    product,
    statusConfig
}: {
    product: NewArrival;
    statusConfig: Record<ArrivalStatus, {
    label: string;
    color: "default" | "success" | "warning";
}>
}) {

    const status =
        statusConfig[
            product.status
        ];


    return (

        <Card
            elevation={0}
            sx={{
                height: "100%",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
                overflow: "hidden",

                transition:
                    "transform .2s, box-shadow .2s",

                "&:hover": {
                    transform:
                        "translateY(-3px)",

                    boxShadow:
                        "0 8px 25px rgba(0,0,0,0.08)",
                },
            }}
        >

            {/* =================================================
                IMAGE
            ================================================= */}

            <Box
                sx={{
                    position: "relative",
                    aspectRatio: "1 / 1",
                    bgcolor: "grey.100",
                    overflow: "hidden",
                }}
            >

                <Box
                    component="img"
                    src={product.image}
                    alt={product.name}
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                    }}
                />


                {/* STATUS */}

                <Chip
                    label={status.label}
                    color={status.color}
                    size="small"
                    sx={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        fontWeight: 700,
                    }}
                />


                {/* DISCOUNT */}

                {product.discount && (

                    <Chip
                        icon={
                            <DiscountRounded />
                        }
                        label={`${product.discount}% OFF`}
                        color="error"
                        size="small"
                        sx={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            fontWeight: 700,
                        }}
                    />

                )}

            </Box>


            <CardContent>

                {/* =================================================
                    PRODUCT NAME
                ================================================= */}

                <Typography
                    variant="h6"
                    fontWeight={700}
                    noWrap
                >
                    {product.name}
                </Typography>


                <Typography
                    variant="caption"
                    color="text.secondary"
                >
                    SKU: {product.sku}
                </Typography>


                {/* =================================================
                    AVAILABLE DATE
                ================================================= */}

                <Paper
                    variant="outlined"
                    sx={{
                        mt: 2,
                        p: 1.25,
                        borderRadius: 2,
                    }}
                >

                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                    >

                        <CalendarMonthRounded
                            fontSize="small"
                        />

                        <Box>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                                display="block"
                            >
                                Available On
                            </Typography>

                            <Typography
                                variant="body2"
                                fontWeight={700}
                            >
                                {product.availableOn}
                            </Typography>

                        </Box>

                    </Stack>

                </Paper>


                {/* =================================================
                    COLORS
                ================================================= */}

                <Box sx={{ mt: 2 }}>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                        mb={0.75}
                    >
                        Available Colors
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={0.75}
                        flexWrap="wrap"
                        useFlexGap
                    >

                        {product.colors.map(
                            color => (

                                <Chip
                                    key={color}
                                    label={color}
                                    size="small"
                                    variant="outlined"
                                />

                            )
                        )}

                    </Stack>

                </Box>


                {/* =================================================
                    SIZES
                ================================================= */}

                <Box sx={{ mt: 1.5 }}>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                        mb={0.75}
                    >
                        Available Sizes
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={0.75}
                    >

                        {product.sizes.map(
                            size => (

                                <Chip
                                    key={size}
                                    label={size}
                                    size="small"
                                    variant="outlined"
                                />

                            )
                        )}

                    </Stack>

                </Box>


                <Divider
                    sx={{
                        my: 2,
                    }}
                />


                {/* =================================================
                    PRICE
                ================================================= */}

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >

                    <Box>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            Price
                        </Typography>

                        <Typography
                            variant="h6"
                            fontWeight={800}
                        >
                            ¥
                            {product.price.toLocaleString()}
                        </Typography>

                    </Box>

                </Stack>


                {/* =================================================
                    PROMOTIONS
                ================================================= */}

                {product.promotionType !==
                    "NONE" && (

                    <Paper
                        sx={{
                            mt: 2,
                            p: 1.5,
                            borderRadius: 2,
                            bgcolor:
                                "action.hover",
                        }}
                    >

                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems="flex-start"
                        >

                            <LocalOfferRounded
                                fontSize="small"
                            />

                            <Box>

                                <Typography
                                    variant="body2"
                                    fontWeight={700}
                                >
                                    Special Promotion
                                </Typography>


                                {/* FIRST 10 */}

                                {(product.promotionType ===
                                    "FIRST_SALES" ||
                                    product.promotionType ===
                                        "BOTH") &&
                                    product.firstSalesLimit && (

                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        display="block"
                                    >
                                        First{" "}
                                        {
                                            product.firstSalesLimit
                                        }{" "}
                                        sales:{" "}
                                        {
                                            product.discount
                                        }
                                        % OFF
                                    </Typography>

                                )}


                                {/* BULK */}

                                {(product.promotionType ===
                                    "BULK" ||
                                    product.promotionType ===
                                        "BOTH") &&
                                    product.bulkMinimum && (

                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        display="block"
                                    >
                                        Buy{" "}
                                        {
                                            product.bulkMinimum
                                        }+
                                        {" "}products:
                                        {" "}
                                        {
                                            product.bulkDiscount
                                        }
                                        % OFF
                                    </Typography>

                                )}

                            </Box>

                        </Stack>

                    </Paper>

                )}


                {/* =================================================
                    DESCRIPTION
                ================================================= */}

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mt: 2,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}
                >
                    {product.description}
                </Typography>

            </CardContent>

        </Card>
    );
}
