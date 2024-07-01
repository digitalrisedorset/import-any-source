import {config} from '../../config'
import path from "path";
const fs = require('fs');

export class FsCacheService {
    set = (key: string, value: any) => {
        let result = this.readAll()
        console.log('readAll', result)
        result[key] = value
        console.log(`fscache set data ${key}`)
        fs.writeFileSync(this.getCacheFile(), JSON.stringify(result, null, 5));
    }
    readAll = () => {
        let data = fs.readFileSync(this.getCacheFile(), { encoding: 'utf8', flag: 'r' })
        console.log('readAll', data)
        if (data === '') {
            return {}
        }
        return JSON.parse(data)
    }
    read = (key: string) => {
        const data = this.readAll()
        console.log(`fscache read data ${key}`)

        return data[key]
    }
    getCacheFile = () => {
        return path.resolve(config.cache.fs.folder, 'cache.txt')
    }

    isActive = (): boolean => {
        try {
            const data = require(this.getCacheFile())
            if (data !== undefined) {
                return true
            }
        } catch (e) {
            return false;
        }
        return false;
    }
}