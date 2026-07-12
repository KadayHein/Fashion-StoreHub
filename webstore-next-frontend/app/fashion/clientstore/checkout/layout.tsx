"use client"
import React, { createContext, useContext, useState } from 'react'
import Progressbar from '@/client-components-fashion/checkout-steps/Progressbar';
import { useRouter } from 'next/navigation';

interface CheckoutContextType {
    maxstep: number,
    step : number,
    setStep : React.Dispatch<React.SetStateAction<number>>,
    header : string,
    setHeader : React.Dispatch<React.SetStateAction<string>>,
    nextstep : (() => void) | null,
    backstep : (() => void) | null,
    deliInfo : FieldType[],
    setDeliInfo : React.Dispatch<React.SetStateAction<FieldType[]>>
}

export const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const useCheckoutContext = () => {
    const context = useContext(CheckoutContext);
    if (!context) {
      throw new Error("useCheckoutContext must be used in component within CheckoutContext.Provider");
    }
    return context;
  };

export default function CheckoutLayout({ children }: LayoutProps) {
    const [step,setStep] = useState(0); 
    const maxstep = 4;
    const router = useRouter();

    const [header,setHeader] = useState<string>("");
    // const [nextstep, setNextstep] = useState<(() => void) | null>(null);
    // const [backstep, setBackstep] = useState<(() => void) | null>(null);
    const [deliInfo,setDeliInfo] = useState<FieldType[]>([{ label: "", name: "", value: ""}]);


    const nextstep = () => {
        if(step !== maxstep) {
            router.push(`/fashion/clientstore/checkout/${step+1}`)
        }
    }

    const backstep = () => {
        if(step !== 0) {
            router.push(`/fashion/clientstore/checkout/${step-1}`)
        }
    }
    
    // async function getCartSize(){
    //     await client.query({
    //         query: gql`
    //         query {
    //         cartSize
    //         }
    //         `
    //     }).then(resp => setCartSize(resp.data.cartSize))
    // }

  return (
    <>
    <CheckoutContext.Provider value={{maxstep,step,setStep,
        header,setHeader,nextstep,backstep,
        deliInfo,setDeliInfo
        // setNextstep,setBackstep,validated,isValidated
        }}>
        <Progressbar/>
        {children}
    </CheckoutContext.Provider>
    </>
  )
}
