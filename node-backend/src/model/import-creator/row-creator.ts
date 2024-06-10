import {ImportMappingFields, WoocommerceProduct, WoocommerceSimpleProduct} from "../../types";
import {WoocommerceDataMapper} from "../woocommerce/data-mapper";
import {MagentoData } from '../magento-data'

export class ImportRowCreator {
    woocommerceDataMapper = new WoocommerceDataMapper()
    magentoData = new MagentoData()

    setMappingFields = (mappingFields: ImportMappingFields) => {
        this.woocommerceDataMapper.setMappingFields(mappingFields)
    }

    getSkuRecord = function (record: WoocommerceProduct) {
        let sku = record['sku'];
        if (sku === '') {
            sku = record['name'].replace(/[/\\?%*:|"<>]/g, '-')
        }

        return sku
    }

    createHeader = (record: WoocommerceProduct): any => {
        let row = this.magentoData.getInitialHeaderData()

        Object.keys(record).forEach((key: string) => {
            const magentoFieldCode = this.woocommerceDataMapper.getMagentoField(key);
            if (magentoFieldCode) row.push({'id':magentoFieldCode, 'title': magentoFieldCode});
        });

        return row
    }

    createCsvRow = async (record: WoocommerceProduct) => {
        const row = this.magentoData.getInitialData()

        Object.keys(record).forEach((key: string) => { // key should be of type validWoocommerceProductKeys
            // https://www.totaltypescript.com/iterate-over-object-keys-in-typescript
            const magentoFieldCode = this.woocommerceDataMapper.getMagentoField(key);
            if (magentoFieldCode === 'sku') {
                row[magentoFieldCode] = this.getSkuRecord(record)
            } else if (magentoFieldCode) {
                row[magentoFieldCode] = this.woocommerceDataMapper.getMagentoValue(record, key, magentoFieldCode)
            }
        })

        return row
    }
}