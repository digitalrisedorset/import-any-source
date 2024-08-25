import {useProductImport} from "../../hooks/useProductImport";
import {useMagentoProducts} from "@/pages/magento/graphql/magento/useMagentoProducts";
import {useProductDeletedGrid, useProductImportGrid} from "@/pages/global/hooks/useProductGrid";
import {GridReport} from "../../styles/GridStyle"
import React from "react";
import {useActions} from "@/pages/global/hooks/useActions";

export const ProductImportList: React.FC = () => {
    const {importStatus, catalogSourceProducts} = useProductImport()
    const getProductDataBySku = useMagentoProducts()
    const { setCatalogSourceProductBatchValidated,addFlashMessage } = useActions()
    const getProductGrid = useProductImportGrid()
    const getProductDeletedGrid = useProductDeletedGrid()

    if (!catalogSourceProducts) return <></>

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