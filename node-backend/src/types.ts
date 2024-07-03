export enum ProductStatus {
    publish = 'publish',
    draft = 'draft',
    pending = 'pending',
    private = 'private'
}

export type CsvHeader = {

}

export type VariationAttribute = {
    name: string,
    slug: string,
    variation: boolean,
    option: string
}

export interface ProductImage {
    name: string;
    src: string
}

export type validWoocommerceProductKeys = 'id' | 'slug' | 'sku' | 'name' | 'date_created_gmt' | 'date_modified_gmt' | 'description' |
    'product_online' | 'visibility' |
    'price' | 'sale_price' | 'short_description' | 'attributes' | 'images' | 'date_on_sale_from_gmt' | 'date_on_sale_to_gmt' |
    'stock_quantity' | 'regular_price' | 'low_stock_amount' | 'tax_status' | 'tax_class' | 'weight' | 'manage_stock' | 'type' |
    'cross_sell_ids' | 'dimensions' | 'status' | 'parent_id' | 'categories' | 'catalog_visibility' | 'variations' | 'related_ids' | 'meta_data'

export type WoocommerceProductType = string | number | ProductStatus | number[] | ProductImage[]

export type validMagentoProductKeys = 'name' |  'description' | 'short_description' | 'price' | 
    'special_price' | 'special_from_date' | 'special_to_date' | 'cost' | 
    'weight' | 'manufacturer' | 'meta_title' | 'meta_keyword' | 'meta_description' | 
    'image' | 'small_image' | 'thumbnail' | 'tier_price' | 'color' | 'news_from_date' | 'news_to_date' | 
    'status' | 'visibility' | 'quantity_and_stock_status' | 'url_key' | 'tax_class_id' | 'activity' | 'style_bags' |
    'material' | 'configurable_variations'

export interface WoocommerceProduct extends WoocommerceSimpleProduct {
    id: number;
    sku: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    images: ProductImage[],
    image: ProductImage,
    status: ProductStatus;
    attributes: []
    variations: number[]
}

export interface WoocommerceDeleteRecord {
    sku: string;
    status: string;
}

export interface CacheProduct {
    productId: number;
    sku: string
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

export interface WoocommerceAttribute {
    slug: string
    option: string
}

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