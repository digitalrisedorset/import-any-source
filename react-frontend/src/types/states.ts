
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
    magentoMapping: number
    ignoredAttributes: number
}

export interface AccessState {
    canCreateProducts: boolean,
    canUpdateProducts: boolean,
    canDeleteProducts: boolean,
    canImportPIMAttribute: boolean,
    canImportMagentoAttribute: boolean,
    canMapAttribute: boolean,
    canImportProduct: boolean,
    canMonitorData: boolean,
    canSetupImport: boolean
}

export interface PimImportAttributeState {
    name: string,
    pimAttributes: number,
    ignoredAttributes: number
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
    ignoredAttributes: 0
}

export interface PimImportProductState {
    name: string,
    pimProducts: number
}