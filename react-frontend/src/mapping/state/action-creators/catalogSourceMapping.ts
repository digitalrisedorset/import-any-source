import {MagentoAttribute, MatchingAttributeData} from "../../../types/keystone";
import {Dispatch} from "redux";
import {CatalogSourceAttributesMappingActionList} from "../actions/catalogSourceMapping";
import {CatalogSourceAttributesMappingActionType} from "../action-types/catalogSourceAttributesAction";

const MAX_MATCHES = 5;

export const setCatalogSourceAttributesMatchFound = (catalogSourceAttributeCode: string, magentoMatches: MatchingAttributeData[]) => {
    return async (dispatch: Dispatch<CatalogSourceAttributesMappingActionList>) => {
        try {
            const bestMatches= magentoMatches.slice(0, MAX_MATCHES);

            dispatch({
                type: CatalogSourceAttributesMappingActionType.CATALOG_SOURCE_ATTRIBUTES_MATCH_SEARCH_COMPLETE,
                catalogSourceAttributeCode: catalogSourceAttributeCode,
                magentoMatchesAttributes: bestMatches
            })
        } catch (err: any) {
            dispatch({
                type: CatalogSourceAttributesMappingActionType.CATALOG_SOURCE_ATTRIBUTES_MAPPING_ERROR,
                payload: err.message
            })
        }
    }
}

export const setCatalogSourceAttributesMatchSet = (catalogSourceAttributeCode: string, magentoMatch: MagentoAttribute) => {
    return async (dispatch: Dispatch<CatalogSourceAttributesMappingActionList>) => {
        try {
            dispatch({
                type: CatalogSourceAttributesMappingActionType.CATALOG_SOURCE_ATTRIBUTES_MAPPING_SET,
                catalogSourceAttributeCode: catalogSourceAttributeCode,
                magentoMatch
            })
        } catch (err: any) {
            dispatch({
                type: CatalogSourceAttributesMappingActionType.CATALOG_SOURCE_ATTRIBUTES_MAPPING_ERROR,
                payload: err.message
            })
        }
    }
}