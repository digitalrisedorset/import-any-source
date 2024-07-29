import {gql, LazyQueryResultTuple, OperationVariables, QueryResult, useLazyQuery} from '@apollo/client';
import {MagentoAttribute} from "../../../types/keystone";

interface MagentoQueryResult extends QueryResult {
    magentoAttributes: MagentoAttribute[]
}

export const GET_MAGENTO_ATTRIBUTE_LIST_QUERY = gql`        
    query MagentoAttributes($where: MagentoAttributeWhereInput!) {
      magentoAttributes(where: $where) { 
        id     
      }
    }
`;

export const useFindMagentoAttributes = (attributeLabel: string) => {
    const [getMagentoAttributeList]: LazyQueryResultTuple<MagentoQueryResult, OperationVariables> = useLazyQuery(GET_MAGENTO_ATTRIBUTE_LIST_QUERY, {
        variables: {
            "where": {
                "code": {
                    "equals": attributeLabel
                }
            }
        }
    });

    return getMagentoAttributeList;
}