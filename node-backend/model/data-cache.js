const NodeCache = require('node-cache');

let CacheService = function(ttlSeconds) {
    this.cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });
}

CacheService.prototype.get = function (key, storeFunction) {
    const value = this.cache.get(key);
    if (value) {
        return Promise.resolve(value);
    }

    return storeFunction().then((result) => {
        this.cache.set(key, result);
        return result;
    });
}

CacheService.prototype.del = function (keys) {
    this.cache.del(keys);
}

CacheService.prototype.delStartWith = function(startStr = '') {
    if (!startStr) {
        return;
    }

    const keys = this.cache.keys();
    for (const key of keys) {
        if (key.indexOf(startStr) === 0) {
            this.del(key);
        }
    }
}

CacheService.prototype.flush = function() {
    this.cache.flushAll();
}

module.exports = CacheService;