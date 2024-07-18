import {PimAttribute, PimQueryResult} from "../../types/keystone";
import {useNavigate} from "react-router-dom";
import {OperationVariables, QueryResult, useQuery} from "@apollo/client";
import {ALL_PIM_ATTRIBUTES_NOT_MAPPED_QUERY} from "../../graphql/keystone";
import {useEffect, useState} from "react";
import StepForm from "../styles/StepForm";

export function MappingAttributes() {
    const [mappingReady, setMappingReady] = useState(false)
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
                setMappingReady(attributes.length > 0)
            }
        }
        isMappingNotComplete(mappingData?.data?.pimAttributes)

        return () => {}
    }, [mappingData?.data?.pimAttributes])

    const navigate = useNavigate()


    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        navigate(`/pim`);
    }

    return (
        <StepForm>
            <h2>Step 3</h2>

            <button type="submit" disabled={!mappingReady} onClick={handleSubmit}>
                Mapping Attributes
            </button>
        </StepForm>
    )
}