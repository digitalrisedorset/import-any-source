const cacheService = require('./data-cache')
const woocommerceApiHandler = require('./woocommerce/api-handler')
const woocommerceDataFilter = require('./woocommerce/data-filter')

const ttl = 60 * 60 * 48; // cache for 48 Hour

let Woocommerce = function() {
    this.errors = []
    this.cache = new cacheService(ttl);
    this.woocommerceApiHandler = new woocommerceApiHandler;
    this.woocommerceDataFilter = new woocommerceDataFilter;
}

Woocommerce.prototype.getAttributeList = async function() {
    const attributesOptions = await this.cache.get('getOptionAttributes', async () => {
        return await this.getOptionAttributes()
    });

    const attributesToLink = await this.cache.get('getAttributeListFromProduct', async () => {
        return await this.getAttributeListFromProduct()
    });

    return [...attributesOptions,  ...attributesToLink]
}

Woocommerce.prototype.getOptionAttributes = async function() {
    let result = await this.woocommerceApiHandler.callApiUrl('products/attributes')

    if (result === null) {
      return [];
    }
        
    const attributes = [];
    for(let i = 0; i < result.length; i++) {
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
}

Woocommerce.prototype.getAttributeListFromProduct = async function() {
    let result = await this.woocommerceApiHandler.callApiUrl('products', {
        'per_page':'1',
        'page':'1'
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
}

module.exports = Woocommerce;
