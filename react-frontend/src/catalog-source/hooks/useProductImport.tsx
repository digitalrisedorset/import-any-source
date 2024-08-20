import {useTypedSelector} from "../../global/hooks/useTypedSelector";
import {DeletedCatalogSourceProduct, CatalogSourceProduct} from "../../types/catalog-source";

interface ImportProductResponse {
    importMonitored: boolean,
    importStatus: string,
    catalogSourceProducts: CatalogSourceProduct[],
    CatalogSourceDeletedProducts: DeletedCatalogSourceProduct[],
    catalogSourceProductHeader: string[]
}

export const useProductImport = (): ImportProductResponse => {
    const { importMonitored, importStatus, catalogSourceProducts, catalogSourceProductHeader, CatalogSourceDeletedProducts } = useTypedSelector((state) => state.catalogSourceProduct)

    return {importMonitored, importStatus, catalogSourceProductHeader, catalogSourceProducts, CatalogSourceDeletedProducts}
}