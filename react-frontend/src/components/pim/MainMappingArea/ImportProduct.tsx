import {LazyQueryResultTuple, OperationVariables, QueryResult, useLazyQuery, useQuery} from "@apollo/client";
import {
    ALL_MAGENTO_PRODUCT_ATTRIBUTES_QUERY, ALL_PIM_ATTRIBUTES_NOT_MAPPED_QUERY,
    ALL_PIM_PRODUCT_ATTRIBUTES_QUERY
} from "../../../graphql/keystone";
import {PimAttributeProvider} from "../../../models/KeystonePimAttributeProvider"
import {MagentoAttributeProvider} from "../../../models/KeystoneMagentoAttributeProvider"
import {MappingModel} from "../../../models/MappingDataProvider"
import {
    PimAttributeData,
    KeystoneMagentoAttributeData,
    PimQueryResult,
    PimAttribute
} from "../../../types/keystone";
import {useActions} from "../../../hooks/useActions";
import {useEffect, useState} from "react";
import styled from "styled-components";
import {ImportResponse} from "../../../types/pim"

const Form = styled.form`
  button {
    &[disabled] {
      opacity: 0.5;
    }
  }
`;

export default function ImportProduct() {
    const [mappingReady, setMappingReady] = useState(false)
    const [importBuiling, setImportBuilding] = useState(false)
    const { addDownloadMessage } = useActions()
    const [getPimAttributeList]: LazyQueryResultTuple<PimAttributeData, OperationVariables> = useLazyQuery(ALL_PIM_PRODUCT_ATTRIBUTES_QUERY, {
        variables: {}
    });
    const [getMagentoAttributeList]: LazyQueryResultTuple<KeystoneMagentoAttributeData, OperationVariables> = useLazyQuery(ALL_MAGENTO_PRODUCT_ATTRIBUTES_QUERY, {
        variables: {}
    });

    const mappingData: QueryResult<PimQueryResult | OperationVariables> = useQuery(ALL_PIM_ATTRIBUTES_NOT_MAPPED_QUERY, {
        variables: {
            "where": {
                "ignored": {
                    "equals": false
                },
                "magentoCode": null
            }
        }
    });

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
                const response = await MappingData.createAttributesImport()
                addDownloadMessage('The import has successfully created a csv import file', response as ImportResponse)
                globalThis.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                setImportBuilding(false)
            }
        } catch (e) {
            console.log('error');
        }
    }

    return (
        <Form>
            <h2>Step 4</h2>

            <button type="submit" disabled={importBuiling || !mappingReady} onClick={handleSubmit}>
                Import Magento Products
            </button>
        </Form>
    )
}