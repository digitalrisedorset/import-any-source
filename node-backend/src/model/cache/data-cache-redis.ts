import { createClient } from 'redis';
import {config} from '../../config'

export class CacheService {
    redisClientInit = async () => {
        const {username,password,host,port} = config.cache.redis
        const client = await createClient({
            url: `redis://default:${password}@${host}:${port}`
        })
        .on('error', err => console.log('Redis Client Error', err))
        .connect();

        return client;
    }
    async getAndStore(key: string, storeFunction: any) {
        const redis = await this.redisClientInit()

        const value = storeFunction().then(async (result: any) => {
            await redis.set(key, result);
            return result;
        });

        const cacheValue = await redis.get(key);
        if (cacheValue) {
            await redis.quit();
            return Promise.resolve(cacheValue);
        }
    }
    async getOnly(key: string) {
        const redis = await this.redisClientInit()

        const cacheValue = await redis.get(key);
        if (cacheValue) {
            await redis.quit();
            return Promise.resolve(cacheValue);
        }
    }
    set = async (key: string, value: any) => {
        try {
            const redis = await this.redisClientInit()

            const response = await redis.set(key, JSON.stringify(value));
            await redis.quit();

            return response
        } catch (e) {

        }
    }
    read = async (key: string) => {
        const redis = await this.redisClientInit()

        const cacheValue = await redis.get(key);
        if (cacheValue) {
            await redis.quit();
            return JSON.parse(cacheValue);
        }
        await redis.quit();
    }
    del = async (keys: string)=> {
        const redis = await this.redisClientInit()
        redis.del(keys);
    }
}