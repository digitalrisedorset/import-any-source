import {useTypedSelector} from "../../global/hooks/useTypedSelector";
import {CatalogSourceHandler} from "../../configuration/models/CatalogSourceHandler";
import {defaultImportState, CatalogSourceState} from "../../types/states";

export const useActiveCatalogSource = (): CatalogSourceState => {
    const { catalogSourceImportState } = useTypedSelector((state) => state.catalogSourceAttribute)
    let currentActiveSystem = catalogSourceImportState.find(item => item.active === true);

    if (currentActiveSystem === undefined) {
        defaultImportState.active = true
        currentActiveSystem = defaultImportState;
    }

    return currentActiveSystem
}

export const useCurrentCatalogSource = (): string => {
    const currentActiveSystem = useActiveCatalogSource()

    const catalogSourceHandler = new CatalogSourceHandler()
    return catalogSourceHandler.getActiveSystemLabel(currentActiveSystem?.name || 'woocommerce')
}

export const useCurrentCatalogSourceSystemCode = () => {
    const currentActiveSystem = useActiveCatalogSource()

    return currentActiveSystem?.name || 'woocommerce'
}