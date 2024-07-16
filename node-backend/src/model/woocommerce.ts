import { CacheService } from './cache/data-cache'
import { ApiHandler } from './woocommerce/api-handler'
import {Attribute, WoocommerceProduct} from "../types";
import { AttributeValidator } from "./woocommerce/api-handler/attribute-validator";
import { ErrorWrapper } from "../error-handler";
import {ProductValidator} from "./woocommerce/api-handler/product-validator";

export class Woocommerce {
    cache = new CacheService();
    woocommerceApiHandler = new ApiHandler;
    attributeValidator = new AttributeValidator;
    productValidator = new ProductValidator;
    errorWrapper = new ErrorWrapper()

    getAttributeList = async (): Promise<Attribute[]> => {
        const attributesOptions = await this.cache.get('getOptionAttributes', async (): Promise<Attribute[]> => {
            return await this.getOptionAttributes()
        });

        const attributesToLink = await this.cache.get('getAttributeListFromProduct', async (): Promise<Attribute[]> => {
            return await this.getAttributeListFromProduct()
        });

        return [...attributesOptions, ...attributesToLink]
    }
    getOptionAttributes = async (): Promise<Attribute[]> => {
        return this.woocommerceApiHandler.callApiUrl('products/attributes')
            .then(response => {
                return this.attributeValidator.filterValidAttributes(response)
            })
            .catch((e: unknown) => {
                this.errorWrapper.handle(e)
                throw e
            })
    };
    getAttributeListFromProduct = async (): Promise<Attribute[]> => {
        return this.woocommerceApiHandler.callApiUrl('products', {
            'per_page': '1',
            'page': '1'
        })
            .then(response => {
                return this.attributeValidator.filterValidAttributesFromProduct(response)
            })
            .catch((e: unknown) => {
                this.errorWrapper.handle(e)
                throw e
            })
    };
    getProductBatch = async (): Promise<WoocommerceProduct[]> => {
        return this.woocommerceApiHandler.callApiUrl('products', {
            'per_page': process.env.IMPORT_BATCH_SIZE,
            'page': 1,
            // 'sku': 'woo-vneck-tee-blue'
        })
            .then(response => {
                return this.productValidator.filterValidProduct(response)
            })
            .catch((e: unknown) => {
                this.errorWrapper.handle(e)
                throw e
            })
    }

    getProductUpdate = async (): Promise<WoocommerceProduct[]> => {
        let now = new Date(),
            dateThreshold = new Date(now);
        dateThreshold.setMinutes(now.getMinutes() - 5);

        return this.woocommerceApiHandler.callApiUrl('products', {
            'per_page': process.env.IMPORT_BATCH_SIZE,
            'page': 1,
            'modified_after': dateThreshold.toISOString()
        })
            .then(response => {
                return this.productValidator.filterValidProduct(response)
            })
            .catch((e: unknown) => {
                this.errorWrapper.handle(e)
                throw e
            })
    }
}
