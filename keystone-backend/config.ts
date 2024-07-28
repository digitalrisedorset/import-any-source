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
    },
    session: {
        cookieSecret: string
    }
}

const config: configInfo = {
    frontend: {
        host: (process.env.FRONTEND_HOST === undefined)?'localhost':process.env.FRONTEND_HOST,
        port: (process.env.FRONTEND_HOST === undefined)?3001:Number(process.env.FRONTEND_PORT)
    },
    database: {
        dbtype: (process.env.DB_TYPE === undefined)?'postgresql':process.env.DB_TYPE,
        name: (process.env.DB_DATABASE === undefined)?'template1':process.env.DB_DATABASE,
        host: (process.env.DB_HOST === undefined)?'localhost':process.env.DB_HOST,
        user: (process.env.DB_USER === undefined)?'postgres':process.env.DB_USER,
        password: (process.env.DB_PWD === undefined)?'passw0rd':process.env.DB_PWD,
        port: (process.env.DB_PORT === undefined)?'3306':process.env.DB_PORT
    },
    session: {
        cookieSecret: (process.env.COOKIE_SECRET === undefined)?'this is a very long secret that has 32 characters':process.env.COOKIE_SECRET
    }
}

export { config as keystoneconfig}