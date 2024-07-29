import {gql, OperationVariables, QueryResult, useQuery} from '@apollo/client';
import { PimQueryResult} from "../../types/keystone";
import {useCurrentPimSystemCode} from "../hooks/useCurrentPimSystem";

export const ALL_PIM_ATTRIBUTES_NOT_MAPPED_QUERY = gql`
    query PimAttributes($where: PimAttributeWhereInput!) {
      pimAttributes(where: $where) {
        code
        ignored
        name
        magentoCode {
          code
        }
      }
    }
`;


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