import { WoocommerceAttribute, MatchingAttributeData } from "../../types/keystone"

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


interface WoocommerceAttributesImportAction {
    type: 'woocommerce_attributes_import'
}

interface WoocommerceAttributesImportActionSuccessAction {
    type: 'woocommerce_attributes_import_success',
    payload: any //WoocommerceAttribute[]
}

interface WoocommerceAttributesImportActionErrorAction {
    type: 'woocommerce_attributes_import_error',
    payload: string
}

export type WoocommerceAttributesImportActionList = WoocommerceAttributesImportAction | WoocommerceAttributesImportActionSuccessAction | WoocommerceAttributesImportActionErrorAction
