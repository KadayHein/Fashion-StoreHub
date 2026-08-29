"use client";

import React, { useMemo, useState } from "react";

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Chip,
    Divider,
    InputAdornment,
    Paper,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography,
} from "@mui/material";

import {
    ExpandMoreRounded,
    HelpOutlineRounded,
    SearchRounded,
} from "@mui/icons-material";


/* =========================================================
   TYPES
========================================================= */

type FAQAudience =
    | "CUSTOMER"
    | "STAFF";

type FAQCategory =
    | "ORDERS"
    | "PAYMENT"
    | "SHIPPING"
    | "CANCELLATION"
    | "PRODUCTS"
    | "PROMOTIONS"
    | "INVENTORY"
    | "TRANSFER"
    | "REPORTS"
    | "OPERATIONS";


interface FAQItem {

    id: number;

    audience: FAQAudience;

    category: FAQCategory;

    question: string;

    answer: string;

}


/* =========================================================
   MOCK FAQ DATA
========================================================= */

const faqData: FAQItem[] = [

    /* =====================================================
       CUSTOMER
    ===================================================== */

    {
        id: 1,
        audience: "CUSTOMER",
        category: "ORDERS",
        question:
            "How can I check my order status?",
        answer:
            "You can check your order status from your Order History. Each order will show its current status, such as Pending, Processing, Shipped, or Delivered.",
    },

    {
        id: 2,
        audience: "CUSTOMER",
        category: "ORDERS",
        question:
            "Can I change my order after placing it?",
        answer:
            "Order changes may be possible while the order is still pending or processing. Once the order has been shipped, changes may no longer be possible.",
    },

    {
        id: 3,
        audience: "CUSTOMER",
        category: "PAYMENT",
        question:
            "What payment methods are available?",
        answer:
            "Available payment methods depend on the store configuration. Supported methods may include credit cards, electronic payments, and other available payment services.",
    },

    {
        id: 4,
        audience: "CUSTOMER",
        category: "SHIPPING",
        question:
            "How long does delivery take?",
        answer:
            "Delivery time depends on the destination, shipping method, and product availability. The estimated delivery period will be shown during the ordering process.",
    },

    {
        id: 5,
        audience: "CUSTOMER",
        category: "CANCELLATION",
        question:
            "Can I cancel my order?",
        answer:
            "You may request cancellation while the order is eligible for cancellation. Cancellation requests are reviewed according to the store's cancellation policy.",
    },

    {
        id: 6,
        audience: "CUSTOMER",
        category: "CANCELLATION",
        question:
            "How can I return a product?",
        answer:
            "Submit a return request from your order details. The store staff will review the reason and condition of the product before approving or rejecting the request.",
    },

    {
        id: 7,
        audience: "CUSTOMER",
        category: "PRODUCTS",
        question:
            "How can I know if a product is available?",
        answer:
            "Product availability is displayed on the product page. Products that are temporarily unavailable may also provide information about expected availability.",
    },

    {
        id: 8,
        audience: "CUSTOMER",
        category: "PROMOTIONS",
        question:
            "How do Flash Sales work?",
        answer:
            "Flash Sales are special discounts available for a limited time or quantity. Once the configured period or stock limit is reached, the promotion will end.",
    },


    /* =====================================================
       STAFF
    ===================================================== */

    {
        id: 9,
        audience: "STAFF",
        category: "ORDERS",
        question:
            "What should I do when a new order arrives?",
        answer:
            "Review the order details, confirm product availability, and move the order through the appropriate processing workflow. Make sure any required stock reservation is completed.",
    },

    {
        id: 10,
        audience: "STAFF",
        category: "INVENTORY",
        question:
            "How do I add a new product?",
        answer:
            "Go to Inventory > Catalog Setup and create the product information, category, genre, SKU, pricing, images, and initial stock information.",
    },

    {
        id: 11,
        audience: "STAFF",
        category: "INVENTORY",
        question:
            "What should I do when stock is damaged?",
        answer:
            "Record the damaged quantity through the Stock Adjustment process and provide an appropriate reason. The adjustment will be included in inventory records and reports.",
    },

    {
        id: 12,
        audience: "STAFF",
        category: "TRANSFER",
        question:
            "How do I transfer stock between warehouses?",
        answer:
            "Open Inventory > Stock Manager > Stock Transfers. Select the source warehouse, destination warehouse, products, and quantities, then submit the transfer request.",
    },

    {
        id: 13,
        audience: "STAFF",
        category: "INVENTORY",
        question:
            "What should I do when stock is low?",
        answer:
            "Check Inventory > Stock Manager > Low-stock Alerts. Review the affected warehouse and product quantity, then follow the store's replenishment procedure.",
    },

    {
        id: 14,
        audience: "STAFF",
        category: "REPORTS",
        question:
            "When should I submit a Stock Report?",
        answer:
            "Submit reports according to the reporting schedule established by the manager. Daily reports should normally reflect the day's inventory activity before the reporting deadline.",
    },

    {
        id: 15,
        audience: "STAFF",
        category: "REPORTS",
        question:
            "What is a Stock Adjustment Report?",
        answer:
            "A Stock Adjustment Report records changes caused by damaged, lost, missing, corrected, or otherwise adjusted inventory. Staff should provide the quantity and reason for each adjustment.",
    },

    {
        id: 16,
        audience: "STAFF",
        category: "OPERATIONS",
        question:
            "What should I do when a customer requests a cancellation?",
        answer:
            "Review the order status and cancellation reason. If the order is eligible, process the request according to store policy and record the decision.",
    },

    {
        id: 17,
        audience: "STAFF",
        category: "OPERATIONS",
        question:
            "What should I do when a returned product arrives?",
        answer:
            "Inspect the returned product, verify its condition against the return request, and record the inspection result before completing the return workflow.",
    },

];


