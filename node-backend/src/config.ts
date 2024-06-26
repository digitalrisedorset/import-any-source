const dotenv = require('dotenv');
dotenv.config();

export type configInfo = {
    port: number;
    woocommerce: {
        apiUrl: string,
        apiKey: string,
        apiSecret: string
    },
    route: {
        apiPrefix: string;
    }
}

export const config: configInfo = {
    port: (process.env.PORT === undefined)? 8080: Number(process.env.PORT),

    woocommerce: {
        apiUrl: (process.env.WOOMMERCE_API_URL === undefined)?'localhost':process.env.WOOMMERCE_API_URL,
        apiKey: (process.env.WOOCOMMERCE_KEY === undefined)?'dddfsaafdsg': process.env.WOOCOMMERCE_KEY,
        apiSecret: (process.env.WOOCOMMERCE_SECRET === undefined)? 'rifjrjr': process.env.WOOCOMMERCE_SECRET
    },

    /**
     * Routes config
     */
    route: {
        apiPrefix: '/'
    },
}