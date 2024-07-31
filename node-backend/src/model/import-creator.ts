import {WoocommerceProduct, InitialProductData, WoocommerceDeleteRecord} from "../types/woocommerce";
import {CachedDeletedProduct, DeleteRowProduct, ImportMappingFields, MinimalProduct} from "../types/general";
import {CsvWriterWrapper} from './csv-writer-wrapper'
import {ImportRowCreator} from './import-creator/row-creator'
import {VariationDataProvider} from "./import-creator/variation-data-provider"
import { ProductDeletion } from "./woocommerce/product-deletion";

export class ImportCreator {
    csvWriter = new CsvWriterWrapper()
    importRowCreator = new ImportRowCreator()
    variationDataProvider = new VariationDataProvider()

    createCsvImport = async (data: WoocommerceProduct[], mappingFields: ImportMappingFields) => {
        const row = await this.importRowCreator.createHeader(mappingFields)
        this.csvWriter.startImport()
        this.csvWriter.writeHeader(row)

        const simpleRows = await this.variationDataProvider.getVariationRows(data, mappingFields)

        const rows = await Promise.all(data.map(async (record) => {
            return await this.importRowCreator.createCsvRow(record)
        }, this))
        return this.finaliseWriteRows([...simpleRows, ...rows])
    }

    getProductData = async (data: WoocommerceProduct[], mappingFields: ImportMappingFields) => {
        const row = await this.importRowCreator.createHeader(mappingFields)

        const simpleRows = await this.variationDataProvider.getVariationRows(data, mappingFields)

        const rows = await Promise.all(data.map(async (record) => {
            return await this.importRowCreator.createCsvRow(record)
        }, this))
        return [...simpleRows, ...rows]
    }

    createCsvUpdateImport = async (data: Readonly<WoocommerceProduct[]>) => {
        const row = await this.importRowCreator.createHeaderFromCache()
        this.csvWriter.startUpdate()
        this.csvWriter.writeHeader(row)
        const mappingFields: ImportMappingFields = await this.importRowCreator.getMappingFields()
        const simpleRows = await this.variationDataProvider.getVariationRows(data, mappingFields)

        const rows = await Promise.all(data.map(async (record) => {
            return await this.importRowCreator.createCsvRow(record)
        }, this))

        return this.finaliseWriteRows([...simpleRows, ...rows])
    }

    createCsvDeleteImport = async (data: Readonly<CachedDeletedProduct[]>) => {
        const header = this.importRowCreator.createHeaderFromCache()
        this.csvWriter.startDelete()
        this.csvWriter.writeHeader(header)

        const rows = data.map((item: CachedDeletedProduct) => {
            return {
                sku: item.sku,
                status: 'delete'
            }
        })
        return await this.finaliseWriteRows(rows)
    }

    finaliseWriteRows = async (csvRows: Readonly<(WoocommerceProduct | InitialProductData)[]>) => {
        console.log(`Import file with ${csvRows.length}`)
        return await this.csvWriter.writeRecords(csvRows)
    }

    saveProductMinimalData = async (data: Readonly<WoocommerceProduct[]>) => {
        const productDeletion= new ProductDeletion()
        await productDeletion.setMinimalProductData(data)
    }
}