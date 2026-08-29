"use client";

import {
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    Container,
    Divider,
    Grid,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";

import StorefrontIcon from "@mui/icons-material/Storefront";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CodeIcon from "@mui/icons-material/Code";
import CopyrightIcon from "@mui/icons-material/Copyright";
import HandshakeIcon from "@mui/icons-material/Handshake";
import { useAppTranslation } from "@/service/customHooks/useAppTranslation";

export default function About() {

    const { about } = useAppTranslation();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background:
                    "linear-gradient(180deg, #f7f8ff 0%, #ffffff 100%)",
                py: { xs: 5, md: 8 },
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        textAlign: "center",
                        mb: 6,
                    }}
                >
                    <IconButton sx={{ p: 0 }}>
                        <Avatar sx={{ width: 100, height: 100 }} alt="Store Logo" src="/images/WEBLOGO.png" />
                    </IconButton>

                    <Typography
                        variant="h3"
                        fontWeight={800}
                        sx={{
                            mt: 3,
                            fontSize: {
                                xs: "2rem",
                                md: "3rem",
                            },
                        }}
                    >
                        {about("title")}
                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{
                            maxWidth: 700,
                            mx: "auto",
                            mt: 2,
                            lineHeight: 1.8,
                        }}
                    >
                        {about("intro")}
                    </Typography>
                </Box>


                <Card
                    elevation={0}
                    sx={{
                        borderRadius: 4,
                        border: "1px solid",
                        borderColor: "divider",
                        mb: 3,
                    }}
                >
                    <CardContent sx={{ p: { xs: 3, md: 5 } }}>

                        <Stack
                            direction="row"
                            spacing={1.5}
                            alignItems="center"
                            mb={2}
                        >
                            <StorefrontIcon color="primary" />

                            <Typography variant="h5" fontWeight={700}>
                                {about("store.title")}
                            </Typography>
                        </Stack>

                        <Typography
                            color="text.secondary"
                            lineHeight={1.9}
                        >
                            {about("store.description1")}
                        </Typography>

                        <Typography
                            color="text.secondary"
                            lineHeight={1.9}
                            mt={2}
                        >
                            {about("store.description2")}
                        </Typography>

                    </CardContent>
                </Card>

                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Card
                            elevation={0}
                            sx={{
                                height: "100%",
                                borderRadius: 4,
                                border: "1px solid",
                                borderColor: "divider",
                            }}
                        >
                            <CardContent sx={{ p: 4 }}>

                                <PersonIcon
                                    color="primary"
                                    sx={{ fontSize: 35 }}
                                />

                                <Typography
                                    variant="h5"
                                    fontWeight={700}
                                    mt={1}
                                >
                                    {about("founder.title")}
                                </Typography>

                                <Typography
                                    variant="h6"
                                    fontWeight={600}
                                    mt={2}
                                >
                                    {about("founder.name")}
                                </Typography>

                                <Typography
                                    color="text.secondary"
                                    lineHeight={1.8}
                                    mt={1}
                                >
                                    {about("founder.description")}
                                </Typography>

                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Vision */}

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Card
                            elevation={0}
                            sx={{
                                height: "100%",
                                borderRadius: 4,
                                border: "1px solid",
                                borderColor: "divider",
                            }}
                        >
                            <CardContent sx={{ p: 4 }}>

                                <VisibilityIcon
                                    color="primary"
                                    sx={{ fontSize: 35 }}
                                />

                                <Typography
                                    variant="h5"
                                    fontWeight={700}
                                    mt={1}
                                >
                                    {about("vision.title")}
                                </Typography>

                                <Typography
                                    color="text.secondary"
                                    lineHeight={1.8}
                                    mt={2}
                                >
                                    {about("vision.description")}
                                </Typography>

                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>

                {/* ================= VALUES ================= */}

                <Card
                    elevation={0}
                    sx={{
                        mt: 3,
                        borderRadius: 4,
                        border: "1px solid",
                        borderColor: "divider",
                    }}
                >
                    <CardContent sx={{ p: { xs: 3, md: 5 } }}>

                        <Stack
                            direction="row"
                            spacing={1.5}
                            alignItems="center"
                            mb={3}
                        >
                            <FavoriteIcon color="primary" />

                            <Typography variant="h5" fontWeight={700}>
                                {about("values.title")}
                            </Typography>
                        </Stack>

                        <Grid container spacing={2}>

                            <ValueCard
                                title={about("values.quality.title")}
                                description={about("values.quality.description")}
                            />

                            <ValueCard
                                title={about("values.style.title")}
                                description={about("values.style.description")}
                            />

                            <ValueCard
                                title={about("values.customers.title")}
                                description={about("values.customers.description")}
                            />

                        </Grid>

                    </CardContent>
                </Card>

                {/* ================= SUPPLIERS ================= */}

                <Card
                    elevation={0}
                    sx={{
                        mt: 3,
                        borderRadius: 4,
                        border: "1px solid",
                        borderColor: "divider",
                    }}
                >
                    <CardContent sx={{ p: { xs: 3, md: 5 } }}>

                        <Stack
                            direction="row"
                            spacing={1.5}
                            alignItems="center"
                            mb={2}
                        >
                            <HandshakeIcon color="primary" />

                            <Typography variant="h5" fontWeight={700}>
                                {about("suppliers.title")}
                            </Typography>
                        </Stack>

                        <Typography
                            color="text.secondary"
                            lineHeight={1.9}
                        >
                            {about("suppliers.description1")}
                        </Typography>

                        <Typography
                            color="text.secondary"
                            lineHeight={1.9}
                            mt={2}
                        >
                            {about("suppliers.description2")}
                        </Typography>

                        <Stack
                            direction="row"
                            spacing={1}
                            useFlexGap
                            flexWrap="wrap"
                            mt={3}
                        >
                            <Chip
                                label={about("suppliers.fashionSuppliers")}
                                variant="outlined"
                            />

                            <Chip
                                label={about("suppliers.clothingPartners")}
                                variant="outlined"
                            />

                            <Chip
                                label={about("suppliers.productVendors")}
                                variant="outlined"
                            />
                        </Stack>

                    </CardContent>
                </Card>

                {/* ================= SHOPPING PROMISE ================= */}

                <Card
                    elevation={0}
                    sx={{
                        mt: 3,
                        borderRadius: 4,
                        border: "1px solid",
                        borderColor: "divider",
                    }}
                >
                    <CardContent sx={{ p: { xs: 3, md: 5 } }}>

                        <Stack
                            direction="row"
                            spacing={1.5}
                            alignItems="center"
                            mb={2}
                        >
                            <LocalShippingIcon color="primary" />

                            <Typography variant="h5" fontWeight={700}>
                                {about("promise.title")}
                            </Typography>
                        </Stack>

                        <Typography
                            color="text.secondary"
                            lineHeight={1.9}
                        >
                            {about("promise.description")}
                        </Typography>

                    </CardContent>
                </Card>

                {/* ================= DEVELOPER ================= */}

                <Card
                    elevation={0}
                    sx={{
                        mt: 3,
                        borderRadius: 4,
                        border: "1px solid",
                        borderColor: "divider",
                    }}
                >
                    <CardContent sx={{ p: { xs: 3, md: 5 } }}>

                        <Stack
                            direction="row"
                            spacing={1.5}
                            alignItems="center"
                            mb={2}
                        >
                            <CodeIcon color="primary" />

                            <Typography variant="h5" fontWeight={700}>
                                {about("development.title")}
                            </Typography>
                        </Stack>

                        <Typography
                            color="text.secondary"
                            lineHeight={1.9}
                        >
                            {about("development.description1")}{" "}
                            <Typography
                                component="span"
                                color="primary"
                                fontWeight={700}
                            >
                                Kaday Hein
                            </Typography>
                            .
                        </Typography>

                        <Typography
                            color="text.secondary"
                            lineHeight={1.9}
                            mt={2}
                        >
                            {about("development.description2")}
                        </Typography>

                        <Stack
                            direction="row"
                            spacing={1}
                            useFlexGap
                            flexWrap="wrap"
                            mt={3}
                        >
                            <Chip label="Next.js" variant="outlined" />
                            <Chip label="React" variant="outlined" />
                            <Chip label="MUI" variant="outlined" />
                            <Chip label="GraphQL" variant="outlined" />
                            <Chip label="Spring Boot" variant="outlined" />
                        </Stack>

                    </CardContent>
                </Card>

                {/* ================= COPYRIGHT ================= */}

                <Card
                    elevation={0}
                    sx={{
                        mt: 3,
                        borderRadius: 4,
                        border: "1px solid",
                        borderColor: "divider",
                        backgroundColor: "rgba(65,71,213,0.03)",
                    }}
                >
                    <CardContent sx={{ p: { xs: 3, md: 4 } }}>

                        <Stack
                            direction="row"
                            spacing={1.5}
                            alignItems="center"
                            mb={2}
                        >
                            <CopyrightIcon color="primary" />

                            <Typography variant="h6" fontWeight={700}>
                                {about("copyright.title")}
                            </Typography>
                        </Stack>

                        <Typography
                            color="text.secondary"
                            lineHeight={1.8}
                        >
                            © {new Date().getFullYear()} GD Fashion Store.
                            {" "}
                            {about("copyright.rights")}
                        </Typography>

                        <Typography
                            color="text.secondary"
                            lineHeight={1.8}
                            mt={1}
                        >
                            {about("copyright.description")}
                        </Typography>

                    </CardContent>
                </Card>

                {/* ================= FOOTER MESSAGE ================= */}

                <Box
                    sx={{
                        textAlign: "center",
                        mt: 6,
                        mb: 2,
                    }}
                >
                    <Typography
                        variant="h6"
                        fontWeight={600}
                    >
                        {about("footer.message")}
                    </Typography>

                    <Typography
                        color="text.secondary"
                        mt={1}
                    >
                        {about("footer.thankYou")}
                    </Typography>
                </Box>

            </Container>
        </Box>
    );
}


/* ================= VALUE CARD ================= */

function ValueCard({
    title,
    description,
}: {
    title: string;
    description: string;
}) {
    return (
        <Grid size={{ xs: 12, sm: 4 }}>
            <Box
                sx={{
                    p: 3,
                    height: "100%",
                    borderRadius: 3,
                    backgroundColor: "action.hover",
                }}
            >
                <Typography
                    fontWeight={700}
                    mb={1}
                >
                    {title}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    lineHeight={1.7}
                >
                    {description}
                </Typography>
            </Box>
        </Grid>
    );
}