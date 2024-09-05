import {config, Theme} from "@/config";

export class ConfigReader {
    getThemeOptions = () => {
        return config.themes
            .map((theme, key) => {
                return {
                    value: theme.name,
                    label: this.getThemeLabel(theme.name)
                }
            })
    }

    getThemeByName = (name: string): Theme => {
        if (name === undefined) {
            name = 'blue'
        }

        const themes = config.themes
            .filter((theme) => theme.name === name)

        return themes[0]
    }

    getActiveThemeLabel = (themeCode: string) => {
        if (themeCode === '') {
            return 'Default'
        }

        return this.getThemeLabel(themeCode)
    }

    getThemeLabel = (themeCode: string) => {
        return themeCode
    }
}