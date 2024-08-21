import {useActiveCatalogSource} from "../../catalog-source/hooks/useCurrentCatalogSource";

export const useMappingVerifier = () => {
    const {numberCatalogSourceAttributes, magentoMapping, ignoredAttributes} = useActiveCatalogSource()

    return numberCatalogSourceAttributes - magentoMapping - ignoredAttributes > 0
}

export const useMappingRemaining = () => {
    const {numberCatalogSourceAttributes, magentoMapping, ignoredAttributes} = useActiveCatalogSource()

    return Math.max(numberCatalogSourceAttributes - magentoMapping - ignoredAttributes, 0)
}