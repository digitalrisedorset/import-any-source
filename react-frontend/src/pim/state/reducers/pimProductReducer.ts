import {PimImportProductState} from "../../../types/states";
import {SetPimProductActionList} from "../actions/pimProduct";
import {PimProductsActionType} from "../action-types/PimProductsAction";
import {
    IMPORT_DELETE_RECEIVED,
    IMPORT_LOADED, IMPORT_READY, IMPORT_UPDATE_RECEIVED,
    IMPORT_VALIDATED,
    PRODUCT_EXIST,
    PRODUCT_READY, PRODUCT_UPDATE,
    RemotePimProduct
} from "../../../types/pim";
import {MagentoProduct} from "../../../magento/types/magento";

const getProductStatus = (skuAlreadyInMagento: string[], product: RemotePimProduct) => {
    if (product.import_status === IMPORT_UPDATE_RECEIVED || product.import_status === IMPORT_DELETE_RECEIVED) {
        return product.import_status
    }

    return (skuAlreadyInMagento.indexOf(product['sku'])>-1)? PRODUCT_EXIST:PRODUCT_READY
}

const reducer = (
    state: PimImportProductState = {importMonitored: false, importStatus: '', pimProducts: [], pimDeletedProducts: [], pimProductHeader: []},
    action: SetPimProductActionList
): PimImportProductState => {
    let newState
    let pimProducts
    let importStatus
    let skuAlreadyInMagento: string[]
    switch (action.type) {
        case PimProductsActionType.SET_PIM_PRODUCT_MONITORED:
            newState = {...state, importMonitored: action.active}
            return newState
        case PimProductsActionType.SET_PIM_PRODUCT_LOADED:
            const firstRecord = action.pimProducts[0]
            newState = {importMonitored: state.importMonitored, importStatus: IMPORT_LOADED, pimProducts: action.pimProducts, pimDeletedProducts:[], pimProductHeader: Object.keys(firstRecord)}
            return newState
        case PimProductsActionType.SET_PIM_PRODUCT_VALIDATED:
            skuAlreadyInMagento = action.magentoProducts.map((product:MagentoProduct) => product['sku'])
            pimProducts = state.pimProducts.map((product: RemotePimProduct) => {
                return {...product, import_status: getProductStatus(skuAlreadyInMagento, product)}
            })
            importStatus = pimProducts.find((product) => product?.import_status !== PRODUCT_READY)? IMPORT_VALIDATED:IMPORT_READY
            newState = {importMonitored: state.importMonitored, importStatus, pimProducts, pimDeletedProducts:[], pimProductHeader: {...state.pimProductHeader.concat('import_status')}}
            return newState
        case PimProductsActionType.SET_PIM_PRODUCT_REMOVED:
            pimProducts = state.pimProducts.filter((product) => product.sku !== action.sku)
            importStatus = pimProducts.find((product) => product?.import_status !== PRODUCT_READY)?state.importStatus:IMPORT_READY
            newState = {importMonitored: state.importMonitored, importStatus, pimProducts, pimDeletedProducts:[], pimProductHeader: state.pimProductHeader}
            return newState
        case PimProductsActionType.SET_PIM_PRODUCT_UPDATE_NOTIFCATION:
            const updateSkuList = action.magentoProducts.map((product: MagentoProduct) => product['sku'])
            pimProducts = state.pimProducts.map((product: RemotePimProduct) => {
                if (updateSkuList.indexOf(product['sku'])>-1) {
                    return {...product, import_status: PRODUCT_UPDATE}
                }
                return product
            })
            newState = {...state, pimProducts}
            return newState
        case PimProductsActionType.SET_PIM_PRODUCT_DELETE_NOTIFICATION:
            newState = {...state, pimDeletedProducts: action.magentoProducts}
            return newState
        default:
            return state;
    }
}

export default reducer