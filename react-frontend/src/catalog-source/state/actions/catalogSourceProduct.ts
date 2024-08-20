import {CatalogSourceProductsActionType} from "../action-types/catalogSourceProductsAction"
import {DeletedCatalogSourceProduct, CatalogSourceProduct} from "../../../types/catalog-source";
import {MagentoProduct} from "../../../magento/types/magento";

interface SetProductMonitoredAction {
    type: CatalogSourceProductsActionType.SET_CATALOG_SOURCE_PRODUCT_MONITORED,
    active: boolean
}

interface SetProductImportAction {
    type: CatalogSourceProductsActionType.SET_CATALOG_SOURCE_PRODUCT_LOADED,
    catalogSourceProducts: CatalogSourceProduct[]
}

interface SetProductValidationAction {
    type: CatalogSourceProductsActionType.SET_CATALOG_SOURCE_PRODUCT_VALIDATED,
    magentoProducts: MagentoProduct[]
}

interface SetProductRemovedAction {
    type: CatalogSourceProductsActionType.SET_CATALOG_SOURCE_PRODUCT_REMOVED,
    sku: string
}

interface SetProductUpdateNotificationAction {
    type: CatalogSourceProductsActionType.SET_CATALOG_SOURCE_PRODUCT_UPDATE_NOTIFCATION,
    magentoProducts: MagentoProduct[]
}

interface SetProductDeleteNotificationAction {
    type: CatalogSourceProductsActionType.SET_CATALOG_SOURCE_PRODUCT_DELETE_NOTIFICATION,
    magentoProducts: DeletedCatalogSourceProduct[]
}

export type SetCatalogSourceProductActionList = SetProductImportAction | SetProductValidationAction |
    SetProductRemovedAction | SetProductUpdateNotificationAction | SetProductMonitoredAction | SetProductDeleteNotificationAction