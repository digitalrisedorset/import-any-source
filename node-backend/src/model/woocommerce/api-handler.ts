import {ApiFilter} from "../../types/woocommerce";
import {config} from "../../config";

const fetch = require("cross-fetch");

export class ApiHandler {
    errors = []

    callApiUrl = async (apiSuffix: Readonly<string>, filter: Readonly<ApiFilter> | null = null) => {
        let apiUrl = `${config.woocommerce.apiUrl}${apiSuffix}?consumer_key=${config.woocommerce.apiKey}&consumer_secret=${config.woocommerce.apiSecret}`

        if (filter !== null) {
            Object.keys(filter).forEach(function(key) {
                apiUrl += `&${key}=${filter[key]}`
            });
        }

        const res = await fetch(apiUrl, {
            method: "get",
        })

        if (!res.ok) {
            throw new Error('The product API failed')  // res.errors?.message)
        }

        return await res.json();
    }
}
