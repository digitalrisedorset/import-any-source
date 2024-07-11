import exp from "node:constants";

interface RemoteWoocommerceAttribute {
    readonly code: string;
    readonly name: string;
    readonly type: string;
}
export interface WocommerceApiAttributeResponse {
    data: RemoteWoocommerceAttribute[]
}


export interface RemoteWoocommerceProduct {
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

export interface WocommerceApiProducteResponse {
    data: RemoteWoocommerceProduct[]
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