import {useTypedSelector} from "../../global/hooks/useTypedSelector";
import {DeletedPimProduct, RemotePimProduct} from "../../types/pim";

interface ImportProductResponse {
    importMonitored: boolean,
    importStatus: string,
    pimProducts: RemotePimProduct[],
    pimDeletedProducts: DeletedPimProduct[],
    pimProductHeader: string[]
}

export const useProductImport = (): ImportProductResponse => {
    const { importMonitored, importStatus, pimProducts, pimProductHeader, pimDeletedProducts } = useTypedSelector((state) => state.pimProduct)

    return {importMonitored, importStatus, pimProductHeader, pimProducts, pimDeletedProducts}
}