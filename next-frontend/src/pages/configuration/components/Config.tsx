import {CardStyles} from "../styles/CardStyles";
import {Label} from "@/pages/global/styles/Form"
import {CatalogSource} from "../styles/CatalogSource";
import {ConfigReader} from "../models/ConfigReader";
import {useThemeSelect} from "@/pages/configuration/hooks/useThemeSelect";

export const Config = () => {
    const setCurrentTheme = useThemeSelect()
    const configReader = new ConfigReader()

    const onThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        setCurrentTheme(e.target.value)
    };

    return (
        <CardStyles>
            <h2>System Preferences</h2>
            <CatalogSource>
                <fieldset>
                    <Label htmlFor="code">Select your theme</Label>
                    <select onChange={onThemeChange} className="form-select">
                        <option value="">-</option>
                        {configReader.getThemeOptions().map((item) => {
                            return (<option key={item.value} value={item.value}>{item.label}</option>)
                        })}
                    </select>
                </fieldset>
            </CatalogSource>
        </CardStyles>
    )
}