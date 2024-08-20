import {CATALOG_SOURCE_SYSTEM} from "../../types/catalog-source";

export class CatalogSourceHandler {
    getCatalogSourceOptions = () => {
        return Object
            .keys(CATALOG_SOURCE_SYSTEM)
            .filter((v) => isNaN(Number(v)))
            .map((key, item) => {
                return {
                    value: key,
                    label: this.getCatalogSourceLabel(key)
                }
            })
    }

    getCatalogSourceInitialStates = () => {
        return Object
            .keys(CATALOG_SOURCE_SYSTEM)
            .filter((v) => isNaN(Number(v)))
            .map((key, item) => {
                return {
                    name: key,
                    active: false,
                    catalogSourceAttributes: 0,
                    magentoMapping: 0,
                    ignoredAttributes: 0
                }
            })
    }

    getActiveSystemLabel = (systemCode: string): string => {
        if (systemCode === '') {
            return 'CATALOG_SOURCE'
        }

        return this.getCatalogSourceLabel(systemCode)
    }

    getCatalogSourceLabel = (systemCode: string): string => {
        const enumKeys = Object.keys(CATALOG_SOURCE_SYSTEM).filter(k => isNaN(Number(k)))
        const enumValues = Object.values(CATALOG_SOURCE_SYSTEM).filter((o) => typeof o == 'string');

        let result: any = []
        enumKeys.forEach((value: string, key: number) => {
            result[value] = enumValues[key]
        })
        return result[systemCode]
    }
}