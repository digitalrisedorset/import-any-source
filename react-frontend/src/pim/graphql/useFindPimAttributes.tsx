import {LazyQueryResultTuple, OperationVariables, useLazyQuery} from '@apollo/client';
import { GET_PIM_ATTRIBUTE_LIST_QUERY} from "../../graphql/keystone";
import { PimQueryResult} from "../../types/keystone";
import {useCurrentPimSystemCode} from "../hooks/useCurrentPimSystem";

export const useFindPimAttributes = (initialAttribute: string) => {
    const pimSystemCode = useCurrentPimSystemCode()
    const [getPimAttributeList]: LazyQueryResultTuple<PimQueryResult, OperationVariables> = useLazyQuery(GET_PIM_ATTRIBUTE_LIST_QUERY, {
        variables: {
            "where": {
                "code": {
                    "equals": initialAttribute
                },
                "pimSystem": {
                    "equals": pimSystemCode
                }
            }
        },
        fetchPolicy: 'network-only'
    });

    return getPimAttributeList;
}