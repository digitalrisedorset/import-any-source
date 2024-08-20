import { OperationVariables, QueryResult} from "@apollo/client";
import {PimAttributeProvider} from "../../models/KeystonePimAttributeProvider"
import {MagentoAttributeProvider} from "../../../magento/models/KeystoneMagentoAttributeProvider"
import {MappingModel} from "../../../mapping/models/MappingDataProvider"
import {PimQueryResult, PimAttribute} from "../../../types/keystone";
import {useActions} from "../../../global/hooks/useActions";
import React, {useEffect, useState} from "react";
import {usePimAttributesLazy} from "../../graphql/usePimAttributes";
import {usePimAttributesNotMapped} from "../../graphql/useFindPimAttributesNotMapped";
import {useMagentoAttributesLazy} from "../../../magento/graphql/keystone/useMagentoAttributes";
import {StepForm} from "../../../global/styles/StepForm"
import {useCurrentPimSystemCode} from "../../hooks/useCurrentPimSystem";
import {ProductImportList} from "../ImportProduct/ProductImportList"
import {ImportResponse} from "../../../types/pim";
import {useProductImport} from "../../hooks/useProductImport";

export const ImportProduct: React.FC = () => {
    const pimSystemCode = useCurrentPimSystemCode()
    const [mappingReady, setMappingReady] = useState<boolean>(false)
    const [importBuiling, setImportBuilding] = useState<boolean>(false)
    const { setPimProductBatchLoaded } = useActions()
    const { addDownloadMessage, addFlashMessage } = useActions()
    const {importStatus, pimProducts} = useProductImport()

    const getPimAttributeList = usePimAttributesLazy()
    const getMagentoAttributeList = useMagentoAttributesLazy()
    const mappingData: QueryResult<PimQueryResult | OperationVariables> = usePimAttributesNotMapped()

    useEffect(() => {
        const setMappingStatus = (attributes: PimAttribute[]) => {
            if (attributes === undefined) {
                setMappingReady(true) // since no attribute has been imported yet, it is possible to do some mapping
                return
            }

            if (attributes.length !== undefined) {
                setMappingReady(attributes.length === 0)
            }
        }
        setMappingStatus(mappingData?.data?.pimAttributes)

        return () => {}
    }, [mappingData?.data?.pimAttributes])

    const handleDownloadProduct = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        try {
            setImportBuilding(true)
            const pimData = await getPimAttributeList();
            const magentoData = await getMagentoAttributeList();

            if (magentoData?.data && pimData?.data) {
                const magento = new MagentoAttributeProvider(magentoData.data.magentoAttributes)
                const pim = new PimAttributeProvider(pimData.data.pimAttributes)

                const MappingData = new MappingModel(pim.getListWithMapping(), magento.getListWithMapping())
                const response = await MappingData.createAttributesImport(pimSystemCode)
                if (response !== undefined) {
                    addDownloadMessage('The import has successfully created a csv import file', response as ImportResponse)
                    globalThis.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                    setImportBuilding(false)
                }
            }
        } catch (e) {
            console.log('error');
        }
    }

    const handleLoadProduct = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        try {
            setImportBuilding(true)
            const pimData = await getPimAttributeList();
            const magentoData = await getMagentoAttributeList();

            if (magentoData?.data && pimData?.data) {
                const magento = new MagentoAttributeProvider(magentoData.data.magentoAttributes)
                const pim = new PimAttributeProvider(pimData.data.pimAttributes)

                const MappingData = new MappingModel(pim.getListWithMapping(), magento.getListWithMapping())
                const response = await MappingData.getProductDataImport(pimSystemCode)
                if (response !== undefined) {
                    addFlashMessage('The import has successfully read the products to import')
                    setPimProductBatchLoaded(response)
                    globalThis.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                    setImportBuilding(false)
                }
            }
        } catch (e) {
            console.log('error');
        }
    }

    return (
        <StepForm>
            <div className="main">
                <h2>Step 4 {pimProducts?.length>0 && <span className="small-hint">({pimProducts?.length} products are {importStatus})</span>}</h2>

                <button type="submit" disabled={importBuiling || !mappingReady} onClick={handleDownloadProduct}>
                    Download Products to Import
                </button>
                &nbsp;
                <button type="submit" disabled={importBuiling || !mappingReady} onClick={handleLoadProduct}>
                    Load Products to Import
                </button>
                &nbsp;
                <ProductImportList/>
            </div>
        </StepForm>
    )
}