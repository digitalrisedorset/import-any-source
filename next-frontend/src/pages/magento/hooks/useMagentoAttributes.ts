import {useMagentoAttribute} from "@/state/magentoAttributeState";

export const useMagentoAttributes = () => {
    const { magentoAttributes } = useMagentoAttribute()

    return magentoAttributes
}
