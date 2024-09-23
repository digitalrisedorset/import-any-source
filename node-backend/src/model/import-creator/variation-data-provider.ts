import { DrdProduct, DrdSimpleProduct } from "../../types/drd";
import { ImportMappingFields } from "../../types/general";
import { DrdDataVariations } from "../drd/data-variation";
import { ImportRowCreator } from "./row-creator";
import { ErrorWrapper } from "../../error-handler";
import {ProductDeletion} from "../drd/product-deletion";

export class VariationDataProvider {
    drdDataVariations = new DrdDataVariations()
    productDeletion = new ProductDeletion()
    importRowCreator = new ImportRowCreator()
    errorWrapper = new ErrorWrapper()

    getVariationRows = async (data: Readonly<DrdProduct[]>, mappingFields: Readonly<ImportMappingFields>): Promise<DrdProduct[]> => {
        await this.importRowCreator.createHeader(mappingFields)

        const simpleRowsWithVariation: DrdProduct[] = await this.getApiData(data)

        if (simpleRowsWithVariation.length === 0) {
            return []
        }

        return await this.buildCsvRows(simpleRowsWithVariation)
    }

    getApiData = async (data: Readonly<DrdProduct[]>): Promise<DrdProduct[]> => {
        let simpleRowsWithVariation: DrdProduct[] = []

        data.map(async (simpleProduct: DrdProduct) => {
            const variationData = await this.drdDataVariations.getVariationData(simpleProduct)
            if (variationData !== undefined) {
                variationData.map((variation: DrdSimpleProduct) => {
                    simpleRowsWithVariation.push(variation as DrdProduct)
                })
            }
        })

        return simpleRowsWithVariation
    }

    buildCsvRows = async (variationData: Readonly<DrdProduct[]>) => {
        const simpleRowFromVariation = await Promise.all(variationData.map(async (variation) => {
            return await this.importRowCreator.createCsvRow(variation as DrdProduct)
        }, this))

        let simpleRows: DrdProduct[] = []

        if (simpleRowFromVariation.length > 0) {
            simpleRowFromVariation.filter((simpleRow: DrdProduct) => this.productDeletion.isProductValidForImport(simpleRow['id']))
                .map(simpleRow => {
                    simpleRows.push(simpleRow as any)
                })        }

        return simpleRows;
    }
}