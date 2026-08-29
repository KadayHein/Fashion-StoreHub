"use client"
import { client } from '@/lib/apolloClient';
import { AddRecIcon } from '@/service/svgIconUtils';
import { gql } from '@apollo/client'
import { Box, Card, CardActionArea, CardContent, CardMedia, IconButton, Stack, Typography } from '@mui/material'
import { usePathname, useRouter } from '@/i18n/navigation'
import React, { useEffect } from 'react'

export default function ProductModification() {

    useEffect(() => {
        getCategories();
    }, [])

    const [categories, setCategories] = React.useState<Category[]>([]);
    const router = useRouter();
    const location = usePathname();

    async function getCategories() {
        await client.query<AllCategoriesResponse>({
            query: gql`
            query allCat{
            allCategories{
            id
            name
            bannerImageUrl
            }
            }
            `, fetchPolicy: 'network-only' // refresh graphql cache -> fetch new data
        }).then(resp => setCategories(resp.data.allCategories))
            .catch(err => console.log(err))
    }

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ mb: { xs: 3, sm: 4, md: 5 } }}>
                <Typography
                    variant="h4"
                    fontWeight={700}
                    sx={{
                        fontSize: {
                            xs: "1.7rem",
                            sm: "2rem",
                            md: "2.25rem",
                        },
                    }}
                >
                    Inventory Categories
                </Typography>

                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                        mt: 0.5,
                        fontSize: {
                            xs: "0.9rem",
                            sm: "1rem",
                        },
                    }}
                >
                    Manage and monitor your inventory by product category.
                </Typography>
            </Box>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, 1fr)",
                        md: "repeat(3, 1fr)",
                        lg: "repeat(4, 1fr)",
                    },
                    gap: {
                        xs: 2,
                        sm: 2.5,
                        md: 3,
                    },
                    width: "100%",
                }}
            >

                <Card
                    sx={(theme) => ({
                        boxShadow: theme.shadows[3],
                        width: "100%",
                        borderRadius: 3,
                        border: "2px dashed",
                        borderColor: "primary.main",
                        overflow: "hidden",
                        minHeight: {
                            xs: 240,
                            sm: 250,
                        },
                        display: "flex"
                    })}
                >
                    <CardActionArea
                        onClick={() =>
                            router.push(`${location}/0`)
                        }
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            p: 3,
                            "&:hover .add-icon": {
                                transform: "scale(1.15)",
                            },
                        }}
                    >

                        <IconButton
                            size="large"
                            color="primary"
                            className="add-icon"
                            sx={{
                                mb: 1,
                                transition: "transform 0.2s",
                            }}
                        >
                            <AddRecIcon width={42} height={42} />
                        </IconButton>

                        <Typography
                            variant="h6"
                            fontWeight={600}
                        >
                            Add Category
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            textAlign="center"
                            sx={{ mt: 0.5 }}
                        >
                            Create a new inventory category
                        </Typography>
                    </CardActionArea>
                </Card>
                {categories?.map((category) => (
                    <Card
                        key={category.id}
                        sx={(theme) => ({
                            boxShadow: theme.shadows[3],
                            width: "100%",
                            borderRadius: 3,
                            overflow: "hidden",

                            display: "flex",
                            flexDirection: "column",

                            transition:
                                "transform 0.2s, box-shadow 0.2s",

                            "&:hover": {
                                transform: "translateY(-3px)",
                                boxShadow: theme.shadows[6],
                            },
                        })}
                    >
                        <CardActionArea
                            onClick={() =>
                                router.push(
                                    `${location}/${category.id}`
                                )
                            }
                        >
                            <CardMedia
                                component="img"
                                image={`/images/categorybanner/${category.bannerImageUrl}`}
                                alt={category.name}
                                sx={{
                                    width: "100%",
                                    height: {
                                        xs: 150,
                                        sm: 160,
                                        md: 170,
                                    },
                                    objectFit: "cover",
                                    objectPosition: "center",
                                }}
                            />
                            <CardContent
                                sx={{
                                    p: {
                                        xs: 1.75,
                                        sm: 2,
                                    },

                                    "&:last-child": {
                                        pb: {
                                            xs: 1.75,
                                            sm: 2,
                                        },
                                    },
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    fontWeight={600}
                                    color="text.primary"
                                    noWrap
                                >
                                    {category.name}
                                </Typography>


                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mt: 0.5 }}
                                >
                                    125 units in stock
                                </Typography>


                                <Typography
                                    variant="body1"
                                    fontWeight={600}
                                    sx={{ mt: 1 }}
                                >
                                    Inventory value{" "}
                                    ¥345,000
                                </Typography>


                                <Typography
                                    variant="caption"
                                    color="primary.main"
                                    sx={{
                                        display: "block",
                                        mt: 1,
                                    }}
                                >
                                    View inventory →
                                </Typography>

                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>
        </Box>
    )
}
