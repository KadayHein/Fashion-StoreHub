import {
    Button,
    IconButton,
    Stack
} from "@mui/material";

import FacebookIcon from "@mui/icons-material/Facebook";

import GoogleIcon from "@mui/icons-material/Google";

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Instagram } from "@mui/icons-material";

export default function SocialButtons() {

    const buttonStyle = {
        borderColor: "#9CA3AF", borderRadius: "10px", borderWidth: ".5px", width: 260, backgroundColor: "white", color: "black",
        transition: "background-color 0.2s", "&:hover": { backgroundColor: "black", color: "white" }, textTransform: "none"
    }

    const iconAlign = { mr: 1 }

    return (

        <Stack
            direction="column"
            spacing={2}
            justifyContent="center"
        >

            <Button variant="outlined" sx={buttonStyle}>
                <GoogleIcon sx={iconAlign} /> Continue with Google
            </Button>
            <Button variant="outlined" sx={buttonStyle}>
                <FacebookIcon sx={iconAlign} /> Continue with Facebook
            </Button>
            <Button variant="outlined" sx={buttonStyle}>
                <Instagram sx={iconAlign} /> Continue with Instagram
            </Button>


        </Stack>

    )

}