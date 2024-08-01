import {PimProductsActionType} from "../action-types/PimProductsAction"
import {RemotePimProduct} from "../../../types/pim";
import {MagentoProduct} from "../../../magento/types/magento";

interface SetProductMonitoredAction {
    type: PimProductsActionType.SET_PIM_PRODUCT_MONITORED,
    active: boolean
}

interface SetProductImportAction {
    type: PimProductsActionType.SET_PIM_PRODUCT_LOADED,
    pimProducts: RemotePimProduct[]
}

interface SetProductValidationAction {
    type: PimProductsActionType.SET_PIM_PRODUCT_VALIDATED,
    magentoProducts: MagentoProduct[]
}

interface SetProductRemovedAction {
    type: PimProductsActionType.SET_PIM_PRODUCT_REMOVED,
    sku: string
}

interface SetProductUpdateNotificationAction {
    type: PimProductsActionType.SET_PIM_PRODUCT_UPDATE_NOTIFCATION,
    magentoProducts: MagentoProduct[],
    changeType: string
}

export type SetPimProductActionList = SetProductImportAction | SetProductValidationAction | SetProductRemovedAction | SetProductUpdateNotificationAction | SetProductMonitoredAction