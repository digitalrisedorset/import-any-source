import { MatchingAttributeData, MagentoAttribute } from "../../types/keystone"

interface PimAttributesMappingAction {
    type: 'pim_attributes_mapping'
}

interface PimAttributesMatchSearchCompleteAction {
    type: 'pim_attributes_match_search_complete',
    pimAttributeCode: string,
    magentoMatchesAttributes: MatchingAttributeData[]
}

interface PimAttributesMappingSetAction {
    type: 'pim_attributes_mapping_set',
    pimAttributeCode: string,
    magentoMatch: MagentoAttribute
}

interface PimAttributesMappingErrorAction {
    type: 'pim_attributes_mapping_error',
    payload: string
}

export type PimAttributesMappingActionList = PimAttributesMappingAction | PimAttributesMatchSearchCompleteAction | PimAttributesMappingSetAction | PimAttributesMappingErrorAction
