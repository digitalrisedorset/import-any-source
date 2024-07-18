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
    }]
}

export interface PimApiProducteResponse {
    data: RemotePimProduct[]
}

export interface DownlinkFile {
    filename: string,
    fileurl: string
}

export interface ImportResponse extends DownlinkFile {
}

export interface ImportUpdateResponse extends DownlinkFile {
    filename: string,
    fileurl: string,
    numberItem?: number
}

export enum PIM_SYSTEM {
    woocommerce = 'Woocommerce',
    plant = 'Plant System'
}

export type PimSystemTypes = PIM_SYSTEM.woocommerce | PIM_SYSTEM.plant