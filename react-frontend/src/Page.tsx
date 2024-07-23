import { GlobalStyles } from "./components/styles/Global";
import {useActiveThemeColor} from "./hooks/useActiveTheme";

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