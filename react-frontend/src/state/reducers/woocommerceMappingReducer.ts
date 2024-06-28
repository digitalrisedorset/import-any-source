import {MagentoAttribute, MatchingAttributeData } from "../../types/keystone";
import { WoocommerceAttributesMappingActionList} from "../actions";
import { WoocommmerceAttributesMappingActionType} from "../action-types";

interface WoocommerceAttributesMappingState {
    loading: boolean;
    error: string | null;
    woocommerceAttribute: string | null,
    magentoMatchAttributes: MatchingAttributeData[],
    magentoMatch: MagentoAttribute | null
}

const initialState = {
    loading: false,
    error: null,
    woocommerceAttribute: null,
    magentoMatchAttributes: [],
    magentoMatch: null
}

const reducer = (
    state: WoocommerceAttributesMappingState = initialState,
    action: WoocommerceAttributesMappingActionList
): WoocommerceAttributesMappingState => {
    switch (action.type) {
        case WoocommmerceAttributesMappingActionType.WOOCOMMERCE_ATTRIBUTES_MATCH_SEARCH_COMPLETE:
            return { loading: true, error: null, woocommerceAttribute: action.woocommerceAttributeCode, magentoMatchAttributes: action.magentoMatchesAttributes, magentoMatch: null}
        case WoocommmerceAttributesMappingActionType.WOOCOMMERCE_ATTRIBUTES_MAPPING_SET:
            return { loading: true, error: null, woocommerceAttribute: action.woocommerceAttributeCode, magentoMatchAttributes: [], magentoMatch: action.magentoMatch}
        case WoocommmerceAttributesMappingActionType.WOOCOMMERCE_ATTRIBUTES_MAPPING_ERROR:
            return { loading: false, error: action.payload, woocommerceAttribute: '', magentoMatchAttributes: [], magentoMatch: null }
        default:
            return state;
    }
}

export default reducer