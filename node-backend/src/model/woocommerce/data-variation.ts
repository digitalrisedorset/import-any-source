import {ApiHandler} from './api-handler'
import {WoocommerceProduct, WoocommerceProductFieldCase, WoocommerceSimpleProduct} from '../../types'
import {CacheService} from "../cache/data-cache";

export class WoocommerceDataVariations {
    woocommerceApiHandler = new ApiHandler;
    cache = new CacheService();

    getVariationForProduct = async (productId: number, variationId: number) => {
        return await this.woocommerceApiHandler.callApiUrl(`products/${productId}/variations/${variationId}`, []);
    }

    getVariationData = async (record: WoocommerceProduct): Promise<WoocommerceSimpleProduct[] | undefined> =>  {
        const variations = record[WoocommerceProductFieldCase.variations]
        if (variations.length == 0) {
            return;
        }

        return await this.cache.get(`getVariationData_${record['id']}`, async () => {
            return await this.getApiVariationData(record['id'], variations)
        })
    }

    getApiVariationData = async (recordId: number, variations: number[]): Promise<WoocommerceSimpleProduct[] | undefined> =>  {
        return await Promise.all(variations.map(async (variationId) => {
            return await this.woocommerceApiHandler.callApiUrl(`products/${recordId}/variations/${variationId}`, []);
        }, (this)));
    }
}