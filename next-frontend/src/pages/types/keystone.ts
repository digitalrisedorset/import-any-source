import {QueryResult} from "@apollo/client";
import {CATALOG_SOURCE_SYSTEM} from "./catalog-source";
import {AccessState} from "@/pages/types/states";

interface BaseAttribute {
    readonly id?: string;
    readonly code: string;
    readonly name: string;
    readonly type: string;
    required: boolean;
    readonly createdAt: string;
}

export type MagentoCode = Pick<BaseAttribute, "code" | "name">

export type AssignedToData = Pick<BaseAttribute, "code" | "name">

export type KeystoneAttribute = Pick<BaseAttribute, "code" | "name" | "type" | "required">

export interface KeystoneCatalogSourceAttribute extends BaseAttribute {
    ignored: boolean;
    magentoCode: MagentoCode
    catalogSource: keyof CATALOG_SOURCE_SYSTEM
}

export interface MagentoAttribute extends BaseAttribute {
    assignedTo: AssignedToData[]
}

export interface CatalogSourceAttributeData {
    catalogSourceAttributes: KeystoneCatalogSourceAttribute[]
}

export interface KeystoneMagentoAttributeData {
    magentoAttributes: MagentoAttribute[]
}

export interface MatchingAttributeData {
    readonly label: string,
    readonly value: string
}

export type PRODUCT_STATUS = 'AVAILABLE' | 'UNAVAILABLE' | 'DELETED' | (string & {});

export interface KeystoneProduct {
    name: string;
    description: string;
    photo: { create: { image: Promise<File>, altText: string } }
    status: PRODUCT_STATUS;
}

export interface RemoteProductsToCreate {
    productsToCreate: KeystoneProduct[]
}

export interface CatalogSourceQueryResult extends QueryResult {
    catalogSourceAttributes: KeystoneCatalogSourceAttribute[]
}

export interface UserDetailsData {
    id: string;
    email: string;
    name: string;
    theme: string;
    role: AccessState
}