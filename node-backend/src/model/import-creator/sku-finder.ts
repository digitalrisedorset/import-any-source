import {ApiHandler} from "../woocommerce/api-handler";
import {CacheService} from "../cache/data-cache";
import {WoocommerceProduct} from "../../types";
import {ErrorWrapper} from "../../error-handler";

export class SkuFinder {
    woocommerceApiHandler = new ApiHandler;
    cache = new CacheService();
    errorWrapper = new ErrorWrapper()

    getSkuRecord = async (productId: Readonly<number>): Promise<string | undefined> => {
        return this.cache.get(`getProductData_${productId}`, async () => {
            return await this.getProductData(productId)
        }).then((row: WoocommerceProduct) => {
            return row['sku']
        }).catch((e) => {
            errorWrapper.handle(error)
        })
    }

    getProductData = async (productId: Readonly<number>): Promise<WoocommerceProduct> =>  {
        const row = await this.woocommerceApiHandler.callApiUrl(`products/${productId}`, [])
        if (row === undefined) {
            throw new Error(`No product found with id: ${productId}`)
        }

        return row as WoocommerceProduct
    }
}