import { config } from '@keystone-6/core'
import { fixPrismaPath } from './example-utils'
import type { TypeInfo } from '.keystone/types'
import { withAuth } from "./auth";
import { statelessSessions } from '@keystone-6/core/session';
import { type Session, lists } from './schema'
import {getDatabaseConnection, getDatabaseType, getShadowDatabaseConnection} from './schemas/config'
import {keystoneconfig} from './config'

const sessionConfig = {
    maxAge: 60 * 60, // How long they stay signed in?
    secret: 'this is a very long secret that has 32 characters',// keystoneconfig.session.cookieSecret,
};

console.log(`Keystone frontend: ${keystoneconfig.frontend.host}`)
console.log(`database ${getDatabaseConnection()}`)

export default withAuth<TypeInfo<Session>>(
    config<TypeInfo>({
        server: {
            cors: { origin: [keystoneconfig.frontend.host], credentials: true },
            port: 3000,
            maxFileSize: 200 * 1024 * 1024,
            extendExpressApp: async (app, commonContext) => { /* ... */ },
            extendHttpServer: async (httpServer, commonContext) => { /* ... */ },
        },
        // db: {
        //     provider: 'sqlite',
        //     url: process.env.DATABASE_URL || 'file:./keystone-example.db',
        //
        //     // WARNING: this is only needed for our monorepo examples, dont do this
        //     ...fixPrismaPath,
        // },
        db: {
            provider: getDatabaseType(),
            url: getDatabaseConnection(),
            onConnect: async context => { /* ... */ },
            //Optional advanced configuration
            enableLogging: true,
            idField: { kind: 'uuid' }
        },
        lists,
        ui: {
            // only admins can view the AdminUI
            isAccessAllowed: (context) => {
                return context.session?.data?.isAdmin ?? false
            },
        },
        // you can find out more at https://keystonejs.com/docs/apis/session#session-api
        session: statelessSessions(sessionConfig)
    })
)