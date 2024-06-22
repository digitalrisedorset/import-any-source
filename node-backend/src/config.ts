// const dotenv = require('dotenv');
// dotenv.config();

export type configInfo = {
    port: number;
    route: {
        apiPrefix: string;
    }
}

export const config: configInfo = {
    port: (process.env.PORT === undefined)? 8080: Number(process.env.PORT),

    woocommerce: {
        apiUrl: process.env.WOOMMERCE_API_URL,
        apiKey: process.env.WOOCOMMERCE_KEY,
        apiSecret: process.env.WOOCOMMERCE_SECRET
    },

    /**
     * Routes config
     */
    route: {
        apiPrefix: '/api'
    },
}