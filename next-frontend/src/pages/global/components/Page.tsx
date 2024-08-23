import React from "react";
import {Header} from "@/pages/global/components/Header";
import {Footer} from "@/pages/global/components/Footer";
import {GlobalStyles} from "@/pages/global/styles/Global"
import {useActiveThemeColor} from "@/pages/configuration/hooks/useActiveTheme";

interface PageProps {
    children: React.ReactNode
}

export const Page: React.FC<PageProps> = ({ children }: PageProps) => {
    const themeColors = useActiveThemeColor()

    return (
        <>
            <GlobalStyles colors={themeColors} />
            <Header />
            {children}
            <Footer />
        </>
    )
}