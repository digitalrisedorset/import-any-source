import {DeletedCatalogSourceProduct, CatalogSourceProduct} from "../../types/catalog-source";
import {useCatalogSourceProduct} from "@/state/catalogSourceProductState";

interface ImportProductResponse {
    importMonitored: boolean,
    importStatus: string,
    catalogSourceProducts: CatalogSourceProduct[],
    catalogSourceDeletedProducts: DeletedCatalogSourceProduct[],
    catalogSourceProductHeader: string[]
}

export const useProductImport = (): ImportProductResponse => {
    const { importMonitored, importStatus, catalogSourceProducts, catalogSourceProductHeader, catalogSourceDeletedProducts } = useCatalogSourceProduct()

    return {importMonitored, importStatus, catalogSourceProductHeader, catalogSourceProducts, catalogSourceDeletedProducts}
}