interface MagentoCode {
    code: string;
    name: string;
}

export interface WoocommerceAttribute {
    id?: string;
    code: string;
    name: string;
    type: string;
    required: boolean;
    createdAt: string;
    magentoCode: MagentoCode
}

export interface WoocommerceAttributeData {
    woocommerceAttributes: WoocommerceAttribute[]
}

export interface MagentoAttribute {
    id?: string;
    code: string;
    name: string;
    type: string;
    required: boolean;
    createdAt: string;
    assignedTo: AssignedToData
}

export interface AssignedToData {
    code: string;
    name: string;
}

export interface KeystoneMagentoAttributeData {
    magentoAttributes: MagentoAttribute[]
}

export interface MatchingAttributeData {
    label: string,
    value: string
}

export interface Mapping {
    woocommerceAttribute: WoocommerceAttribute;
    matchingAttributes: MagentoAttribute[]
}

export interface KeystoneAttribute {
    code: string;
    name: string;
    type: string;
    required: boolean
}

export interface RemoteAttributesToCreate {
    attributesToCreate: KeystoneAttribute[]
}