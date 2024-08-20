import {useActiveCatalogSource} from "../../catalog-source/hooks/useCurrentCatalogSource";

export const useMappingVerifier = () => {
    const {catalogSourceAttributes, magentoMapping, ignoredAttributes} = useActiveCatalogSource()

    return catalogSourceAttributes - magentoMapping - ignoredAttributes > 0
}

export const useMappingRemaining = () => {
    const {catalogSourceAttributes, magentoMapping, ignoredAttributes} = useActiveCatalogSource()

    return Math.max(catalogSourceAttributes - magentoMapping - ignoredAttributes, 0)
}