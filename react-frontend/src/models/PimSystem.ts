import {PIM_SYSTEM} from "../types/pim";

export class PimSystemHandler {
    getPimSystemOptions = () => {
        return Object
            .keys(PIM_SYSTEM)
            .filter((v) => isNaN(Number(v)))
            .map((key, item) => {
                return {
                    value: key,
                    label: this.getPimSystemLabel(key)
                }
            })
    }

    getPimSystemInitialStates = () => {
        return Object
            .keys(PIM_SYSTEM)
            .filter((v) => isNaN(Number(v)))
            .map((key, item) => {
                return {
                    name: key,
                    active: false,
                    pimAttributes: 0,
                    magentoMapping: 0,
                    ignoredAttributes: 0
                }
            })
    }

    getActiveSystemLabel = (systemCode: string): string => {
        if (systemCode === '') {
            return 'PIM'
        }

        return this.getPimSystemLabel(systemCode)
    }

    getPimSystemLabel = (systemCode: string): string => {
        const enumKeys = Object.keys(PIM_SYSTEM).filter(k => isNaN(Number(k)))
        const enumValues = Object.values(PIM_SYSTEM).filter((o) => typeof o == 'string');

        let result: any = []
        enumKeys.forEach((value: string, key: number) => {
            result[value] = enumValues[key]
        })
        return result[systemCode]
    }
}