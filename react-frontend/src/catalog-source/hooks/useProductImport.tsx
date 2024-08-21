import {useTypedSelector} from "../../global/hooks/useTypedSelector";
import {DeletedCatalogSourceProduct, CatalogSourceProduct} from "../../types/catalog-source";

interface ImportProductResponse {
    importMonitored: boolean,
    importStatus: string,
    catalogSourceProducts: CatalogSourceProduct[],
    catalogSourceDeletedProducts: DeletedCatalogSourceProduct[],
    catalogSourceProductHeader: string[]
}

export const useProductImport = (): ImportProductResponse => {
    const { importMonitored, importStatus, catalogSourceProducts, catalogSourceProductHeader, catalogSourceDeletedProducts } = useTypedSelector((state) => state.catalogSourceProduct)

    return {importMonitored, importStatus, catalogSourceProductHeader, catalogSourceProducts, catalogSourceDeletedProducts}
}