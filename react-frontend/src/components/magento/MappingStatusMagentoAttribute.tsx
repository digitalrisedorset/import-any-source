import {KeystoneMagentoAttributeData, MagentoAttribute} from "../../types/keystone";
import AwaitingLinkStyle from "../styles/AwaitingLinkStyle";
import {OperationVariables, QueryResult, useQuery} from "@apollo/client";
import {GET_MAPPING_STATUS_ATTRIBUTE_LIST_QUERY} from "../../graphql/keystone";

export function MappingStatusMagentoAttribute() {
    const mappingResult:QueryResult<KeystoneMagentoAttributeData | OperationVariables> = useQuery(GET_MAPPING_STATUS_ATTRIBUTE_LIST_QUERY, {
        variables: {
            "where": {
                "required": {
                    "equals": true
                }
            }
        }
    });

    return (
        <AwaitingLinkStyle>
            <h2>Magento Attributes Awaiting Link</h2>
            {(mappingResult?.data?.magentoAttributes.map((attribute: MagentoAttribute ) => (
                <div key={attribute.code}>
                {attribute.assignedTo && (
                    <p>{attribute.name} (code:{attribute.code}, linked with {attribute.assignedTo.name})</p>
                    )}
                {!attribute.assignedTo && (
                    <p>{attribute.name} (code:{attribute.code})</p>
                    )}
                </div>
            )))}
        </AwaitingLinkStyle>
    )
}