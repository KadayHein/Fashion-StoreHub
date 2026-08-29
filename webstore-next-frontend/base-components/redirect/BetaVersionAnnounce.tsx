"use client";

import React from "react";

import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import {
    ArrowBackRounded,
    ConstructionRounded,
    DashboardRounded,
    EngineeringRounded,
    HourglassTopRounded,
    InfoOutlined,
    RocketLaunchRounded,
} from "@mui/icons-material";

import { useRouter } from "next/navigation";


export default function BetaVersionAnnounce() {

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
                px: 2
            }}
        >

            <Card
                variant="outlined"
                sx={{
                    width: "100%",
                    maxWidth: 900,
                    borderRadius: 4,
                    overflow: "hidden",
                }}
            >
                <Box
                    sx={{
                        height: 7,
                        bgcolor: "warning.main",
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

                    <Stack
                        alignItems="center"
                        textAlign="center"
                        spacing={2}
                    >

                        <Box
                            sx={{
                                width: 80,
                                height: 80,
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                bgcolor:
                                    "warning.light",
                                color:
                                    "warning.dark",
                            }}
                        >

                            <EngineeringRounded
                                sx={{
                                    fontSize: 42,
                                }}
                            />

                        </Box>


                        <Chip
                            icon={
                                <ConstructionRounded />
                            }
                            label="BETA VERSION"
                            color="warning"
                            sx={{
                                fontWeight: 700,
                            }}
                        />


                        <Typography
                            variant="h3"
                            fontWeight={800}
                            sx={{
                                fontSize: {
                                    xs: "2rem",
                                    md: "2.75rem",
                                },
                            }}
                        >
                            Feature Under Development
                        </Typography>


                        <Typography
                            color="text.secondary"
                            sx={{
                                maxWidth: 650,
                                lineHeight: 1.7,
                            }}
                        >
                            This feature is currently being
                            developed and has not been officially
                            released yet. We are working to make
                            sure everything is stable and ready
                            before the official release.
                        </Typography>

                    </Stack>


                    <Divider
                        sx={{
                            my: 5,
                        }}
                    />

                    <Grid
                        container
                        spacing={2}
                    >

                        <Grid
                            size={{
                                xs: 12,
                                md: 4,
                            }}
                        >

                            <StatusCard
                                icon={
                                    <EngineeringRounded />
                                }
                                title="In Development"
                                description="The feature is currently being implemented and tested."
                            />

                        </Grid>


                        <Grid
                            size={{
                                xs: 12,
                                md: 4,
                            }}
                        >

                            <StatusCard
                                icon={
                                    <HourglassTopRounded />
                                }
                                title="Not Released"
                                description="This feature is not available in the official production version."
                            />

                        </Grid>


                        <Grid
                            size={{
                                xs: 12,
                                md: 4,
                            }}
                        >

                            <StatusCard
                                icon={
                                    <RocketLaunchRounded />
                                }
                                title="Coming Soon"
                                description="The feature will become available after development and testing are completed."
                            />

                        </Grid>

                    </Grid>

                    <Paper
                        variant="outlined"
                        sx={{
                            mt: 4,
                            p: 2.5,
                            borderRadius: 3,
                            bgcolor:
                                "action.hover",
                        }}
                    >

                        <Stack
                            direction="row"
                            spacing={1.5}
                            alignItems="flex-start"
                        >

                            <InfoOutlined
                                color="action"
                            />

                            <Box>

                                <Typography
                                    fontWeight={700}
                                >
                                    Why can't I use this feature?
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        mt: 0.5,
                                        lineHeight: 1.7,
                                    }}
                                >
                                    Beta features may still
                                    contain unfinished functions,
                                    design changes, or unexpected
                                    behavior. Access is currently
                                    limited while development
                                    continues.
                                </Typography>

                            </Box>

                        </Stack>

                    </Paper>

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
                                minWidth: 180,
                            }}
                        >
                            Go Back
                        </Button>


                        <Button
                            variant="contained"
                            size="large"
                            startIcon={
                                <DashboardRounded />
                            }
                            onClick={() =>
                                router.back()
                            }
                            sx={{
                                minWidth: 180,
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


function StatusCard({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) {

    return (

        <Paper
            variant="outlined"
            sx={{
                p: 2.5,
                height: "100%",
                borderRadius: 3,
            }}
        >

            <Stack
                spacing={1.5}
            >

                <Box
                    sx={{
                        width: 42,
                        height: 42,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor:
                            "action.hover",
                    }}
                >

                    {icon}

                </Box>


                <Typography
                    fontWeight={700}
                >
                    {title}
                </Typography>


                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        lineHeight: 1.6,
                    }}
                >
                    {description}
                </Typography>

            </Stack>

        </Paper>

    );

}