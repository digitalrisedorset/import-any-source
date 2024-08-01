import {PimImportProductState} from "../../../types/states";
import {SetPimProductActionList} from "../actions/pimProduct";
import {PimProductsActionType} from "../action-types/PimProductsAction";
import {RemotePimProduct} from "../../../types/pim";
import {MagentoProduct} from "../../../magento/types/magento";

const reducer = (
    state: PimImportProductState = {importMonitored: false, importStatus: '', pimProducts: [], pimProductHeader: []},
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
            newState = {importMonitored: state.importMonitored, importStatus: 'loaded', pimProducts: action.pimProducts, pimProductHeader: Object.keys(firstRecord)}
            return newState
        case PimProductsActionType.SET_PIM_PRODUCT_VALIDATED:
            skuAlreadyInMagento = action.magentoProducts.map((product:MagentoProduct) => product['sku'])
            pimProducts = state.pimProducts.map((product: RemotePimProduct) => {
                return {...product, import_status: (skuAlreadyInMagento.indexOf(product['sku'])>-1)?'not_needed':'valid'}
            })
            importStatus = pimProducts.find((product) => product?.import_status !== 'valid')?'validated':'ready'
            newState = {importMonitored: state.importMonitored, importStatus, pimProducts, pimProductHeader: {...state.pimProductHeader.concat('import_status')}}
            return newState
        case PimProductsActionType.SET_PIM_PRODUCT_REMOVED:
            pimProducts = state.pimProducts.filter((product) => product.sku !== action.sku)
            importStatus = pimProducts.find((product) => product?.import_status !== 'valid')?state.importStatus:'ready'
            newState = {importMonitored: state.importMonitored, importStatus, pimProducts, pimProductHeader: state.pimProductHeader}
            return newState
        case PimProductsActionType.SET_PIM_PRODUCT_UPDATE_NOTIFCATION:
            skuAlreadyInMagento = action.magentoProducts.map((product:MagentoProduct) => product['sku'])
            pimProducts = state.pimProducts.map((product: RemotePimProduct) => {
                return {...product, import_status: (skuAlreadyInMagento.indexOf(product['sku'])>-1)?'updated':'valid'}
            })
            importStatus = (action.changeType==='update')?'update_received':'delete_received'
            newState = {importMonitored: state.importMonitored, importStatus, pimProducts, pimProductHeader: state.pimProductHeader}
            return newState
        default:
            return state;
    }
}

export default reducer