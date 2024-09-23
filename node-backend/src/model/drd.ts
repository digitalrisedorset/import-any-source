import { CacheService } from './cache/data-cache'
import { ApiHandler } from './drd/api-handler'
import {DrdProduct} from "../types/drd";
import {Attribute} from "../types/general";
import { AttributeValidator } from "./drd/api-handler/attribute-validator";
import { ErrorWrapper } from "../error-handler";
import {ProductValidator} from "./drd/api-handler/product-validator";
import {config} from "../config";

export class Drd {
    cache = new CacheService(config.route.drdApiPrefix);
    drdApiHandler = new ApiHandler;
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
        return this.drdApiHandler.callApiUrl('products/attributes')
            .then(response => {
                return this.attributeValidator.filterValidAttributes(response)
            })
            .catch((e: unknown) => {
                this.errorWrapper.handle(e)
                throw e
            })
    };
    getAttributeListFromProduct = async (): Promise<Attribute[]> => {
        return this.drdApiHandler.callApiUrl('products', {
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
    getProductBatch = async (): Promise<DrdProduct[]> => {
        return this.drdApiHandler.callApiUrl('products', {
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

    getProductUpdate = async (): Promise<DrdProduct[]> => {
        let now = new Date(),
            dateThreshold = new Date(now);
        dateThreshold.setMinutes(now.getMinutes() - 5);

        return this.drdApiHandler.callApiUrl('products', {
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
