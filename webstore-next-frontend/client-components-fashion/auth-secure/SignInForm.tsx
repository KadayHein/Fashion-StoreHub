import { Avatar, Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import formstyle from './../../service-module/global-util/form-input.module.css';
import textstyle from './../../service-module/global-util/text-style.module.css';
import SocialButtons from "./SocialButtons";
import Link from "next/link";
import { pink } from "@mui/material/colors";
import { EmailRounded, KeyRounded, LoginRounded } from "@mui/icons-material";
import { client } from "@/lib/apolloClient";
import { gql } from "@apollo/client";
import { enqueueSnackbar } from "notistack";
import { saveLoggedInUser, storeToken } from "@/service/authHandler";
import { useRouter } from "@/i18n/navigation";
import { URL_WEBLOGO } from "@/service/routeHandler";
import { CloseIcon } from "@/service/svgIconUtils";

interface SignInProps {
    isSignUp: boolean;
}

export default function SignInForm({ isSignUp }: SignInProps) {

    const router = useRouter()
    const [signInForm, setSignInForm] = useState<SignInForm>({ email: "", password: "" });

    async function signIn() {
        try {
            await client.mutate<JwtSignInResponse>({
                mutation: gql`
                    mutation {
                        signIn(signInForm : {
                            email: "${signInForm.email}",
                            password: "${signInForm.password}"
                        }){
                            token
                            token_type
                        }
                    }
                `
            }).then(resp => {
                enqueueSnackbar("Login Successful!", { variant: "success" });
                const token = resp.data?.signIn.token;
                storeToken(token);
                saveLoggedInUser(signInForm.email);
                router.push("/");
            })
        } catch (error) {
            enqueueSnackbar(`Login Failed with Error ${error}`, { variant: "error" });
        }
        
    }

    // handleLogin()

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignInForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onResetHandler = (attrName: string) => {
        setSignInForm((prev) => ({
            ...prev,
            [attrName]: "",
        }));
    };

    const signinFormButtons =
        [
            {
                title: "Email",
                name: "email",
                type: "email",
                value: signInForm.email,
                icon: <EmailRounded />
            },
            {
                title: "Password",
                name: "password",
                type: "password",
                value: signInForm.password,
                icon: <KeyRounded />
            }
        ]

    return (

        <Box
            sx={{
                position: "absolute",
                left: 0,
                width: "50%",
                display: isSignUp ? "none" : "inline",
                transform: isSignUp
                    ? "translateX(100%)"
                    : "translateX(0)",
                transition: "0.6s",
                textAlign: "center"
            }}
        >
            <Box className="flex items-center">
                <IconButton >
                    <Avatar alt="Store Logo" src={URL_WEBLOGO} />
                </IconButton>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 2,
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
            </Box>

            <h1 className={`${textstyle.maskedtext}`}>{"Login".split('').join(' ').toUpperCase()}</h1>

            <Box className="flex flex-col items-center justify-center h-full">

                {
                    signinFormButtons && signinFormButtons.map(btn => (
                        <div key={btn.title} className={`${formstyle.form} my-3`}>
                            <button>{btn.icon}</button>
                            <input className={formstyle.input} name={btn.name} placeholder={btn.title}
                                value={btn.value} onChange={onChangeHandler} required type={btn.type}></input>
                            <button className={formstyle.reset} type="reset" onClick={() => onResetHandler(btn.name)}>
                                <CloseIcon/>
                            </button>
                        </div>
                    ))
                }

                <div className="grid grid-cols-2 gap-16 my-2">
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    sx={{
                                        color: pink[800],
                                        '&.Mui-checked': {
                                            color: pink[600],
                                        }
                                    }}
                                />
                            }
                            label="Remember me"
                            slotProps={{
                                typography: {
                                    fontSize: "0.875rem"
                                },
                            }}
                        />
                    </FormGroup>

                    <Link href="/" className="flex flex-column items-center w-full">
                        <Typography
                            variant="body2"
                            className="hover:underline cursor-pointer"
                        >
                            Forgot Password?
                        </Typography>
                    </Link>
                </div>


                <Button variant="outlined" onClick={signIn} sx={{
                    borderColor: "#9CA3AF", borderRadius: "10px", width: 260, backgroundColor: "black", color: "white",
                    transition: "background-color 0.2s", "&:hover": { backgroundColor: "white", color: "black" }, textTransform: "none"
                }}>
                    Login
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