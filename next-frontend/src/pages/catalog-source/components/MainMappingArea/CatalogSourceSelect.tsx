import {CatalogSource} from "@/pages/configuration/styles/CatalogSource";
import {CatalogSourceHandler} from "@/pages/configuration/models/CatalogSourceHandler";
import React from "react";
import {useAppSelector} from "@/state/store";

export const CatalogSourceSelect: React.FC = () => {
    const { setActiveCatalogSourceSystem } = useAppSelector((state) => state.catalogSourceAttribute);
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