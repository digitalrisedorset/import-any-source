import {PimImportState} from "../../types/states";

interface SetAttributeImportAction {
    type: 'set_pim_attributes_import',
    pimImportState: PimImportState
}

interface SetAttributeActiveAction {
    type: 'set_pim_attributes_active',
    pimSystemCode: string
}

export type SetPimAttributeActionList = SetAttributeImportAction | SetAttributeActiveAction