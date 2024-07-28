import {useTypedSelector} from "../../global/hooks/useTypedSelector";
import {PimSystemHandler} from "../models/PimSystem";
import {defaultImportState, PimImportState} from "../../types/states";

export const useActivePimSystem = (): PimImportState => {
    const { pimImportState } = useTypedSelector((state) => state.pimAttribute)
    let currentActiveSystem = pimImportState.find(item => item.active === true);

    if (currentActiveSystem === undefined) {
        defaultImportState.active = true
        currentActiveSystem = defaultImportState;
    }

    return currentActiveSystem
}

export const useCurrentPimSystem = (): string => {
    const currentActiveSystem = useActivePimSystem()

    const pimSystemHandler = new PimSystemHandler()
    return pimSystemHandler.getActiveSystemLabel(currentActiveSystem?.name || 'woocommerce')
}

export const useCurrentPimSystemCode = () => {
    const currentActiveSystem = useActivePimSystem()

    return currentActiveSystem?.name || 'woocommerce'
}