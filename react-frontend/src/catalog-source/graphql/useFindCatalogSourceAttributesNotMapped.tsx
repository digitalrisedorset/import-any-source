import {gql, OperationVariables, QueryResult, useQuery} from '@apollo/client';
import { CatalogSourceQueryResult} from "../../types/keystone";
import {useCurrentCatalogSourceSystemCode} from "../hooks/useCurrentCatalogSource";

export const ALL_CATALOG_SOURCE_ATTRIBUTES_NOT_MAPPED_QUERY = gql`
    query CatalogSourceAttributes($where: CatalogSourceAttributeWhereInput!) {
      catalogSourceAttributes(where: $where) {
        code
        ignored
        name
        magentoCode {
          code
        }
      }
    }
`;


export const useCatalogSourceAttributesNotMapped = () => {
    const catalogSourceCode = useCurrentCatalogSourceSystemCode()
    const mappingData: QueryResult<CatalogSourceQueryResult | OperationVariables> = useQuery(ALL_CATALOG_SOURCE_ATTRIBUTES_NOT_MAPPED_QUERY, {
        variables: {
            "where": {
                "ignored": {
                    "equals": false
                },
                "magentoCode": null,
                "catalogSource": {
                    "equals": catalogSourceCode
                }
            }
        },
        fetchPolicy: 'network-only'
    });

    return mappingData;
}