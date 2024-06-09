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
exports.ApiHandler = void 0;
const fetch = require("cross-fetch");
const ttl = 60 * 60 * 1; // cache for 1 Hour
class ApiHandler {
    constructor() {
        this.errors = [];
        this.callApiUrl = (apiSuffix, filter = null) => __awaiter(this, void 0, void 0, function* () {
            let apiUrl = `${process.env.WOOMMERCE_API_URL}${apiSuffix}?consumer_key=${process.env.WOOCOMMERCE_KEY}&consumer_secret=${process.env.WOOCOMMERCE_SECRET}`;
            if (filter !== null) {
                Object.keys(filter).forEach(function (key) {
                    apiUrl += `&${key}=${filter[key]}`;
                });
            }
            const res = yield fetch(apiUrl, {
                method: "get",
            });
            if (!res.ok) {
                throw new Error('The product API failed'); // res.errors?.message)
            }
            return yield res.json();
        });
    }
}
exports.ApiHandler = ApiHandler;
