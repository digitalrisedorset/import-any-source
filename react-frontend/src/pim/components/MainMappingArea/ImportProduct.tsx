import { OperationVariables, QueryResult} from "@apollo/client";
import {PimAttributeProvider} from "../../models/KeystonePimAttributeProvider"
import {MagentoAttributeProvider} from "../../../magento/models/KeystoneMagentoAttributeProvider"
import {MappingModel} from "../../../mapping/models/MappingDataProvider"
import {
    PimQueryResult,
    PimAttribute
} from "../../../types/keystone";
import {useActions} from "../../../global/hooks/useActions";
import {useEffect, useState} from "react";
import {ImportResponse} from "../../../types/pim"
import {usePimAttributesLazy} from "../../graphql/usePimAttributes";
import {usePimAttributesNotMapped} from "../../graphql/useFindPimAttributesNotMapped";
import {useMagentoAttributesLazy} from "../../../magento/graphql/keystone/useMagentoAttributes";
import StepForm from "../../../styles/StepForm"
import {useCurrentPimSystemCode} from "../../hooks/useCurrentPimSystem";

export const ImportProduct = () => {
    const pimSystemCode = useCurrentPimSystemCode()
    const [mappingReady, setMappingReady] = useState(false)
    const [importBuiling, setImportBuilding] = useState(false)
    const { addDownloadMessage } = useActions()

    const getPimAttributeList = usePimAttributesLazy()
    const getMagentoAttributeList = useMagentoAttributesLazy()
    const mappingData: QueryResult<PimQueryResult | OperationVariables> = usePimAttributesNotMapped()

    useEffect(() => {
        const isMappingNotComplete = (attributes: PimAttribute[]) => {
            if (attributes === undefined) {
                setMappingReady(true)
                return
            }

            if (attributes.length !== undefined) {
                setMappingReady(attributes.length === 0)
            }
        }
        isMappingNotComplete(mappingData?.data?.pimAttributes)

        return () => {}
    }, [mappingData?.data?.pimAttributes])

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
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
                addDownloadMessage('The import has successfully created a csv import file', response as ImportResponse)
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
                <h2>Step 4</h2>

                <button type="submit" disabled={importBuiling || !mappingReady} onClick={handleSubmit}>
                    Import Magento Products
                </button>
            </div>
        </StepForm>
)
}