import { DeletedCatalogSourceProduct, IMPORT_STATUS, CatalogSourceProduct } from "./catalog-source";

export interface CatalogSourceState {
    name: string,
    active: boolean,
    numberCatalogSourceAttributes: number,
    magentoMapping: number
    ignoredAttributes: number
}

export interface AccessState {
    canCreateProducts: boolean,
    canUpdateProducts: boolean,
    canDeleteProducts: boolean,
    canImportSourceAttribute: boolean,
    canImportMagentoAttribute: boolean,
    canMapAttribute: boolean,
    canImportProduct: boolean,
    canMonitorData: boolean,
    canSetupImport: boolean
}

export interface CatalogSourceImportAttributeState {
    name: string,
    numberCatalogSourceAttributes: number,
    ignoredAttributes: number
}

export interface CatalogSourceStateData {
    catalogSourceImportState: CatalogSourceState[]
}

export interface MagentoImportStateData {
    magentoAttributes: number
}

export const defaultImportState: CatalogSourceState = {
    name: '',
    active: false,
    numberCatalogSourceAttributes: 0,
    magentoMapping: 0,
    ignoredAttributes: 0
}

export interface CatalogSourceImportProductState {
    importMonitored: boolean,
    importStatus: IMPORT_STATUS,
    catalogSourceProductHeader: string[],
    catalogSourceProducts: CatalogSourceProduct[],
    catalogSourceDeletedProducts: DeletedCatalogSourceProduct[]
}

export interface ProductMonitoringInfo {
    deleteMonitoring: boolean,
    updateMonitoring: boolean
}

export type MONITORING_FLAG = deleteMonitoring | updateMonitoring | (string & {})