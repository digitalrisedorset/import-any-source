import { GlobalStyles } from "../styles/Global";
import {useActiveThemeColor} from "../../configuration/hooks/useActiveTheme";
import React from "react";

interface PageProps {
    children: any
}

export const Page: React.FC<PageProps> = ({ children }: PageProps) => {
    const themeColors = useActiveThemeColor()

    return (
        <>
            <GlobalStyles colors={themeColors} />
            {children}
        </>
    )
}