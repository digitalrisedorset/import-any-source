
export enum APP_STATE {
    pimComplete = 'pim_attribute_imported',
    magentoComplete = 'magento_attribute_imported',
    mappingComplete = 'mapping_attribute_imported'
}

export const AllSteps = [APP_STATE.pimComplete, APP_STATE.magentoComplete, APP_STATE.mappingComplete]

