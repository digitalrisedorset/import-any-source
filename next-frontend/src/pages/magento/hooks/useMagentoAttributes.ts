import {useAppSelector} from "@/state/store";

export const useMagentoAttributes = () => {
    const { magentoAttributes } = useAppSelector((state) => state.magentoAttribute)

    return magentoAttributes
}
