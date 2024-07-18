const NodeCache = require('node-cache');

const ttlSeconds = 60 * 60 * 365; // cache for 48 Hour
global
const cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });

export class CacheService {
    constructor(prefix: string) {
        this.cachePrefix = prefix
    }
    get = async (key: Readonly<string>, storeFunction: any) => {
        const value = cache.get(this.buildKey(key));
        if (value) {
            return Promise.resolve(value);
        }

        return storeFunction().then((result: any) => {
            cache.set(this.buildKey(key), result);
            return result;
        });
    }
    del(keys: string) {
        cache.del(keys);
    }
    buildKey = (key: string) => {
        if (this.cachePrefix ==='') {
            return key
        }

        return `${this.cachePrefix}_${key}`
    }
}