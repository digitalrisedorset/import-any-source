import {useTypedSelector} from "../../global/hooks/useTypedSelector";
import {ConfigReader} from "../models/ConfigReader";

export const useActiveTheme = () => {
    const { themeCode } = useTypedSelector((state) => state.configurationPreference)
    const configReader = new ConfigReader()

    return configReader.getActiveThemeLabel(themeCode)
}

export const useActiveThemeCode = () => {
    const {themeCode} = useTypedSelector((state) => state.configurationPreference)

    return themeCode
}

export const useActiveThemeColor = () => {
    const {themeCode} = useTypedSelector((state) => state.configurationPreference)
    const configReader = new ConfigReader()

    const activeTheme = configReader.getThemeByName(themeCode)

    return activeTheme.colors
}