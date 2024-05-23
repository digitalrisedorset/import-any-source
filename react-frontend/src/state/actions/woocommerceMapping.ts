import { MatchingAttributeData, MagentoAttribute } from "../../types/keystone"

interface WoocommerceAttributesMappingAction {
    type: 'woocommerce_attributes_mapping'
}

interface WoocommerceAttributesMatchSearchCompleteAction {
    type: 'woocommerce_attributes_match_search_complete',
    woocommerceAttributeCode: string,
    magentoMatchesAttributes: MatchingAttributeData[]
}

interface WoocommerceAttributesMappingSetAction {
    type: 'woocommerce_attributes_mapping_set',
    woocommerceAttributeCode: string,
    magentoMatch: MagentoAttribute
}

interface WoocommerceAttributesMappingErrorAction {
    type: 'woocommerce_attributes_mapping_error',
    payload: string
}

export type WoocommerceAttributesMappingActionList = WoocommerceAttributesMappingAction | WoocommerceAttributesMatchSearchCompleteAction | WoocommerceAttributesMappingSetAction | WoocommerceAttributesMappingErrorAction
