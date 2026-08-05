'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Home from "@/client-components-fashion/landscape/Home";

export default function App() {
  const router = useRouter();

  useEffect(() => {
    router.push('/fashion/clientstore');
  },[])
}
