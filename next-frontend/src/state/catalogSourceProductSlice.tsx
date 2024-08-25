import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {CatalogSourceProduct, DeletedCatalogSourceProduct, PRODUCT_STATUS} from "@/pages/types/catalog-source";
import {MagentoProduct} from "@/pages/magento/types/magento";

const getProductStatus = (skuAlreadyInMagento: string[], product: CatalogSourceProduct): PRODUCT_STATUS => {
    if (product.import_status === 'updated' || product.import_status === 'deleted') {
        return product.import_status
    }

    return (skuAlreadyInMagento.indexOf(product['sku']) > -1) ? 'not_needed' : 'ready'
}

const initialState = { importMonitored: false, importStatus: '', catalogSourceProducts: [], catalogSourceDeletedProducts: [], catalogSourceProductHeader: [] }

export const catalogSourceProductSlice = createSlice({
    name: "catalogSourceProduct",
    initialState,
    reducers: {
        setProductMonitoredAction: (state, action: PayloadAction<boolean>) => {
            return { ...state, importMonitored: action.payload }
        },
        setCatalogSourceProductBatchLoaded: (state, action: PayloadAction<CatalogSourceProduct[]>) => {
            const firstRecord = action.payload[0]
            return {
                importMonitored: state.importMonitored,
                importStatus: 'loaded',
                catalogSourceProducts: action.payload,
                catalogSourceDeletedProducts: [],
                catalogSourceProductHeader: Object.keys(firstRecord)
            }
        },
        setCatalogSourceProductBatchValidated: (state, action: PayloadAction<MagentoProduct[]>) => {
            const skuAlreadyInMagento = action.payload.map((product: MagentoProduct) => product['sku'])
            const catalogSourceProducts = state.catalogSourceProducts.map((product: CatalogSourceProduct) => {
                return { ...product, import_status: getProductStatus(skuAlreadyInMagento, product) }
            })
            const importStatus = catalogSourceProducts.find((product: CatalogSourceProduct) => product?.import_status !== 'valid') ? 'validated' : 'ready'
            return { importMonitored: state.importMonitored, importStatus, catalogSourceProducts, catalogSourceDeletedProducts: [], catalogSourceProductHeader: { ...state.catalogSourceProductHeader.concat('import_status') } }
        },
        setCatalogSourceProductRemoved: (state, action: PayloadAction<string>) => {
            catalogSourceProducts = state.catalogSourceProducts.filter((product) => product.sku !== action.payload)
            importStatus = catalogSourceProducts.find((product) => product?.import_status !== 'valid') ? state.importStatus : 'ready'
            return { importMonitored: state.importMonitored, importStatus, catalogSourceProducts, catalogSourceDeletedProducts: [], catalogSourceProductHeader: state.catalogSourceProductHeader }
        },
        setCatalogSourceProductUpdateNotification: (state, action: PayloadAction<MagentoProduct[]>) => {
            const updateSkuList = action.payload.map((product: MagentoProduct) => product['sku'])
            const catalogSourceProducts = state.catalogSourceProducts.map((product: CatalogSourceProduct) => {
                if (updateSkuList.indexOf(product['sku']) > -1) {
                    return { ...product, import_status: 'updated' }
                }
                return product
            })
            return { ...state, catalogSourceProducts }
        },
        setCatalogSourceProductDeleteNotification: (state, action: PayloadAction<DeletedCatalogSourceProduct[]>) => {
            return { ...state, catalogSourceDeletedProducts: action.payload }
        },
    },
});

export const { setProductMonitoredAction, setCatalogSourceProductBatchLoaded, setCatalogSourceProductBatchValidated,
    setCatalogSourceProductRemoved, setCatalogSourceProductUpdateNotification, setCatalogSourceProductDeleteNotification
} = catalogSourceProductSlice.actions;
export const catalogSourceProductReducer = catalogSourceProductSlice.reducer;