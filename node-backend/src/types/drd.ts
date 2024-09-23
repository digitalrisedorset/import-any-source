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

export interface DrdProduct extends DrdSimpleProduct {
    image: ProductImage,
    variations: number[]
}

export interface DrdAttribute {
    slug: string
    option: string
    name: string
}

export interface DrdSimpleProduct {
    id: number;
    sku: string;
    name: string;
    slug?: string;
    description: string;
    short_description?: string;
    price: number;
    qty?: number;
    images: ProductImage[]
    status: ProductStatus;
    attributes: []
}

export type DrdProductFieldCase = 'product_online' | 'status' | 'visibility' | 'variations' | (string & {})

export type ApiFilter = any

export type FieldValue = string | boolean | null | number[] | number | ProductImage | ProductImage[] | undefined;

export type InitialProductData = {
    [k:string]: FieldValue;
};


