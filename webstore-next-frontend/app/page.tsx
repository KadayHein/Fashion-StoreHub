'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LandingOnCoreOfCC from "../base-components/LandingOnCoreOfCC";

export default function App() {
  const router = useRouter();

  // useEffect(() => {
  //   router.push('/fashion/clientstore');
  // },[])

  return (
    <LandingOnCoreOfCC/>
  );
}
