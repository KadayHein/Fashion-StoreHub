"use client"
import React, { createContext, useContext, useState } from 'react'
import Progressbar from '@/client-components-fashion/checkout-steps/Progressbar';
import { useRouter } from 'next/navigation';
import { CheckoutContext } from './CheckoutContext';

interface CheckoutContextType {
    maxstep: number,
    step : number,
    setStep : React.Dispatch<React.SetStateAction<number>>,
    header : string,
    setHeader : React.Dispatch<React.SetStateAction<string>>,
    nextstep : (() => void) | null,
    backstep : (() => void) | null,
    deliInfo : DeliveryInfo[],
    setDeliInfo : React.Dispatch<React.SetStateAction<DeliveryInfo[]>>
}

export default function CheckoutLayout({ children }) {
    const [step,setStep] = useState(0); 
    const maxstep = 5;
    const router = useRouter();

    const [header,setHeader] = useState<string>("");
    // const [nextstep, setNextstep] = useState<(() => void) | null>(null);
    // const [backstep, setBackstep] = useState<(() => void) | null>(null);
    const [deliInfo,setDeliInfo] = useState<DeliveryInfo[]>([{ 
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
    }]);


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