/* =========================================================
   CATEGORY LABEL
========================================================= */

const categoryLabels: Record<
    FAQCategory,
    string
> = {

    ORDERS: "Orders",

    PAYMENT: "Payment",

    SHIPPING: "Shipping",

    CANCELLATION:
        "Cancellation & Returns",

    PRODUCTS: "Products",

    PROMOTIONS: "Promotions",

    INVENTORY: "Inventory",

    TRANSFER: "Stock Transfer",

    REPORTS: "Reports",

    OPERATIONS: "Operations",

};


/* =========================================================
   FAQ PAGE
========================================================= */

export default function FAQs() {

    const [
        audience,
        setAudience,
    ] = useState<FAQAudience>(
        "CUSTOMER"
    );


    const [
        search,
        setSearch,
    ] = useState("");


    const [
        category,
        setCategory,
    ] = useState<
        FAQCategory | "ALL"
    >("ALL");


    /* =====================================================
       FILTER
    ===================================================== */

    const filteredFAQs =
        useMemo(() => {

            return faqData.filter(
                faq => {

                    const matchesAudience =
                        faq.audience ===
                        audience;


                    const matchesCategory =
                        category === "ALL" ||
                        faq.category ===
                        category;


                    const searchText =
                        search
                            .toLowerCase()
                            .trim();


                    const matchesSearch =
                        !searchText ||
                        faq.question
                            .toLowerCase()
                            .includes(
                                searchText
                            ) ||
                        faq.answer
                            .toLowerCase()
                            .includes(
                                searchText
                            ) ||
                        categoryLabels[
                            faq.category
                        ]
                            .toLowerCase()
                            .includes(
                                searchText
                            );


                    return (
                        matchesAudience &&
                        matchesCategory &&
                        matchesSearch
                    );

                }
            );

        }, [
            audience,
            search,
            category,
        ]);


    /* =====================================================
       CATEGORIES
    ===================================================== */

    const categories =
        Array.from(
            new Set(
                faqData
                    .filter(
                        faq =>
                            faq.audience ===
                            audience
                    )
                    .map(
                        faq =>
                            faq.category
                    )
            )
        );


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
                mb={3}
            >

                <Box>

                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                    >

                        <HelpOutlineRounded fontSize="large"/>

                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >
                            FAQs
                        </Typography>

                    </Stack>


                    <Typography
                        color="text.secondary"
                        sx={{
                            mt: 0.5,
                        }}
                    >
                        Frequently asked questions
                        and operational guidance.
                    </Typography>

                </Box>

            </Stack>


            {/* =================================================
                AUDIENCE TABS
            ================================================= */}

            <Paper
                variant="outlined"
                sx={{
                    borderRadius: 3,
                    mb: 3,
                }}
            >

                <Tabs
                    value={audience}
                    onChange={(
                        _,
                        value
                    ) =>
                        setAudience(
                            value
                        )
                    }
                    variant="fullWidth"
                >

                    <Tab
                        value="CUSTOMER"
                        label="Customer FAQs"
                    />

                    <Tab
                        value="STAFF"
                        label="Staff FAQs"
                    />

                </Tabs>

            </Paper>


            {/* =================================================
                SEARCH
            ================================================= */}

            <TextField
                fullWidth
                placeholder={
                    audience ===
                    "CUSTOMER"
                        ? "Search customer questions..."
                        : "Search staff procedures..."
                }
                value={search}
                onChange={event =>
                    setSearch(
                        event.target.value
                    )
                }
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


            {/* =================================================
                CATEGORY FILTER
            ================================================= */}

            <Stack
                direction="row"
                spacing={1}
                useFlexGap
                flexWrap="wrap"
                sx={{
                    mb: 3,
                }}
            >

                <Chip
                    label="All"
                    variant={
                        category === "ALL"
                            ? "filled"
                            : "outlined"
                    }
                    color={
                        category === "ALL"
                            ? "primary"
                            : "default"
                    }
                    onClick={() =>
                        setCategory(
                            "ALL"
                        )
                    }
                />


                {categories.map(
                    item => (

                        <Chip
                            key={item}
                            label={
                                categoryLabels[
                                    item
                                ]
                            }
                            variant={
                                category === item
                                    ? "filled"
                                    : "outlined"
                            }
                            color={
                                category === item
                                    ? "primary"
                                    : "default"
                            }
                            onClick={() =>
                                setCategory(
                                    item
                                )
                            }
                        />

                    )
                )}

            </Stack>


            {/* =================================================
                RESULTS
            ================================================= */}

            <Stack
                spacing={1.5}
            >

                {filteredFAQs.length >
                0 ? (

                    filteredFAQs.map(
                        faq => (

                            <Accordion
                                key={faq.id}
                                disableGutters
                                elevation={0}
                                sx={{
                                    border:
                                        "1px solid",
                                    borderColor:
                                        "divider",
                                    borderRadius:
                                        "12px !important",

                                    "&:before": {
                                        display:
                                            "none",
                                    },

                                    "&.Mui-expanded":
                                        {
                                            margin: 0,
                                        },
                                }}
                            >

                                <AccordionSummary
                                    expandIcon={
                                        <ExpandMoreRounded />
                                    }
                                    sx={{
                                        px: 2.5,
                                        py: 0.5,
                                    }}
                                >

                                    <Stack
                                        spacing={0.5}
                                    >

                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            alignItems="center"
                                            flexWrap="wrap"
                                        >

                                            <Chip
                                                size="small"
                                                label={
                                                    categoryLabels[
                                                        faq.category
                                                    ]
                                                }
                                            />

                                        </Stack>


                                        <Typography
                                            fontWeight={600}
                                        >
                                            {
                                                faq.question
                                            }
                                        </Typography>

                                    </Stack>

                                </AccordionSummary>


                                <AccordionDetails
                                    sx={{
                                        px: 2.5,
                                        pb: 2.5,
                                    }}
                                >

                                    <Divider
                                        sx={{
                                            mb: 2,
                                        }}
                                    />


                                    <Typography
                                        color="text.secondary"
                                        sx={{
                                            lineHeight:
                                                1.8,
                                        }}
                                    >
                                        {
                                            faq.answer
                                        }
                                    </Typography>

                                </AccordionDetails>

                            </Accordion>

                        )
                    )

                ) : (

                    /* =================================================
                       NO RESULT
                    ================================================= */

                    <Paper
                        variant="outlined"
                        sx={{
                            p: 6,
                            textAlign: "center",
                            borderRadius: 3,
                        }}
                    >

                        <HelpOutlineRounded
                            sx={{
                                fontSize: 48,
                                color:
                                    "text.disabled",
                                mb: 1,
                            }}
                        />

                        <Typography
                            variant="h6"
                            fontWeight={700}
                        >
                            No FAQs Found
                        </Typography>


                        <Typography
                            color="text.secondary"
                            sx={{
                                mt: 0.5,
                            }}
                        >
                            Try a different
                            search keyword
                            or category.
                        </Typography>

                    </Paper>

                )}

            </Stack>


            {/* =================================================
                FOOTER
            ================================================= */}

            <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
                sx={{
                    mt: 4,
                }}
            >
                Showing{" "}
                <strong>
                    {filteredFAQs.length}
                </strong>{" "}
                frequently asked{" "}
                {audience === "CUSTOMER"
                    ? "customer"
                    : "staff"}{" "}
                questions.
            </Typography>

        </Box>

    );

}