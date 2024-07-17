import {
    HeaderField,
    ImportMappingFields, InitialProductData, MagentoProductFieldCase,
    WoocommerceProduct, WoocommerceProductFieldCase,
} from "../../types";
import {WoocommerceDataMapper} from "../woocommerce/data-mapper";
import {MagentoData } from '../magento-data'

export class ImportRowCreator {
    woocommerceDataMapper = new WoocommerceDataMapper()
    magentoData = new MagentoData()

    getSkuRecord = function (record: Readonly<WoocommerceProduct>) {
        let sku = record['sku'];
        if (sku === '') {
            sku = record['name'].replace(/[/\\?%*:|"<>]/g, '-')
        }

        return sku
    }

    createHeader = async (mappingFields: Readonly<ImportMappingFields>) => {
        await this.woocommerceDataMapper.setMappingFields(mappingFields)
        return this.woocommerceDataMapper.getMagentoCsvHeader()
    }

    createHeaderFromCache = async () => {
        await this.woocommerceDataMapper.getMagentoFieldsFromCache()

        return this.woocommerceDataMapper.getMagentoCsvHeader()
    }

    getMappingFields = async () => {
        return await this.woocommerceDataMapper.getMagentoFieldsFromCache();
    }

    createCsvRow = async (record: Readonly<WoocommerceProduct>) => {
        const header: HeaderField[] = this.woocommerceDataMapper.getMagentoCsvHeader()

        let row: InitialProductData = this.magentoData.getInitialData()

        header.forEach(async (field: HeaderField) => { // key should be of type validWoocommerceProductKeys
            // https://www.totaltypescript.com/iterate-over-object-keys-in-typescript
            const magentoFieldCode: string = field.id;
            const pimFieldCode = this.woocommerceDataMapper.getWoocommerceField(magentoFieldCode)

            if (magentoFieldCode === 'sku') {
                row[magentoFieldCode] = this.getSkuRecord(record)
            } else if (pimFieldCode) {
                row[magentoFieldCode] = await this.woocommerceDataMapper.getMagentoValue(record, pimFieldCode, magentoFieldCode)
                if (magentoFieldCode === MagentoProductFieldCase.image) {
                    row['thumbnail'] = row[magentoFieldCode]
                    row['small_image'] = row[magentoFieldCode]
                }
            }
        })

        row['product_type'] = (record[WoocommerceProductFieldCase.variations] === undefined || record[WoocommerceProductFieldCase.variations].length===0)?'simple':'configurable'

        return row
    }
}