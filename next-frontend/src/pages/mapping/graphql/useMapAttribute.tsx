import {gql, useMutation} from '@apollo/client';
import {ALL_CATALOG_SOURCE_PRODUCT_ATTRIBUTES_QUERY} from "../../catalog-source/graphql/useCatalogSourceAttributes";
import {UPDATE_ATTRIBUTE_MUTATION} from "../../catalog-source/graphql/useSetCatalogSourceAttributeIgnored"

const GET_MAPPING_STATUS_ATTRIBUTE_LIST_QUERY = gql`        
    query MagentoAttributes($where: MagentoAttributeWhereInput!) {
      magentoAttributes(where: $where) {       
        code
        name
        assignedTo {
            code
            name
        }
      }
    }
`;

export const useMapAttribute = (catalogSourceAttributeStateId: string, magentoAttributeStateId: string) => {
    const [mapAttribute] = useMutation(UPDATE_ATTRIBUTE_MUTATION, {
        variables: {
            "where": {"id":catalogSourceAttributeStateId},
            "data": {
                "magentoCode": {
                    "connect": {"id":magentoAttributeStateId}
                }
            }
        },
        refetchQueries: [{query: GET_MAPPING_STATUS_ATTRIBUTE_LIST_QUERY}, {query: ALL_CATALOG_SOURCE_PRODUCT_ATTRIBUTES_QUERY}],
        update
    });

    function update(cache: any, payload: any) {
        cache.evict(cache.identify(payload.data.updateCatalogSourceAttribute));
    }

    return mapAttribute;
}