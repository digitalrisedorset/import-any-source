import { FsCacheService } from '../cache/data-cache-fs'
import {WoocommerceProduct, CacheProduct} from "../../types";
import {products} from "../../../../csv_import/keystone-products";

const CACHE_PRODUCT_DELETED = 'product_deleted'

const CACHE_PRODUCT_SKU_LIST = 'product_sku_list'

export class ProductDeletion {
    cache = new FsCacheService();

    updateCacheWithProductDeletedData = (productId: number) => {
        let deletedProductData = this.getProductDeleteNotification()
        console.log('deletedProductData read 1', {deletedProductData, productId})
        if (deletedProductData === undefined) {
            deletedProductData = []
        }

        deletedProductData[productId] = {
            productId,
            sku: this.getProductSku(productId),
            date: (new Date()).toISOString()
        }

        console.log('deletedProductData read 2', deletedProductData)
        this.cache.set(CACHE_PRODUCT_DELETED, deletedProductData)
        console.log('deletedProductData set 3')
    }

    getProductDeleteNotification = () => {
        const list = this.cache.read(CACHE_PRODUCT_DELETED)
        if (list === undefined) {
            return []
        }

        return list.filter(product => product!==null)
    }

    setMinimalProductData = (data: WoocommerceProduct[]) => {
        this.cache.set(CACHE_PRODUCT_SKU_LIST, data.filter(product => product.sku!=='').map((product) => {
            return {
                productId: product.id,
                sku: product.sku
            }
        }))
    }

    getProductSku = (productId: number) => {
        const data = this.cache.read(CACHE_PRODUCT_SKU_LIST)
        const product = data.filter(product => product.productId === productId)
        return product?.sku
    }

    getProductUpdate = async () => {
        const data = this.cache.read(CACHE_PRODUCT_SKU_LIST)
        return data.filter(product => product instanceof CacheProduct).map(product => product.sku)
    }
}