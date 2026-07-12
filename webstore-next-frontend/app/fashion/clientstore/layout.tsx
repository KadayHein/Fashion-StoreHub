"use client"
import React, { createContext, useContext, useEffect, useState } from 'react'
import { gql } from "@apollo/client";
import { client } from '../../../lib/apolloClient';
import NotiAlert from '../../../system-animators/NotiAlert';
import NavBar from '../../../client-components-fashion/landscape/Navbar';


interface ClientContextType {
    cartSize : number,
    setCartSize : React.Dispatch<React.SetStateAction<number>>,
    notibox : {status: string, show: boolean, timeout: number, message: string},
    setNotibox : React.Dispatch<React.SetStateAction<{status: string, show: boolean, timeout: number, message: string}>>
}

export const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const useClientContext = () => {
    const context = useContext(ClientContext);
    if (!context) {
      throw new Error("useClientContext must be used in component within ClientContext.Provider");
    }
    return context;
  };

export default function ClientLayout({ children }: LayoutProps<'/fashion/clientstore'>) {
    const [cartSize,setCartSize] = useState(0)
    const [notibox, setNotibox] = React.useState({status:"error", show:false, timeout:1000, message: "Alert Message!"});
    
    useEffect(() => {
      getCartSize()
    },[])
    
    async function getCartSize(){
        await client.query<CartSizeResponse>({
            query: gql`
            query {
            cartSize
            }
            `
        }).then(resp => setCartSize(resp.data.cartSize))
    }

  return (
    <>
    <ClientContext.Provider value={{cartSize,setCartSize,notibox,setNotibox}}>
        <NavBar/>
        {children}
        <NotiAlert notibox={notibox} setNotibox={setNotibox}/>
    </ClientContext.Provider>
    </>
  )
}
