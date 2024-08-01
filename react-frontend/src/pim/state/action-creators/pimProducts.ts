import {Dispatch} from "redux";
import {SetPimProductActionList} from "../actions/pimProduct";
import {PimProductsActionType} from "../action-types/PimProductsAction";
import {RemotePimProduct} from "../../../types/pim";
import {MagentoProduct} from "../../../magento/types/magento";

export const setProductMonitoredAction = (active: boolean) => {
    return async (dispatch: Dispatch<SetPimProductActionList>) => {
        dispatch({
            type: PimProductsActionType.SET_PIM_PRODUCT_MONITORED,
            active
        })
    }
}

export const setPimProductBatchLoaded = (pimProducts: RemotePimProduct[]) => {
    return async (dispatch: Dispatch<SetPimProductActionList>) => {
        dispatch({
            type: PimProductsActionType.SET_PIM_PRODUCT_LOADED,
            pimProducts
        })
    }
}

export const setPimProductBatchValidated = (magentoProducts: MagentoProduct[]) => {
    return async (dispatch: Dispatch<SetPimProductActionList>) => {
        dispatch({
            type: PimProductsActionType.SET_PIM_PRODUCT_VALIDATED,
            magentoProducts
        })
    }
}

export const setPimProductRemoved = (sku: string) => {
    return async (dispatch: Dispatch<SetPimProductActionList>) => {
        dispatch({
            type: PimProductsActionType.SET_PIM_PRODUCT_REMOVED,
            sku
        })
    }
}

export const setPimProductUpdateNotification = (magentoProducts: MagentoProduct[], changeType: string) => {
    return async (dispatch: Dispatch<SetPimProductActionList>) => {
        dispatch({
            type: PimProductsActionType.SET_PIM_PRODUCT_UPDATE_NOTIFCATION,
            magentoProducts,
            changeType
        })
    }
}