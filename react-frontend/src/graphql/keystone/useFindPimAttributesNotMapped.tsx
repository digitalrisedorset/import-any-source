import { OperationVariables, QueryResult, useQuery} from '@apollo/client';
import { ALL_PIM_ATTRIBUTES_NOT_MAPPED_QUERY} from "../keystone";
import { PimQueryResult} from "../../types/keystone";

export const usePimAttributesNotMapped = () => {
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

    return mappingData;
}