import PimSystem from "../../styles/PimSystem";
import {useActions} from "../../../hooks/useActions";
import {PimSystemHandler} from "../../../models/PimSystem";

export function PimSystemSelect() {
    const { setActivePimSystem } = useActions()
    const pimSystemHandler = new PimSystemHandler()

    const onPimSystemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        setActivePimSystem(e.target.value)
    };

    return (
        <PimSystem>
            <fieldset>
                <label htmlFor="code">
                    Select your PIM System
                    <select onChange={onPimSystemChange} className="form-select">
                        <option value="">-</option>
                        {pimSystemHandler.getPimSystemOptions().map((item, key) => {
                            return (<option key={item.value} value={item.value}>{item.label}</option>)
                        })}
                    </select>
                </label>
            </fieldset>
        </PimSystem>
    )
}