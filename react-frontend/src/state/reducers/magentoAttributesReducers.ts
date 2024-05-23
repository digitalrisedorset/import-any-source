import { MagentoAttributesLoadActionList } from '../actions'
import { MagentoAttributesLoadActionType } from '../action-types'
import { MagentoAttribute } from "../../types/keystone";

interface MagentoAttributesState {
    loading: boolean;
    error: string | null;
    data: MagentoAttribute[]
}

const initialState = {
    loading: false,
    error: null,
    data: []
}

const reducer = (
    state: MagentoAttributesState = initialState,
    action: MagentoAttributesLoadActionList
): MagentoAttributesState => {
    switch (action.type) {
        case MagentoAttributesLoadActionType.MAGENTO_ATTRIBUTES_LOAD:
            return { loading: true, error: null, data: [] }
        case MagentoAttributesLoadActionType.MAGENTO_ATTRIBUTES_LOAD_SUCCESS:
            return { loading: false, error: null, data: action.payload }
        case MagentoAttributesLoadActionType.MAGENTO_ATTRIBUTES_LOAD_ERROR:
            return { loading: false, error: action.payload, data: [] }
        default:
            return state;
    }
}

export default reducer