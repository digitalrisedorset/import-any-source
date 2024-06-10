import { WoocommerceVariationBuilder } from './data-mapper/variation-builder'
import {
    WoocommerceProductFieldCase,
    FieldValue,
    ImportMappingFields,
    MagentoProductFieldCase,
    WoocommerceSimpleProduct,
    WoocommerceProduct
} from '../../types'
import {WoocommerceDataVariations} from "./data-variation";

export class WoocommerceDataMapper {
    mappingFields: ImportMappingFields = {'mapping': []}
    woocommerceVariationBuilder = new WoocommerceVariationBuilder;
    woocommerceDataVariations = new WoocommerceDataVariations()

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
            case MagentoProductFieldCase.status: // product_online
                return (value === 'publish')?'1':'0'
            case MagentoProductFieldCase.visibility:  // visibility
                return (value === 'visible')?'Catalog, Search':'Not Visible Individually'
            // case MagentoProductFieldCase.configurable_variations:  // variations
            //     if ((value as number[]).length>0) {
            //         const variationData = await this.woocommerceDataVariations.getVariationData(item)
            //         if (variationData !== undefined) {
            //             return this.woocommerceVariationBuilder.getVariation(variationData as WoocommerceSimpleProduct[])
            //         }
            //     }
            //     return
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
