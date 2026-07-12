"use client";
import Checkout from '@/client-components-fashion/checkout-steps/Checkout';
import { useParams } from 'next/navigation';
import React from 'react'

export default function page() {

    const params = useParams<{step:string}>();
    
  return (
    <>
      <Checkout stepno={parseInt(params.step)}/>
    </>
  )
}