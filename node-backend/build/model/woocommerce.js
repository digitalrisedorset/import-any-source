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
exports.Woocommerce = void 0;
const data_cache_1 = require("./data-cache");
const api_handler_1 = require("./woocommerce/api-handler");
const data_variation_1 = require("./woocommerce/data-variation");
const ttl = 60 * 60 * 365; // cache for 48 Hour
var OptionAttributeType;
(function (OptionAttributeType) {
    OptionAttributeType["options"] = "options";
    OptionAttributeType["other"] = "unknown";
})(OptionAttributeType || (OptionAttributeType = {}));
class Woocommerce {
    constructor() {
        this.errors = [];
        this.cache = new data_cache_1.CacheService(ttl);
        this.woocommerceApiHandler = new api_handler_1.ApiHandler;
        this.woocommerceDataVariations = new data_variation_1.WoocommerceDataVariations;
        this.getAttributeList = () => __awaiter(this, void 0, void 0, function* () {
            const attributesOptions = yield this.cache.get('getOptionAttributes', () => __awaiter(this, void 0, void 0, function* () {
                return yield this.getOptionAttributes();
            }));
            const attributesToLink = yield this.cache.get('getAttributeListFromProduct', () => __awaiter(this, void 0, void 0, function* () {
                return yield this.getAttributeListFromProduct();
            }));
            return [...attributesOptions, ...attributesToLink];
        });
        this.getOptionAttributes = () => __awaiter(this, void 0, void 0, function* () {
            let result = yield this.woocommerceApiHandler.callApiUrl('products/attributes');
            if (result === null) {
                return [];
            }
            const attributes = [];
            for (let i = 0; i < result.length; i++) {
                let elem = result[i];
                attributes.push({
                    code: elem['slug'],
                    name: elem['name'],
                    type: OptionAttributeType.options
                });
            }
            return attributes;
        });
        this.getAttributeListFromProduct = () => __awaiter(this, void 0, void 0, function* () {
            let result = yield this.woocommerceApiHandler.callApiUrl('products', {
                'per_page': '1',
                'page': '1'
            });
            if (result === null) {
                return [];
            }
            const attributes = [];
            let record = result[0];
            Object.keys(record).forEach((key, index) => {
                attributes.push({
                    code: key,
                    name: key,
                    type: OptionAttributeType.other
                });
            });
            return attributes;
        });
        this.getProductBatch = () => __awaiter(this, void 0, void 0, function* () {
            let result = yield this.woocommerceApiHandler.callApiUrl('products', {
                'per_page': process.env.IMPORT_BATCH_SIZE,
                'page': 1
            });
            if (result === null) {
                return [];
            }
            result = yield this.woocommerceDataVariations.aggregateVariationData(result);
            debugger;
            return result;
        });
    }
}
exports.Woocommerce = Woocommerce;
