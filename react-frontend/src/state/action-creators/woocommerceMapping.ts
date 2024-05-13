import {MagentoAttribute, MatchingAttributeData} from "../../types";
import {Dispatch} from "redux";
import {WoocommerceAttributesMappingActionList} from "../actions";
import {WoocommmerceAttributesMappingActionType} from "../action-types";

const MAX_MATCHES = 5;

export const setWoocommerceAttributesMatchFound = (woocommerceAttributeCode: string, magentoMatches: MatchingAttributeData[]) => {
    return async (dispatch: Dispatch<WoocommerceAttributesMappingActionList>) => {
        try {
            const bestMatches= magentoMatches.slice(0, MAX_MATCHES);

            dispatch({
                type: WoocommmerceAttributesMappingActionType.WOOCOMMERCE_ATTRIBUTES_MATCH_SEARCH_COMPLETE,
                woocommerceAttributeCode: woocommerceAttributeCode,
                magentoMatchesAttributes: bestMatches
            })
        } catch (err: any) {
            dispatch({
                type: WoocommmerceAttributesMappingActionType.WOOCOMMERCE_ATTRIBUTES_MAPPING_ERROR,
                payload: err.message
            })
        }
    }
}

export const setWoocommerceAttributesMatchSet = (woocommerceAttributeCode: string, magentoMatch: MagentoAttribute) => {
    return async (dispatch: Dispatch<WoocommerceAttributesMappingActionList>) => {
        try {
            dispatch({
                type: WoocommmerceAttributesMappingActionType.WOOCOMMERCE_ATTRIBUTES_MAPPING_SET,
                woocommerceAttributeCode: woocommerceAttributeCode,
                magentoMatch
            })
        } catch (err: any) {
            dispatch({
                type: WoocommmerceAttributesMappingActionType.WOOCOMMERCE_ATTRIBUTES_MAPPING_ERROR,
                payload: err.message
            })
        }
    }
}