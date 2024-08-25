import {CatalogSource} from "@/pages/configuration/styles/CatalogSource";
import {CatalogSourceHandler} from "@/pages/configuration/models/CatalogSourceHandler";
import React from "react";
import {useAppDispatch} from "@/state/store";
import { setActiveCatalogSourceSystem } from "@/state/catalogSourceAttributeSlice";

export const CatalogSourceSelect: React.FC = () => {
    const dispatch = useAppDispatch();
    const catalogSourceHandler = new CatalogSourceHandler()

    const onCatalogSourceSystemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        dispatch(setActiveCatalogSourceSystem(e.target.value))
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