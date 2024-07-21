import {useTypedSelector} from "./useTypedSelector";

export const useMagentoAttributes = () => {
    const { magentoAttributes } = useTypedSelector((state) => state.magentoAttribute)

    return magentoAttributes
}
