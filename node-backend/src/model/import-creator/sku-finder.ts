import {ApiHandler} from "../drd/api-handler";
import {CacheService} from "../cache/data-cache";
import {DrdProduct} from "../../types/drd";
import {ErrorWrapper} from "../../error-handler";

export class SkuFinder {
    drdApiHandler = new ApiHandler;
    cache = new CacheService('sku_list');
    errorWrapper = new ErrorWrapper()

    getSkuRecord = async (productId: Readonly<number>): Promise<string | undefined> => {
        return this.cache.get(`getProductData_${productId}`, async () => {
            return await this.getProductData(productId)
        }).then((row: DrdProduct) => {
            return row['sku']
        }).catch((e) => {
            this.errorWrapper.handle(e)
            return undefined
        })
    }

    getProductData = async (productId: Readonly<number>): Promise<DrdProduct> =>  {
        const row = await this.drdApiHandler.callApiUrl(`products/${productId}`, [])
        if (row === undefined) {
            throw new Error(`No product found with id: ${productId}`)
        }

        return row as DrdProduct
    }
}