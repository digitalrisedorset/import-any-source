import { MatchingAttributeData, MagentoAttribute } from "../../../types/keystone"
import {CatalogSourceAttributesMappingActionType} from "../action-types/catalogSourceAttributesAction";

interface CatalogSourceAttributesMatchSearchCompleteAction {
    type: CatalogSourceAttributesMappingActionType.CATALOG_SOURCE_ATTRIBUTES_MATCH_SEARCH_COMPLETE,
    catalogSourceAttributeCode: string,
    magentoMatchesAttributes: MatchingAttributeData[]
}

interface CatalogSourceAttributesMappingSetAction {
    type: CatalogSourceAttributesMappingActionType.CATALOG_SOURCE_ATTRIBUTES_MAPPING_SET,
    catalogSourceAttributeCode: string,
    magentoMatch: MagentoAttribute
}

interface CatalogSourceAttributesMappingErrorAction {
    type: CatalogSourceAttributesMappingActionType.CATALOG_SOURCE_ATTRIBUTES_MAPPING_ERROR,
    payload: string
}

export type CatalogSourceAttributesMappingActionList = CatalogSourceAttributesMatchSearchCompleteAction | CatalogSourceAttributesMappingSetAction | CatalogSourceAttributesMappingErrorAction
