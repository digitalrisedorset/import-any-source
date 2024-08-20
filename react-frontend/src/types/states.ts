import { DeletedCatalogSourceProduct, IMPORT_STATUS, CatalogSourceProduct } from "./catalog-source";

export interface CatalogSourceState {
    name: string,
    active: boolean,
    catalogSourceAttributes: number,
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
    catalogSourceAttributes: number,
    ignoredAttributes: number
}

export interface CatalogSourceStateData {
    catalogSourceImportState: CatalogSourceState[]
}

export interface MagentoImportStateData {
    magentoAttributes: number
}

export const defaultImportState = {
    name: '',
    active: false,
    catalogSourceAttributes: 0,
    magentoMapping: 0,
    ignoredAttributes: 0
}

export interface CatalogSourceImportProductState {
    importMonitored: boolean,
    importStatus: IMPORT_STATUS,
    catalogSourceProductHeader: string[],
    catalogSourceProducts: CatalogSourceProduct[],
    CatalogSourceDeletedProducts: DeletedCatalogSourceProduct[]
}