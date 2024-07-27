import { ApiHandler } from './api-handler'
import { WoocommerceProduct, WoocommerceProductFieldCase, WoocommerceSimpleProduct } from '../../types/woocommerce'
import { CacheService } from "../cache/data-cache";

export class WoocommerceDataVariations {
    woocommerceApiHandler = new ApiHandler;
    cache = new CacheService('woocommerce_variations');

    getVariationData = async (record: WoocommerceProduct): Promise<WoocommerceSimpleProduct[] | undefined> => {

        const variations = record[WoocommerceProductFieldCase.variations]
        if (variations.length == 0) {
            return undefined
        }
        
        return await this.cache.get(`getVariationData_${record['id']}`, async (): Promise<WoocommerceSimpleProduct[]> => {
            return await this.getApiVariationData(record['id'], variations)
        })
    }

    getApiVariationData = async (recordId: number, variations: number[]): Promise<WoocommerceSimpleProduct[]> => {
        return await Promise.all(variations.map(async (variationId) => {
            return await this.woocommerceApiHandler.callApiUrl(`products/${recordId}/variations/${variationId}`, []);
        }, (this)));
    }
}