
export type HeaderField = {
    id: string,
    title: string
}

export interface ImportMapping {
    pimFieldCode: string,
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

export type MinimalProduct = {
    id: number,
    sku: string
}

export type CachedProduct = {
    productId: number,
    sku: string
}

export type CachedDeletedProduct = {
    productId: number,
    sku: string,
    date: string
}

export type DeleteRowProduct = {
    sku: string,
    status: 'delete'
}