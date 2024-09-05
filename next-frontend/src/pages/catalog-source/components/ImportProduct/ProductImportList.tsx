import {useProductImport} from "../../hooks/useProductImport";
import {useMagentoProducts} from "@/pages/magento/graphql/magento/useMagentoProducts";
import {useProductDeletedGrid, useProductImportGrid} from "@/pages/global/hooks/useProductGrid";
import {GridReport} from "../../styles/GridStyle"
import React from "react";
import {useFlashMessage} from "@/state/flassMessageState";
import {useCatalogSourceProduct} from "@/state/catalogSourceProductState";
import {CatalogSourceProduct} from "@/pages/types/catalog-source";

type ProductListProps = {
    catalogSourceProducts: CatalogSourceProduct[]
}

export const ProductImportList: React.FC = ({catalogSourceProducts}: ProductListProps) => {
    const {importStatus} = useProductImport()
    const getProductDataBySku = useMagentoProducts()
    const { setCatalogSourceProductBatchValidated } = useCatalogSourceProduct()
    const {addFlashMessage } = useFlashMessage()
    const getProductGrid = useProductImportGrid()
    const getProductDeletedGrid = useProductDeletedGrid()

    const handleValidateProduct = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        const products = await getProductDataBySku();

        if (products?.data?.products?.items !== undefined) {
            setCatalogSourceProductBatchValidated(products?.data?.products?.items)
            addFlashMessage(`${catalogSourceProducts?.length} magento product have been validated`)
        }
    }

    const handleImportProduct = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
    }

    return (
        <>
            {catalogSourceProducts?.length > 0 && <>
                <button type="submit" disabled={importStatus === 'validated' || importStatus === 'ready'} onClick={handleValidateProduct}>
                    Validate Products
                </button>
                &nbsp;
                <button type="submit" disabled={importStatus !== 'ready'} onClick={handleImportProduct}>
                    Import Products
                </button>
                <GridReport>
                    <div className="main">{getProductGrid}</div>
                    <div className="delete">{getProductDeletedGrid}</div>
                </GridReport>
            </>}
        </>
    );
};