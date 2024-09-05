import { OperationVariables, QueryResult} from "@apollo/client";
import {CatalogSourceAttributeProvider} from "../../models/KeystoneCatalogSourceAttributeProvider"
import {MagentoAttributeProvider} from "@/pages/magento/models/KeystoneMagentoAttributeProvider"
import {MappingModel} from "@/pages/mapping/models/MappingDataProvider"
import {CatalogSourceQueryResult, KeystoneCatalogSourceAttribute} from "@/pages/types/keystone";
import React, {useEffect, useState} from "react";
import {useCatalogSourceAttributesLazy} from "../../graphql/useCatalogSourceAttributes";
import {useCatalogSourceAttributesNotMapped} from "../../graphql/useFindCatalogSourceAttributesNotMapped";
import {useMagentoAttributesLazy} from "@/pages/magento/graphql/keystone/useMagentoAttributes";
import {StepForm} from "@/pages/global/styles/StepForm"
import {useCurrentCatalogSourceSystemCode} from "../../hooks/useCurrentCatalogSource";
import {ProductImportList} from "../ImportProduct/ProductImportList"
import {ImportResponse} from "@/pages/types/catalog-source";
import {useProductImport} from "../../hooks/useProductImport";
import {useFlashMessage} from "@/state/flassMessageState";
import {useCatalogSourceProduct} from "@/state/catalogSourceProductState";

export const ImportProduct: React.FC = () => {
    const catalogSourceCode = useCurrentCatalogSourceSystemCode()
    const [mappingReady, setMappingReady] = useState<boolean>(false)
    const [importBuiling, setImportBuilding] = useState<boolean>(false)
    const { addDownloadMessage, addFlashMessage} = useFlashMessage()
    const {setCatalogSourceProductBatchLoaded } = useCatalogSourceProduct()
    const {importStatus, catalogSourceProducts} = useProductImport()

    const getCatalogSourceAttributeList = useCatalogSourceAttributesLazy()
    const getMagentoAttributeList = useMagentoAttributesLazy()
    const mappingData: QueryResult<CatalogSourceQueryResult | OperationVariables> = useCatalogSourceAttributesNotMapped()

    const prepareCatalogSourceProvider = async (): MappingModel | undefined => {
        const catalogSourceData = await getCatalogSourceAttributeList();
        const magentoData = await getMagentoAttributeList();

        if (magentoData?.data && catalogSourceData?.data) {
            const magento = new MagentoAttributeProvider(magentoData.data.magentoAttributes)
            const catalogSource = new CatalogSourceAttributeProvider(catalogSourceData.data.catalogSourceAttributes)

            const MappingData = new MappingModel(catalogSource.getListWithMapping(), magento.getListWithMapping())

            return MappingData
        }
    }


    useEffect(() => {
        const setMappingStatus = (attributes: KeystoneCatalogSourceAttribute[]) => {
            if (attributes === undefined) {
                setMappingReady(true) // since no attribute has been imported yet, it is possible to do some mapping
                return
            }

            if (attributes.length !== undefined) {
                setMappingReady(attributes.length === 0)
            }
        }
        setMappingStatus(mappingData?.data?.catalogSourceAttributes)

        return () => {}
    }, [mappingData?.data?.catalogSourceAttributes])

    const handleDownloadProduct = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        try {
            setImportBuilding(true)
            const MappingData = await prepareCatalogSourceProvider()
            const response = await MappingData.createAttributesImport(catalogSourceCode)

            if (response !== undefined) {
                addDownloadMessage('The import has successfully created a csv import file', response as ImportResponse)
                globalThis.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                setImportBuilding(false)
            }
        } catch (e) {
            console.log('error');
        }
    }

    const handleLoadProduct = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        try {
            setImportBuilding(true)
            const MappingData = await prepareCatalogSourceProvider()
            const response = await MappingData.getProductDataImport(catalogSourceCode)

            if (response !== undefined) {
                addFlashMessage('The import has successfully read the products to import')
                setCatalogSourceProductBatchLoaded(response)
                globalThis.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                setImportBuilding(false)
            }
        } catch (e) {
            console.log('error');
        }
    }

    return (
        <StepForm>
            <div className="main">
                <h2>Step 4 {catalogSourceProducts?.length>0 && <span className="small-hint">({catalogSourceProducts?.length} products are {importStatus})</span>}</h2>

                <button type="submit" disabled={importBuiling || !mappingReady} onClick={handleDownloadProduct}>
                    Download Products to Import
                </button>
                &nbsp;
                <button type="submit" disabled={importBuiling || !mappingReady} onClick={handleLoadProduct}>
                    Load Products to Import
                </button>
                &nbsp;
                <ProductImportList catalogSourceProducts={catalogSourceProducts} />
            </div>
        </StepForm>
    )
}