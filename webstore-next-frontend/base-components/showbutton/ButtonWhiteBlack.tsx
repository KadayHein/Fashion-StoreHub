import { Button } from '@mui/material'
import React from 'react'

export default function ButtonWhiteBlack(btnprops: ButtonProps) {
    return (
        <Button
            onClick={btnprops.onClickFunc} fullWidth
            variant="outlined"
            startIcon={btnprops.startIcon ?? undefined}
            endIcon={btnprops.endIcon ?? undefined}
            sx={{
                minHeight: { xs: 44, sm: 48 },
                width: "100%",
                borderColor: "#9CA3AF",
                color: "#374151",
                borderRadius: "999px",
                fontWeight: "bold",
                fontSize: { xs: "0.875rem", sm: "0.95rem" },
                textTransform: "none",

                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.12)",
                transition: "all 0.2s ease",

                "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                    borderColor: "black",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                    transform: "translateY(-1px)",
                },

                "&:active": {
                    transform: "translateY(0)",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
                },
            }}
        >
            {btnprops.label}
        </Button>
    )
}
