import {CatalogSource} from "../../../configuration/styles/CatalogSource";
import {useActions} from "../../../global/hooks/useActions";
import {CatalogSourceHandler} from "../../../configuration/models/CatalogSourceHandler";
import React from "react";

export const CatalogSourceSelect: React.FC = () => {
    const { setActiveCatalogSourceSystem } = useActions()
    const catalogSourceHandler = new CatalogSourceHandler()

    const onCatalogSourceSystemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        setActiveCatalogSourceSystem(e.target.value)
    };

    return (
        <CatalogSource>
            <fieldset>
                <label htmlFor="code">
                    Select your Catalog Source
                    <select onChange={onCatalogSourceSystemChange} className="form-select">
                        <option value="">-</option>
                        {catalogSourceHandler.getCatalogSourceOptions().map((item, key) => {
                            return (<option key={item.value} value={item.value}>{item.label}</option>)
                        })}
                    </select>
                </label>
            </fieldset>
        </CatalogSource>
    )
}