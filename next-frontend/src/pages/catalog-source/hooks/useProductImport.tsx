import {DeletedCatalogSourceProduct, CatalogSourceProduct} from "../../types/catalog-source";
import {useAppSelector} from "@/state/store";

interface ImportProductResponse {
    importMonitored: boolean,
    importStatus: string,
    catalogSourceProducts: CatalogSourceProduct[],
    catalogSourceDeletedProducts: DeletedCatalogSourceProduct[],
    catalogSourceProductHeader: string[]
}

export const useProductImport = (): ImportProductResponse => {
    const { importMonitored, importStatus, catalogSourceProducts, catalogSourceProductHeader, catalogSourceDeletedProducts } = useAppSelector((state) => state.catalogSourceProduct)

    return {importMonitored, importStatus, catalogSourceProductHeader, catalogSourceProducts, catalogSourceDeletedProducts}
}