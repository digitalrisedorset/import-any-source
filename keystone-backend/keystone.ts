import { config } from '@keystone-6/core'
import { fixPrismaPath } from './example-utils'
import type { TypeInfo } from '.keystone/types'
import { withAuth } from "./auth";
import { statelessSessions } from '@keystone-6/core/session';
import { type Session, lists } from './schema'
import { getDatabaseConnection } from './schemas/config'
import {keystoneconfig} from './config'

// WARNING: you need to change this
const sessionSecret = '-- DEV COOKIE SECRET; CHANGE ME --'

// statelessSessions uses cookies for session tracking
//   these cookies have an expiry, in seconds
//   we use an expiry of one hour for this example
const sessionMaxAge = 60 * 60

console.log(`Keystone frontend: http://${keystoneconfig.frontend.host}`)

export default withAuth<TypeInfo<Session>>(
    config<TypeInfo>({
        server: {
            cors: { origin: [`http://${keystoneconfig.frontend.host}`], credentials: true },
            port: 3000,
            maxFileSize: 200 * 1024 * 1024,
            extendExpressApp: async (app, commonContext) => { /* ... */ },
            extendHttpServer: async (httpServer, commonContext) => { /* ... */ },
        },
        db: {
            provider: 'sqlite',
            url: process.env.DATABASE_URL || 'file:./keystone-example.db',

            // WARNING: this is only needed for our monorepo examples, dont do this
            ...fixPrismaPath,
        },
        lists,
        ui: {
            // only admins can view the AdminUI
            isAccessAllowed: (context) => {
                return context.session?.data?.isAdmin ?? false
            },
        },
        // you can find out more at https://keystonejs.com/docs/apis/session#session-api
        session: statelessSessions({
            // the maxAge option controls how long session cookies are valid for before they expire
            maxAge: sessionMaxAge,
            // the session secret is used to encrypt cookie data
            secret: sessionSecret,
        })
    })
)