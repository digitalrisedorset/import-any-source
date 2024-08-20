import {Dispatch} from "redux";
import {SetCatalogSourceProductActionList} from "../actions/catalogSourceProduct";
import {CatalogSourceProductsActionType} from "../action-types/catalogSourceProductsAction";
import {DeletedCatalogSourceProduct, CatalogSourceProduct} from "../../../types/catalog-source";
import {MagentoProduct} from "../../../magento/types/magento";

export const setProductMonitoredAction = (active: boolean) => {
    return async (dispatch: Dispatch<SetCatalogSourceProductActionList>) => {
        dispatch({
            type: CatalogSourceProductsActionType.SET_CATALOG_SOURCE_PRODUCT_MONITORED,
            active
        })
    }
}

export const setCatalogSourceProductBatchLoaded = (catalogSourceProducts: CatalogSourceProduct[]) => {
    return async (dispatch: Dispatch<SetCatalogSourceProductActionList>) => {
        dispatch({
            type: CatalogSourceProductsActionType.SET_CATALOG_SOURCE_PRODUCT_LOADED,
            catalogSourceProducts
        })
    }
}

export const setCatalogSourceProductBatchValidated = (magentoProducts: MagentoProduct[]) => {
    return async (dispatch: Dispatch<SetCatalogSourceProductActionList>) => {
        dispatch({
            type: CatalogSourceProductsActionType.SET_CATALOG_SOURCE_PRODUCT_VALIDATED,
            magentoProducts
        })
    }
}

export const setCatalogSourceProductRemoved = (sku: string) => {
    return async (dispatch: Dispatch<SetCatalogSourceProductActionList>) => {
        dispatch({
            type: CatalogSourceProductsActionType.SET_CATALOG_SOURCE_PRODUCT_REMOVED,
            sku
        })
    }
}

export const setCatalogSourceProductUpdateNotification = (magentoProducts: MagentoProduct[]) => {
    return async (dispatch: Dispatch<SetCatalogSourceProductActionList>) => {
        dispatch({
            type: CatalogSourceProductsActionType.SET_CATALOG_SOURCE_PRODUCT_UPDATE_NOTIFCATION,
            magentoProducts
        })
    }
}

export const setCatalogSourceProductDeleteNotification = (magentoProducts: DeletedCatalogSourceProduct[]) => {
    return async (dispatch: Dispatch<SetCatalogSourceProductActionList>) => {
        dispatch({
            type: CatalogSourceProductsActionType.SET_CATALOG_SOURCE_PRODUCT_DELETE_NOTIFICATION,
            magentoProducts
        })
    }
}