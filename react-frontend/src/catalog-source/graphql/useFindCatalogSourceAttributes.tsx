import {gql, LazyQueryResultTuple, OperationVariables, useLazyQuery} from '@apollo/client';
import { CatalogSourceQueryResult} from "../../types/keystone";
import {useCurrentCatalogSourceSystemCode} from "../hooks/useCurrentCatalogSource";

const GET_CATALOG_SOURCE_ATTRIBUTE_LIST_QUERY = gql`    
    query CatalogSourceAttributes($where: CatalogSourceAttributeWhereInput!) {
      catalogSourceAttributes(where: $where) {
        id
      }
    }
`;

export const useFindCatalogSourceAttributes = (initialAttribute: string) => {
    const catalogSourceCode = useCurrentCatalogSourceSystemCode()
    const [getCatalogSourceAttributeList]: LazyQueryResultTuple<CatalogSourceQueryResult, OperationVariables> = useLazyQuery(GET_CATALOG_SOURCE_ATTRIBUTE_LIST_QUERY, {
        variables: {
            "where": {
                "code": {
                    "equals": initialAttribute
                },
                "catalogSource": {
                    "equals": catalogSourceCode
                }
            }
        },
        fetchPolicy: 'network-only'
    });

    return getCatalogSourceAttributeList;
}