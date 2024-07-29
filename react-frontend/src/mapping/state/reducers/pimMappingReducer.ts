import {MagentoAttribute, MatchingAttributeData } from "../../../types/keystone";
import { PimAttributesMappingActionType} from "../../../state/action-types";
import {PimAttributesMappingActionList} from "../../../state/actions";

interface PimAttributesMappingState {
    loading: boolean;
    error: string | null;
    pimAttribute: string | null,
    magentoMatchAttributes: MatchingAttributeData[],
    magentoMatch: MagentoAttribute | null
}

const initialState = {
    loading: false,
    error: null,
    pimAttribute: null,
    magentoMatchAttributes: [],
    magentoMatch: null
}

const reducer = (
    state: PimAttributesMappingState = initialState,
    action: PimAttributesMappingActionList
): PimAttributesMappingState => {
    switch (action.type) {
        case PimAttributesMappingActionType.PIM_ATTRIBUTES_MATCH_SEARCH_COMPLETE:
            return { loading: true, error: null, pimAttribute: action.pimAttributeCode, magentoMatchAttributes: action.magentoMatchesAttributes, magentoMatch: null}
        case PimAttributesMappingActionType.PIM_ATTRIBUTES_MAPPING_SET:
            return { loading: true, error: null, pimAttribute: action.pimAttributeCode, magentoMatchAttributes: [], magentoMatch: action.magentoMatch}
        case PimAttributesMappingActionType.PIM_ATTRIBUTES_MAPPING_ERROR:
            return { loading: false, error: action.payload, pimAttribute: '', magentoMatchAttributes: [], magentoMatch: null }
        default:
            return state;
    }
}

export default reducer