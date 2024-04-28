import { config } from '@keystone-6/core'
import { fixPrismaPath } from './example-utils'
import { lists } from './schema'
import type { TypeInfo } from '.keystone/types'

export default config<TypeInfo>({
    server: {
        cors: { origin: ['http://localhost:3001'], credentials: true },
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
})
