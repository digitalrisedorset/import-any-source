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
    },
    import: {
        csv_folder: string
    },
    cache: {
        redis: {
            host: string,
            port: number
        }
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

    import: {
        csv_folder: (process.env.IMPORT_CSV_FOLDER === undefined)? '/home/herve/Project/import-attribute-reader/csv_import': process.env.IMPORT_CSV_FOLDER
    },

    cache: {
        redis: {
            host: (process.env.REDIS_HOST === undefined)? 'localhost': process.env.REDIS_HOST,
            port: (process.env.REDIS_PORT === undefined)? 6379: Number(process.env.REDIS_PORT),
        }
    }
}