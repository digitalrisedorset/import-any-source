import { WoocommerceProduct, InitialProductData } from "../types/woocommerce";
import {
    CachedDeletedProduct, DeleteProduct,
    ImportMappingFields,
    ProductStatusRequest
} from "../types/general";
import { CsvWriterWrapper } from './csv-writer-wrapper'
import { ImportRowCreator } from './import-creator/row-creator'
import { VariationDataProvider } from "./import-creator/variation-data-provider"
import { ProductDeletion } from "./woocommerce/product-deletion";

export class ImportCreator {
    csvWriter = new CsvWriterWrapper()
    importRowCreator = new ImportRowCreator()
    variationDataProvider = new VariationDataProvider()
    productDeletion = new ProductDeletion()

    getProductImportData = async (data: Readonly<WoocommerceProduct[]>, mappingFields: ImportMappingFields) => {
        debugger
        const header = await this.importRowCreator.createHeader(mappingFields)
        this.csvWriter.startImport()
        this.csvWriter.writeHeader(header)

        const simpleRows = await this.variationDataProvider.getVariationRows(data, mappingFields)

        const rows = await Promise.all(data.filter(record => this.productDeletion.isProductValidForImport(record['id'])).map(async (record) => {
            return await this.importRowCreator.createCsvRow(record)
        }, this))
        return [...simpleRows, ...rows]
    }

    getProductUpdateData = async (data: Readonly<WoocommerceProduct[]>) => {
        const header = await this.importRowCreator.createHeaderFromCache()
        this.csvWriter.startUpdate()
        this.csvWriter.writeHeader(header)

        const mappingFields: ImportMappingFields = await this.importRowCreator.getMappingFields()
        const simpleRows = await this.variationDataProvider.getVariationRows(data, mappingFields)

        const rows = await Promise.all(data.filter(record => this.productDeletion.isProductValidForImport(record['id']))
            .map(async (record) => {
                return await this.importRowCreator.createCsvRow(record)
            }, this))
        return [...simpleRows, ...rows]
    }

    getProductDeleteData = async (data: Readonly<CachedDeletedProduct[]>) => {
        const header = this.importRowCreator.createHeaderFromCache()
        this.csvWriter.startDelete()
        this.csvWriter.writeHeader(header)

        const rows = data.map((item: CachedDeletedProduct) => {
            return {
                sku: item.sku,
                status: 'delete'
            }
        })
        return rows
    }

    finaliseWriteRows = async (csvRows: Readonly<(WoocommerceProduct | InitialProductData)[]>) => {
        console.log(`Import file with ${csvRows.length}`)
        return await this.csvWriter.writeRecords(csvRows)
    }

    saveProductMinimalData = async (data: Readonly<DeleteProduct[]>) => {
        const productDeletion = new ProductDeletion()
        await productDeletion.setMinimalProductData(data)
    }

    saveProductImported = (data: Readonly<ProductStatusRequest>) => {
        const productDeletion = new ProductDeletion()
        productDeletion.updateProductImportStatus(data)
    }
}