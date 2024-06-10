import {FieldValue, ImportMappingFields, InitialProductData, WoocommerceProduct} from "../types";
import {CsvWriter} from './csv-writer'
import {ImportRowCreator} from './import-creator/row-creator'
import {WoocommerceDataVariations} from "./woocommerce/data-variation";

export class ImportCreator {
    csvWriter = new CsvWriter()
    importRowCreator = new ImportRowCreator()
    woocommerceDataVariations = new WoocommerceDataVariations()

    createCsvImport = async (data: WoocommerceProduct[], mappingFields: ImportMappingFields) => {
        this.importRowCreator.setMappingFields(mappingFields)

        let row = this.importRowCreator.createHeader(data[0])
        this.csvWriter.writeHeader(row)
        let simpleRows: FieldValue[] = []
        let simpleRowsWithVariation: WoocommerceProduct[] = []

        for (let i= 0; i < data.length; i++) {
            const variationData = await this.woocommerceDataVariations.getVariationData(data[i])
            if (variationData !== undefined) {
                variationData.map((variation => {
                    simpleRowsWithVariation.push(variation as WoocommerceProduct)
                }))
            }
        }

        if (simpleRowsWithVariation.length> 0) {
            const simpleRowFromVariation = await Promise.all(simpleRowsWithVariation.map(async (variation) => {
                return await this.importRowCreator.createCsvRow(variation as WoocommerceProduct)
            }, this))

            if (simpleRowFromVariation.length>0) {
                simpleRowFromVariation.map(simpleRow => {
                    simpleRows.push(simpleRow as any)
                })
            }
        }

        const rows = await Promise.all(data.map(async (record) => {
            return await this.importRowCreator.createCsvRow(record)
        }, this))

        return this.csvWriter.writeRecords([...simpleRows, ...rows])
    }
}