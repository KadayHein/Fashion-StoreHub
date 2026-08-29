"use client";

import React, {
    createContext,
    useContext,
} from "react";

interface CheckoutContextType {
    maxstep: number;

    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;

    header: string;
    setHeader: React.Dispatch<React.SetStateAction<string>>;

    nextstep: () => void;
    backstep: () => void;

    deliInfo: DeliveryInfo[];
    setDeliInfo: React.Dispatch<React.SetStateAction<DeliveryInfo[]>>;

    selectedPayment: {
        name: string;
        value: number;
        icon: React.JSX.Element;
    } | null;

    setSelectedPayment: React.Dispatch<
        React.SetStateAction<{
            name: string;
            value: number;
            icon: React.JSX.Element;
        } | null>
    >;

    cart: CartItem[];
    setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

export const CheckoutContext =
    createContext<CheckoutContextType | null>(null);

export function useCheckoutContext() {
    const context = useContext(CheckoutContext);

    if (!context) {
        throw new Error(
            "useCheckoutContext must be used inside CheckoutContext.Provider"
        );
    }

    return context;
}