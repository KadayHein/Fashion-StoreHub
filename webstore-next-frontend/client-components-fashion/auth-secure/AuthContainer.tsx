"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import OverlayPanel from "./OverlayPanel";

export default function AuthContainer() {
    const [isSignUp, setIsSignUp] = useState(false);

    return (
        <Box className="relative top-0 overflow-hidden rounded-3xl shadow-2xl bg-gray-100 w-full max-w-5xl h-162.5">

            <SignInForm isSignUp={isSignUp} />

            <SignUpForm isSignUp={isSignUp} />

            <OverlayPanel isSignUp={isSignUp} setIsSignUp={setIsSignUp}/>

        </Box>
    );
}