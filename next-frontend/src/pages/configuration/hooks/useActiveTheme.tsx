import {ConfigReader} from "../models/ConfigReader";
import {useUserConfiguration} from "@/pages/user-authentication/hooks/useUser";

export const useActiveTheme = () => {
    const {theme} = useUserConfiguration()
    const configReader = new ConfigReader()

    return configReader.getActiveThemeLabel(theme)
}

export const useActiveThemeCode = () => {
    const { themeCode } = useUserConfiguration()
    return themeCode
}

export const useActiveThemeColor = () => {
    const { themeCode } = useUserConfiguration()
    const configReader = new ConfigReader()

    const activeTheme = configReader.getThemeByName(themeCode)

    return activeTheme.colors
}