import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {CatalogSourceHandler} from "@/pages/configuration/models/CatalogSourceHandler";

const buildInitialImportState = () => {
    const catalogSourceHandler = new CatalogSourceHandler()
    let loadStorageCatalogSourceData = null
    if (typeof window !== "undefined") {
        loadStorageCatalogSourceData = localStorage.getItem('catalogSources')
    }

    if (loadStorageCatalogSourceData === null) {
        return {catalogSourceImportState: catalogSourceHandler.getCatalogSourceInitialStates()}
    }

    const data = JSON.parse(loadStorageCatalogSourceData)
    return data as CatalogSourceStateData
}

const initialState = buildInitialImportState()

export const catalogSourceAttributeSlice = createSlice({
    name: "catalogSourceAttribute",
    initialState,
    reducers: {
        setCatalogSourceAttributesImported: (state, action: PayloadAction<[string, number, number]>) => {
            let newState = {
                catalogSourceImportState: state.catalogSourceImportState.map(
                    (catalogSourceImportState) => catalogSourceImportState.name === action.payload.name ?
                        {...catalogSourceImportState,
                            numberCatalogSourceAttributes: action.payload.numberCatalogSourceAttributes,
                            ignoredAttributes: action.payload.ignoredAttributes
                        }
                        : catalogSourceImportState)
            }
            localStorage.setItem('catalogSources', JSON.stringify(newState))
            state = newState
        },
        addCatalogSourceAttributeMapped: (state, action: PayloadAction<string>) => {
            newState = {
                catalogSourceImportState: state.catalogSourceImportState.map(
                    (catalogSourceImportState) => catalogSourceImportState.name === action.payload ? {
                        ...catalogSourceImportState,
                        magentoMapping: catalogSourceImportState.magentoMapping + 1
                    } : {...catalogSourceImportState})
            }
            localStorage.setItem('catalogSources', JSON.stringify(newState))
            state = newState
        },
        addCatalogSourceAttributeIgnored: (state, action: PayloadAction<string>) => {
            newState = {
                catalogSourceImportState: state.catalogSourceImportState.map(
                    (catalogSourceImportState) => catalogSourceImportState.name === action.payload ? {
                        ...catalogSourceImportState,
                        ignoredAttributes: catalogSourceImportState.ignoredAttributes + 1
                    } : {...catalogSourceImportState})
            }
            localStorage.setItem('catalogSources', JSON.stringify(newState))
            state = newState
        },
        addCatalogSourceAttributeActivated: (state, action: PayloadAction<string>) => {
            newState = {
                catalogSourceImportState: state.catalogSourceImportState.map(
                    (catalogSourceImportState) => catalogSourceImportState.name === action.payload ? {
                        ...catalogSourceImportState,
                        ignoredAttributes: catalogSourceImportState.ignoredAttributes - 1
                    } : {...catalogSourceImportState})
            }
            localStorage.setItem('catalogSources', JSON.stringify(newState))
            state = newState
        },
        setActiveCatalogSourceSystem: (state, action: PayloadAction<string>) => {
            newState = {
                catalogSourceImportState: state.catalogSourceImportState.map(
                    (catalogSourceImportState) => catalogSourceImportState.name === action.payload ? {...catalogSourceImportState, active: true}
                        : {...catalogSourceImportState, active: false})
            }
            localStorage.setItem('catalogSources', JSON.stringify(newState))
            state = newState
        },
    }
})

export const { addCatalogSourceAttributeMapped, setCatalogSourceAttributesImported,
    addCatalogSourceAttributeIgnored, addCatalogSourceAttributeActivated, setActiveCatalogSourceSystem } = catalogSourceAttributeSlice.actions;
export const catalogSourceAttributeReducer = catalogSourceAttributeSlice.reducer;