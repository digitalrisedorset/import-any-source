import { OperationVariables, QueryResult, useQuery} from '@apollo/client';
import { ALL_PIM_ATTRIBUTES_NOT_MAPPED_QUERY} from "../../graphql/keystone";
import { PimQueryResult} from "../../types/keystone";
import {useCurrentPimSystemCode} from "../hooks/useCurrentPimSystem";

export const usePimAttributesNotMapped = () => {
    const pimSystemCode = useCurrentPimSystemCode()
    const mappingData: QueryResult<PimQueryResult | OperationVariables> = useQuery(ALL_PIM_ATTRIBUTES_NOT_MAPPED_QUERY, {
        variables: {
            "where": {
                "ignored": {
                    "equals": false
                },
                "magentoCode": null,
                "pimSystem": {
                    "equals": pimSystemCode
                }
            }
        },
        fetchPolicy: 'network-only'
    });

    return mappingData;
}