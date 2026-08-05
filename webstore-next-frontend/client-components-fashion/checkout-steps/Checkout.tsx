import CardAuth from './CardAuth';
import DeliInfo from './DeliInfo';
import { useEffect } from 'react';
import { useCheckoutContext } from '@/app/fashion/clientstore/checkout/CheckoutContext';
import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton } from '@mui/material';
import StepoverButton from './StepoverButton';
import { MoreVert } from '@mui/icons-material';
import ReviewDetails from './ReviewDetails';
import OrderConfirmation from './OrderConfirmation';

export default function Checkout({ stepno }: any) {

    const { maxstep, step, setStep, header, setHeader, nextstep, backstep } = useCheckoutContext();
    const todaydate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    useEffect(() => {
        setStep(stepno);
    }, [stepno])

    const onStepChange = (stepno: number) => {
        switch (stepno) {
            case 0: return <OrderConfirmation />; break;
            case 1: return <CardAuth />; break;
            case 2: return <DeliInfo />; break;
            case 3: return <ReviewDetails />; break;

            default:
                break;
        }
    }

    return (
        <section id="checkout">
            <Card sx={{ maxWidth: { xs: "80%", sm: 450, md: 500, lg: 600 }, mx: "auto" }}>
                <CardHeader
                    avatar={<Avatar sx={{ bgcolor: "#00c853" }}>{stepno + 1}</Avatar>}
                    action={<IconButton aria-label="settings"><MoreVert /></IconButton>}
                    title={header}
                    subheader={todaydate}
                />
                <CardContent>
                    {
                        onStepChange(stepno)
                    }
                </CardContent>
                <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'space-around', my: 3 }}>
                    <StepoverButton />
                </CardActions>
            </Card>
        </section>
    )
}
