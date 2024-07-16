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

export interface Attribute {
    code: string
    name: string
    type: string
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

export enum MagentoProductFieldCase {
    store_view_code = 'store_view_code',
    attribute_set_code = 'attribute_set_code',
    product_type = 'product_type',
    product_websites = 'product_websites',
    status = 'status', // status
    visibility = 'visibility', // visibility
    configurable_variations = 'configurable_variations',
    image = 'image'
}

export type FieldValue = string | boolean | null | number[] | number | ProductImage | ProductImage[] | undefined;

export type InitialProductData = {
    [Key in string]: FieldValue;
};

export type ApiFilter = any //{
    //[Key in string]: FieldValue;
//}

export interface ImportMappingFields {
    mapping: ImportMapping[]
}

export interface ImportMapping {
    woocommerceFieldCode: string,
    magentoLinkedCode: string
}

export type HeaderField = {
    id: string,
    title: string
}