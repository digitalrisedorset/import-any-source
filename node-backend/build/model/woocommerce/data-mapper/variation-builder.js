"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WoocommerceVariationBuilder = void 0;
class WoocommerceVariationBuilder {
    constructor() {
        // sku=MH01-XS-Black,size=XS,color=Black|sku=MH01-XS-Gray,size=XS,color=Gray
        this.getVariation = (value) => {
            if (!value || value.length === 0) {
                return '';
            }
            let configurableVariation = '';
            value.reduce((prev, simpleProduct) => {
                if (configurableVariation !== '')
                    configurableVariation += '|';
                const attributeVariations = this.getAttributes(simpleProduct['attributes']);
                configurableVariation += `sku=${simpleProduct['sku']},${attributeVariations}`;
            }, configurableVariation);
            return configurableVariation;
        };
        this.getAttributes = (value) => {
            let attributeVariation = '';
            value.reduce((prev, attribute) => {
                if (attributeVariation !== '')
                    attributeVariation += '&';
                attributeVariation += `${attribute['slug']}=${attribute['option']}`;
            }, attributeVariation);
            return attributeVariation;
        };
    }
}
exports.WoocommerceVariationBuilder = WoocommerceVariationBuilder;
