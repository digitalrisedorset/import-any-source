import { WoocommerceAttributesLoadActionList } from '../actions'
import { WoocommmerceAttributesLoadActionType } from '../action-types'
import { WoocommerceAttribute } from "../../types";

interface WoocommerceAttributesState {
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
    state: WoocommerceAttributesState = initialState,
    action: WoocommerceAttributesLoadActionList
): WoocommerceAttributesState => {
    switch (action.type) {
        case WoocommmerceAttributesLoadActionType.WOOCOMMERCE_ATTRIBUTES_LOAD:
            return { loading: true, error: null, data: [] }
        case WoocommmerceAttributesLoadActionType.WOOCOMMERCE_ATTRIBUTES_LOAD_SUCCESS:
            return { loading: false, error: null, data: action.payload }
        case WoocommmerceAttributesLoadActionType.WOOCOMMERCE_ATTRIBUTES_LOAD_ERROR:
            return { loading: false, error: action.payload, data: [] }
        default:
            return state;
    }
}

export default reducer