"use client";

import React, { useState } from "react";

import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Typography,
} from "@mui/material";

import {
    LanguageRounded,
    ShoppingCartRounded,
    PersonRounded,
    SettingsRounded,
} from "@mui/icons-material";


// =====================================================
// LANGUAGE TYPES
// =====================================================

type Language = "en" | "ja";


// =====================================================
// TRANSLATION STRUCTURE
//
// In a real project, these should eventually be moved
// into separate locale files.
//
// Example:
//
// locales/
// ├── en.json
// └── ja.json
// =====================================================

const translations = {

    en: {

        page: {
            title: "Globalization Example",
            description:
                "Manage your website language and localized content.",
        },

        language: {
            label: "Language",
            english: "English",
            japanese: "Japanese",
        },

        navigation: {
            home: "Home",
            products: "Products",
            orders: "Orders",
            customers: "Customers",
            settings: "Settings",
        },

        dashboard: {
            welcome: "Welcome back!",
            description:
                "Here is an overview of your store.",
            totalOrders: "Total Orders",
            totalSales: "Total Sales",
            customers: "Customers",
            pendingOrders: "Pending Orders",
        },

        product: {
            title: "Featured Product",
            name: "Premium Wireless Headphones",
            price: "Price",
            available: "Available",
            addToCart: "Add to Cart",
        },

        actions: {
            save: "Save",
            cancel: "Cancel",
            edit: "Edit",
            delete: "Delete",
        },

        status: {
            available: "Available",
            unavailable: "Unavailable",
            pending: "Pending",
        },

    },


    ja: {

        page: {
            title: "多言語化の例",
            description:
                "ウェブサイトの言語とローカライズされたコンテンツを管理します。",
        },

        language: {
            label: "言語",
            english: "英語",
            japanese: "日本語",
        },

        navigation: {
            home: "ホーム",
            products: "商品",
            orders: "注文",
            customers: "顧客",
            settings: "設定",
        },

        dashboard: {
            welcome: "おかえりなさい！",
            description:
                "ショップの概要を確認できます。",
            totalOrders: "注文数",
            totalSales: "売上",
            customers: "顧客数",
            pendingOrders: "保留中の注文",
        },

        product: {
            title: "おすすめ商品",
            name: "プレミアムワイヤレスヘッドホン",
            price: "価格",
            available: "在庫あり",
            addToCart: "カートに追加",
        },

        actions: {
            save: "保存",
            cancel: "キャンセル",
            edit: "編集",
            delete: "削除",
        },

        status: {
            available: "在庫あり",
            unavailable: "在庫切れ",
            pending: "保留中",
        },

    },

};


// =====================================================
// COMPONENT
// =====================================================

