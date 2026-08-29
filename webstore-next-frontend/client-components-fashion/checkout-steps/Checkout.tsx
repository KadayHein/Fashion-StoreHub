"use client"
import CardAuth from './CardAuth';
import DeliInfo from './DeliInfo';
import { useEffect } from 'react';
import { Avatar, Card, CardContent, CardHeader, IconButton } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import OrderConfirmation from './OrderConfirmation';
import { useCheckoutContext } from '@/app/[locale]/fashion/clientstore/checkout/CheckoutContext';
import OAuthPayment from './OAuthPayment';
import PaymentComplete from './PaymentComplete';
import { useAppTranslation } from '@/service/customHooks/useAppTranslation';

export default function Checkout({ stepno }: { stepno: number }) {

    const { setStep } = useCheckoutContext();
    const { checkout } = useAppTranslation();

    const todaydate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    useEffect(() => {
        setStep(stepno);
    }, [stepno, setStep]);


    const getHeader = () => {
        switch (stepno) {
            case 0:
                return checkout("subheaders.orderConfirmation");

            case 1:
                return checkout("subheaders.shipping");

            case 2:
                return checkout("subheaders.authentication");

            case 3:
                return checkout("subheaders.payment");

            case 4:
                return checkout("subheaders.complete");

            default:
                return "";
        }
    };


    const getContent = () => {
        switch (stepno) {
            case 0:
                return <OrderConfirmation />;

            case 1:
                return <DeliInfo />;

            case 2:
                return <CardAuth />;

            case 3:
                return <OAuthPayment />;

            case 4:
                return <PaymentComplete />;

            default:
                return null;
        }
    };


    return (
        <section id="checkout">
            <Card
                sx={{
                    maxWidth: {
                        xs: "80%",
                        sm: 450,
                        md: 500,
                        lg: 600,
                    },
                    mx: "auto",
                    mb: 2,
                }}
            >
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: "#00c853" }}>
                            {stepno + 1}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVert />
                        </IconButton>
                    }
                    title={getHeader()}
                    subheader={todaydate}
                />

                <CardContent>
                    {getContent()}
                </CardContent>
            </Card>
        </section>
    );
}