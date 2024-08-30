import {gql, LazyQueryResultTuple, OperationVariables, useLazyQuery, useQuery} from '@apollo/client';
import {CatalogSourceAttributeData} from "../../types/keystone";
import {useCurrentCatalogSourceSystemCode} from "../hooks/useCurrentCatalogSource";

export const ALL_CATALOG_SOURCE_PRODUCT_ATTRIBUTES_QUERY = gql`
     query CatalogSourceAttributes($where: CatalogSourceAttributeWhereInput!) {
      catalogSourceAttributes(where: $where) {
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
        catalogSource
      } 
  }
`;

export const useCatalogSourceAttributes = () => {
    const catalogSourceCode = useCurrentCatalogSourceSystemCode()
    const catalogSourceAttributesData = useQuery(ALL_CATALOG_SOURCE_PRODUCT_ATTRIBUTES_QUERY, {
        variables: {
            "where": {
                "catalogSource": {
                    "equals": catalogSourceCode
                }
            }
        },
        fetchPolicy: 'cache-and-network'
    });

    return catalogSourceAttributesData;
}

export const useCatalogSourceAttributesLazy = () => {
    const catalogSourceCode = useCurrentCatalogSourceSystemCode()

    const [getCatalogSourceAttributeList]: LazyQueryResultTuple<CatalogSourceAttributeData, OperationVariables> = useLazyQuery(ALL_CATALOG_SOURCE_PRODUCT_ATTRIBUTES_QUERY, {
        variables: {
            "where": {
                "catalogSource": {
                    "equals": catalogSourceCode
                }
            }
        },
        fetchPolicy: 'network-only'
    });

    return getCatalogSourceAttributeList;
}