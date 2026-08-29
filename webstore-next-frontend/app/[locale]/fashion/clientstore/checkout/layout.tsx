

                "use client";

import React, {
    useCallback,
    useEffect,
    useState,
} from "react";

import { useRouter } from "@/i18n/navigation";

import { client } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

import Progressbar from "@/client-components-fashion/checkout-steps/Progressbar";

import { useAppTranslation } from "@/service/customHooks/useAppTranslation";
import { enqueueSnackbar } from "notistack";

import {
    CheckoutContext,
} from "./CheckoutContext";

export default function CheckoutLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const router = useRouter();
    const { noti } = useAppTranslation();

    const maxstep = 4;

    const [step, setStep] = useState(0);

    const [header, setHeader] = useState("");

    const [cart, setCart] = useState<CartItem[]>([]);

    const [selectedPayment, setSelectedPayment] = useState<{
        name: string;
        value: number;
        icon: React.JSX.Element;
    } | null>(null);

    const [deliInfo, setDeliInfo] =
        useState<DeliveryInfo[]>([
            {
                fullName: "",
                email: "",
                phoneNumber: "",
                country: "",
                stateOrProvince: "",
                city: "",
                township: "",
                postalCode: "",
                addressLine1: "",
                addressLine2: "",
                deliveryMethod: "STANDARD",
                deliveryStatus: "PENDING",
                shippingCompany: "",
                trackingNumber: "",
                deliveryInstructions: "",
            },
        ]);

    useEffect(() => {
        allCartItems();
    }, []);

    const nextstep = useCallback(() => {

        if (step < maxstep) {
            router.push(
                `/fashion/clientstore/checkout/${step + 1}`
            );
        }

    }, [step, router]);

    const backstep = useCallback(() => {

        if (step > 0) {
            router.push(
                `/fashion/clientstore/checkout/${step - 1}`
            );
        }

    }, [step, router]);

    async function allCartItems() {

        await client.query<AllCartItemsResponse>({
            query: gql`
                query {
                    allCartItems {
                        productId
                        productName
                        productImage
                        price
                        quantity
                    }
                }
            `,
            fetchPolicy: "network-only",
        })
        .then(resp => {
            setCart(resp.data.allCartItems);
        })
        .catch(err => {
            console.log(err);

            enqueueSnackbar(
                noti("fail2loadCart"),
                { variant: "error" }
            );
        });
    }

    return (
        <CheckoutContext.Provider
            value={{
                maxstep,

                step,
                setStep,

                header,
                setHeader,

                nextstep,
                backstep,

                deliInfo,
                setDeliInfo,

                selectedPayment,
                setSelectedPayment,

                cart,
                setCart,
            }}
        >
            <Progressbar />

            {children}

        </CheckoutContext.Provider>
    );
}