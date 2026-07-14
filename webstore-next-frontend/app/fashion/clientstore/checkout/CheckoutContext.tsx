"use client";

import { createContext, useContext } from "react";

interface CheckoutContextType {
    maxstep: number;
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    header: string;
    setHeader: React.Dispatch<React.SetStateAction<string>>;
    nextstep: (() => void) | null;
    backstep: (() => void) | null;
    deliInfo: DeliveryInfo[];
    setDeliInfo: React.Dispatch<React.SetStateAction<DeliveryInfo[]>>;
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