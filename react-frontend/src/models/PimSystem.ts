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

    getActiveSystemLabel = (systemCode: string) => {
        if (systemCode === '') {
            return 'PIM'
        }

        return this.getPimSystemLabel(systemCode)
    }

    getPimSystemLabel = (systemCode: string) => {
        return systemCode === "woo" ? 'Woocommerce' : 'Plant System'
    }

    getPimSystemLongCode = (systemCode: string) => {
        return systemCode === "woo" ? 'woocommerce' : 'plant'
    }
}