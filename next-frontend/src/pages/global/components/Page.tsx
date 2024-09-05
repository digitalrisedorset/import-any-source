import React from "react";
import {Header} from "@/pages/global/components/Header";
import {Footer} from "@/pages/global/components/Footer";
import {GlobalStyles} from "@/pages/global/styles/Global"
import {useActiveThemeColor} from "@/pages/user-authentication/hooks/useActiveTheme";
import {FlashMessages} from "@/pages/global/components/FlashMessages";
import {verifyUserAccess} from "@/pages/user-authentication/hooks/useUser";

interface PageProps {
    children: React.ReactNode
}

export const Page: React.FC<PageProps> = ({ children }: PageProps) => {
    const themeColors = useActiveThemeColor()
    verifyUserAccess()

    return (
        <>
            <GlobalStyles colors={themeColors} />
            <FlashMessages />
            <Header />
            {children}
            <Footer />
        </>
    )
}