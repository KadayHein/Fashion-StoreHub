"use client";

import React, { useMemo, useState } from "react";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    IconButton,
    InputAdornment,
    MenuItem,
    Paper,
    Select,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography,
} from "@mui/material";

import {
    AddRounded,
    BusinessRounded,
    CalendarMonthRounded,
    CheckCircleRounded,
    DescriptionRounded,
    EditRounded,
    EmailRounded,
    MoreVertRounded,
    PhoneRounded,
    SearchRounded,
    WarningRounded,
} from "@mui/icons-material";


/* =========================================================
   TYPES
========================================================= */

type SupplierStatus =
    | "ACTIVE"
    | "INACTIVE"
    | "SUSPENDED";


type AgreementStatus =
    | "ACTIVE"
    | "EXPIRING"
    | "EXPIRED"
    | "PENDING";


type AgreementType =
    | "SUPPLIER"
    | "VENDOR";


interface Supplier {

    id: string;

    name: string;

    contactPerson: string;

    email: string;

    phone: string;

    address: string;

    categories: string[];

    leadTime: number;

    minimumOrderQuantity: number;

    paymentTerms: string;

    status: SupplierStatus;

    onTimeRate: number;

    defectRate: number;

}


interface Agreement {

    id: string;

    supplierId: string;

    supplierName: string;

    type: AgreementType;

    title: string;

    startDate: string;

    endDate: string;

    status: AgreementStatus;

    autoRenew: boolean;

}


/* =========================================================
   MOCK DATA
========================================================= */

const suppliers: Supplier[] = [

    {
        id: "SUP-001",

        name: "ABC Clothing Co.",

        contactPerson: "Yuki Tanaka",

        email: "sales@abc-clothing.jp",

        phone: "06-1234-5678",

        address: "Osaka, Japan",

        categories: [
            "T-Shirts",
            "Hoodies",
            "Jackets",
        ],

        leadTime: 7,

        minimumOrderQuantity: 50,

        paymentTerms: "Net 30",

        status: "ACTIVE",

        onTimeRate: 96,

        defectRate: 1.2,
    },

    {
        id: "SUP-002",

        name: "XYZ Fashion Ltd.",

        contactPerson: "Ken Sato",

        email: "contact@xyz-fashion.jp",

        phone: "03-4567-8910",

        address: "Tokyo, Japan",

        categories: [
            "Jeans",
            "Pants",
        ],

        leadTime: 12,

        minimumOrderQuantity: 100,

        paymentTerms: "Net 30",

        status: "ACTIVE",

        onTimeRate: 82,

        defectRate: 4.8,
    },

    {
        id: "SUP-003",

        name: "Fashion Wholesale",

        contactPerson: "Mika Suzuki",

        email: "info@fashion-wholesale.jp",

        phone: "052-222-3333",

        address: "Nagoya, Japan",

        categories: [
            "Accessories",
            "Bags",
            "Caps",
        ],

        leadTime: 5,

        minimumOrderQuantity: 30,

        paymentTerms: "Net 15",

        status: "ACTIVE",

        onTimeRate: 91,

        defectRate: 2.1,
    },

];


const agreements: Agreement[] = [

    {
        id: "AGR-2026-001",

        supplierId: "SUP-001",

        supplierName:
            "ABC Clothing Co.",

        type: "SUPPLIER",

        title:
            "Annual Clothing Supply Agreement",

        startDate:
            "2026-01-01",

        endDate:
            "2026-12-31",

        status: "ACTIVE",

        autoRenew: true,
    },

    {
        id: "AGR-2026-002",

        supplierId: "SUP-002",

        supplierName:
            "XYZ Fashion Ltd.",

        type: "SUPPLIER",

        title:
            "Jeans & Pants Supply Agreement",

        startDate:
            "2026-02-01",

        endDate:
            "2026-09-15",

        status: "EXPIRING",

        autoRenew: false,
    },

    {
        id: "AGR-2026-003",

        supplierId: "SUP-003",

        supplierName:
            "Fashion Wholesale",

        type: "VENDOR",

        title:
            "Accessory Vendor Agreement",

        startDate:
            "2026-04-01",

        endDate:
            "2027-03-31",

        status: "ACTIVE",

        autoRenew: true,
    },

];


/* =========================================================
   CONFIG
========================================================= */

const supplierStatusConfig: Record<
    SupplierStatus,
    {
        label: string;
        color:
        | "success"
        | "default"
        | "error";
    }
