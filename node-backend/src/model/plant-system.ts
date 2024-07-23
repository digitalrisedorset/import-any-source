import {Attribute} from "../types/general";
import {PlantFileHandler} from "./plantsystem/file-handler"
import {CacheService} from "./cache/data-cache";
import {AttributeValidator} from "./plantsystem/file-handler/attribute-validator";
import {ProductValidator} from "./plantsystem/file-handler/product-validator";
import {ErrorWrapper} from "../error-handler";
import {PlantProduct} from "../types/plant";
import {config} from "../config";

export class PlantSystem {
    cache = new CacheService(config.route.plantApiPrefix);
    plantFileHandler = new PlantFileHandler()
    attributeValidator = new AttributeValidator()
    productValidator = new ProductValidator()
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
        return this.plantFileHandler.getAttributes()
            .then(response => {
                return this.attributeValidator.filterValidAttributes(response)
            })
            .catch((e: unknown) => {
                this.errorWrapper.handle(e)
                throw e
            })
    }
    getAttributeListFromProduct = async (): Promise<Attribute[]> => {
        return this.plantFileHandler.getProduct({
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
    }

    getProductBatch = async (): Promise<PlantProduct[]> => {
        return this.plantFileHandler.getProduct({
            'per_page': '1',
            'page': '1'
        })
            .then(response => {
                return this.productValidator.filterValidProduct(response)
            })
            .catch((e: unknown) => {
                this.errorWrapper.handle(e)
                throw e
            })
    }

    getProductUpdate = async (): Promise<PlantProduct[]> => {
        let now = new Date(),
            dateThreshold = new Date(now);
        dateThreshold.setMinutes(now.getMinutes() - 5);

        return this.plantFileHandler.getProduct({
            'per_page': '1',
            'page': '1'
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