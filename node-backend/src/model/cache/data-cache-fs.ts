import { config } from '../../config'
import path from "path";
import { CacheKeyBuilder } from './cache-key-builder'
const fs = require('fs');

export class FsCacheService {
    private cacheKeyBuilder
    constructor(prefix: string) {
        this.cacheKeyBuilder = new CacheKeyBuilder(prefix)
    }
    set = (key: Readonly<string>, value: any) => {
        let result = this.readAll()
        key = this.cacheKeyBuilder.getKey(key)
        result[key] = value
        console.log(`fscache set data ${key}`)
        fs.writeFileSync(this.getCacheFile(), JSON.stringify(result, null, 5));
    }
    readAll = () => {
        let data = fs.readFileSync(this.getCacheFile(), { encoding: 'utf8', flag: 'r' })
        if (data === '') {
            return {}
        }
        return JSON.parse(data)
    }
    read = (key: Readonly<string>) => {
        key = this.cacheKeyBuilder.getKey(key)
        const data = this.readAll()
        console.log(`fscache read data ${key}`)

        return data[key]
    }
    getCacheFile = () => {
        const filepath = path.resolve(config.cache.fs.folder, 'cache.txt')

        if (!fs.existsSync(filepath)) {
            fs.mkdir(config.cache.fs.folder, { recursive: true }, (err: unknown) => {
                if (err) throw err;
            });
            fs.writeFileSync(filepath, '', { flag: 'a+' });
        }

        return filepath
    }
}