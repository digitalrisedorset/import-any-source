interface MagentoCode {
    code: string;
    name: string;
}

export interface WoocommerceAttribute {
    id?: string;
    code: string;
    name: string;
    type: string;
    required: boolean;
    ignored: boolean;
    createdAt: string;
    magentoCode: MagentoCode
}

export interface WoocommerceAttributeData {
    woocommerceAttributes: WoocommerceAttribute[]
}

export interface MagentoAttribute {
    id?: string;
    code: string;
    name: string;
    type: string;
    required: boolean;
    createdAt: string;
    assignedTo: AssignedToData
}

export interface AssignedToData {
    code: string;
    name: string;
}

export interface KeystoneMagentoAttributeData {
    magentoAttributes: MagentoAttribute[]
}

export interface MatchingAttributeData {
    label: string,
    value: string
}

export interface Mapping {
    woocommerceAttribute: WoocommerceAttribute;
    matchingAttributes: MagentoAttribute[]
}

export interface KeystoneAttribute {
    code: string;
    name: string;
    type: string;
    required: boolean
}

export interface RemoteAttributesToCreate {
    attributesToCreate: KeystoneAttribute[]
}

export enum PRODUCT_STATUS {
    publish = 'AVAILABLE',
    unavailable = 'UNAVAILABLE'
}

export interface KeystoneProduct {
    name: string;
    description: string;
    photo: { create: { image: Promise<File>, altText: string } }
    status: PRODUCT_STATUS;
}

interface ImageData {
    image: {
        publicUrl: string
    }
}

export interface WoocommerceProduct {
    name: string;
    description: string;
    price: number;
    photo: ImageData;
    status: PRODUCT_STATUS;
}

export interface RemoteProductsToCreate {
    productsToCreate: KeystoneProduct[]
}