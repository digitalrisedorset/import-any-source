import {PimQueryResult} from "../../types/keystone";
import {useNavigate} from "react-router-dom";
import {OperationVariables, QueryResult, useQuery} from "@apollo/client";
import {ALL_PIM_ATTRIBUTES_NOT_MAPPED_QUERY} from "../../graphql/keystone";
import StepForm from "../styles/StepForm";
import {useMappingVerifier} from "../../hooks/useMappingVerifier";
import {MappingReport} from "./MappingReport"

export const MappingAttributes = () => {
    const mappingReady = useMappingVerifier()
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

    const navigate = useNavigate()


    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        navigate(`/pim`);
    }

    return (
        <StepForm>
            <div className="main">
                <h2>Step 3</h2>

                <button type="submit" disabled={!mappingReady} onClick={handleSubmit}>
                    Mapping Attributes
                </button>
            </div>
            <MappingReport/>
        </StepForm>
)
}