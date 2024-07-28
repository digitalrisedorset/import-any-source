import {useActivePimSystem} from "../../pim/hooks/useCurrentPimSystem";

export const useMappingVerifier = () => {
    const {pimAttributes, magentoMapping, ignoredAttributes} = useActivePimSystem()

    return pimAttributes - magentoMapping - ignoredAttributes > 0
}

export const useMappingRemaining = () => {
    const {pimAttributes, magentoMapping, ignoredAttributes} = useActivePimSystem()

    return Math.max(pimAttributes - magentoMapping - ignoredAttributes, 0)
}