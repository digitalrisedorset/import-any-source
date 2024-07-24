import { FsCacheService } from './cache/data-cache-fs'
import {z} from "zod";
import {MinimalProduct, CachedProduct, CachedDeletedProduct} from '../types/general'

const CACHE_PRODUCT_DELETED = 'product_deleted'

const CACHE_PRODUCT_SKU_LIST = 'product_sku_list'

const CachedProductValidator = z.object({
    productId: z.number(),
    sku: z.string()
})

const CachedProductList = z.array(CachedProductValidator)

const CachedDeletedProductValidator = z.object({
    productId: z.number(),
    sku: z.string(),
    date: z.string()
})
const CachedDeletedProductList = z.array(CachedDeletedProductValidator)

const DeleteProductValidator = z.object({
    id: z.number(),
    sku: z.string()
})

const DeleteNotifications = z.array(DeleteProductValidator)

export class BaseProductDeletion {
    cache: FsCacheService
    constructor(prefix: string) {
        this.cache = new FsCacheService(prefix)
    }

    updateCacheWithProductDeletedData = (productId: number) => {
        let deletedProductData = this.getProductDeleteNotification()

        deletedProductData[productId] = {
            productId,
            sku: this.getProductSku(productId),
            date: (new Date()).toISOString()
        }

        const result = deletedProductData.filter((item: any) => Number(item?.productId)!==0)
        this.cache.set(CACHE_PRODUCT_DELETED, result)
    }

    getProductDeleteNotification = (): CachedDeletedProduct[] => {
        const data = this.cache.read(CACHE_PRODUCT_DELETED)

        const list = CachedDeletedProductList.parse(data);

        if (list === undefined) {
            return []
        }

        return list.filter((product: CachedDeletedProduct) => Number(product.productId!==0))
            .map((product: CachedDeletedProduct) => {
            return {
                productId: product.productId,
                sku: this.getProductSku(product.productId),
                date: product.date,
            }
        })
    }

    setMinimalProductData = (data: readonly MinimalProduct[]): void => {
        const list = CachedProductList.parse(data);

        if (list === undefined) {
            //throw new Error(`The data is not valid to be set`)
        }

        this.cache.set(CACHE_PRODUCT_SKU_LIST, data.filter((product: MinimalProduct) => product.sku!=='')
            .map((product: MinimalProduct) => {
                return {
                    productId: product.id,
                    sku: product.sku
                }
            }))
    }

    getProductSku = (productId: number): string => {
        const data: unknown = this.cache.read(CACHE_PRODUCT_SKU_LIST)
        const list = CachedProductList.parse(data);

        if (list === undefined) {
            //throw new Error(`No sku was found for the product id ${productId}`)
        }

        const product = list.find((product: CachedProduct, index) => product.productId === productId)
        return product?.sku || ''
    }
}