import {CatalogSource} from "@/pages/catalog-source/styles/CatalogSource";
import {Label} from "@/pages/global/styles/Form"
import React from "react";
import {useCatalogSourceAttribute} from "@/state/catalogSourceAttributeState";
import {getCatalogSourceOptions} from "@/pages/catalog-source/hooks/useCatalogSourceOptions";

export const CatalogSourceSelect: React.FC = () => {
    const {setActiveCatalogSourceSystem} = useCatalogSourceAttribute()

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
                    {getCatalogSourceOptions().map((item, key) => {
                        return (<option key={item.value} value={item.value}>{item.label}</option>)
                    })}
                </select>
            </fieldset>
        </CatalogSource>
    )
}