import {MagentoAttribute, MatchingAttributeData } from "../../../types/keystone";
import { CatalogSourceAttributesMappingActionType} from "../action-types/catalogSourceAttributesAction";
import {CatalogSourceAttributesMappingActionList} from "../actions/catalogSourceMapping";

interface CatalogSourceAttributesMappingState {
    loading: boolean;
    error: string | null;
    catalogSourceAttribute: string | null,
    magentoMatchAttributes: MatchingAttributeData[],
    magentoMatch: MagentoAttribute | null
}

const initialState = {
    loading: false,
    error: null,
    catalogSourceAttribute: null,
    magentoMatchAttributes: [],
    magentoMatch: null
}

const reducer = (
    state: CatalogSourceAttributesMappingState = initialState,
    action: CatalogSourceAttributesMappingActionList
): CatalogSourceAttributesMappingState => {
    switch (action.type) {
        case CatalogSourceAttributesMappingActionType.CATALOG_SOURCE_ATTRIBUTES_MATCH_SEARCH_COMPLETE:
            return { loading: true, error: null, catalogSourceAttribute: action.catalogSourceAttributeCode, magentoMatchAttributes: action.magentoMatchesAttributes, magentoMatch: null}
        case CatalogSourceAttributesMappingActionType.CATALOG_SOURCE_ATTRIBUTES_MAPPING_SET:
            return { loading: true, error: null, catalogSourceAttribute: action.catalogSourceAttributeCode, magentoMatchAttributes: [], magentoMatch: action.magentoMatch}
        case CatalogSourceAttributesMappingActionType.CATALOG_SOURCE_ATTRIBUTES_MAPPING_ERROR:
            return { loading: false, error: action.payload, catalogSourceAttribute: '', magentoMatchAttributes: [], magentoMatch: null }
        default:
            return state;
    }
}

export default reducer