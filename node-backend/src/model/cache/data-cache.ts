import {CacheKeyBuilder} from "./cache-key-builder";

const NodeCache = require('node-cache');

const ttlSeconds = 60 * 60 * 365; // cache for 48 Hour
global
const cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });

export class CacheService {
    private cacheKeyBuilder: CacheKeyBuilder
    constructor(prefix: string) {
        this.cacheKeyBuilder = new CacheKeyBuilder(prefix)
    }
    get = async (key: Readonly<string>, storeFunction: any) => {
        const value: unknown = cache.get(this.cacheKeyBuilder.getKey(key));
        if (value !== undefined) {
            return Promise.resolve(value);
        }

        return storeFunction().then((result: unknown) => {
            cache.set(this.cacheKeyBuilder.getKey(key), result);
            return result;
        });
    }
}