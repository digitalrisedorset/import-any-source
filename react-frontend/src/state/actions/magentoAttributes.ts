interface MagentoAttributesLoadAction {
    type: 'magento_attributes_load'
}

interface MagentoAttributesLoadActionSuccessAction {
    type: 'magento_attributes_load_success',
    payload: any //MagentoAttribute[]
}

interface MagentoAttributesLoadActionErrorAction {
    type: 'magento_attributes_load_error',
    payload: string
}

export type MagentoAttributesLoadActionList = MagentoAttributesLoadAction | MagentoAttributesLoadActionSuccessAction | MagentoAttributesLoadActionErrorAction
