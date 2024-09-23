import { ApiHandler } from './api-handler'
import { DrdProduct, DrdProductFieldCase, DrdSimpleProduct } from '../../types/drd'
import { CacheService } from "../cache/data-cache";

export class DrdDataVariations {
    drdApiHandler = new ApiHandler;
    cache = new CacheService('drd_variations');

    getVariationData = async (record: DrdProduct): Promise<DrdSimpleProduct[] | undefined> => {

        const variations = record['variations']
        if (variations?.length == 0) {
            return undefined
        }

        return await this.cache.get(`getVariationData_${record['id']}`, async (): Promise<DrdSimpleProduct[]> => {
            return await this.getApiVariationData(record['id'], variations)
        })
    }

    getApiVariationData = async (recordId: number, variations: number[]): Promise<DrdSimpleProduct[]> => {
        return await Promise.all(variations.map(async (variationId) => {
            return await this.drdApiHandler.callApiUrl(`products/${recordId}/variations/${variationId}`, []);
        }, (this)));
    }
}