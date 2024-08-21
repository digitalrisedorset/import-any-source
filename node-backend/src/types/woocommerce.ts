export type ProductStatus = 'publish' | 'draft' | 'pending' | 'private' | (string & {})

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

export interface WoocommerceProduct extends WoocommerceSimpleProduct {
    image: ProductImage,
    variations: number[]
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

export type WoocommerceProductFieldCase = 'product_online' | 'status' | 'visibility' | 'variations' | (string & {})

export type ApiFilter = any

export type FieldValue = string | boolean | null | number[] | number | ProductImage | ProductImage[] | undefined;

export type InitialProductData = {
    [k:string]: FieldValue;
};


