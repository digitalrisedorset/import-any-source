import { useMutation} from '@apollo/client';
import {
    GET_MAPPING_STATUS_ATTRIBUTE_LIST_QUERY,
    UPDATE_ATTRIBUTE_MUTATION
} from "../keystone";
import {ALL_PIM_PRODUCT_ATTRIBUTES_QUERY} from "./usePimAttributes";

export const useMapAttribute = (pimAttributeStateId: string, magentoAttributeStateId: string) => {
    console.log(`useMapAttribute pimAttributeStateId ${pimAttributeStateId}, magentoAttributeStateId: ${magentoAttributeStateId}`)
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