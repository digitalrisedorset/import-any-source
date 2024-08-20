import { CatalogSourceImportProductState } from "../../../types/states";
import { SetCatalogSourceProductActionList } from "../actions/catalogSourceProduct";
import { CatalogSourceProductsActionType } from "../action-types/catalogSourceProductsAction";
import { CatalogSourceProduct, IMPORT_STATUS, PRODUCT_STATUS } from "../../../types/catalog-source";
import { MagentoProduct } from "../../../magento/types/magento";

const getProductStatus = (skuAlreadyInMagento: string[], product: CatalogSourceProduct): PRODUCT_STATUS => {
    if (product.import_status === 'updated' || product.import_status === 'deleted') {
        return product.import_status
    }

    return (skuAlreadyInMagento.indexOf(product['sku']) > -1) ? 'not_needed' : 'ready'
}

const initialState = { importMonitored: false, importStatus: '', catalogSourceProducts: [], CatalogSourceDeletedProducts: [], catalogSourceProductHeader: [] }

const reducer = (
    state: CatalogSourceImportProductState = initialState,
    action: SetCatalogSourceProductActionList
): CatalogSourceImportProductState => {
    let newState: CatalogSourceImportProductState = initialState
    let catalogSourceProducts: CatalogSourceProduct[] = []
    let importStatus: IMPORT_STATUS = ''
    let skuAlreadyInMagento: string[]
    switch (action.type) {
        case CatalogSourceProductsActionType.SET_CATALOG_SOURCE_PRODUCT_MONITORED:
            newState = { ...state, importMonitored: action.active }
            return newState
        case CatalogSourceProductsActionType.SET_CATALOG_SOURCE_PRODUCT_LOADED:
            const firstRecord = action.catalogSourceProducts[0]
            newState = { importMonitored: state.importMonitored, importStatus: 'loaded', catalogSourceProducts: action.catalogSourceProducts, CatalogSourceDeletedProducts: [], catalogSourceProductHeader: Object.keys(firstRecord) }
            return newState
        case CatalogSourceProductsActionType.SET_CATALOG_SOURCE_PRODUCT_VALIDATED:
            skuAlreadyInMagento = action.magentoProducts.map((product: MagentoProduct) => product['sku'])
            catalogSourceProducts = state.catalogSourceProducts.map((product: CatalogSourceProduct) => {
                return { ...product, import_status: getProductStatus(skuAlreadyInMagento, product) }
            })
            importStatus = catalogSourceProducts.find((product: CatalogSourceProduct) => product?.import_status !== 'valid') ? 'validated' : 'ready'
            newState = { importMonitored: state.importMonitored, importStatus, catalogSourceProducts, CatalogSourceDeletedProducts: [], catalogSourceProductHeader: { ...state.catalogSourceProductHeader.concat('import_status') } }
            return newState
        case CatalogSourceProductsActionType.SET_CATALOG_SOURCE_PRODUCT_REMOVED:
            catalogSourceProducts = state.catalogSourceProducts.filter((product) => product.sku !== action.sku)
            importStatus = catalogSourceProducts.find((product) => product?.import_status !== 'valid') ? state.importStatus : 'ready'
            newState = { importMonitored: state.importMonitored, importStatus, catalogSourceProducts, CatalogSourceDeletedProducts: [], catalogSourceProductHeader: state.catalogSourceProductHeader }
            return newState
        case CatalogSourceProductsActionType.SET_CATALOG_SOURCE_PRODUCT_UPDATE_NOTIFCATION:
            const updateSkuList = action.magentoProducts.map((product: MagentoProduct) => product['sku'])
            catalogSourceProducts = state.catalogSourceProducts.map((product: CatalogSourceProduct) => {
                if (updateSkuList.indexOf(product['sku']) > -1) {
                    return { ...product, import_status: 'updated' }
                }
                return product
            })
            newState = { ...state, catalogSourceProducts }
            return newState
        case CatalogSourceProductsActionType.SET_CATALOG_SOURCE_PRODUCT_DELETE_NOTIFICATION:
            newState = { ...state, CatalogSourceDeletedProducts: action.magentoProducts }
            return newState
        default:
            return state;
    }
}

export default reducer