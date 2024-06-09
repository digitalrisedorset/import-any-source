import {ImportMappingFields, WoocommerceProduct, WoocommerceProductFieldCase} from "../types";
import {WoocommerceDataMapper} from "./woocommerce/data-mapper";
import { CsvWriter } from './csv-writer'
import {MagentoData } from './magento-data'

export class ImportCreator {
    woocommerceDataMapper = new WoocommerceDataMapper()
    csvWriter = new CsvWriter()
    magentoData = new MagentoData()

    getSkuRecord = function (record: WoocommerceProduct) {
        let sku = record['sku'];
        if (sku === '') {
            sku = record['name'].replace(/[/\\?%*:|"<>]/g, '-')
        }

        return sku
    }

    createCsvImport = async (data: WoocommerceProduct[], mappingFields: ImportMappingFields) => {
        this.woocommerceDataMapper.setMappingFields(mappingFields)

        let record = data[0];
        let row = this.magentoData.getInitialHeaderData()

        Object.keys(record).forEach((key: string) => {
            const magentoFieldCode = this.woocommerceDataMapper.getMagentoField(key);
            if (magentoFieldCode) row.push({'id':magentoFieldCode, 'title': magentoFieldCode});
        });
        this.csvWriter.writeHeader(row)

        const rows = data.map(record => {
            const row = this.magentoData.getInitialData()
            Object.keys(record).forEach((key: string) => { // key should be of type validWoocommerceProductKeys
                // https://www.totaltypescript.com/iterate-over-object-keys-in-typescript
                const item: any = record[key as keyof typeof record]
                const magentoFieldCode = this.woocommerceDataMapper.getMagentoField(key);
                if (magentoFieldCode === 'sku') {
                    row[magentoFieldCode] = this.getSkuRecord(record)
                } else if (magentoFieldCode) {
                    row[magentoFieldCode] = this.woocommerceDataMapper.getMagentoValue(record, key, magentoFieldCode)
                }
            })
            return row
        })

        return await this.csvWriter.writeRecords(rows)
    }
}