"use client";

import { Box, Button, Typography } from "@mui/material";

interface OverlayProps{

    isSignUp:boolean;
    setIsSignUp:React.Dispatch<
        React.SetStateAction<boolean>
    >;
}

export default function OverlayPanel({
  isSignUp,
  setIsSignUp
}: OverlayProps) {
  return (
    <Box
      className={`
        absolute top-0 left-1/2 w-1/2 h-full overflow-hidden z-50
        duration-700 ease-in-out
        ${isSignUp ? "-translate-x-full" : "translate-x-0"}
      `}
    >
      <Box
        className={`
          relative -left-full w-[200%] h-full
          duration-700 ease-in-out
          ${isSignUp ? "translate-x-1/2" : "translate-x-0"}
        `}
        sx={{
          background: "linear-gradient(to right,#FF4B2B,#FF416C)",
        }}
      >
        <Box
          className={`
            absolute top-0 left-0
            w-1/2 h-full
            flex flex-col items-center justify-center
            text-center px-10 text-white
            duration-700 ease-in-out
            ${isSignUp ? "translate-x-0" : "-translate-x-[20%]"}
          `}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
          >
            Welcome Back!
          </Typography>

          <Typography
            className="max-w-xs mb-8"
            sx={{ opacity: 0.9 , lineHeight: 2, fontWeight: 'bold'}}
          >
            To keep connected with us please login 
          </Typography>

          <Button
            variant="outlined"
            onClick={() => setIsSignUp(false)}
            sx={{
              color: "white",
              borderColor: "white",
              borderRadius: "30px",
              my: 2,
              px: 5,
              py: 1.3,
              fontWeight: 700,
              "&:hover": {
                borderColor: "white",
                bgcolor: "rgba(255,255,255,.15)",
              },
            }}
          >
            Sign In
          </Button>
        </Box>

        <Box
          className={`
            absolute top-0 right-0
            w-1/2 h-full
            flex flex-col items-center justify-center
            text-center px-10 text-white
            duration-700 ease-in-out
            ${isSignUp ? "translate-x-[20%]" : "translate-x-0"}
          `}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
          >
            Hello, Friend!
          </Typography>

          <Typography
            className="max-w-md mb-8"
            sx={{ opacity: 0.9 , lineHeight: 2, fontWeight: 'bold'}}
          >
            Don't have an Account? Create new account <br/>and Style your outfit with us.
          </Typography>

          <Button
            variant="outlined"
            onClick={() => setIsSignUp(true)}
            sx={{
              color: "white",
              borderColor: "white",
              borderRadius: "30px",
              my: 3,
              px: 5,
              py: 1.3,
              fontWeight: 700,
              "&:hover": {
                borderColor: "white",
                bgcolor: "rgba(255,255,255,.15)",
              },
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Box>
  );
}