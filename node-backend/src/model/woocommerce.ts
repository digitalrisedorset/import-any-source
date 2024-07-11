import { CacheService } from './cache/data-cache'
import { ApiHandler } from './woocommerce/api-handler'

enum OptionAttributeType {
    options = 'options',
    other = 'unknown',
}

interface OptionAttribute {
    code: string,
    name: string,
    type: OptionAttributeType
}

export class Woocommerce {
    cache = new CacheService();
    woocommerceApiHandler = new ApiHandler;
    getAttributeList = async () => {
        const attributesOptions = await this.cache.get('getOptionAttributes', async () => {
            return await this.getOptionAttributes()
        });
        const attributesToLink = await this.cache.get('getAttributeListFromProduct', async () => {
            return await this.getAttributeListFromProduct()
        });

        return [...attributesOptions, ...attributesToLink]
    }
    getOptionAttributes = async () => {
        const result = await this.woocommerceApiHandler.callApiUrl('products/attributes')

        if (result === null) {
            return [];
        }

       return  result.map(elem => {
           return {
                code: elem['slug'],
                name: elem['name'],
                type: OptionAttributeType.options
            }
        })
    };
    getAttributeListFromProduct = async () => {
        let result = await this.woocommerceApiHandler.callApiUrl('products', {
            'per_page': '1',
            'page': '1'
        })

        if (result === null) {
            return [];
        }

        const attributes: OptionAttribute[] = [];
        let record = result[0];

        Object.keys(record).forEach((key, index) => {
            attributes.push({
                code: key,
                name: key,
                type: OptionAttributeType.other
            });
        });

        return attributes;
    };
    getProductBatch = async () => {
        let result = await this.woocommerceApiHandler.callApiUrl('products', {
            'per_page': process.env.IMPORT_BATCH_SIZE,
            'page': 1,
           // 'sku': 'woo-vneck-tee-blue'
        })

        if (result === null) {
            return [];
        }

        return result;
    }

    getProductUpdate = async () => {
        let now = new Date (),
            dateThreshold = new Date ( now );
        dateThreshold.setMinutes ( now.getMinutes() - 5 );

        let result = await this.woocommerceApiHandler.callApiUrl('products', {
            'per_page': process.env.IMPORT_BATCH_SIZE,
            'page': 1,
            'modified_after': dateThreshold.toISOString()
        })

        if (result === null) {
            return [];
        }

        return result;
    }
}
