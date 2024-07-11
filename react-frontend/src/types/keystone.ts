import {QueryResult} from "@apollo/client";

interface MagentoCode {
    readonly code: string;
    readonly name: string;
}

interface BaseAttribute {
    readonly id?: string;
    readonly code: string;
    readonly name: string;
    readonly type: string;
    required: boolean;
    readonly createdAt: string;
}

export type KeystoneAttribute = Pick<BaseAttribute, "code" | "name" | "type" | "required">

export interface WoocommerceAttribute extends BaseAttribute {
    ignored: boolean;
    magentoCode: MagentoCode
}

export interface WoocommerceAttributeData {
    woocommerceAttributes: WoocommerceAttribute[]
}

export interface MagentoAttribute extends BaseAttribute {
    assignedTo: AssignedToData
}

export interface AssignedToData {
    readonly code: string;
    readonly name: string;
}

export interface KeystoneMagentoAttributeData {
    magentoAttributes: MagentoAttribute[]
}

export interface KeystoneWoocommerceAttributeData {
    woocommerceAttributes: WoocommerceAttribute[]
}

export interface MatchingAttributeData {
    readonly label: string,
    readonly value: string
}

export interface Mapping {
    woocommerceAttribute: WoocommerceAttribute;
    matchingAttributes: MagentoAttribute[]
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

export interface RemoteProductsToCreate {
    productsToCreate: KeystoneProduct[]
}

export interface WoocommerceQueryResult extends QueryResult {
    woocommerceAttributes: WoocommerceAttribute[]
}

export interface WoocommerceAttributeProps {
    data: WoocommerceAttributeData | undefined
    loading?: boolean
}