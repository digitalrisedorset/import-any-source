const dotenv = require('dotenv');
dotenv.config();

export type configInfo = {
    frontend: {
        host: string,
        port: number
    },
    database: {
        name: string,
        host: string,
        user: string,
        password: string,
        port: number
    }
}

const config: configInfo = {
    frontend: {
        host: (process.env.FRONTEND_HOST === undefined)?'localhost':process.env.FRONTEND_HOST,
        port: (process.env.FRONTEND_HOST === undefined)?3001:Number(process.env.FRONTEND_PORT)
    },
    database: {
        name: (process.env.DB_DATABASE === undefined)?'keystone_import':process.env.DB_DATABASE,
        host: (process.env.DB_HOST === undefined)?'localhost':process.env.DB_HOST,
        user: (process.env.DB_USER === undefined)?'keystone_user':process.env.DB_USER,
        password: (process.env.DB_PWD === undefined)?'passw0rd':process.env.DB_PWD,
        port: (process.env.DB_PORT === undefined)?'3306':process.env.DB_PORT
    }
}

export { config as keystoneconfig}