import {ConfigReader} from "../models/ConfigReader";
import {useAppSelector} from "@/state/store";

export const useActiveTheme = () => {
    const { themeCode } = useAppSelector((state) => state.configuration);
    const configReader = new ConfigReader()

    return configReader.getActiveThemeLabel(themeCode)
}

export const useActiveThemeCode = () => {
    const { themeCode } = useAppSelector((state) => state.configuration);

    return themeCode
}

export const useActiveThemeColor = () => {
    const { themeCode } = useAppSelector((state) => state.configuration);

    const configReader = new ConfigReader()

    const activeTheme = configReader.getThemeByName(themeCode)

    return activeTheme.colors
}