import { FsCacheService } from './cache/data-cache-fs'
import { z } from "zod";
import { CachedDeletedProduct, CachedProduct, DeleteProduct, ProductStatusRequest } from '../types/general'

const CACHE_PRODUCT_DELETED = 'product_deleted'

const PRODUCT_IMPORTED = 'imported'

const CACHE_PRODUCT_SKU_LIST = 'product_sku_list'

const CachedProductValidator = z.object({
    productId: z.number(),
    sku: z.string(),
    import_status: z.string()
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

        const result = deletedProductData.filter((item: any) => Number(item?.productId) !== 0)
        this.cache.set(CACHE_PRODUCT_DELETED, result)
    }

    getProductDeleteNotification = (): CachedDeletedProduct[] => {
        const data = this.cache.read(CACHE_PRODUCT_DELETED)

        let list

        if (data !== undefined) {
            list = CachedDeletedProductList.parse(data);
        }

        if (list === undefined) {
            return []
        }

        return list.filter((product: CachedDeletedProduct) => Number(product.productId !== 0))
    }

    setMinimalProductData = (data: readonly DeleteProduct[]): void => {
        const list = DeleteNotifications.parse(data);

        if (list === undefined) {
            throw new Error(`The data is not valid to be set`)
        }

        const newList = data
            .filter((product: DeleteProduct) => product.sku !== '')
            .map((product: DeleteProduct): CachedProduct => {
                const match = this.findProductInCache(product.id)
                if (match === undefined) {
                    return {
                        productId: product.id,
                        sku: product.sku,
                        import_status: 'unknown'
                    }
                }

                return match
            })

        this.cache.set(CACHE_PRODUCT_SKU_LIST, newList)
    }

    updateProductImportStatus = (data: ProductStatusRequest) => {
        const cacheData: unknown = this.cache.read(CACHE_PRODUCT_SKU_LIST)
        const list = CachedProductList.parse(cacheData);

        if (list === undefined) {
            throw new Error(`No sku was found for the product id ${data.sku}`)
        }

        this.cache.set(CACHE_PRODUCT_SKU_LIST, list.map((product: CachedProduct) => {
            if (product.sku === data.sku) {
                return {
                    ...product, import_status: data.import_status
                }
            }
            return product
        }))
    }

    findProductInCache = (productId: number): CachedProduct | undefined => {
        const data: unknown = this.cache.read(CACHE_PRODUCT_SKU_LIST)

        if (data === undefined) {
            return undefined
        }

        const list = CachedProductList.parse(data);

        if (list === undefined) {
            throw new Error(`No sku was found for the product id ${productId}`)
        }

        return list.find((product: CachedProduct) => product.productId === productId)
    }

    getProductSku = (productId: number): string => {
        const product = this.findProductInCache(productId)
        return product?.sku || ''
    }

    getProductImportStatus = (productId: number): string => {
        const product = this.findProductInCache(productId)
        return product?.import_status || ''
    }

    isProductValidForImport = (productId: number): boolean => {
        return this.getProductImportStatus(productId) !== PRODUCT_IMPORTED
    }
}