import { ImportMappingFields, WoocommerceProduct} from "../types";
import {CsvWriter} from './csv-writer'
import {ImportRowCreator} from './import-creator/row-creator'
import {VariationDataProvider} from "./import-creator/variation-data-provider"

export class ImportCreator {
    csvWriter = new CsvWriter()
    importRowCreator = new ImportRowCreator()
    variationDataProvider = new VariationDataProvider()

    createCsvImport = async (data: WoocommerceProduct[], mappingFields: ImportMappingFields) => {
        let row = this.importRowCreator.createHeader(mappingFields)
        this.csvWriter.writeHeader(row)
        const simpleRows = await this.variationDataProvider.getVariationRows(data, mappingFields)

        const rows = await Promise.all(data.map(async (record) => {
            return await this.importRowCreator.createCsvRow(record)
        }, this))

        return this.csvWriter.writeRecords([...simpleRows, ...rows])
    }
}