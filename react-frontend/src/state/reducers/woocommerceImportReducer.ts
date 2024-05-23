import { WoocommerceAttributesImportActionList } from '../actions'
import { WoocommmerceAttributesImportActionType } from '../action-types'
import { WoocommerceAttribute } from "../../types/keystone";

interface WoocommerceImportState {
    loading: boolean;
    error: string | null;
    data: WoocommerceAttribute[]
}

const initialState = {
    loading: false,
    error: null,
    data: []
}

const reducer = (
    state: WoocommerceImportState = initialState,
    action: WoocommerceAttributesImportActionList
): WoocommerceImportState => {
    switch (action.type) {
        case WoocommmerceAttributesImportActionType.WOOCOMMERCE_ATTRIBUTES_IMPORT:
            return { loading: true, error: null, data: [] }
        case WoocommmerceAttributesImportActionType.WOOCOMMERCE_ATTRIBUTES_IMPORT_SUCCESS:
            return { loading: false, error: null, data: action.payload }
        case WoocommmerceAttributesImportActionType.WOOCOMMERCE_ATTRIBUTES_IMPORT_ERROR:
            return { loading: false, error: action.payload, data: [] }
        default:
            return state;
    }
}

export default reducer