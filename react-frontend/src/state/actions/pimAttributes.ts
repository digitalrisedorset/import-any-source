interface PimAttributesLoadAction {
    type: 'pim_attributes_load'
}

interface PimAttributesLoadActionSuccessAction {
    type: 'pim_attributes_load_success',
    payload: any //PimAttribute[]
}

interface PimAttributesLoadActionErrorAction {
    type: 'pim_attributes_load_error',
    payload: string
}

export type PimAttributesLoadActionList = PimAttributesLoadAction | PimAttributesLoadActionSuccessAction | PimAttributesLoadActionErrorAction


interface PimAttributesImportAction {
    type: 'pim_attributes_import'
}

interface PimAttributesImportActionSuccessAction {
    type: 'pim_attributes_import_success',
    payload: any //PimAttribute[]
}

interface PimAttributesImportActionErrorAction {
    type: 'pim_attributes_import_error',
    payload: string
}

export type PimAttributesImportActionList = PimAttributesImportAction | PimAttributesImportActionSuccessAction | PimAttributesImportActionErrorAction
