const WoocommerceVariationBuilder = require('./data-mapper/variation-builder')

class WoocommerceDataMapper {
    mappingFields =[]
    woocommerceVariationBuilder = new WoocommerceVariationBuilder;

    setMappingFields = function(mappingFields) {
        this.mappingFields = mappingFields;
    }

    getMagentoField = function(key)
    {
        const mapping = this.mappingFields.mapping.filter(mapping => mapping.woocommerceFieldCode === key);
        if (mapping.length>0) {
            return mapping[0].magentoLinkedCode;
        }
    }

    getMagentoValue = function(value, magentoField)
    {
        switch(magentoField) {
            case 'product_online': // status
            case 'status': // product_online
                return (value === 'publish')?'1':'0'
            case 'visibility':  // visibility
                return (value === 'visible')?'Catalog, Search':'Not Visible Individually'
            case 'configurable_variations':  // variations
                return this.woocommerceVariationBuilder.getVariation(value)
            default:
                return value;
        }
    }

    getKeystoneField = function(value, magentoField)
    {
        switch(magentoField) {
            case 'product_online': // status
            case 'status': // product_online
                return (value === 'publish')?'1':'0'
            case 'visibility':  // visibility
                return (value === 'visible')?'Catalog, Search':'Not Visible Individually'
            default:
                return value;
        }
    }
}

module.exports = WoocommerceDataMapper;