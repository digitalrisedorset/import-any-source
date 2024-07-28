import {useTypedSelector} from "../../global/hooks/useTypedSelector";

export const useMagentoAttributes = () => {
    const { magentoAttributes } = useTypedSelector((state) => state.magentoAttribute)

    return magentoAttributes
}
