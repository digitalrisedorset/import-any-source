import { PimAttributesImportActionType } from '../action-types'
import { PimAttribute } from "../../types/keystone";
import {PimAttributesImportActionList} from "../actions";

interface PimImportState {
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
    state: PimImportState = initialState,
    action: PimAttributesImportActionList
): PimImportState => {
    switch (action.type) {
        case PimAttributesImportActionType.PIM_ATTRIBUTES_IMPORT:
            return { loading: true, error: null, data: [] }
        case PimAttributesImportActionType.PIM_ATTRIBUTES_IMPORT_SUCCESS:
            return { loading: false, error: null, data: action.payload }
        case PimAttributesImportActionType.PIM_ATTRIBUTES_IMPORT_ERROR:
            return { loading: false, error: action.payload, data: [] }
        default:
            return state;
    }
}

export default reducer