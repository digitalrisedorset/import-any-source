import { ImportMappingFields, WoocommerceProduct, InitialProductData, WoocommerceDeleteRecord} from "../types";
import {CsvWriter} from './csv-writer'
import {ImportRowCreator} from './import-creator/row-creator'
import {VariationDataProvider} from "./import-creator/variation-data-provider"
import { ProductDeletion } from "./woocommerce/product-deletion";

export class ImportCreator {
    csvWriter = new CsvWriter()
    importRowCreator = new ImportRowCreator()
    variationDataProvider = new VariationDataProvider()

    createCsvImport = async (data: WoocommerceProduct[], mappingFields: ImportMappingFields) => {
        let row = await this.importRowCreator.createHeader(mappingFields)
        this.csvWriter.startImport()
        this.csvWriter.writeHeader(row)

        const simpleRows = await this.variationDataProvider.getVariationRows(data, mappingFields)

        const rows = await Promise.all(data.map(async (record) => {
            return await this.importRowCreator.createCsvRow(record)
        }, this))
        return this.finaliseWriteRows([...simpleRows, ...rows])
    }

    createCsvUpdateImport = async (data: WoocommerceProduct[]) => {
        let row = await this.importRowCreator.createHeaderFromCache()
        console.log('Import update header', row)
        this.csvWriter.startUpdate()
        this.csvWriter.writeHeader(row)
        const mappingFields: ImportMappingFields = await this.importRowCreator.getMappingFields()
        const simpleRows = await this.variationDataProvider.getVariationRows(data, mappingFields)

        const rows = await Promise.all(data.map(async (record) => {
            return await this.importRowCreator.createCsvRow(record)
        }, this))

        return this.finaliseWriteRows([...simpleRows, ...rows])
    }

    createCsvDeleteImport = async (data: WoocommerceDeleteRecord[])=> {
        const header = await this.importRowCreator.createHeaderFromCache()
        this.csvWriter.startDelete()
        this.csvWriter.writeHeader(header)

        const rows = []
        data.map(item => {
            rows.push({
                sku: item.sku,
                status: 'delete'
            })
        })
        return this.finaliseWriteRows(rows)
    }

    finaliseWriteRows = (csvRows: (WoocommerceProduct | InitialProductData)[]) => {
        console.log(`Import file with ${csvRows.length}`)
        return this.csvWriter.writeRecords(csvRows)
    }

    saveProductMinimalData = async (data: WoocommerceProduct[]) => {
        const productDeletion= new ProductDeletion()
        await productDeletion.setMinimalProductData(data)
    }
}