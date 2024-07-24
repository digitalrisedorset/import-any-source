export class CacheKeyBuilder {
    private cachePrefix: string
    constructor(prefix: string) {
        this.cachePrefix = prefix
    }
    getKey = (key: string): string => {
        if (this.cachePrefix ==='') {
            return key
        }

        return `${this.cachePrefix}_${key}`
    }
}