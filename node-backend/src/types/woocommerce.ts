export enum ProductStatus {
    publish = 'publish',
    draft = 'draft',
    pending = 'pending',
    private = 'private'
}

export type VariationAttribute = {
    name: string,
    slug: string,
    variation: boolean,
    option: string
}

export interface WoocommerceAttribute {
    slug: string
    option: string
    name: string
}

export interface ProductImage {
    name: string;
    src: string
}

export interface WoocommerceProduct extends WoocommerceSimpleProduct {
    image: ProductImage,
    variations: number[]
}

export interface WoocommerceAttribute {
    slug: string
    option: string
    name: string
}

export interface WoocommerceAttribute {
    slug: string
    option: string
    name: string
}

export interface WoocommerceSimpleProduct {
    id: number;
    sku: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    images: ProductImage[]
    status: ProductStatus;
    attributes: []
}

export type WoocommerceDeleteRecord = Pick<WoocommerceSimpleProduct, "sku" | "status">

export enum WoocommerceProductFieldCase {
    active = 'product_online', // product_online
    status = 'status', // status
    visibility = 'visibility', // visibility
    variations = 'variations' // 'configurable_variations',  // variations
}

export type ApiFilter = any

export type FieldValue = string | boolean | null | number[] | number | ProductImage | ProductImage[] | undefined;

export type InitialProductData = {
    [Key in string]: FieldValue;
};

