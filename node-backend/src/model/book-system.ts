import { Attribute } from "../types/general";
import { BookFileHandler } from "./booksystem/file-handler"
import { CacheService } from "./cache/data-cache";
import { AttributeValidator } from "./booksystem/file-handler/attribute-validator";
import { ProductValidator } from "./booksystem/file-handler/product-validator";
import { ErrorWrapper } from "../error-handler";
import { BookProduct } from "../types/book";
import { config } from "../config";

export class BookSystem {
    cache = new CacheService(config.route.bookApiPrefix);
    bookFileHandler = new BookFileHandler()
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
        return this.bookFileHandler.getAttributes()
            .then(response => {
                return this.attributeValidator.filterValidAttributes(response)
            })
            .catch((e: unknown) => {
                this.errorWrapper.handle(e)
                throw e
            })
    }
    getAttributeListFromProduct = async (): Promise<Attribute[]> => {
        return this.bookFileHandler.getProduct({
            'per_page': '1',
            'page': '1'
        })
            .then(response => {
                return this.attributeValidator.filterValidAttributesFromProduct(response.book)
            })
            .catch((e: unknown) => {
                this.errorWrapper.handle(e)
                throw e
            })
    }

    getProductBatch = async (): Promise<BookProduct[]> => {
        return this.bookFileHandler.getProduct({
            'per_page': '1',
            'page': '1'
        })
            .then(response => {
                return this.productValidator.filterValidProduct(response.book)
            })
            .catch((e: unknown) => {
                this.errorWrapper.handle(e)
                throw e
            })
    }

    getProductUpdate = async (): Promise<BookProduct[]> => {
        let now = new Date(),
            dateThreshold = new Date(now);
        dateThreshold.setMinutes(now.getMinutes() - 5);

        return this.bookFileHandler.getProduct({
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