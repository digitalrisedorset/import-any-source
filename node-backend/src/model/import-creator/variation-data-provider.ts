import {ImportMappingFields, WoocommerceProduct, WoocommerceSimpleProduct} from "../../types";
import {WoocommerceDataVariations} from "../woocommerce/data-variation";
import {ImportRowCreator} from "./row-creator";
import {ErrorWrapper} from "../../error-handler";

export class VariationDataProvider {
    woocommerceDataVariations = new WoocommerceDataVariations()
    importRowCreator = new ImportRowCreator()
    errorWrapper = new ErrorWrapper()

    getVariationRows = async (data: Readonly<WoocommerceProduct[]>, mappingFields: Readonly<ImportMappingFields>): Promise<WoocommerceProduct[]> => {
        await this.importRowCreator.createHeader(mappingFields)

        const simpleRowsWithVariation: WoocommerceProduct[] = await this.getApiData(data)

        if (simpleRowsWithVariation.length === 0) {
            return []
        }

        return await this.buildCsvRows(simpleRowsWithVariation)
    }

    getApiData = async (data: Readonly<WoocommerceProduct[]>): Promise<WoocommerceProduct[]> => {
        let simpleRowsWithVariation: WoocommerceProduct[] = []

        data.map((simpleProduct: WoocommerceProduct) => {
            this.woocommerceDataVariations.getVariationData(simpleProduct)
                .then((variationData: WoocommerceSimpleProduct[]) => {
                    variationData.map((variation: WoocommerceSimpleProduct) => {
                        simpleRowsWithVariation.push(variation as WoocommerceProduct)
                    })
                })
                .catch(e => {
                    this.errorWrapper.handle(e)
                })

        })

        return simpleRowsWithVariation
    }

    buildCsvRows = async (variationData: Readonly<WoocommerceProduct[]>) => {
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