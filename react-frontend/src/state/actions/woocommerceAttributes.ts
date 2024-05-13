import { WoocommerceAttribute, MatchingAttributeData } from "../../types"

interface WoocommerceAttributesLoadAction {
    type: 'woocommerce_attributes_load'
}

interface WoocommerceAttributesLoadActionSuccessAction {
    type: 'woocommerce_attributes_load_success',
    payload: any //WoocommerceAttribute[]
}

interface WoocommerceAttributesLoadActionErrorAction {
    type: 'woocommerce_attributes_load_error',
    payload: string
}

export type WoocommerceAttributesLoadActionList = WoocommerceAttributesLoadAction | WoocommerceAttributesLoadActionSuccessAction | WoocommerceAttributesLoadActionErrorAction
