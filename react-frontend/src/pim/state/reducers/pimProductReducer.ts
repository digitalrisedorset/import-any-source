import { PimImportProductState } from "../../../types/states";
import { SetPimProductActionList } from "../actions/pimProduct";
import { PimProductsActionType } from "../action-types/PimProductsAction";
import { RemotePimProduct, IMPORT_STATUS, PRODUCT_STATUS } from "../../../types/pim";
import { MagentoProduct } from "../../../magento/types/magento";

const getProductStatus = (skuAlreadyInMagento: string[], product: RemotePimProduct): PRODUCT_STATUS => {
    if (product.import_status === 'updated' || product.import_status === 'deleted') {
        return product.import_status
    }

    return (skuAlreadyInMagento.indexOf(product['sku']) > -1) ? 'not_needed' : 'ready'
}

const initialState = { importMonitored: false, importStatus: '', pimProducts: [], pimDeletedProducts: [], pimProductHeader: [] }

const reducer = (
    state: PimImportProductState = initialState,
    action: SetPimProductActionList
): PimImportProductState => {
    let newState: PimImportProductState = initialState
    let pimProducts: RemotePimProduct[] = []
    let importStatus: IMPORT_STATUS = ''
    let skuAlreadyInMagento: string[]
    switch (action.type) {
        case PimProductsActionType.SET_PIM_PRODUCT_MONITORED:
            newState = { ...state, importMonitored: action.active }
            return newState
        case PimProductsActionType.SET_PIM_PRODUCT_LOADED:
            const firstRecord = action.pimProducts[0]
            newState = { importMonitored: state.importMonitored, importStatus: 'loaded', pimProducts: action.pimProducts, pimDeletedProducts: [], pimProductHeader: Object.keys(firstRecord) }
            return newState
        case PimProductsActionType.SET_PIM_PRODUCT_VALIDATED:
            skuAlreadyInMagento = action.magentoProducts.map((product: MagentoProduct) => product['sku'])
            pimProducts = state.pimProducts.map((product: RemotePimProduct) => {
                return { ...product, import_status: getProductStatus(skuAlreadyInMagento, product) }
            })
            importStatus = pimProducts.find((product: RemotePimProduct) => product?.import_status !== 'valid') ? 'validated' : 'ready'
            newState = { importMonitored: state.importMonitored, importStatus, pimProducts, pimDeletedProducts: [], pimProductHeader: { ...state.pimProductHeader.concat('import_status') } }
            return newState
        case PimProductsActionType.SET_PIM_PRODUCT_REMOVED:
            pimProducts = state.pimProducts.filter((product) => product.sku !== action.sku)
            importStatus = pimProducts.find((product) => product?.import_status !== 'valid') ? state.importStatus : 'ready'
            newState = { importMonitored: state.importMonitored, importStatus, pimProducts, pimDeletedProducts: [], pimProductHeader: state.pimProductHeader }
            return newState
        case PimProductsActionType.SET_PIM_PRODUCT_UPDATE_NOTIFCATION:
            const updateSkuList = action.magentoProducts.map((product: MagentoProduct) => product['sku'])
            pimProducts = state.pimProducts.map((product: RemotePimProduct) => {
                if (updateSkuList.indexOf(product['sku']) > -1) {
                    return { ...product, import_status: 'updated' }
                }
                return product
            })
            newState = { ...state, pimProducts }
            return newState
        case PimProductsActionType.SET_PIM_PRODUCT_DELETE_NOTIFICATION:
            newState = { ...state, pimDeletedProducts: action.magentoProducts }
            return newState
        default:
            return state;
    }
}

export default reducer