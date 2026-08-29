import { Box, Paper, Typography } from '@mui/material';
import React from 'react'

export default function ReportSummaryGrid({
    items,
}: {
    items: {
        label: string;
        value: string;
    }[];
}) {

    return (

        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr 1fr",
                },
                gap: 1.5,
            }}
        >

            {items.map(item => (

                <Paper
                    key={item.label}
                    variant="outlined"
                    sx={{
                        p: 1.5,
                        borderRadius: 2,
                    }}
                >

                    <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                    >
                        {item.label}
                    </Typography>

                    <Typography
                        variant="h6"
                        fontWeight={700}
                        sx={{
                            mt: 0.5,
                        }}
                    >
                        {item.value}
                    </Typography>

                </Paper>

            ))}

        </Box>
    );
}
