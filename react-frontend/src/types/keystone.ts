import {QueryResult} from "@apollo/client";

interface MagentoCode {
    readonly code: string;
    readonly name: string;
}

export interface WoocommerceAttribute {
    readonly id?: string;
    readonly code: string;
    readonly name: string;
    readonly type: string;
    required: boolean;
    ignored: boolean;
    readonly createdAt: string;
    magentoCode: MagentoCode
}

export interface WoocommerceAttributeData {
    woocommerceAttributes: WoocommerceAttribute[]
}

export interface MagentoAttribute {
    readonly id?: string;
    readonly code: string;
    readonly name: string;
    readonly type: string;
    required: boolean;
    readonly createdAt: string;
    assignedTo: AssignedToData
}

export interface AssignedToData {
    code: string;
    name: string;
}

export interface KeystoneMagentoAttributeData {
    magentoAttributes: MagentoAttribute[]
}

export interface KeystoneWoocommerceAttributeData {
    woocommerceAttributes: WoocommerceAttribute[]
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
    readonly code: string;
    readonly name: string;
    readonly type: string;
    required: boolean
}

export interface RemoteAttributesToCreate {
    attributesToCreate: KeystoneAttribute[]
}

export enum PRODUCT_STATUS {
    publish = 'AVAILABLE',
    unavailable = 'UNAVAILABLE',
    deleted = 'DELETED'
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

export interface WoocommerceQueryResult extends QueryResult {
    woocommerceAttributes: WoocommerceAttribute[]
}

export interface WoocommerceAttributeProps {
    data: WoocommerceAttributeData | undefined
}

export interface MagentoAttributeProps {
    data: KeystoneMagentoAttributeData | undefined
}

export interface MappingAttributeProps {
    data: WoocommerceAttributeData | undefined
}