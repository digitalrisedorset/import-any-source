import {CatalogSource} from "@/pages/configuration/styles/CatalogSource";
import {Label} from "@/pages/global/styles/Form"
import {CatalogSourceHandler} from "@/pages/configuration/models/CatalogSourceHandler";
import React from "react";
import {useCatalogSourceAttribute} from "@/state/catalogSourceAttributeState";

export const CatalogSourceSelect: React.FC = () => {
    const {setActiveCatalogSourceSystem} = useCatalogSourceAttribute()
    const catalogSourceHandler = new CatalogSourceHandler()

    const onCatalogSourceSystemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        setActiveCatalogSourceSystem(e.target.value)
    };

    return (
        <CatalogSource>
            <fieldset>
                <Label htmlFor="code">Select your Catalog Source</Label>
                <select onChange={onCatalogSourceSystemChange} className="form-select">
                    <option value="">-</option>
                    {catalogSourceHandler.getCatalogSourceOptions().map((item, key) => {
                        return (<option key={item.value} value={item.value}>{item.label}</option>)
                    })}
                </select>
            </fieldset>
        </CatalogSource>
    )
}