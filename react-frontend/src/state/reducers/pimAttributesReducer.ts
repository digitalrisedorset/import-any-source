import { PimAttributesLoadActionType } from '../action-types'
import { PimAttribute } from "../../types/keystone";
import {PimAttributesLoadActionList} from "../actions";

interface PimAttributesState {
    loading: boolean;
    error: string | null;
    data: PimAttribute[]
}

const initialState = {
    loading: false,
    error: null,
    data: []
}

const reducer = (
    state: PimAttributesState = initialState,
    action: PimAttributesLoadActionList
): PimAttributesState => {
    switch (action.type) {
        case PimAttributesLoadActionType.PIM_ATTRIBUTES_LOAD:
            return { loading: true, error: null, data: [] }
        case PimAttributesLoadActionType.PIM_ATTRIBUTES_LOAD_SUCCESS:
            return { loading: false, error: null, data: action.payload }
        case PimAttributesLoadActionType.PIM_ATTRIBUTES_LOAD_ERROR:
            return { loading: false, error: action.payload, data: [] }
        default:
            return state;
    }
}

export default reducer