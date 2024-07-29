import { MatchingAttributeData, MagentoAttribute } from "../../../types/keystone"
import {PimAttributesMappingActionType} from "../action-types/PimAttributesAction";

interface PimAttributesMatchSearchCompleteAction {
    type: PimAttributesMappingActionType.PIM_ATTRIBUTES_MATCH_SEARCH_COMPLETE,
    pimAttributeCode: string,
    magentoMatchesAttributes: MatchingAttributeData[]
}

interface PimAttributesMappingSetAction {
    type: PimAttributesMappingActionType.PIM_ATTRIBUTES_MAPPING_SET,
    pimAttributeCode: string,
    magentoMatch: MagentoAttribute
}

interface PimAttributesMappingErrorAction {
    type: PimAttributesMappingActionType.PIM_ATTRIBUTES_MAPPING_ERROR,
    payload: string
}

export type PimAttributesMappingActionList = PimAttributesMatchSearchCompleteAction | PimAttributesMappingSetAction | PimAttributesMappingErrorAction
