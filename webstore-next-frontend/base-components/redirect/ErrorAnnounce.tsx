"use client";

import React from "react";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import {
    ArrowBackRounded,
    DashboardRounded,
    ErrorOutlineRounded,
    RefreshRounded,
} from "@mui/icons-material";

import { useRouter } from "@/i18n/navigation";


interface ErrorAnnounceProps {

    errorMessage: string;

    title?: string;

    errorCode?: string;

    onRetry?: () => void;

}


export default function ErrorAnnounce({
    errorMessage,
    title = "Something went wrong",
    errorCode,
    onRetry,
}: ErrorAnnounceProps) {

    const router = useRouter();


    return (

        <Box
            sx={{
                minHeight: "70vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                py: {
                    xs: 4,
                    md: 8,
                },
            }}
        >

            <Card
                variant="outlined"
                sx={{
                    width: "100%",
                    maxWidth: 750,
                    borderRadius: 4,
                    overflow: "hidden",
                }}
            >

                {/* TOP ERROR BAR */}

                <Box
                    sx={{
                        height: 7,
                        bgcolor: "error.main",
                    }}
                />


                <CardContent
                    sx={{
                        p: {
                            xs: 3,
                            sm: 5,
                            md: 6,
                        },
                    }}
                >

                    {/* ERROR ICON */}

                    <Stack
                        alignItems="center"
                        textAlign="center"
                        spacing={2}
                    >

                        <Box
                            sx={{
                                width: 82,
                                height: 82,
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                bgcolor:
                                    "error.light",
                                color:
                                    "error.main",
                            }}
                        >

                            <ErrorOutlineRounded
                                sx={{
                                    fontSize: 46,
                                }}
                            />

                        </Box>


                        {errorCode && (

                            <Typography
                                variant="overline"
                                fontWeight={700}
                                color="error.main"
                            >
                                ERROR {errorCode}
                            </Typography>

                        )}


                        <Typography
                            variant="h3"
                            fontWeight={800}
                            sx={{
                                fontSize: {
                                    xs: "2rem",
                                    md: "2.6rem",
                                },
                            }}
                        >
                            {title}
                        </Typography>


                        <Typography
                            color="text.secondary"
                            sx={{
                                maxWidth: 600,
                                lineHeight: 1.7,
                            }}
                        >
                            An unexpected problem occurred
                            while processing your request.
                            Please check the information below
                            and try again.
                        </Typography>

                    </Stack>


                    <Divider
                        sx={{
                            my: 4,
                        }}
                    />


                    {/* ERROR MESSAGE */}

                    <Alert
                        severity="error"
                        icon={
                            <ErrorOutlineRounded />
                        }
                        sx={{
                            borderRadius: 3,
                            alignItems: "flex-start",
                        }}
                    >

                        <Typography
                            fontWeight={700}
                            sx={{
                                mb: 0.5,
                            }}
                        >
                            Error Details
                        </Typography>


                        <Typography
                            variant="body2"
                        >
                            {errorMessage}
                        </Typography>

                    </Alert>


                    {/* OPTIONAL TECHNICAL INFORMATION */}

                    {errorCode && (

                        <Paper
                            variant="outlined"
                            sx={{
                                mt: 2,
                                p: 2,
                                borderRadius: 3,
                                bgcolor:
                                    "action.hover",
                            }}
                        >

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Error Code
                            </Typography>


                            <Typography
                                fontWeight={700}
                            >
                                {errorCode}
                            </Typography>

                        </Paper>

                    )}


                    {/* ACTION BUTTONS */}

                    <Stack
                        direction={{
                            xs: "column",
                            sm: "row",
                        }}
                        justifyContent="center"
                        spacing={2}
                        sx={{
                            mt: 5,
                        }}
                    >

                        <Button
                            variant="outlined"
                            size="large"
                            startIcon={
                                <ArrowBackRounded />
                            }
                            onClick={() =>
                                router.back()
                            }
                            sx={{
                                minWidth: 170,
                            }}
                        >
                            Go Back
                        </Button>


                        {onRetry && (

                            <Button
                                variant="outlined"
                                size="large"
                                startIcon={
                                    <RefreshRounded />
                                }
                                onClick={onRetry}
                                sx={{
                                    minWidth: 170,
                                }}
                            >
                                Try Again
                            </Button>

                        )}


                        <Button
                            variant="contained"
                            size="large"
                            startIcon={
                                <DashboardRounded />
                            }
                            onClick={() =>
                                router.push(
                                    "/admin/dashboard"
                                )
                            }
                            sx={{
                                minWidth: 170,
                            }}
                        >
                            Dashboard
                        </Button>

                    </Stack>

                </CardContent>

            </Card>

        </Box>

    );
}