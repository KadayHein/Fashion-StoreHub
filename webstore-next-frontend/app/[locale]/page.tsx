'use client'
import { useRouter } from "@/i18n/navigation";
import {
    getTranslations,
} from "next-intl/server";
import { useEffect } from "react";

export default async function HomePage() {

    const router = useRouter();

    useEffect(() => {
        router.push('/fashion/clientstore');
    }, [])
}