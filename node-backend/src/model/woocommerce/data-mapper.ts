import { WoocommerceVariationBuilder } from './data-mapper/variation-builder'
import {
    WoocommerceProductFieldCase,
    FieldValue,
    ImportMappingFields,
    validWoocommerceProductKeys,
    MagentoProductFieldCase,
    validMagentoProductKeys,
    WoocommerceSimpleProduct,
    WoocommerceProduct
} from '../../types'

export class WoocommerceDataMapper {
    mappingFields: ImportMappingFields = {'mapping': []}
    woocommerceVariationBuilder = new WoocommerceVariationBuilder;

    setMappingFields = (mappingFields: ImportMappingFields) => {
        this.mappingFields = mappingFields;
    }

    getMagentoField = (key: string): string | undefined => {
        const mapping = this.mappingFields.mapping.filter(mapping => mapping.woocommerceFieldCode === key);
        if (mapping.length>0) {
            return mapping[0]?.magentoLinkedCode;
        }
    }

    getMagentoValue = (item: WoocommerceProduct, key: string, magentoField: string) => {
        let value = item[key as keyof WoocommerceProduct]
        switch(magentoField) {
            //case MagentoProductFieldCase.active: // status
            case MagentoProductFieldCase.status: // product_online
                return (value === 'publish')?'1':'0'
            case MagentoProductFieldCase.visibility:  // visibility
                return (value === 'visible')?'Catalog, Search':'Not Visible Individually'
            case MagentoProductFieldCase.configurable_variations:  // variations
                if (value.length>0) {
                    debugger
                    value = item['variations_for_csv']
                    return this.woocommerceVariationBuilder.getVariation(value as WoocommerceSimpleProduct[])
                }
            default:
                return value;
        }
    }

    getKeystoneField = (value: FieldValue, woocommerceField: string) => {
        switch(woocommerceField) {
            case WoocommerceProductFieldCase.active: // status
            case WoocommerceProductFieldCase.status: // product_online
                return (value === 'publish')?'1':'0'
            case WoocommerceProductFieldCase.visibility:  // visibility
                return (value === 'visible')?'Catalog, Search':'Not Visible Individually'
            default:
                return value;
        }
    }
}
