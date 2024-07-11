import {config} from '../../config'
import path from "path";
const fs = require('fs');

export class FsCacheService {
    set = (key: Readonly<string>, value: any) => {
        let result = this.readAll()
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
        const data = this.readAll()
        console.log(`fscache read data ${key}`)

        return data[key]
    }
    getCacheFile = () => {
        return path.resolve(config.cache.fs.folder, 'cache.txt')
    }
}