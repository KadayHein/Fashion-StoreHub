import { Avatar, Box, Button, Checkbox, FormControlLabel, FormGroup, IconButton, Typography } from "@mui/material";
import formstyle from './../../service-module/global-util/form-input.module.css';
import textstyle from './../../service-module/global-util/text-style.module.css';
import SocialButtons from "./SocialButtons";
import Link from "next/link";
import { EmailRounded, KeyRounded, PersonRounded } from "@mui/icons-material";
import { useState } from "react";
import { pink } from "@mui/material/colors";

interface SignUpProps {
    isSignUp: boolean;
}

export default function SignUpForm({ isSignUp }: SignUpProps) {

    // useState

    // register mutation

    const [signUpForm, setSignUpForm] = useState<SignInForm>({ username: "", email: "", password: "" });


    // Apollo Mutation

    // handleLogin()

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignUpForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onResetHandler = (attrName: string) => {
        setSignUpForm((prev) => ({
            ...prev,
            [attrName]: "",
        }));
    };

    const signupFormButtons =
        [
            {
                title: "Username",
                name: "username",
                type: "text",
                value: signUpForm.username,
                icon: <PersonRounded />
            },
            {
                title: "Email",
                name: "email",
                type: "email",
                value: signUpForm.email,
                icon: <EmailRounded />
            },
            {
                title: "Password",
                name: "password",
                type: "password",
                value: signUpForm.password,
                icon: <KeyRounded />
            }
        ]

    return (

        <Box
            sx={{
                position: "absolute",
                left: 0,
                width: "50%",
                display: isSignUp ? "inline" : "none",
                transform: isSignUp
                    ? "translateX(100%)"
                    : "translateX(0)",
                transition: "0.6s",
                textAlign: "center"
            }}
        >
            <Box className="flex items-center justify-end w-full">
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        ml: 1,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'black',
                        textDecoration: 'none',
                    }}
                >
                    GD-StoreHub.
                </Typography>
                <IconButton >
                    <Avatar alt="Store Logo" src="/images/WEBLOGO.png" />
                </IconButton>
            </Box>

            <h1 className={`${textstyle.maskedtext}`}>{"Signup".split('').join(' ').toUpperCase()}</h1>

            <Box className="flex flex-col items-center justify-center h-full">

                {
                    signupFormButtons && signupFormButtons.map(btn => (
                        <div key={btn.title} className={`${formstyle.form} my-3`}>
                            <button>{btn.icon}</button>
                            <input className={formstyle.input} name={btn.name} placeholder={btn.title}
                                value={btn.value} onChange={onChangeHandler} required type={btn.type}></input>
                            <button className={formstyle.reset} type="reset" onClick={() => onResetHandler(btn.name)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                    ))
                }

                <FormControlLabel
                    control={<Checkbox sx={{
                                        color: pink[800],
                                        '&.Mui-checked': {
                                            color: pink[600],
                                        }
                                    }}/>}
                    label={
                        <>
                            I agree to the{" "}
                            <Link
                                href="/"
                                className="underline text-pink-600 hover:text-pink-700"
                            >
                                Terms of Service
                            </Link>
                        </>
                    }
                />


                <Button variant="outlined" sx={{
                    borderColor: "#9CA3AF", borderRadius: "10px", width: 260, backgroundColor: "black", color: "white",
                    transition: "background-color 0.2s", "&:hover": { backgroundColor: "white", color: "black" }, textTransform: "none"
                }}>
                    Create an account
                </Button>

                <div className="flex items-center w-80 my-6">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <Typography variant="body2" className="px-4 text-gray-500">OR</Typography>
                    <div className="flex-1 border-t border-gray-300"></div>
                </div>

                <SocialButtons />

            </Box>
        </Box>

    )

}