import {LazyQueryResultTuple, OperationVariables, useLazyQuery} from '@apollo/client';
import { GET_PIM_ATTRIBUTE_LIST_QUERY} from "../keystone";
import { PimQueryResult} from "../../types/keystone";
import {useTypedSelector} from "../../hooks/useTypedSelector";

export const useFindPimAttributes = (initialAttribute: string) => {
    const { pimSystemCode } = useTypedSelector((state) => state.pimSystem)
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
        }
    });

    return getPimAttributeList;
}