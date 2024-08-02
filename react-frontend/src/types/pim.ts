export interface RemotePimAttribute {
    readonly code: string;
    readonly name: string;
    readonly type: string;
}

export interface RemotePimProduct {
    readonly id: number
    readonly sku: string
    readonly name: string
    readonly description: string
    readonly status: string
    readonly price: number,
    images: [{
        src: string
    }],
    import_status: string
}

export interface DeletedPimProduct {
    readonly sku: string
    import_status: string
}

export interface PimApiProducteResponse {
    data: RemotePimProduct[]
}

export interface DownlinkFile {
    filename: string,
    fileurl: string
}

export interface ImportResponse extends DownlinkFile {
    rows: RemotePimProduct[]
}

export interface ImportUpdateResponse extends DownlinkFile {
    filename: string,
    fileurl: string,
    numberItem?: number,
    rows: RemotePimProduct[]
}

export enum PIM_SYSTEM {
    woocommerce = 'Woocommerce',
    plant = 'Plant System',
    book = 'Book Feed'
}

export const UPDATE_NOTIFICATION_TYPE = 'update'
export const DELETE_NOTIFICATION_TYPE = 'delete'


export const PRODUCT_READY = 'valid'
export const PRODUCT_EXIST = 'not_needed'

export const PRODUCT_UPDATE = 'updated'

export const PRODUCT_DELETED = 'deleted'

export type PimSystemTypes = PIM_SYSTEM.woocommerce | PIM_SYSTEM.plant | PIM_SYSTEM.book

export const IMPORT_LOADED = 'loaded'

export const IMPORT_VALIDATED = 'validated'

export const IMPORT_READY = 'ready'

export const IMPORT_UPDATE_RECEIVED = 'update_received'

export const IMPORT_DELETE_RECEIVED = 'delete_received'