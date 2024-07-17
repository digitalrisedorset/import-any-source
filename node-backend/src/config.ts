const dotenv = require('dotenv');
dotenv.config();
const appRoot = require('app-root-path');

export type configInfo = {
    port: number;
    frontendUrl: string;
    woocommerce: {
        apiUrl: string,
        apiKey: string,
        apiSecret: string
        webhookSecret: string
    },
    route: {
        apiPrefix: string;
        woocommerceApiPrefix: string;
    },
    import: {
        csvFolder: string
    },
    rootDir: string,
    cache: {
        redis: {
            host: string,
            port: number,
            username: string,
            password: string
        },
        fs: {
            folder: string
        }
    }
}

export const config: configInfo = {
    port: (process.env.PORT === undefined)? 8080: Number(process.env.PORT),

    frontendUrl: (process.env.FRONTEND_URL === undefined)?'http://localhost:3001':process.env.FRONTEND_URL,

    woocommerce: {
        apiUrl: (process.env.WOOMMERCE_API_URL === undefined)?'localhost':process.env.WOOMMERCE_API_URL,
        apiKey: (process.env.WOOCOMMERCE_KEY === undefined)?'dddfsaafdsg': process.env.WOOCOMMERCE_KEY,
        apiSecret: (process.env.WOOCOMMERCE_SECRET === undefined)? 'rifjrjr': process.env.WOOCOMMERCE_SECRET,
        webhookSecret: (process.env.WEBHOOK_SECRET === undefined)? 'fggfdhdth': process.env.WEBHOOK_SECRET,
    },

    /**
     * Routes access
     */
    route: {
        apiPrefix: '/',
        woocommerceApiPrefix: '/woo'
    },

    import: {
        csvFolder: (process.env.IMPORT_CSV_FOLDER === undefined)? 'csv_import': process.env.IMPORT_CSV_FOLDER,
    },
    rootDir: appRoot.resolve('/'),

    cache: {
        redis: {
            host: (process.env.REDIS_HOST === undefined)? 'localhost': process.env.REDIS_HOST,
            port: (process.env.REDIS_PORT === undefined)? 6379: Number(process.env.REDIS_PORT),
            username: (process.env.REDIS_USERNAME === undefined)? 'default': process.env.REDIS_USERNAME,
            password: (process.env.REDIS_PASSWORD === undefined)? 'dlldde': process.env.REDIS_PASSWORD,
        },
        fs: {
            folder: (process.env.FS_CACHE_FOLDER === undefined)? 'fs_cache': process.env.FS_CACHE_FOLDER
        }
    }
}