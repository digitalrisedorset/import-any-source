import { createContext, useContext} from 'react';
import {useImmer} from "use-immer";
import {CatalogSourceImportProductState} from "@/pages/types/states";
import {CatalogSourceProduct, DeletedCatalogSourceProduct} from "@/pages/types/catalog-source";

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

const initialState: CatalogSourceImportProductState = {
    importMonitored: false,
    importStatus: '',
    catalogSourceProducts: [],
    catalogSourceDeletedProducts: [],
    catalogSourceProductHeader: []
}

const getProductStatus = (skuAlreadyInMagento: string[], product: CatalogSourceProduct): PRODUCT_STATUS => {
    if (product.import_status === 'updated' || product.import_status === 'deleted') {
        return product.import_status
    }

    return (skuAlreadyInMagento.indexOf(product['sku']) > -1) ? 'not_needed' : 'ready'
}

function CatalogSourceProductProvider({ children }) {
    const [state, setState] = useImmer<CatalogSourceImportProductState>(initialState);

    const setProductMonitoredAction = (active: boolean) => {
        setState(draft => { draft.importMonitored = active})
    }

    const setCatalogSourceProductBatchLoaded = (products: CatalogSourceProduct[]) => {
        const firstRecord = products[0]
        setState(draft => {
            draft.catalogSourceProducts = products;
            draft.catalogSourceDeletedProducts = [];
            draft.catalogSourceProductHeader = Object.keys(firstRecord)
        })
    }

    const setCatalogSourceProductBatchValidated = (products: CatalogSourceProduct[]) => {
        const skuAlreadyInCatalogSource = products.map((product: CatalogSourceProduct) => product['sku'])
        const catalogSourceProducts = state.catalogSourceProducts.map((product: CatalogSourceProduct) => {
            return { ...product, import_status: getProductStatus(skuAlreadyInCatalogSource, product) }
        })
        const importStatus = catalogSourceProducts.find((product: CatalogSourceProduct) => product?.import_status !== 'valid') ? 'validated' : 'ready'
        setState(draft => {
            draft.importStatus = importStatus;
            draft.catalogSourceProducts = catalogSourceProducts;
            draft.catalogSourceProductHeader = state.catalogSourceProductHeader.concat('import_status')
        })
    }

    const setCatalogSourceProductRemoved = (removedSku: string) => {
        const catalogSourceProducts = state.catalogSourceProducts.filter((product) => product.sku !== removedSku)
        const importStatus = catalogSourceProducts.find((product) => product?.import_status !== 'valid') ? state.importStatus : 'ready'
        setState(draft => {
            draft.importStatus = importStatus;
            draft.catalogSourceProducts = catalogSourceProducts;
        })
    }

    const setCatalogSourceProductUpdateNotification = (products: CatalogSourceProduct[]) => {
        const updateSkuList = products.map((product: CatalogSourceProduct) => product['sku'])
        const catalogSourceProducts = state.catalogSourceProducts.map((product: CatalogSourceProduct) => {
            if (updateSkuList.indexOf(product['sku']) > -1) {
                return { ...product, import_status: 'updated' }
            }
            return product
        })
        setState(draft => { draft.catalogSourceProducts = catalogSourceProducts })
    }

    const setCatalogSourceProductDeleteNotification = (product: DeletedCatalogSourceProduct[]) => {
        setState(draft => { draft.catalogSourceDeletedProducts = product })
    }

    return (
        <LocalStateProvider
            value={{
                setProductMonitoredAction,
                setCatalogSourceProductBatchLoaded,
                setCatalogSourceProductBatchValidated,
                setCatalogSourceProductRemoved,
                setCatalogSourceProductUpdateNotification,
                setCatalogSourceProductDeleteNotification,
                importMonitored: state.importMonitored,
                importStatus: state.importStatus,
                catalogSourceProducts: state.catalogSourceProducts,
                catalogSourceDeletedProducts: state.catalogSourceDeletedProducts,
                catalogSourceProductHeader: state.catalogSourceProductHeader
            }}
        >
            {children}
        </LocalStateProvider>
    )
}

function useCatalogSourceProduct() {
    // We use a consumer here to access the local state
    const all = useContext(LocalStateContext);
    return all;
}

export { CatalogSourceProductProvider, useCatalogSourceProduct };