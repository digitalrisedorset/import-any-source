import {keystoneconfig} from '../config'

export const getDatabaseConnection = () => {
    const {database} = keystoneconfig

    return `mysql://${database.user}:${database.password}@${database.host}:${database.port}/${database.name}`
}