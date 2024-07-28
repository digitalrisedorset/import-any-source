import {useMutation} from '@apollo/client';
import {UPDATE_ATTRIBUTE_MUTATION} from "../../graphql/keystone";

export const useSetPimgAttributeActive = (attributeId?: string) => {
    const [setPimAttributeActivate] = useMutation(UPDATE_ATTRIBUTE_MUTATION, {
        variables: {
            "where": {"id": attributeId},
            "data": {
                "ignored": false
            }
        },
        update
    });

    function update(cache: any, payload: any) {
        cache.evict(cache.identify(payload.data.updatePimAttribute));
    }

    return setPimAttributeActivate;
}