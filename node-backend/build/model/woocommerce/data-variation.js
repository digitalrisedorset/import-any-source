"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WoocommerceDataVariations = void 0;
const api_handler_1 = require("./api-handler");
class WoocommerceDataVariations {
    constructor() {
        this.woocommerceApiHandler = new api_handler_1.ApiHandler;
        this.aggregateVariationData = (productData) => __awaiter(this, void 0, void 0, function* () {
            productData = yield Promise.all(productData.map((product) => __awaiter(this, void 0, void 0, function* () {
                if (product['variations'] && product['variations'].length > 0) {
                    product['variations_for_csv'] = yield Promise.all(product['variations'].map((variationId) => __awaiter(this, void 0, void 0, function* () {
                        return yield this.getVariationForProduct(product['id'], variationId);
                    }), this));
                }
                return product;
            })));
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
        });
        this.getVariationForProduct = (productId, variationId) => __awaiter(this, void 0, void 0, function* () {
            return yield this.woocommerceApiHandler.callApiUrl(`products/${productId}/variations/${variationId}`, []);
        });
    }
}
exports.WoocommerceDataVariations = WoocommerceDataVariations;
