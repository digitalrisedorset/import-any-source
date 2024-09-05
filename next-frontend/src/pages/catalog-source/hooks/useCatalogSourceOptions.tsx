import {CATALOG_SOURCE_SYSTEM} from "@/pages/types/catalog-source";

export const getCatalogSourceOptions = () => {
    return Object
        .keys(CATALOG_SOURCE_SYSTEM)
        .filter((v) => isNaN(Number(v)))
        .map((key, item) => {
            return {
                value: key,
                label: getCatalogSourceLabel(key)
            }
        })
}

export const getCatalogSourceInitialStates = () => {
    return Object
        .keys(CATALOG_SOURCE_SYSTEM)
        .filter((v) => isNaN(Number(v)))
        .map((key, item) => {
            return {
                name: key,
                active: false,
                numberCatalogSourceAttributes: 0,
                magentoMapping: 0,
                ignoredAttributes: 0
            }
        })
}

export const getActiveSystemLabel = (systemCode: string): string => {
    if (systemCode === '') {
        return 'CATALOG_SOURCE'
    }

    return getCatalogSourceLabel(systemCode)
}

const getCatalogSourceLabel = (systemCode: string): string => {
    const enumKeys = Object.keys(CATALOG_SOURCE_SYSTEM).filter(k => isNaN(Number(k)))
    const enumValues = Object.values(CATALOG_SOURCE_SYSTEM).filter((o) => typeof o == 'string');

    let result: any = []
    enumKeys.forEach((value: string, key: number) => {
        result[value] = enumValues[key]
    })
    return result[systemCode]
}