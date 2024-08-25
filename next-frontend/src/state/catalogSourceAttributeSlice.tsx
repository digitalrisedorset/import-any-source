import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {CatalogSourceHandler} from "@/pages/configuration/models/CatalogSourceHandler";

const buildInitialImportState = () => {
    const catalogSourceHandler = new CatalogSourceHandler()

    return {catalogSourceImportState: catalogSourceHandler.getCatalogSourceInitialStates()}
}

const initialState = buildInitialImportState()

export const catalogSourceAttributeSlice = createSlice({
    name: "catalogSourceAttribute",
    initialState,
    reducers: {
        setCatalogSourceAttributesImported: (state, action: PayloadAction<{name: string, numberCatalogSourceAttributes: number, ignoredAttributes: number}>) => {
            return {
                catalogSourceImportState: state.catalogSourceImportState.map(
                    (catalogSourceImportState) => catalogSourceImportState.name === action.payload.name ?
                        {...catalogSourceImportState,
                            numberCatalogSourceAttributes: action.payload.numberCatalogSourceAttributes,
                            ignoredAttributes: action.payload.ignoredAttributes
                        }
                        : catalogSourceImportState)
            }
        },
        addCatalogSourceAttributeMapped: (state, action: PayloadAction<string>) => {
            return {
                catalogSourceImportState: state.catalogSourceImportState.map(
                    (catalogSourceImportState) => catalogSourceImportState.name === action.payload ? {
                        ...catalogSourceImportState,
                        magentoMapping: catalogSourceImportState.magentoMapping + 1
                    } : {...catalogSourceImportState})
            }
        },
        addCatalogSourceAttributeIgnored: (state, action: PayloadAction<string>) => {
            return {
                catalogSourceImportState: state.catalogSourceImportState.map(
                    (catalogSourceImportState) => catalogSourceImportState.name === action.payload ? {
                        ...catalogSourceImportState,
                        ignoredAttributes: catalogSourceImportState.ignoredAttributes + 1
                    } : {...catalogSourceImportState})
            }
        },
        addCatalogSourceAttributeActivated: (state, action: PayloadAction<string>) => {
            return {
                catalogSourceImportState: state.catalogSourceImportState.map(
                    (catalogSourceImportState) => catalogSourceImportState.name === action.payload ? {
                        ...catalogSourceImportState,
                        ignoredAttributes: catalogSourceImportState.ignoredAttributes - 1
                    } : {...catalogSourceImportState})
            }
        },
        setActiveCatalogSourceSystem: (state, action: PayloadAction<string>) => {
            return {
                catalogSourceImportState: state.catalogSourceImportState.map(
                    (catalogSourceImportState) => catalogSourceImportState.name === action.payload ? {...catalogSourceImportState, active: true}
                        : {...catalogSourceImportState, active: false})
            }
        },
    }
})

export const { addCatalogSourceAttributeMapped, setCatalogSourceAttributesImported,
    addCatalogSourceAttributeIgnored, addCatalogSourceAttributeActivated, setActiveCatalogSourceSystem } = catalogSourceAttributeSlice.actions;
export const catalogSourceAttributeReducer = catalogSourceAttributeSlice.reducer;