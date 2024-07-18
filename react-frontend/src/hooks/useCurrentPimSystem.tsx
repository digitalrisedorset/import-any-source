import {useTypedSelector} from "./useTypedSelector";
import {PimSystemHandler} from "../models/PimSystem";

export const useCurrentPimSystem = () => {
    const { pimSystemCode } = useTypedSelector((state) => state.pimSystem)
    const pimSystemHandler = new PimSystemHandler()

    return pimSystemHandler.getActiveSystemLabel(pimSystemCode)
}

export const useCurrentPimSystemCode = () => {
    const {pimSystemCode} = useTypedSelector((state) => state.pimSystem)
    const pimSystemHandler = new PimSystemHandler()

    return pimSystemCode
}