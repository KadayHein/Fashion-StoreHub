import { Box, Typography } from '@mui/material';
import React from 'react'

export default function ReportDetail({
    label,
    value,
}: {
    label: string;
    value: string;
}) {

    return (
        <Box>
            <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                mb={0.5}
            >
                {label}
            </Typography>

            <Typography
                variant="body2"
                fontWeight={600}
                sx={{
                    wordBreak: "break-word",
                }}
            >
                {value}
            </Typography>

        </Box>
    );
}
