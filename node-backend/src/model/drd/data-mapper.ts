import { DrdProduct, ProductImage, VariationAttribute } from '../../types/drd'
import { ImportMapping, ImportMappingFields } from '../../types/general'
import { MagentoProductFieldMap } from "../../types/magento";
import { DrdDataVariations } from "./data-variation";
import { MagentoData } from "../magento-data";
import { DrdVariationBuilder } from './data-mapper/variation-builder'
import { FsCacheService } from '../cache/data-cache-fs'

type HeaderField = {
    id: string,
    title: string
}

export class DrdDataMapper {
    magentoData = new MagentoData()
    mappingFields: ImportMappingFields = { 'mapping': [] }
    drdDataVariations = new DrdDataVariations()
    drdVariationBuilder = new DrdVariationBuilder;
    cache = new FsCacheService('drd');

    setMappingFields = async (mappingFields: Readonly<ImportMappingFields>) => {
        this.mappingFields = mappingFields
        await this.cache.set('mappingFields', mappingFields)
    }

    getMagentoFieldsFromCache = (): ImportMappingFields => {
        this.mappingFields = this.cache.read('mappingFields');

        if (!this.mappingFields) {
            throw new Error('No mapping is in the cache')
        }

        return this.mappingFields
    }

    getMagentoCsvHeader = (): HeaderField[] => {
        let row: HeaderField[] = this.magentoData.getInitialHeaderData()
        this.mappingFields.mapping.forEach((mapping: ImportMapping) => {
            const magentoFieldCode = mapping.magentoLinkedCode;
            row.push({ 'id': magentoFieldCode, 'title': magentoFieldCode });
        })

        const additionalFields = ['small_image', 'thumbnail', 'product_type']
        additionalFields.forEach(field => {
            row.push({ 'id': field, 'title': field });
        })

        return row
    }

    getMagentoField = (key: Readonly<string>): string | undefined => {
        const mapping = this.mappingFields.mapping.filter(mapping => mapping.catalogSourceFieldCode === key);
        if (mapping.length > 0) {
            return mapping[0]?.magentoLinkedCode;
        }
    }

    getDrdField(key: Readonly<string>): string | undefined {
        const mapping = this.mappingFields.mapping.filter(mapping => mapping.magentoLinkedCode === key);
        if (mapping.length > 0) {
            return mapping[0]?.catalogSourceFieldCode;
        }
    }

    getMagentoValue = async (item: Readonly<DrdProduct>, drdField: Readonly<string>, magentoField: Readonly<string>) => {
        let value = item[drdField as keyof DrdProduct]
        switch (magentoField) {
            case 'status': // product_online
                return (value === 'publish') ? '1' : '0'
            case 'visibility':  // visibility
                return (value === 'visible') ? 'Catalog, Search' : 'Not Visible Individually'
            case 'configurable_variations':  // variations
                if (value && (value as number[]).length > 0) {
                    const variationData = await this.drdDataVariations.getVariationData(item)
                    if (variationData !== undefined) {
                        return this.drdVariationBuilder.getVariation(variationData as DrdProduct[])
                    }
                }
                return ''
            case 'image':  // images
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
                        if (drdField === attribute.slug && attribute.option !== undefined) {
                            value = attribute.option
                        }
                    })
                }

                return value;
        }
    }
}
