"use client";

import {
    Avatar,
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Divider,
    Grid,
    IconButton,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import RedeemIcon from "@mui/icons-material/Redeem";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { URL_HOME } from "@/service/routeHandler";

const customer = {
    name: "Kaday Hein",
    email: "kadayhein228@gmail.com",
    phone: "+95 9 123 456 789",
    address: "Yangon, Myanmar",
    avatar: "/images/avatar.png",

    badge: "VIP Customer",
    memberSince: "August 2026",

    totalSpent: 45800,
    totalOrders: 12,
};

const recentPurchases = [
    {
        id: 1,
        name: "Classic Polo Shirt",
        image: "/images/as3.png",
        price: 5800,
        quantity: 2,
    },
    {
        id: 2,
        name: "Oversized City Tee",
        image: "/images/as4.png",
        price: 4200,
        quantity: 1,
    },
    {
        id: 3,
        name: "Slim Fit Jeans",
        image: "/images/straight.png",
        price: 9800,
        quantity: 1,
    },
    {
        id: 4,
        name: "Premium Hoodie",
        image: "/images/jacket.png",
        price: 7200,
        quantity: 2,
    },
];

type AccountInfoProp = {
    username: string
}

export default function UserProfile(prop: AccountInfoProp) {
    const router = useRouter()
    const params = useParams()
    const username = params.username as string

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#f5f6fa",
                py: 5,
                px: {
                    xs: 2,
                    md: 5,
                },
            }}
        >

            <Paper
                elevation={0}
                sx={{
                    maxWidth: 1200,
                    mx: "auto",
                    borderRadius: 4,
                    overflow: "hidden",
                    mb: 3,
                }}
            >
                <Box
                    sx={{
                        height: {
                            xs: 160,
                            md: 220,
                        },
                        background:
                            "linear-gradient(135deg, #4147d5, #7b61ff)",
                        position: "relative",
                    }}
                />

                <Box
                    sx={{
                        px: {
                            xs: 3,
                            md: 5,
                        },
                        pb: 4,
                    }}
                >

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: {
                                xs: "center",
                                md: "flex-end",
                            },
                            flexDirection: {
                                xs: "column",
                                md: "row",
                            },
                            mt: -8,
                            gap: 2,
                        }}
                    >

                        <Avatar
                            src={customer.avatar}
                            alt={customer.name}
                            sx={{
                                width: 140,
                                height: 140,
                                border: "6px solid white",
                                boxShadow: 3,
                                fontSize: 45,
                            }}
                        >
                            {customer.name.charAt(0)}
                        </Avatar>

                        <Box
                            sx={{
                                flex: 1,
                                textAlign: {
                                    xs: "center",
                                    md: "left",
                                },
                            }}
                        >
                            <Typography
                                variant="h4"
                                fontWeight={700}
                            >
                                {customer.name}
                            </Typography>

                            <Stack
                                direction="row"
                                spacing={1}
                                justifyContent={{
                                    xs: "center",
                                    md: "flex-start",
                                }}
                                mt={1}
                            >
                                <Chip
                                    icon={<LoyaltyIcon />}
                                    label={customer.badge}
                                    color="primary"
                                />

                                <Chip
                                    label={`Member since ${customer.memberSince}`}
                                    variant="outlined"
                                />
                            </Stack>
                        </Box>

                    </Box>

                    <Grid
                        container
                        spacing={2}
                        mt={3}
                    >

                        <Grid size={{ xs: 12, sm: 4 }}>
                            <StatCard
                                icon={<ShoppingBagIcon />}
                                title="Orders"
                                value={customer.totalOrders}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 4 }}>
                            <StatCard
                                icon={<LoyaltyIcon />}
                                title="Total Spent"
                                value={`¥${customer.totalSpent.toLocaleString()}`}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 4 }}>
                            <StatCard
                                icon={<RedeemIcon />}
                                title="Reward Points"
                                value="2,450"
                            />
                        </Grid>

                    </Grid>

                </Box>
            </Paper>



            <Card
                elevation={0}
                sx={{
                    maxWidth: 1200,
                    mx: "auto",
                    borderRadius: 4,
                    mb: 3,
                }}
            >

                <CardContent sx={{ p: 4 }}>

                    <Typography
                        variant="h6"
                        fontWeight={700}
                        mb={3}
                    >
                        Customer Information
                    </Typography>

                    <Stack spacing={2}>

                        <InfoRow
                            icon={<EmailIcon />}
                            title="Email"
                            value={customer.email}
                        />

                        <InfoRow
                            icon={<PhoneIcon />}
                            title="Phone Number"
                            value={customer.phone}
                            action={
                                <Button
                                    size="small"
                                    startIcon={<EditIcon />}
                                >
                                    Edit
                                </Button>
                            }
                        />

                        <InfoRow
                            icon={<LocationOnIcon />}
                            title="Address"
                            value={customer.address}
                            action={
                                <Button
                                    size="small"
                                    startIcon={<EditIcon />}
                                >
                                    Edit
                                </Button>
                            }
                        />

                    </Stack>

                </CardContent>

            </Card>

            <Card
                elevation={0}
                sx={{
                    maxWidth: 1200,
                    mx: "auto",
                    borderRadius: 4,
                    mb: 3,
                }}>
                <CardContent sx={{ p: 4 }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 3,
                        }}>
                        <Typography
                            variant="h6"
                            fontWeight={700}
                        >
                            Recent Purchases
                        </Typography>

                        <Button onClick={() => router.push(`${URL_HOME}/profile4/${username}/purchases`)}>
                            View All
                        </Button>
                    </Box>


                    <Grid container spacing={2}>

                        {recentPurchases.map((product) => (

                            <Grid
                                key={product.id}
                                size={{
                                    xs: 6,
                                    sm: 4,
                                    md: 3,
                                }}
                            >

                                <Card
                                    variant="outlined"
                                    sx={{
                                        borderRadius: 3,
                                        overflow: "hidden",
                                    }}
                                >

                                    <CardMedia
                                        component="img"
                                        image={product.image}
                                        alt={product.name}
                                        sx={{
                                            height: 200,
                                            objectFit: "contain",
                                            flexShrink: 0,
                                        }}
                                    />

                                    <CardContent>

                                        <Typography
                                            fontWeight={600}
                                            noWrap
                                        >
                                            {product.name}
                                        </Typography>

                                        <Typography
                                            color="text.secondary"
                                            variant="body2"
                                            mt={0.5}
                                        >
                                            Quantity: {product.quantity}
                                        </Typography>

                                        <Typography
                                            fontWeight={700}
                                            mt={1}
                                        >
                                            ¥{(
                                                product.price *
                                                product.quantity
                                            ).toLocaleString()}
                                        </Typography>

                                    </CardContent>

                                </Card>

                            </Grid>

                        ))}

                    </Grid>


                    <Divider sx={{ my: 3 }} />

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                        }}>
                        <Typography
                            variant="h6"
                            fontWeight={700}>
                            Total Spent: ¥
                            {customer.totalSpent.toLocaleString()}
                        </Typography>

                    </Box>

                </CardContent>

            </Card>

            <Card
                elevation={0}
                sx={{
                    maxWidth: 1200,
                    mx: "auto",
                    borderRadius: 4,
                }}
            >

                <CardContent sx={{ p: 4 }}>

                    <Typography
                        variant="h6"
                        fontWeight={700}
                        mb={3}
                    >
                        Customer Actions
                    </Typography>

                    <Stack
                        direction={{
                            xs: "column",
                            sm: "row",
                        }}
                        spacing={2}
                    >

                        <Button
                            variant="contained"
                            startIcon={<PersonAddIcon />}
                        >
                            Invite Customer
                        </Button>

                        <Button
                            variant="outlined"
                            startIcon={<RedeemIcon />}
                        >
                            Redeem
                        </Button>

                        <Button
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteOutlineIcon />}
                        >
                            Delete Account
                        </Button>

                    </Stack>

                </CardContent>

            </Card>

        </Box>
    );
}

function StatCard({ icon, title, value }: {
    icon: React.ReactNode;
    title: string;
    value: string | number;
}) {

    return (
        <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
            >
                <Avatar sx={{ bgcolor: "primary.main" }}>
                    {icon}
                </Avatar>

                <Box>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        {title}
                    </Typography>

                    <Typography
                        variant="h6"
                        fontWeight={700}
                    >
                        {value}
                    </Typography>

                </Box>

            </Stack>

        </Paper>
    );
}


function InfoRow({
    icon,
    title,
    value,
    action,
}: {
    icon: React.ReactNode;
    title: string;
    value: string;
    action?: React.ReactNode;
}) {

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 2,
                borderRadius: 2,
                backgroundColor: "#f8f9fc",
            }}
        >
            <Avatar sx={{ bgcolor: "#d7e0ff", color: "#4147d5" }}>
                {icon}
            </Avatar>

            <Box sx={{ flex: 1 }}>
                <Typography
                    variant="caption"
                    color="text.secondary"
                >
                    {title}
                </Typography>

                <Typography
                    fontWeight={600}
                >
                    {value}
                </Typography>

            </Box>

            {action}

        </Box>
    );
}
