const fetch = require("cross-fetch");

const ttl = 60 * 60 * 1; // cache for 1 Hour
let ApiHandler = function() {
    this.errors = []
}

ApiHandler.prototype.callApiUrl = async function (apiSuffix, filter = null) {
    let apiUrl = `${process.env.WOOMMERCE_API_URL}${apiSuffix}?consumer_key=${process.env.WOOCOMMERCE_KEY}&consumer_secret=${process.env.WOOCOMMERCE_SECRET}`

    if (filter !== null) {
      Object.keys(filter).forEach(function(key) {
        apiUrl += `&${key}=${filter[key]}`
      });
    }

    const res = await fetch(apiUrl, {
        method: "get",
    })

    if (res.ok) {
        return await res.json();
    }

    return null;
}

module.exports = ApiHandler;
