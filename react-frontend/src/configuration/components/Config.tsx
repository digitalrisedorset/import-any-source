import {CardStyles} from "../styles/CardStyles";
import {CatalogSource} from "../styles/CatalogSource";
import {ConfigReader} from "../models/ConfigReader";
import {useActions} from "../../global/hooks/useActions";
import {CatalogSourceSelect} from "../../catalog-source/components/MainMappingArea/CatalogSourceSelect";

export const Config = () => {
    const { setActiveTheme } = useActions()
    const configReader = new ConfigReader()

    const onThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        setActiveTheme(e.target.value)
    };

    return (
        <CardStyles>
            <h2>System Preferences</h2>
            <CatalogSource>
                <fieldset>
                    <label htmlFor="code">
                        Select your theme
                        <select onChange={onThemeChange} className="form-select">
                            <option value="">-</option>
                            {configReader.getThemeOptions().map((item) => {
                                return (<option key={item.value} value={item.value}>{item.label}</option>)
                            })}
                        </select>
                    </label>
                </fieldset>
                <CatalogSourceSelect />
            </CatalogSource>
        </CardStyles>
    )
}