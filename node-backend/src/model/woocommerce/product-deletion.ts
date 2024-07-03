import { FsCacheService } from '../cache/data-cache-fs'
import {WoocommerceProduct, CacheProduct} from "../../types";

const CACHE_PRODUCT_DELETED = 'product_deleted'

const CACHE_PRODUCT_SKU_LIST = 'product_sku_list'

export class ProductDeletion {
    cache = new FsCacheService();

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

    getProductDeleteNotification = () => {
        const list = this.cache.read(CACHE_PRODUCT_DELETED)
        if (list === undefined) {
            return []
        }

        return list.filter((product: any) => Number(product.productId!==0)).map((product: any) => {
            return {
                productId: product.productId,
                sku: this.getProductSku(product.productId),
                date: product.date,
            }
        })
    }

    setMinimalProductData = (data: WoocommerceProduct[]) => {
        this.cache.set(CACHE_PRODUCT_SKU_LIST, data.filter(product => product.sku!=='')
            .map((product) => {
            return {
                productId: product.id,
                sku: product.sku
            }
        }))
    }

    getProductSku = (productId: number) => {
        const data = this.cache.read(CACHE_PRODUCT_SKU_LIST)
        const product = data.filter((product: any) => product.productId === productId)

        if (product.length > 0) {
            return product[0]?.sku
        }
    }

    getProductUpdate = async () => {
        const data = this.cache.read(CACHE_PRODUCT_SKU_LIST)
        return data.filter((product: any) => product?.sku !== '')
            .map((product: WoocommerceProduct) => product.sku)
    }
}