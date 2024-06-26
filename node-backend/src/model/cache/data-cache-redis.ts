const redis  = require("redis")

export class CacheService {
    redisClientInit = async () => {
        const client = redis.createClient(6379, "localhost");

        client.on("error", function (err: string) {
            console.log("Redis error encountered", err);
        });

        //client.on("end", function() {});

        await client.connect();

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
        const redis = await this.redisClientInit()
        const response = await redis.set(key, JSON.stringify(value));
        await redis.quit();

        return response
    }
    read = async (key: string) => {
        const redis = await this.redisClientInit()

        const cacheValue = await redis.get(key);
        if (cacheValue) {
            await redis.quit();
            return JSON.parse(cacheValue);
        }
    }
    del = async (keys: string)=> {
        const redis = await this.redisClientInit()
        redis.del(keys);
    }
}