> = {

    ACTIVE: {
        label: "Active",
        color: "success",
    },

    INACTIVE: {
        label: "Inactive",
        color: "default",
    },

    SUSPENDED: {
        label: "Suspended",
        color: "error",
    },

};


const agreementStatusConfig: Record<
    AgreementStatus,
    {
        label: string;
        color:
        | "success"
        | "warning"
        | "error"
        | "info";
    }
> = {

    ACTIVE: {
        label: "Active",
        color: "success",
    },

    EXPIRING: {
        label: "Expiring Soon",
        color: "warning",
    },

    EXPIRED: {
        label: "Expired",
        color: "error",
    },

    PENDING: {
        label: "Pending",
        color: "info",
    },

};


/* =========================================================
   COMPONENT
========================================================= */

export default function SupplierManagement() {

    const [
        activeTab,
        setActiveTab,
    ] = useState(0);


    const [
        supplierSearch,
        setSupplierSearch,
    ] = useState("");


    const [
        supplierStatus,
        setSupplierStatus,
    ] = useState<
        SupplierStatus | "ALL"
    >("ALL");


    const [
        agreementSearch,
        setAgreementSearch,
    ] = useState("");


    const [
        agreementStatus,
        setAgreementStatus,
    ] = useState<
        AgreementStatus | "ALL"
    >("ALL");


    /* =====================================================
       SUPPLIER FILTER
    ===================================================== */

    const filteredSuppliers =
        useMemo(() => {

            const search =
                supplierSearch
                    .toLowerCase()
                    .trim();

            return suppliers.filter(
                supplier => {

                    const matchesSearch =
                        !search ||
                        supplier.name
                            .toLowerCase()
                            .includes(search) ||
                        supplier.contactPerson
                            .toLowerCase()
                            .includes(search) ||
                        supplier.id
                            .toLowerCase()
                            .includes(search);

                    const matchesStatus =
                        supplierStatus === "ALL" ||
                        supplier.status ===
                        supplierStatus;

                    return (
                        matchesSearch &&
                        matchesStatus
                    );
                }
            );

        }, [
            supplierSearch,
            supplierStatus,
        ]);


    /* =====================================================
       AGREEMENT FILTER
    ===================================================== */

    const filteredAgreements =
        useMemo(() => {

            const search =
                agreementSearch
                    .toLowerCase()
                    .trim();

            return agreements.filter(
                agreement => {

                    const matchesSearch =
                        !search ||
                        agreement.id
                            .toLowerCase()
                            .includes(search) ||
                        agreement.supplierName
                            .toLowerCase()
                            .includes(search) ||
                        agreement.title
                            .toLowerCase()
                            .includes(search);

                    const matchesStatus =
                        agreementStatus === "ALL" ||
                        agreement.status ===
                        agreementStatus;

                    return (
                        matchesSearch &&
                        matchesStatus
                    );

                }
            );

        }, [
            agreementSearch,
            agreementStatus,
        ]);


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
                mb={3}
            >

                <Box>

                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                    >

                        <BusinessRounded fontSize="large"/>

                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >
                            Supplier Management
                        </Typography>

                    </Stack>


                    <Typography
                        color="text.secondary"
                        sx={{
                            mt: 0.5,
                        }}
                    >
                        Manage suppliers,
                        purchasing relationships,
                        and supply agreements.
                    </Typography>

                </Box>


                <Button
                    variant="contained"
                    startIcon={
                        <AddRounded />
                    }
                >
                    {activeTab === 0
                        ? "Add Supplier"
                        : "Add Agreement"}
                </Button>

            </Stack>

            <Paper
                variant="outlined"
                sx={{
                    position: "sticky",
                    top: { xs : 70, md: 100 },
                    zIndex: 1100,
                    borderRadius: 3,
                    mb: 3,
                    overflow: "hidden",
                    bgcolor: "background.paper"
                }}
            >

                <Tabs
                    value={activeTab}
                    onChange={(
                        _,
                        value
                    ) =>
                        setActiveTab(
                            value
                        )
                    }
                >

                    <Tab
                        icon={
                            <BusinessRounded />
                        }
                        iconPosition="start"
                        label="Suppliers"
                    />

                    <Tab
                        icon={
                            <DescriptionRounded />
                        }
                        iconPosition="start"
                        label="Agreements"
                    />

                </Tabs>

            </Paper>


            {/* =================================================
                SUPPLIERS TAB
            ================================================= */}

            {activeTab === 0 && (

                <>

                    {/* SEARCH / FILTER */}

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
                            placeholder="Search supplier, contact, or ID..."
                            value={
                                supplierSearch
                            }
                            onChange={event =>
                                setSupplierSearch(
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


                        <TextField
                            select
                            label="Status"
                            value={
                                supplierStatus
                            }
                            onChange={event =>
                                setSupplierStatus(
                                    event.target.value as
                                    | SupplierStatus
                                    | "ALL"
                                )
                            }
                            sx={{
                                minWidth: {
                                    sm: 180,
                                },
                            }}
                        >

                            <MenuItem value="ALL">
                                All Status
                            </MenuItem>

                            <MenuItem value="ACTIVE">
                                Active
                            </MenuItem>

                            <MenuItem value="INACTIVE">
                                Inactive
                            </MenuItem>

                            <MenuItem value="SUSPENDED">
                                Suspended
                            </MenuItem>

                        </TextField>

                    </Stack>


                    {/* SUPPLIER LIST */}

                    <Grid
                        container
                        spacing={2}
                    >

                        {filteredSuppliers.map(
                            supplier => (

                                <Grid
                                    key={
                                        supplier.id
                                    }
                                    size={{
                                        xs: 12,
                                        lg: 6,
                                    }}
                                >

                                    <Card
                                        variant="outlined"
                                        sx={{
                                            height:
                                                "100%",
                                            borderRadius: 3,
                                        }}
                                    >

                                        <CardContent
                                            sx={{
                                                p: 3,
                                            }}
                                        >

                                            {/* TITLE */}

                                            <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="flex-start"
                                            >

                                                <Box>

                                                    <Stack
                                                        direction="row"
                                                        spacing={1}
                                                        alignItems="center"
                                                    >

                                                        <BusinessRounded
                                                            color="action"
                                                        />

                                                        <Typography
                                                            variant="h6"
                                                            fontWeight={700}
                                                        >
                                                            {
                                                                supplier.name
                                                            }
                                                        </Typography>

                                                    </Stack>


                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                        sx={{
                                                            mt: 0.5,
                                                        }}
                                                    >
                                                        {
                                                            supplier.id
                                                        }
                                                    </Typography>

                                                </Box>


                                                <Stack
                                                    direction="row"
                                                    spacing={1}
                                                >

                                                    <Chip
                                                        size="small"
                                                        label={
                                                            supplierStatusConfig[
                                                                supplier.status
                                                            ].label
                                                        }
                                                        color={
                                                            supplierStatusConfig[
                                                                supplier.status
                                                            ].color
                                                        }
                                                    />


                                                    <IconButton
                                                        size="small"
                                                    >

                                                        <MoreVertRounded />

                                                    </IconButton>

                                                </Stack>

                                            </Stack>


                                            <Divider
                                                sx={{
                                                    my: 2,
                                                }}
                                            />


                                            {/* CONTACT */}

                                            <Stack
                                                spacing={1.2}
                                            >

                                                <Stack
                                                    direction="row"
                                                    spacing={1}
                                                >

                                                    <BusinessRounded
                                                        fontSize="small"
                                                        color="action"
                                                    />

                                                    <Typography
                                                        variant="body2"
                                                    >
                                                        {
                                                            supplier.contactPerson
                                                        }
                                                    </Typography>

                                                </Stack>


                                                <Stack
                                                    direction="row"
                                                    spacing={1}
                                                >

                                                    <EmailRounded
                                                        fontSize="small"
                                                        color="action"
                                                    />

                                                    <Typography
                                                        variant="body2"
                                                    >
                                                        {
                                                            supplier.email
                                                        }
                                                    </Typography>

                                                </Stack>


                                                <Stack
                                                    direction="row"
                                                    spacing={1}
                                                >

                                                    <PhoneRounded
                                                        fontSize="small"
                                                        color="action"
                                                    />

                                                    <Typography
                                                        variant="body2"
                                                    >
                                                        {
                                                            supplier.phone
                                                        }
                                                    </Typography>

                                                </Stack>

                                            </Stack>


                                            {/* CATEGORIES */}

                                            <Box
                                                sx={{
                                                    mt: 2.5,
                                                }}
                                            >

                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >
                                                    Supplied Categories
                                                </Typography>


                                                <Stack
                                                    direction="row"
                                                    spacing={0.7}
                                                    flexWrap="wrap"
                                                    useFlexGap
                                                    sx={{
                                                        mt: 0.8,
                                                    }}
                                                >

                                                    {supplier.categories.map(
                                                        category => (

                                                            <Chip
                                                                key={
                                                                    category
                                                                }
                                                                label={
                                                                    category
                                                                }
                                                                size="small"
                                                                variant="outlined"
                                                            />

                                                        )
                                                    )}

                                                </Stack>

                                            </Box>


                                            {/* PROCUREMENT TERMS */}

                                            <Grid
                                                container
                                                spacing={2}
                                                sx={{
                                                    mt: 1,
                                                }}
                                            >

                                                <Grid
                                                    size={{
                                                        xs: 4,
                                                    }}
                                                >

                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                    >
                                                        Lead Time
                                                    </Typography>

                                                    <Typography
                                                        fontWeight={700}
                                                    >
                                                        {
                                                            supplier.leadTime
                                                        }{" "}
                                                        days
                                                    </Typography>

                                                </Grid>


                                                <Grid
                                                    size={{
                                                        xs: 4,
                                                    }}
                                                >

                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                    >
                                                        MOQ
                                                    </Typography>

                                                    <Typography
                                                        fontWeight={700}
                                                    >
                                                        {
                                                            supplier.minimumOrderQuantity
                                                        }
                                                    </Typography>

                                                </Grid>


                                                <Grid
                                                    size={{
                                                        xs: 4,
                                                    }}
                                                >

                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                    >
                                                        Payment
                                                    </Typography>

                                                    <Typography
                                                        fontWeight={700}
                                                    >
                                                        {
                                                            supplier.paymentTerms
                                                        }
                                                    </Typography>

                                                </Grid>

                                            </Grid>


                                            <Divider
                                                sx={{
                                                    my: 2,
                                                }}
                                            />


                                            {/* PERFORMANCE */}

                                            <Typography
                                                variant="subtitle2"
                                                fontWeight={700}
                                                sx={{
                                                    mb: 1.5,
                                                }}
                                            >
                                                Supplier Performance
                                            </Typography>


                                            <Grid
                                                container
                                                spacing={2}
                                            >

                                                <Grid
                                                    size={{
                                                        xs: 6,
                                                    }}
                                                >

                                                    <Stack
                                                        direction="row"
                                                        spacing={1}
                                                        alignItems="center"
                                                    >

                                                        <CheckCircleRounded
                                                            color="success"
                                                            fontSize="small"
                                                        />

                                                        <Box>

                                                            <Typography
                                                                variant="caption"
                                                                color="text.secondary"
                                                            >
                                                                On-Time Delivery
                                                            </Typography>

                                                            <Typography
                                                                fontWeight={700}
                                                            >
                                                                {
                                                                    supplier.onTimeRate
                                                                }
                                                                %
                                                            </Typography>

                                                        </Box>

                                                    </Stack>

                                                </Grid>


                                                <Grid
                                                    size={{
                                                        xs: 6,
                                                    }}
                                                >

                                                    <Stack
                                                        direction="row"
                                                        spacing={1}
                                                        alignItems="center"
                                                    >

                                                        <WarningRounded
                                                            color={
                                                                supplier.defectRate >
                                                                    3
                                                                    ? "error"
                                                                    : "warning"
                                                            }
                                                            fontSize="small"
                                                        />

                                                        <Box>

                                                            <Typography
                                                                variant="caption"
                                                                color="text.secondary"
                                                            >
                                                                Defect Rate
                                                            </Typography>

                                                            <Typography
                                                                fontWeight={700}
                                                            >
                                                                {
                                                                    supplier.defectRate
                                                                }
                                                                %
                                                            </Typography>

                                                        </Box>

                                                    </Stack>

                                                </Grid>

                                            </Grid>


                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                startIcon={
                                                    <EditRounded />
                                                }
                                                sx={{
                                                    mt: 2.5,
                                                }}
                                            >
                                                Manage Supplier
                                            </Button>

                                        </CardContent>

                                    </Card>

                                </Grid>

                            )
                        )}

                    </Grid>

                </>

            )}


            {/* =================================================
                AGREEMENTS TAB
            ================================================= */}

            {activeTab === 1 && (

                <>

                    {/* AGREEMENT WARNING */}

                    {agreements.some(
                        agreement =>
                            agreement.status ===
                            "EXPIRING"
                    ) && (

                            <Alert
                                severity="warning"
                                sx={{
                                    mb: 3,
                                    borderRadius: 3,
                                }}
                            >
                                Some supplier agreements
                                are approaching their
                                expiration date.
                            </Alert>

                        )}


                    {/* SEARCH / FILTER */}

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
                            placeholder="Search agreement, supplier, or ID..."
                            value={
                                agreementSearch
                            }
                            onChange={event =>
                                setAgreementSearch(
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


                        <TextField
                            select
                            label="Status"
                            value={
                                agreementStatus
                            }
                            onChange={event =>
                                setAgreementStatus(
                                    event.target.value as
                                    | AgreementStatus
                                    | "ALL"
                                )
                            }
                            sx={{
                                minWidth: {
                                    sm: 190,
                                },
                            }}
                        >

                            <MenuItem value="ALL">
                                All Status
                            </MenuItem>

                            <MenuItem value="ACTIVE">
                                Active
                            </MenuItem>

                            <MenuItem value="EXPIRING">
                                Expiring Soon
                            </MenuItem>

                            <MenuItem value="EXPIRED">
                                Expired
                            </MenuItem>

                            <MenuItem value="PENDING">
                                Pending
                            </MenuItem>

                        </TextField>

                    </Stack>


                    {/* AGREEMENT LIST */}

                    <Stack
                        spacing={1.5}
                    >

                        {filteredAgreements.map(
                            agreement => (

                                <Paper
                                    key={
                                        agreement.id
                                    }
                                    variant="outlined"
                                    sx={{
                                        p: 2.5,
                                        borderRadius: 3,
                                    }}
                                >

                                    <Grid
                                        container
                                        spacing={2}
                                        alignItems="center"
                                    >

                                        {/* AGREEMENT */}

                                        <Grid
                                            size={{
                                                xs: 12,
                                                md: 4,
                                            }}
                                        >

                                            <Stack
                                                direction="row"
                                                spacing={1.5}
                                                alignItems="center"
                                            >

                                                <Box
                                                    sx={{
                                                        width: 44,
                                                        height: 44,
                                                        borderRadius: 2,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        bgcolor:
                                                            "action.hover",
                                                    }}
                                                >

                                                    <DescriptionRounded />

                                                </Box>


                                                <Box>

                                                    <Typography
                                                        fontWeight={700}
                                                    >
                                                        {
                                                            agreement.title
                                                        }
                                                    </Typography>

                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        {
                                                            agreement.id
                                                        }
                                                    </Typography>

                                                </Box>

                                            </Stack>

                                        </Grid>


                                        {/* SUPPLIER */}

                                        <Grid
                                            size={{
                                                xs: 12,
                                                sm: 6,
                                                md: 2,
                                            }}
                                        >

                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                            >
                                                Supplier
                                            </Typography>

                                            <Typography
                                                fontWeight={600}
                                            >
                                                {
                                                    agreement.supplierName
                                                }
                                            </Typography>

                                        </Grid>


                                        {/* TYPE */}

                                        <Grid
                                            size={{
                                                xs: 6,
                                                sm: 3,
                                                md: 1.5,
                                            }}
                                        >

                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                            >
                                                Type
                                            </Typography>

                                            <Typography
                                                fontWeight={600}
                                            >
                                                {
                                                    agreement.type
                                                }
                                            </Typography>

                                        </Grid>


                                        {/* DATE */}

                                        <Grid
                                            size={{
                                                xs: 6,
                                                sm: 3,
                                                md: 2.5,
                                            }}
                                        >

                                            <Stack
                                                direction="row"
                                                spacing={1}
                                            >

                                                <CalendarMonthRounded
                                                    fontSize="small"
                                                    color="action"
                                                />

                                                <Box>

                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                    >
                                                        Valid Period
                                                    </Typography>

                                                    <Typography
                                                        variant="body2"
                                                        fontWeight={600}
                                                    >
                                                        {
                                                            agreement.startDate
                                                        }
                                                        {" → "}
                                                        {
                                                            agreement.endDate
                                                        }
                                                    </Typography>

                                                </Box>

                                            </Stack>

                                        </Grid>


                                        {/* STATUS */}

                                        <Grid
                                            size={{
                                                xs: 12,
                                                md: 1.5,
                                            }}
                                        >

                                            <Chip
                                                size="small"
                                                label={
                                                    agreementStatusConfig[
                                                        agreement.status
                                                    ].label
                                                }
                                                color={
                                                    agreementStatusConfig[
                                                        agreement.status
                                                    ].color
                                                }
                                            />

                                        </Grid>


                                        {/* ACTION */}

                                        <Grid
                                            size={{
                                                xs: 12,
                                                md: 0.5,
                                            }}
                                        >

                                            <IconButton>

                                                <MoreVertRounded />

                                            </IconButton>

                                        </Grid>

                                    </Grid>

                                </Paper>

                            )
                        )}

                    </Stack>

                </>

            )}

        </Box>
    );
}