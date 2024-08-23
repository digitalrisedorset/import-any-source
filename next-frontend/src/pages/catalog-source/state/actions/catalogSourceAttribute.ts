import {CatalogSourceImportAttributeState} from "../../../types/states";
import {CatalogSourceAttributesActionType} from "../action-types/catalogSourceAttributesAction";

interface SetAttributeImportAction {
    type: CatalogSourceAttributesActionType.SET_CATALOG_SOURCE_ATTRIBUTES_IMPORT,
    catalogSourceImportState: CatalogSourceImportAttributeState
}

interface SetAttributeActiveAction {
    type: CatalogSourceAttributesActionType.SET_CATALOG_SOURCE_ATTRIBUTES_ACTIVE,
    catalogSourceCode: string
}

interface SetAttributeMappedAction {
    type: CatalogSourceAttributesActionType.SET_CATALOG_SOURCE_ATTRIBUTE_MAPPED,
    catalogSourceCode: string
}

interface SetAttributeIgnoredAction {
    type: CatalogSourceAttributesActionType.SET_CATALOG_SOURCE_ATTRIBUTE_IGNORED,
    catalogSourceCode: string
}

interface SetAttributeActivatedAction {
    type: CatalogSourceAttributesActionType.SET_CATALOG_SOURCE_ATTRIBUTE_ACTIVATED,
    catalogSourceCode: string
}

export type SetCatalogSourceAttributeActionList = SetAttributeImportAction | SetAttributeActiveAction | SetAttributeMappedAction | SetAttributeIgnoredAction | SetAttributeActivatedAction