"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WoocommerceDataMapper = void 0;
const variation_builder_1 = require("./data-mapper/variation-builder");
const types_1 = require("../../types");
class WoocommerceDataMapper {
    constructor() {
        this.mappingFields = { 'mapping': [] };
        this.woocommerceVariationBuilder = new variation_builder_1.WoocommerceVariationBuilder;
        this.setMappingFields = (mappingFields) => {
            this.mappingFields = mappingFields;
        };
        this.getMagentoField = (key) => {
            var _a;
            const mapping = this.mappingFields.mapping.filter(mapping => mapping.woocommerceFieldCode === key);
            if (mapping.length > 0) {
                return (_a = mapping[0]) === null || _a === void 0 ? void 0 : _a.magentoLinkedCode;
            }
        };
        this.getMagentoValue = (item, key, magentoField) => {
            let value = item[key];
            switch (magentoField) {
                //case MagentoProductFieldCase.active: // status
                case types_1.MagentoProductFieldCase.status: // product_online
                    return (value === 'publish') ? '1' : '0';
                case types_1.MagentoProductFieldCase.visibility: // visibility
                    return (value === 'visible') ? 'Catalog, Search' : 'Not Visible Individually';
                case types_1.MagentoProductFieldCase.configurable_variations: // variations
                    if (value.length > 0) {
                        debugger;
                        value = item['variations_for_csv'];
                        return this.woocommerceVariationBuilder.getVariation(value);
                    }
                default:
                    return value;
            }
        };
        this.getKeystoneField = (value, woocommerceField) => {
            switch (woocommerceField) {
                case types_1.WoocommerceProductFieldCase.active: // status
                case types_1.WoocommerceProductFieldCase.status: // product_online
                    return (value === 'publish') ? '1' : '0';
                case types_1.WoocommerceProductFieldCase.visibility: // visibility
                    return (value === 'visible') ? 'Catalog, Search' : 'Not Visible Individually';
                default:
                    return value;
            }
        };
    }
}
exports.WoocommerceDataMapper = WoocommerceDataMapper;
