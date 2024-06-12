import {ImportMappingFields, WoocommerceProduct} from "../../types";
import {WoocommerceDataVariations} from "../woocommerce/data-variation";
import {ImportRowCreator} from "./row-creator";

export class VariationDataProvider {
    woocommerceDataVariations = new WoocommerceDataVariations()
    importRowCreator = new ImportRowCreator()

    getVariationRows = async (data: WoocommerceProduct[], mappingFields: ImportMappingFields): Promise<WoocommerceProduct[]> => {
        this.importRowCreator.createHeader(mappingFields)

        const simpleRowsWithVariation: WoocommerceProduct[] = await this.getApiData(data)

        if (simpleRowsWithVariation.length === 0) {
            return []
        }

        return await this.buildCsvRows(simpleRowsWithVariation)
    }

    getApiData = async (data: WoocommerceProduct[]): Promise<WoocommerceProduct[]> => {
        let simpleRowsWithVariation: WoocommerceProduct[] = []

        for (let i= 0; i < data.length; i++) {
            const variationData = await this.woocommerceDataVariations.getVariationData(data[i])
            if (variationData !== undefined) {
                variationData.map((variation => {
                    simpleRowsWithVariation.push(variation as WoocommerceProduct)
                }))
            }
        }

        return simpleRowsWithVariation
    }

    buildCsvRows = async (variationData: WoocommerceProduct[]) => {
        const simpleRowFromVariation = await Promise.all(variationData.map(async (variation) => {
            return await this.importRowCreator.createCsvRow(variation as WoocommerceProduct)
        }, this))

        let simpleRows: WoocommerceProduct[] = []

        if (simpleRowFromVariation.length>0) {
            simpleRowFromVariation.map(simpleRow => {
                simpleRows.push(simpleRow as any)
            })
        }

        return simpleRows;
    }
}