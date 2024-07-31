import {useTypedSelector} from "../../global/hooks/useTypedSelector";
import {RemotePimProduct} from "../../types/pim";

interface ImportProductResponse {
    pimProducts: RemotePimProduct[],
    pimProductHeader: string[]
}

export const useProductImport = (): ImportProductResponse => {
    const { pimProducts, pimProductHeader } = useTypedSelector((state) => state.pimProduct)


    return {pimProductHeader, pimProducts}
}