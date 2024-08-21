
export type HeaderField = {
    id: string,
    title: string
}

export interface ImportMapping {
    catalogSourceFieldCode: string,
    magentoLinkedCode: string
}

export interface ImportMappingFields {
    mapping: ImportMapping[]
}

export interface Attribute {
    code: string
    name: string
    type: string
}

export interface SearchFilter {
    per_page: string,
    page: string
}

export type DeleteProduct = {
    id: number,
    sku: string
}

export type ProductStatusRequest = {
    sku: string,
    import_status: string
}

export type CachedProduct = {
    productId: number,
    sku: string,
    import_status: string
}

export type CachedDeletedProduct = {
    productId: number,
    sku: string,
    date: string
}