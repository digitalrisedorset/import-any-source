import { WoocommerceProduct, WoocommerceSimpleProduct } from "../../types/woocommerce";
import { ImportMappingFields } from "../../types/general";
import { WoocommerceDataVariations } from "../woocommerce/data-variation";
import { ImportRowCreator } from "./row-creator";
import { ErrorWrapper } from "../../error-handler";
import {ProductDeletion} from "../woocommerce/product-deletion";

export class VariationDataProvider {
    woocommerceDataVariations = new WoocommerceDataVariations()
    productDeletion = new ProductDeletion()
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

        data.map(async (simpleProduct: WoocommerceProduct) => {
            const variationData = await this.woocommerceDataVariations.getVariationData(simpleProduct)
            if (variationData !== undefined) {
                variationData.map((variation: WoocommerceSimpleProduct) => {
                    simpleRowsWithVariation.push(variation as WoocommerceProduct)
                })
            }
        })

        return simpleRowsWithVariation
    }

    buildCsvRows = async (variationData: Readonly<WoocommerceProduct[]>) => {
        const simpleRowFromVariation = await Promise.all(variationData.map(async (variation) => {
            return await this.importRowCreator.createCsvRow(variation as WoocommerceProduct)
        }, this))

        let simpleRows: WoocommerceProduct[] = []

        if (simpleRowFromVariation.length > 0) {
            simpleRowFromVariation.filter((simpleRow: WoocommerceProduct) => this.productDeletion.isProductValidForImport(simpleRow['id']))
                .map(simpleRow => {
                    simpleRows.push(simpleRow as any)
                })        }

        return simpleRows;
    }
}