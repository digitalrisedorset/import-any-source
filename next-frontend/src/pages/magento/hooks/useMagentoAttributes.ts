import {useAppSelector} from "@/state/store";
import {useMagentoAttribute} from "@/state/magentoAttributeState";

export const useMagentoAttributes = () => {
    //const { magentoAttributes } = useAppSelector((state) => state.magentoAttribute)
    const { magentoAttributes } = useMagentoAttribute()

    return magentoAttributes
}
