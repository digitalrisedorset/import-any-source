import {useProductImport} from "../../hooks/useProductImport";
import {useMagentoProducts} from "../../../magento/graphql/magento/useMagentoProducts";
import {useActions} from "../../../global/hooks/useActions";
import {useProductImportGrid} from "../../../global/hooks/useProductGrid";

export const ProductImportList = () => {
    const {importStatus, pimProducts} = useProductImport()
    const getProductDataBySku = useMagentoProducts()
    const { setPimProductBatchValidated, addFlashMessage } = useActions()
    const getProductGrid = useProductImportGrid()

    if (!pimProducts) return <></>

    const handleValidateProduct = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        const products = await getProductDataBySku();

        if (products?.data?.products?.items !== undefined) {
            setPimProductBatchValidated(products?.data?.products?.items)
            addFlashMessage(`${pimProducts?.length} magento product have been validated`)
        }
    }

    const handleImportProduct = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
    }

    return (
        <>
            {pimProducts?.length > 0 && <>
                <button type="submit" disabled={importStatus === 'validated' || importStatus === 'ready'} onClick={handleValidateProduct}>
                    Validate Products
                </button>
                &nbsp;
                <button type="submit" disabled={importStatus !== 'ready'} onClick={handleImportProduct}>
                    Import Products
                </button>
                {getProductGrid}
            </>}
        </>
    );
};