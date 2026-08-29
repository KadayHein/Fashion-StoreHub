"use client";

import { useTranslations } from "next-intl";

export function useAppTranslation() {

    const common = useTranslations("common");
    const nav = useTranslations("nav");
    const home = useTranslations("home");
    const about = useTranslations("about");
    const feature = useTranslations("home.feature_cards")
    const filtering = useTranslations("filtering");
    const noti = useTranslations("noti");
    const carts = useTranslations("carts");
    const checkout = useTranslations("checkout");
    const payment = useTranslations("checkout.payment");
    const paymentComplete = useTranslations("checkout.paymentComplete");
    const language = useTranslations("language");

    return {
        common,
        nav,
        home,
        about,
        feature,
        filtering,
        noti,
        carts,
        checkout,
        payment,
        paymentComplete,
        language,
    };
}