import {keystoneconfig} from '../config'

export const getDatabaseType = () => {
    const {database} = keystoneconfig

    return database.dbtype
}

export const getDatabaseConnection = () => {
    const {database} = keystoneconfig

    const dbPrefix = (database.dbtype==='mysql')?'mysql':'postgres'

    return `${dbPrefix}://${database.user}:${database.password}@${database.host}:${database.port}/${database.name}`
}

export const getShadowDatabaseConnection = () => {
    const {database} = keystoneconfig

    const dbPrefix = (database.dbtype==='mysql')?'mysql':'postgres'

    return `${dbPrefix}://${database.user}:${database.password}@${database.host}:${database.port}/shadowdb`
}