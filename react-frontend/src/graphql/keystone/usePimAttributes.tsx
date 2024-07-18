import {gql, LazyQueryResultTuple, OperationVariables, useLazyQuery, useQuery} from '@apollo/client';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {PimAttributeData} from "../../types/keystone";

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
    const { pimSystemCode } = useTypedSelector((state) => state.pimSystem)
    const pimAttributesData = useQuery(ALL_PIM_PRODUCT_ATTRIBUTES_QUERY, {
        variables: {
            "where": {
                "pimSystem": {
                    "equals": pimSystemCode
                }
            }
        },
        fetchPolicy: 'network-only'
    });

    return pimAttributesData;
}

export const usePimAttributesLazy = () => {
    const { pimSystemCode } = useTypedSelector((state) => state.pimSystem)
    const [getPimAttributeList]: LazyQueryResultTuple<PimAttributeData, OperationVariables> = useLazyQuery(ALL_PIM_PRODUCT_ATTRIBUTES_QUERY, {
        variables: {
            "where": {
                "pimSystem": {
                    "equals": pimSystemCode
                }
            }
        }
    });

    return getPimAttributeList;
}