export default function ExampleGlobalization() {

    const [language, setLanguage] =
        useState<Language>("en");


    // Current translation object
    const t = translations[language];


    // =================================================
    // LANGUAGE CHANGE
    // =================================================

    const handleLanguageChange = (
        event: SelectChangeEvent
    ) => {

        setLanguage(
            event.target.value as Language
        );

    };


    return (

        <Box
            sx={{
                maxWidth: 1100,
                mx: "auto",
                p: {
                    xs: 2,
                    md: 4,
                },
            }}
        >

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

                    <Typography
                        variant="h4"
                        fontWeight={800}
                    >
                        {t.page.title}
                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                    >
                        {t.page.description}
                    </Typography>

                </Box>


                {/* LANGUAGE SELECTOR */}

                <FormControl
                    size="small"
                    sx={{
                        minWidth: 170,
                    }}
                >

                    <InputLabel>
                        {t.language.label}
                    </InputLabel>

                    <Select
                        value={language}
                        label={t.language.label}
                        onChange={
                            handleLanguageChange
                        }
                        startAdornment={
                            <LanguageRounded
                                sx={{
                                    mr: 1,
                                    ml: 0.5,
                                }}
                            />
                        }
                    >

                        <MenuItem value="en">
                            🇺🇸 {t.language.english}
                        </MenuItem>

                        <MenuItem value="ja">
                            🇯🇵 {t.language.japanese}
                        </MenuItem>

                    </Select>

                </FormControl>

            </Stack>


            {/* =================================================
                NAVIGATION EXAMPLE
            ================================================= */}

            <Card
                variant="outlined"
                sx={{
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
                        Navigation
                    </Typography>


                    <Stack
                        direction="row"
                        spacing={1}
                        flexWrap="wrap"
                        useFlexGap
                    >

                        <Button>
                            {t.navigation.home}
                        </Button>

                        <Button>
                            {t.navigation.products}
                        </Button>

                        <Button>
                            {t.navigation.orders}
                        </Button>

                        <Button>
                            {t.navigation.customers}
                        </Button>

                        <Button
                            startIcon={
                                <SettingsRounded />
                            }
                        >
                            {t.navigation.settings}
                        </Button>

                    </Stack>

                </CardContent>

            </Card>


            {/* =================================================
                DASHBOARD EXAMPLE
            ================================================= */}

            <Typography
                variant="h5"
                fontWeight={800}
                mb={2}
            >
                {t.dashboard.welcome}
            </Typography>


            <Typography
                color="text.secondary"
                mb={3}
            >
                {t.dashboard.description}
            </Typography>


            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr 1fr",
                        md: "repeat(4, 1fr)",
                    },
                    gap: 2,
                    mb: 4,
                }}
            >

                <Card variant="outlined">
                    <CardContent>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {t.dashboard.totalOrders}
                        </Typography>

                        <Typography
                            variant="h5"
                            fontWeight={800}
                        >
                            1,284
                        </Typography>

                    </CardContent>
                </Card>


                <Card variant="outlined">
                    <CardContent>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {t.dashboard.totalSales}
                        </Typography>

                        <Typography
                            variant="h5"
                            fontWeight={800}
                        >
                            ¥4.28M
                        </Typography>

                    </CardContent>
                </Card>


                <Card variant="outlined">
                    <CardContent>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {t.dashboard.customers}
                        </Typography>

                        <Typography
                            variant="h5"
                            fontWeight={800}
                        >
                            892
                        </Typography>

                    </CardContent>
                </Card>


                <Card variant="outlined">
                    <CardContent>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {t.dashboard.pendingOrders}
                        </Typography>

                        <Typography
                            variant="h5"
                            fontWeight={800}
                        >
                            24
                        </Typography>

                    </CardContent>
                </Card>

            </Box>


            {/* =================================================
                PRODUCT EXAMPLE
            ================================================= */}

            <Card
                variant="outlined"
                sx={{
                    borderRadius: 3,
                }}
            >

                <CardContent>

                    <Stack
                        direction={{
                            xs: "column",
                            sm: "row",
                        }}
                        justifyContent="space-between"
                        gap={2}
                    >

                        <Box>

                            <Typography
                                variant="overline"
                                color="text.secondary"
                            >
                                {t.product.title}
                            </Typography>

                            <Typography
                                variant="h6"
                                fontWeight={800}
                            >
                                {t.product.name}
                            </Typography>

                            <Divider
                                sx={{ my: 2 }}
                            />

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                {t.product.price}
                            </Typography>

                            <Typography
                                variant="h5"
                                fontWeight={800}
                            >
                                ¥12,800
                            </Typography>

                            <Chip
                                size="small"
                                color="success"
                                label={
                                    t.status.available
                                }
                                sx={{
                                    mt: 1,
                                }}
                            />

                        </Box>


                        <Stack
                            justifyContent="flex-end"
                            alignItems={{
                                xs: "stretch",
                                sm: "flex-end",
                            }}
                            gap={1}
                        >

                            <Button
                                variant="contained"
                                startIcon={
                                    <ShoppingCartRounded />
                                }
                            >
                                {
                                    t.product
                                        .addToCart
                                }
                            </Button>

                            <Button
                                variant="outlined"
                                startIcon={
                                    <PersonRounded />
                                }
                            >
                                {
                                    t.navigation
                                        .customers
                                }
                            </Button>

                        </Stack>

                    </Stack>

                </CardContent>

            </Card>


            {/* =================================================
                ACTION EXAMPLES
            ================================================= */}

            <Stack
                direction="row"
                spacing={1}
                mt={3}
            >

                <Button
                    variant="contained"
                >
                    {t.actions.save}
                </Button>

                <Button
                    variant="outlined"
                >
                    {t.actions.cancel}
                </Button>

                <Button>
                    {t.actions.edit}
                </Button>

                <Button
                    color="error"
                >
                    {t.actions.delete}
                </Button>

            </Stack>

        </Box>

    );
}