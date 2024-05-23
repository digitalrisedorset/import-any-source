
export interface RemoteMagentoAttribute {
    code: string,
    label: string,
    frontend_input: string
    is_required: boolean
}

export interface MagentoAttributeData {
    attributesList: RemoteMagentoAttribute[]
}