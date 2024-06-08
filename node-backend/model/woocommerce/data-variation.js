const woocommerceApiHandler = require('../woocommerce/api-handler')
const cacheService = require('../data-cache')

class WoocommerceDataVariations {
    woocommerceApiHandler = new woocommerceApiHandler;

    aggregateVariationData = async function(productData) {         
        productData = await Promise.all(productData.map(async product => {
            if (product['variations'] && product['variations'].length>0) {
                product['variations'] = await Promise.all(product['variations'].map(async variationId => {
                    return await this.getVariationForProduct(product['id'], variationId)
                }, this))
            }

            return product
        }))

        // let productResult = []  
        //        
        // for (let i=0; i < productData.length; i++) {
        //     const product = productData[i]
        //     if (product['variations'] && product['variations'].length>0) {
        //         //let result = []
        //         // for (let i=0; i < product['variations'].length; i++) {
        //         //     const variationId = product['variations'][i]
        //         //     const variationData = await this.getVariationForProduct(product['id'], variationId)
                    
        //         //     result.push(variationData)
        //         // }
        //         product['variations'] = await Promise.all(product['variations'].map(async variationId => {
        //             return await this.getVariationForProduct(product['id'], variationId)
        //         }, this))
        //     }

        //     productResult.push(product)
        // }

        // productData = productResult

        return productData;    
    }

    getVariationForProduct = async function(productId, variationId) {
        const variationData = await this.woocommerceApiHandler.callApiUrl(`products/${productId}/variations/${variationId}`, []);
        return variationData
    }
}

module.exports = WoocommerceDataVariations;