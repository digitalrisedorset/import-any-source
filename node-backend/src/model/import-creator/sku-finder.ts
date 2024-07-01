import {ApiHandler} from "../woocommerce/api-handler";
import {CacheService} from "../cache/data-cache";
import {WoocommerceProduct} from "../../types";

export class SkuFinder {
    woocommerceApiHandler = new ApiHandler;
    cache = new CacheService();

    getSkuRecord = async (productId: number): Promise<string | undefined> => {
        this.cache.get(`getProductData_${productId}`, async () => {
            return await this.getProductData(productId)
        }).then((row: WoocommerceProduct) => {
            return row['sku']
        }).catch((e: Error) => {
            console.log(e.message)
        })
    }

    getProductData = async (productId: number): Promise<WoocommerceProduct> =>  {
        const row = await this.woocommerceApiHandler.callApiUrl(`products/${productId}`, [])
        if (row === undefined) {
            throw new Error(`No product found with id: ${productId}`)
        }

        return row as WoocommerceProduct
    }
}