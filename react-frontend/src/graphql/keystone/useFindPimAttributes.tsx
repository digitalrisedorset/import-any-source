import {LazyQueryResultTuple, OperationVariables, useLazyQuery, useQuery} from '@apollo/client';
import { GET_PIM_ATTRIBUTE_LIST_QUERY} from "../keystone";
import { PimQueryResult} from "../../types/keystone";

export const useFindPimAttributes = (initialAttribute: string) => {
    const [getPimAttributeList]: LazyQueryResultTuple<PimQueryResult, OperationVariables> = useLazyQuery(GET_PIM_ATTRIBUTE_LIST_QUERY, {
        variables: {
            "where": {
                "code": {
                    "equals": initialAttribute
                }
            }
        }
    });

    return getPimAttributeList;
}