import { OperationVariables, QueryResult, useQuery} from '@apollo/client';
import { ALL_PIM_ATTRIBUTES_NOT_MAPPED_QUERY} from "../keystone";
import { PimQueryResult} from "../../types/keystone";
import {useTypedSelector} from "../../hooks/useTypedSelector";

export const usePimAttributesNotMapped = () => {
    const { pimSystemCode } = useTypedSelector((state) => state.pimSystem)
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
        }
    });

    return mappingData;
}