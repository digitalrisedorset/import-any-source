import {getContext} from '@keystone-6/core/context'
import * as PrismaModule from '.myprisma/client'
import config from './keystone'

export async function main () {
    const context = getContext(config, PrismaModule)

    console.log(`🌱 Deleting attributes data`)

    // const deleteCatalogSourceAttributes = async () => {
    //     await context.query.CatalogSourceAttribute.delete()
    // }
    //
    // const deleteMagentoAttributes = async () => {
    //     await context.query.MagentoAttribute.delete()
    // }
    //
    // deleteCatalogSourceAttributes()
    // deleteMagentoAttributes()

    console.log(`✅ Attributes deleted`)
}

main()
