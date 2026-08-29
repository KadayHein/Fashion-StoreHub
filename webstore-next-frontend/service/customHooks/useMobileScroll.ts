import {
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useRef } from "react";

export const useMobileScroll = () => {

    const theme = useTheme();

    const isMobile = useMediaQuery(
        theme.breakpoints.down("md")
    );

    const targetRef =
        useRef<HTMLDivElement>(null);

    const scrollToTarget = () => {

        if (!isMobile) return;

        targetRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return {
        targetRef,
        scrollToTarget,
    };
};