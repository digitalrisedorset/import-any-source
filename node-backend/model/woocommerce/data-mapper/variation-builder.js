class WoocommerceDataBuilder {
    // sku=MH01-XS-Black,size=XS,color=Black|sku=MH01-XS-Gray,size=XS,color=Gray
    getVariation = function(value) {
        if (!value || value.length === 0) {
            return ''
        }


        let configurableVariation = ''
        value.reduce((prev, simpleProduct) => {
            if (configurableVariation!== '') configurableVariation += '|'
            const attributeVariations = this.getAttributes(simpleProduct['attributes'])
            configurableVariation += `sku=${simpleProduct['sku']},${attributeVariations}`
        }, configurableVariation)

        return configurableVariation
    }

    getAttributes = function(value) {
        let attributeVariation = ''
        value.reduce((prev, attribute) => {
            if (attributeVariation!== '') attributeVariation += '&'
            attributeVariation += `${attribute['slug']}=${attribute['option']}`
        }, attributeVariation)

        return attributeVariation
    }
}

module.exports = WoocommerceDataBuilder;