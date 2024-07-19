import CardStyles from "./styles/CardStyles";
import PimSystem from "./styles/PimSystem";
import {ConfigReader} from "../models/ConfigReader";
import {useActions} from "../hooks/useActions";

export function Config() {
    const { setActiveTheme } = useActions()
    const configReader = new ConfigReader()

    const onThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        setActiveTheme(e.target.value)
    };

    return (
        <CardStyles>
            <h2>System Preferences</h2>
            <PimSystem>
                <fieldset>
                    <label htmlFor="code">
                        Select your theme
                        <select onChange={onThemeChange} className="form-select">
                            <option value="">-</option>
                            {configReader.getThemeOptions().map((item) => {
                                return (<option value={item.value}>{item.label}</option>)
                            })}
                        </select>
                    </label>
                </fieldset>
            </PimSystem>
        </CardStyles>
    )
}