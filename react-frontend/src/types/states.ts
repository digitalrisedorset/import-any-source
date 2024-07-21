
export enum APP_STATE {
    pimComplete = 'pim_attribute_imported',
    magentoComplete = 'magento_attribute_imported',
    mappingComplete = 'mapping_attribute_imported'
}

export const AllSteps = [APP_STATE.pimComplete, APP_STATE.magentoComplete, APP_STATE.mappingComplete]

export interface PimImportState {
    name: string,
    active: boolean,
    pimAttributes: number,
    magentoMapping?: number,
    remainingMapping?: number
}

export interface PimImportStateData {
    pimImportState: PimImportState[]
}

export interface MagentoImportStateData {
    magentoAttributes: number
}

export const defaultImportState = {
    name: '',
    active: false,
    pimAttributes: 0,
    magentoMapping: 0,
    remainingMapping: 0
}