import {gql, LazyQueryResultTuple, OperationVariables, useLazyQuery, useQuery} from '@apollo/client';
import {PimAttributeData} from "../../types/keystone";
import {useCurrentPimSystemCode} from "../hooks/useCurrentPimSystem";

export const ALL_PIM_PRODUCT_ATTRIBUTES_QUERY = gql`
     query PimAttributes($where: PimAttributeWhereInput!) {
      pimAttributes(where: $where) {
        id
        code
        name
        type
        required
        ignored
        createdAt
        magentoCode {
            code
            name
        },
        pimSystem
      } 
  }
`;

export const usePimAttributes = () => {
    const pimSystemCode = useCurrentPimSystemCode()
    const pimAttributesData = useQuery(ALL_PIM_PRODUCT_ATTRIBUTES_QUERY, {
        variables: {
            "where": {
                "pimSystem": {
                    "equals": pimSystemCode
                }
            }
        },
        fetchPolicy: 'cache-and-network'
    });

    return pimAttributesData;
}

export const usePimAttributesLazy = () => {
    const pimSystemCode = useCurrentPimSystemCode()
    const [getPimAttributeList]: LazyQueryResultTuple<PimAttributeData, OperationVariables> = useLazyQuery(ALL_PIM_PRODUCT_ATTRIBUTES_QUERY, {
        variables: {
            "where": {
                "pimSystem": {
                    "equals": pimSystemCode
                }
            }
        },
        fetchPolicy: 'network-only'
    });

    return getPimAttributeList;
}