
export enum APP_STATE {
    woocommerceComplete = 'woocommerce_attribute_imported',
    magentoComplete = 'magento_attribute_imported',
    mappingComplete = 'mapping_attribute_imported'
}

export const AllSteps = [APP_STATE.woocommerceComplete, APP_STATE.magentoComplete, APP_STATE.mappingComplete]

