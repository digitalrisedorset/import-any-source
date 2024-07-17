import {MagentoAttribute, MatchingAttributeData} from "../../types/keystone";
import {Dispatch} from "redux";
import {PimAttributesMappingActionList} from "../actions";
import {PimAttributesMappingActionType} from "../action-types";

const MAX_MATCHES = 5;

export const setPimAttributesMatchFound = (pimAttributeCode: string, magentoMatches: MatchingAttributeData[]) => {
    return async (dispatch: Dispatch<PimAttributesMappingActionList>) => {
        try {
            const bestMatches= magentoMatches.slice(0, MAX_MATCHES);

            dispatch({
                type: PimAttributesMappingActionType.PIM_ATTRIBUTES_MATCH_SEARCH_COMPLETE,
                pimAttributeCode: pimAttributeCode,
                magentoMatchesAttributes: bestMatches
            })
        } catch (err: any) {
            dispatch({
                type: PimAttributesMappingActionType.PIM_ATTRIBUTES_MAPPING_ERROR,
                payload: err.message
            })
        }
    }
}

export const setPimAttributesMatchSet = (pimAttributeCode: string, magentoMatch: MagentoAttribute) => {
    return async (dispatch: Dispatch<PimAttributesMappingActionList>) => {
        try {
            dispatch({
                type: PimAttributesMappingActionType.PIM_ATTRIBUTES_MAPPING_SET,
                pimAttributeCode: pimAttributeCode,
                magentoMatch
            })
        } catch (err: any) {
            dispatch({
                type: PimAttributesMappingActionType.PIM_ATTRIBUTES_MAPPING_ERROR,
                payload: err.message
            })
        }
    }
}