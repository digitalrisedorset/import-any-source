"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheService = void 0;
const NodeCache = require('node-cache');
class CacheService {
    constructor(ttlSeconds, cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false })) {
        this.ttlSeconds = ttlSeconds;
        this.cache = cache;
    }
    get(key, storeFunction) {
        const value = this.cache.get(key);
        if (value) {
            return Promise.resolve(value);
        }
        return storeFunction().then((result) => {
            this.cache.set(key, result);
            return result;
        });
    }
    del(keys) {
        this.cache.del(keys);
    }
    delStartWith(startStr = '') {
        if (!startStr) {
            return;
        }
        const keys = this.cache.keys();
        for (const key of keys) {
            if (key.indexOf(startStr) === 0) {
                this.del(key);
            }
        }
    }
    flush() {
        this.cache.flushAll();
    }
}
exports.CacheService = CacheService;
