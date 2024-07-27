import {PimImportAttributeState} from "../../types/states";

interface SetAttributeImportAction {
    type: 'set_pim_attributes_import',
    pimImportState: PimImportAttributeState
}

interface SetAttributeActiveAction {
    type: 'set_pim_attributes_active',
    pimSystemCode: string
}

interface SetAttributeMappedAction {
    type: 'set_pim_attribute_mapped',
    pimSystemCode: string
}

interface SetAttributeIgnoredAction {
    type: 'set_pim_attribute_ignored',
    pimSystemCode: string
}

interface SetAttributeActivatedAction {
    type: 'set_pim_attribute_activated',
    pimSystemCode: string
}

export type SetPimAttributeActionList = SetAttributeImportAction | SetAttributeActiveAction | SetAttributeMappedAction | SetAttributeIgnoredAction | SetAttributeActivatedAction