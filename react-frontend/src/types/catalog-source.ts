export interface CatalogSourceAttribute {
    readonly code: string;
    readonly name: string;
    readonly type: string;
}

export interface CatalogSourceProduct {
    readonly id: number
    readonly sku: string
    readonly name: string
    readonly description: string
    readonly status: string
    readonly price: number,
    images: [{
        src: string
    }],
    import_status: PRODUCT_STATUS
}

export interface DeletedCatalogSourceProduct {
    readonly sku: string
    import_status: string
}

export interface CatalogSourceApiResponse {
    data: CatalogSourceProduct[]
}

export interface DownlinkFile {
    filename: string,
    fileurl: string
}

export interface ImportResponse extends DownlinkFile {
    rows: CatalogSourceProduct[]
}

export interface ImportUpdateResponse extends DownlinkFile {
    filename: string,
    fileurl: string,
    numberItem?: number,
    rows: CatalogSourceProduct[]
}

export enum CATALOG_SOURCE_SYSTEM {
    woocommerce = 'Woocommerce',
    plant = 'Plant System',
    book = 'Book Feed'
}

export type PRODUCT_STATUS = 'valid' | 'not_needed' | 'updated' | 'deleted' | (string & {})

export type IMPORT_STATUS = 'loaded' | 'validated' | 'ready' | 'update_received' | 'delete_received' | (string & {})