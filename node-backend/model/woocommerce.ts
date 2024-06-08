const cacheService = require('./data-cache')
const woocommerceApiHandler = require('./woocommerce/api-handler')
const woocommerceDataFilter = require('./woocommerce/data-filter')
const woocommerceDataVariations = require('./woocommerce/data-variation')

const ttl = 60 * 60 * 365; // cache for 48 Hour

class Woocommerce {
    errors = [];
    cache = new cacheService(ttl);
    woocommerceApiHandler = new woocommerceApiHandler;
    woocommerceDataFilter = new woocommerceDataFilter;
    woocommerceDataVariations = new woocommerceDataVariations;
    getAttributeList = async function () {
        const attributesOptions = await this.cache.get('getOptionAttributes', async () => {
            return await this.getOptionAttributes()
        });
        const attributesToLink = await this.cache.get('getAttributeListFromProduct', async () => {
            return await this.getAttributeListFromProduct()
        });

        return [...attributesOptions, ...attributesToLink]
    }
    getOptionAttributes = async function () {
        let result = await this.woocommerceApiHandler.callApiUrl('products/attributes')

        if (result === null) {
            return [];
        }

        const attributes = [];
        for (let i = 0; i < result.length; i++) {
            let elem = result[i];
            if (this.woocommerceDataFilter.checkAttributeFromKey(elem['slug'])) {
                attributes.push({
                    code: elem['slug'],
                    name: elem['name'],
                    type: 'options'
                });
            }
        }

        return attributes;
    };
    getAttributeListFromProduct = async function () {
        let result = await this.woocommerceApiHandler.callApiUrl('products', {
            'per_page': '1',
            'page': '1'
        })

        if (result === null) {
            return [];
        }

        const attributes = [];
        let record = result[0];

        Object.keys(record).forEach((key, index) => {
            if (this.woocommerceDataFilter.checkAttributeFromKey(key)) {
                attributes.push({
                    code: key,
                    name: key,
                    type: 'unknown'
                });
            }
        });

        return attributes;
    };
    getProductBatch = async function (mappingFields) {
        let result = await this.woocommerceApiHandler.callApiUrl('products', {
            'per_page': process.env.IMPORT_BATCH_SIZE,
            'page': 1
        })

        if (result === null) {
            return [];
        }

        result = this.woocommerceDataVariations.aggregateVariationData(result)

        return result;
    }
}

module.exports = Woocommerce;
