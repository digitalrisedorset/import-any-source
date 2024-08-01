import {useTypedSelector} from "../../global/hooks/useTypedSelector";
import {RemotePimProduct} from "../../types/pim";

interface ImportProductResponse {
    importMonitored: boolean,
    importStatus: string,
    pimProducts: RemotePimProduct[],
    pimProductHeader: string[]
}

export const useProductImport = (): ImportProductResponse => {
    const { importMonitored, importStatus, pimProducts, pimProductHeader } = useTypedSelector((state) => state.pimProduct)

    return {importMonitored, importStatus, pimProductHeader, pimProducts}
}