import { DeletedPimProduct, IMPORT_STATUS, RemotePimProduct } from "./pim";

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
    importMonitored: boolean,
    importStatus: IMPORT_STATUS,
    pimProductHeader: string[],
    pimProducts: RemotePimProduct[],
    pimDeletedProducts: DeletedPimProduct[]
}