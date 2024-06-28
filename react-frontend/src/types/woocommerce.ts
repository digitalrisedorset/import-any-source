import exp from "node:constants";

interface RemoteWoocommerceAttribute {
    code: string;
    name: string;
    type: string;
}
export interface WocommerceApiAttributeResponse {
    data: RemoteWoocommerceAttribute[]
}


export interface RemoteWoocommerceProduct {
    name: string
    description: string
    status: string
    price: number,
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
    numberUpdate?: number
}