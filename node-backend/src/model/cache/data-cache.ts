const NodeCache = require('node-cache');

const ttlSeconds = 60 * 60 * 365; // cache for 48 Hour
global
const cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });

export class CacheService {
    get(key: string, storeFunction: any) {
        const value = cache.get(key);
        if (value) {
            return Promise.resolve(value);
        }

        return storeFunction().then((result: any) => {
            cache.set(key, result);
            return result;
        });
    }
    del(keys: string) {
        cache.del(keys);
    }
    delStartWith(startStr = '') {
        if (!startStr) {
            return;
        }

        const keys = cache.keys();
        for (const key of keys) {
            if (key.indexOf(startStr) === 0) {
                this.del(key);
            }
        }
    }
    flush() {
        cache.flushAll();
    }
}