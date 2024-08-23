import {CatalogSourceAttributesActionType} from "../../../state/action-types";
import {SetCatalogSourceAttributeActionList} from "../../../state/actions";
import { CatalogSourceStateData} from "../../../types/states"
import {CatalogSourceHandler} from "../../../configuration/models/CatalogSourceHandler";

const buildInitialImportState = () => {
    const catalogSourceHandler = new CatalogSourceHandler()
    const loadStorageCatalogSourceData = localStorage.getItem('catalogSources')

    if (loadStorageCatalogSourceData === null) {
        return {catalogSourceImportState: catalogSourceHandler.getCatalogSourceInitialStates()}
    }

    const data = JSON.parse(loadStorageCatalogSourceData)
    return data as CatalogSourceStateData
}

const initialState = buildInitialImportState()

const reducer = (
    state: CatalogSourceStateData = initialState,
    action: SetCatalogSourceAttributeActionList
): CatalogSourceStateData => {
    let newState
    switch (action.type) {
        case CatalogSourceAttributesActionType.SET_CATALOG_SOURCE_ATTRIBUTES_IMPORT:
            newState = {
                catalogSourceImportState: state.catalogSourceImportState.map(
                    (catalogSourceImportState) => catalogSourceImportState.name === action.catalogSourceImportState.name ?
                        {...catalogSourceImportState,
                            numberCatalogSourceAttributes: action.catalogSourceImportState.numberCatalogSourceAttributes,
                            ignoredAttributes: action.catalogSourceImportState.ignoredAttributes
                        }
                        : catalogSourceImportState)
            }
            localStorage.setItem('catalogSources', JSON.stringify(newState))
            return newState
        case CatalogSourceAttributesActionType.SET_CATALOG_SOURCE_ATTRIBUTES_ACTIVE:
            newState = {
                catalogSourceImportState: state.catalogSourceImportState.map(
                    (catalogSourceImportState) => catalogSourceImportState.name === action.catalogSourceCode ? {...catalogSourceImportState, active: true}
                        : {...catalogSourceImportState, active: false})
            }
            localStorage.setItem('catalogSources', JSON.stringify(newState))
            return newState
        case CatalogSourceAttributesActionType.SET_CATALOG_SOURCE_ATTRIBUTE_MAPPED:
            newState = {
                catalogSourceImportState: state.catalogSourceImportState.map(
                    (catalogSourceImportState) => catalogSourceImportState.name === action.catalogSourceCode ? {
                        ...catalogSourceImportState,
                        magentoMapping: catalogSourceImportState.magentoMapping + 1
                    } : {...catalogSourceImportState})
            }
            localStorage.setItem('catalogSources', JSON.stringify(newState))
            return newState
        case CatalogSourceAttributesActionType.SET_CATALOG_SOURCE_ATTRIBUTE_IGNORED:
            newState = {
                catalogSourceImportState: state.catalogSourceImportState.map(
                    (catalogSourceImportState) => catalogSourceImportState.name === action.catalogSourceCode ? {
                        ...catalogSourceImportState,
                        ignoredAttributes: catalogSourceImportState.ignoredAttributes + 1
                    } : {...catalogSourceImportState})
            }
            localStorage.setItem('catalogSources', JSON.stringify(newState))
            return newState
        case CatalogSourceAttributesActionType.SET_CATALOG_SOURCE_ATTRIBUTE_ACTIVATED:
            newState = {
                catalogSourceImportState: state.catalogSourceImportState.map(
                    (catalogSourceImportState) => catalogSourceImportState.name === action.catalogSourceCode ? {
                        ...catalogSourceImportState,
                        ignoredAttributes: catalogSourceImportState.ignoredAttributes - 1
                    } : {...catalogSourceImportState})
            }
            localStorage.setItem('catalogSources', JSON.stringify(newState))
            return newState
        default:
            return state;
    }
}

export default reducer