let WoocommerceDataMapper = function() {}

WoocommerceDataMapper.prototype.setMappingFields = function(mappingFields)
{
    this.mappingFields = mappingFields;
}

WoocommerceDataMapper.prototype.getMagentoField = function(key)
{
    const mapping = this.mappingFields.mapping.filter(mapping => mapping.woocommerceFieldCode === key);
    if (mapping.length>0) {
      return mapping[0].magentoLinkedCode;
    }    
}

module.exports = WoocommerceDataMapper;