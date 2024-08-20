import {gql, useMutation} from '@apollo/client';
import {ALL_PIM_PRODUCT_ATTRIBUTES_QUERY} from "../../pim/graphql/usePimAttributes";
import {UPDATE_ATTRIBUTE_MUTATION} from "../../pim/graphql/useSetPimAttributeIgnored"

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

export const useMapAttribute = (pimAttributeStateId: string, magentoAttributeStateId: string) => {
    const [mapAttribute] = useMutation(UPDATE_ATTRIBUTE_MUTATION, {
        variables: {
            "where": {"id":pimAttributeStateId},
            "data": {
                "magentoCode": {
                    "connect": {"id":magentoAttributeStateId}
                }
            }
        },
        refetchQueries: [{query: GET_MAPPING_STATUS_ATTRIBUTE_LIST_QUERY}, {query: ALL_PIM_PRODUCT_ATTRIBUTES_QUERY}],
        update
    });

    function update(cache: any, payload: any) {
        cache.evict(cache.identify(payload.data.updatePimAttribute));
    }

    return mapAttribute;
}