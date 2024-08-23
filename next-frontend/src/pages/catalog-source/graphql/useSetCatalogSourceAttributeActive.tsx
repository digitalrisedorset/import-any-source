import {useMutation} from '@apollo/client';
import {UPDATE_ATTRIBUTE_MUTATION} from "./useSetCatalogSourceAttributeIgnored";

export const useSetCatalogSourceAttributeActive = (attributeId?: string) => {
    const [setCatalogSourceAttributeActivate] = useMutation(UPDATE_ATTRIBUTE_MUTATION, {
        variables: {
            "where": {"id": attributeId},
            "data": {
                "ignored": false
            }
        },
        update
    });

    function update(cache: any, payload: any) {
        cache.evict(cache.identify(payload.data.updateCatalogSourceAttribute));
    }

    return setCatalogSourceAttributeActivate;
}