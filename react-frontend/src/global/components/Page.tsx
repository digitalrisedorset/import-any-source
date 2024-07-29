import { GlobalStyles } from "../styles/Global";
import {useActiveThemeColor} from "../../configuration/hooks/useActiveTheme";

interface PageProps {
    children: any
}

export const Page = ({ children }: PageProps) => {
    const themeColors = useActiveThemeColor()

    return (
        <>
            <GlobalStyles colors={themeColors} />
            {children}
        </>
    )
}