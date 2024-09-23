import {DrdAttribute, DrdSimpleProduct} from '../../../types/drd'

export class DrdVariationBuilder {
    // sku=MH01-XS-Black,size=XS,color=Black|sku=MH01-XS-Gray,size=XS,color=Gray
    getVariation = (value: Readonly<DrdSimpleProduct[]>) => {
        if (!value || value.length === 0) {
            return ''
        }

        let configurableVariation = ''
        value.reduce((prev: any, simpleProduct: Readonly<DrdSimpleProduct>): any => {
            if (configurableVariation!== '') configurableVariation += '|'
            const attributeVariations = this.getAttributes(simpleProduct['attributes'])
            configurableVariation += `sku=${simpleProduct['sku']},${attributeVariations}`
        }, configurableVariation)

        return configurableVariation
    }

    getAttributes = (value: Readonly<DrdAttribute[]>) => {
        let attributeVariation = ''
        value.reduce((prev: any, attribute: DrdAttribute): any => {
            if (attributeVariation!== '') attributeVariation += '&'
            attributeVariation += `${attribute['slug']}=${attribute['option']}`
        }, attributeVariation)

        return attributeVariation
    }
}