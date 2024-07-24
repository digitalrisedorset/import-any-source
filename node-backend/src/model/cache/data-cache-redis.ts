import {createClient} from 'redis';
import {config} from '../../config'
import {CacheKeyBuilder} from "./cache-key-builder";

export class CacheService {
    private cacheKeyBuilder
    constructor(prefix: string) {
        this.cacheKeyBuilder = new CacheKeyBuilder(prefix)
    }
    redisClientInit = async () => {
        const {username,password,host,port} = config.cache.redis
        return await createClient({
            url: `redis://default:${password}@${host}:${port}`
        })
            .on('error', err => console.log('Redis Client Error', err))
            .connect();
    }
    set = async (key: string, value: any) => {
        try {
            const redis = await this.redisClientInit()
            key = this.cacheKeyBuilder.getKey(key)

            const response = await redis.set(key, JSON.stringify(value));
            await redis.quit();

            return response
        } catch (e) {

        }
    }
    read = async (key: string) => {
        const redis = await this.redisClientInit()
        key = this.cacheKeyBuilder.getKey(key)

        const cacheValue = await redis.get(key);
        if (cacheValue) {
            await redis.quit();
            return JSON.parse(cacheValue);
        }
        await redis.quit();
    }
}