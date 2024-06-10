import {ApiHandler} from './api-handler'
import {WoocommerceProduct, WoocommerceProductFieldCase, WoocommerceSimpleProduct} from '../../types'

export class WoocommerceDataVariations {
    woocommerceApiHandler = new ApiHandler;

    // aggregateVariationData = async (productData: WoocommerceProduct[]): Promise<WoocommerceProduct[]> => {
    //     productData = await Promise.all(productData.map(async product => {
    //         if (product['variations'] && product['variations'].length>0) {
    //             product['variations_for_csv'] = await Promise.all(product['variations'].map(async variationId => {
    //                 return await this.getVariationForProduct(product['id'], variationId)
    //             }, this))
    //         }
    //
    //         return product
    //     }))
    //
    //     // let productResult = []
    //     //
    //     // for (let i=0; i < productData.length; i++) {
    //     //     const product = productData[i]
    //     //     if (product['variations'] && product['variations'].length>0) {
    //     //         //let result = []
    //     //         // for (let i=0; i < product['variations'].length; i++) {
    //     //         //     const variationId = product['variations'][i]
    //     //         //     const variationData = await this.getVariationForProduct(product['id'], variationId)
    //
    //     //         //     result.push(variationData)
    //     //         // }
    //     //         product['variations'] = await Promise.all(product['variations'].map(async variationId => {
    //     //             return await this.getVariationForProduct(product['id'], variationId)
    //     //         }, this))
    //     //     }
    //
    //     //     productResult.push(product)
    //     // }
    //
    //     // productData = productResult
    //
    //     return productData;
    // }

    getVariationForProduct = async (productId: number, variationId: number) => {
        return await this.woocommerceApiHandler.callApiUrl(`products/${productId}/variations/${variationId}`, []);
    }

    getVariationData = async (record: WoocommerceProduct): Promise<WoocommerceSimpleProduct[] | undefined> =>  {
        const variations = record[WoocommerceProductFieldCase.variations]
        if (variations.length == 0) {
            return;
        }

        return await Promise.all(variations.map(async (variationId) => {
            return await this.woocommerceApiHandler.callApiUrl(`products/${record['id']}/variations/${variationId}`, []);
        }, (this)));
    }
}