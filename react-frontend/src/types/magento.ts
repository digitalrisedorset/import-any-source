
export interface RemoteMagentoAttribute {
    readonly code: string,
    readonly label: string,
    readonly frontend_input: string
    is_required: boolean
}

export interface MagentoAttributeData {
    attributesList: RemoteMagentoAttribute[]
}