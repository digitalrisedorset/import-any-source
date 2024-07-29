import {gql, LazyQueryResultTuple, OperationVariables, useLazyQuery} from '@apollo/client';
import { PimQueryResult} from "../../types/keystone";
import {useCurrentPimSystemCode} from "../hooks/useCurrentPimSystem";

const GET_PIM_ATTRIBUTE_LIST_QUERY = gql`    
    query PimAttributes($where: PimAttributeWhereInput!) {
      pimAttributes(where: $where) {
        id
      }
    }
`;

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