import {
    ImportMappingFields,
    MagentoProductFieldCase,
    WoocommerceProduct, ImportMapping, ProductImage, VariationAttribute
} from '../../types'
import {WoocommerceDataVariations} from "./data-variation";
import {MagentoData} from "../magento-data";
import { WoocommerceVariationBuilder } from './data-mapper/variation-builder'
import { FsCacheService } from '../cache/data-cache-fs'

export class WoocommerceDataMapper {
    magentoData = new MagentoData()
    mappingFields: ImportMappingFields = {'mapping': []}
    woocommerceDataVariations = new WoocommerceDataVariations()
    woocommerceVariationBuilder = new WoocommerceVariationBuilder;
    cache = new FsCacheService();

    setMappingFields = async (mappingFields: Readonly<ImportMappingFields>) => {
        this.mappingFields = mappingFields
        await this.cache.set('mappingFields', mappingFields)
    }

    getMagentoFieldsFromCache = async () => {
        this.mappingFields = await this.cache.read('mappingFields');

        if (!this.mappingFields) {
            throw new Error('No mapping is in the cache')
        }

        return this.mappingFields
    }

    getMagentoCsvHeader = () => {
        let row = this.magentoData.getInitialHeaderData()

        this.mappingFields.mapping.forEach((mapping: ImportMapping) => {
            const magentoFieldCode = mapping.magentoLinkedCode;
            row.push({'id':magentoFieldCode, 'title': magentoFieldCode});
        })

        const additionalFields = ['small_image', 'thumbnail', 'product_type']
        additionalFields.forEach(field => {
            row.push({'id':field, 'title': field});
        })

        return row
    }

    getMagentoField = (key: Readonly<string>): string | undefined => {
        const mapping = this.mappingFields.mapping.filter(mapping => mapping.pimFieldCode === key);
        if (mapping.length>0) {
            return mapping[0]?.magentoLinkedCode;
        }
    }

    getWoocommerceField(key: Readonly<string>): string | undefined {
        const mapping = this.mappingFields.mapping.filter(mapping => mapping.magentoLinkedCode === key);
        if (mapping.length>0) {
            return mapping[0]?.pimFieldCode;
        }
    }

    getMagentoValue = async (item: Readonly<WoocommerceProduct>, woocommerceField: Readonly<string>, magentoField: Readonly<string>) => {
        let value = item[woocommerceField as keyof WoocommerceProduct]
        switch(magentoField) {
            case MagentoProductFieldCase.status: // product_online
                return (value === 'publish')?'1':'0'
            case MagentoProductFieldCase.visibility:  // visibility
                return (value === 'visible')?'Catalog, Search':'Not Visible Individually'
            case MagentoProductFieldCase.configurable_variations:  // variations
                if (value && (value as number[]).length>0) {
                    const variationData = await this.woocommerceDataVariations.getVariationData(item)
                    if (variationData !== undefined) {
                        return this.woocommerceVariationBuilder.getVariation(variationData as WoocommerceProduct[])
                    }
                }
                return ''
            case MagentoProductFieldCase.image:  // images
                if (value === undefined) {
                    value = item['image']
                    if (value) {
                        return value.src
                    }
                } else {
                    if (value && (value as ProductImage[]).length > 0) {
                        const image = (value as ProductImage[]).pop()
                        return image?.src
                    }
                }
                break
            default:
                if (item.attributes) {
                    item.attributes.forEach((attribute: VariationAttribute, index: number) => {
                        if (woocommerceField === attribute.slug && attribute.option!== undefined) {
                            value = attribute.option
                        }
                    })
                }

                return value;
        }
    }
}
