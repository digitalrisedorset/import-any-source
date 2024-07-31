import {PimProductsActionType} from "../action-types/PimProductsAction"
import {RemotePimProduct} from "../../../types/pim";

interface SetProductImportAction {
    type: PimProductsActionType.SET_PIM_PRODUCT_LOADED,
    pimProducts: RemotePimProduct[]
}

export type SetPimProductctionList = SetProductImportAction