import {PimImportAttributeState} from "../../../types/states";
import {PimAttributesActionType} from "../action-types/PimAttributesAction";

interface SetAttributeImportAction {
    type: PimAttributesActionType.SET_PIM_ATTRIBUTES_IMPORT,
    pimImportState: PimImportAttributeState
}

interface SetAttributeActiveAction {
    type: PimAttributesActionType.SET_PIM_ATTRIBUTES_ACTIVE,
    pimSystemCode: string
}

interface SetAttributeMappedAction {
    type: PimAttributesActionType.SET_PIM_ATTRIBUTE_MAPPED,
    pimSystemCode: string
}

interface SetAttributeIgnoredAction {
    type: PimAttributesActionType.SET_PIM_ATTRIBUTE_IGNORED,
    pimSystemCode: string
}

interface SetAttributeActivatedAction {
    type: PimAttributesActionType.SET_PIM_ATTRIBUTE_ACTIVATED,
    pimSystemCode: string
}

export type SetPimAttributeActionList = SetAttributeImportAction | SetAttributeActiveAction | SetAttributeMappedAction | SetAttributeIgnoredAction | SetAttributeActivatedAction