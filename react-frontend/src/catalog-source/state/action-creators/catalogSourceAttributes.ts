import {Dispatch} from "redux";
import {SetCatalogSourceAttributeActionList} from "../../../state/actions";
import {CatalogSourceAttributesActionType} from "../../../state/action-types";

export const setCatalogSourceAttributesImported = (catalogSourceCode: string, numberCatalogSourceAttributes: number, ignoredAttributes: number) => {
    return async (dispatch: Dispatch<SetCatalogSourceAttributeActionList>) => {
        dispatch({
            type: CatalogSourceAttributesActionType.SET_CATALOG_SOURCE_ATTRIBUTES_IMPORT,
            catalogSourceImportState: {
                name: catalogSourceCode,
                numberCatalogSourceAttributes,
                ignoredAttributes
            }
        })
    }
}

export const addCatalogSourceAttributeMapped = (catalogSourceCode: string) => {
    return async (dispatch: Dispatch<SetCatalogSourceAttributeActionList>) => {
        dispatch({
            type: CatalogSourceAttributesActionType.SET_CATALOG_SOURCE_ATTRIBUTE_MAPPED,
            catalogSourceCode
        })
    }
}

export const addCatalogSourceAttributeIgnored = (catalogSourceCode: string) => {
    return async (dispatch: Dispatch<SetCatalogSourceAttributeActionList>) => {
        dispatch({
            type: CatalogSourceAttributesActionType.SET_CATALOG_SOURCE_ATTRIBUTE_IGNORED,
            catalogSourceCode
        })
    }
}

export const addCatalogSourceAttributeActivated = (catalogSourceCode: string) => {
    return async (dispatch: Dispatch<SetCatalogSourceAttributeActionList>) => {
        dispatch({
            type: CatalogSourceAttributesActionType.SET_CATALOG_SOURCE_ATTRIBUTE_ACTIVATED,
            catalogSourceCode
        })
    }
}

export const setActiveCatalogSourceSystem = (catalogSourceCode: string) => {
    return async (dispatch: Dispatch<SetCatalogSourceAttributeActionList>) => {
        dispatch({
            type: CatalogSourceAttributesActionType.SET_CATALOG_SOURCE_ATTRIBUTES_ACTIVE,
            catalogSourceCode
        })
    }
}