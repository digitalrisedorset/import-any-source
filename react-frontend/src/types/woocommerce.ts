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