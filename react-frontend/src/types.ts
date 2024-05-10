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
    required: boolean
}

export interface MagentoAttributeData {
    woocommerceAttributes: MagentoAttribute[]
}