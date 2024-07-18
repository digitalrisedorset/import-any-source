import { useMutation} from '@apollo/client';
import {  UPDATE_ATTRIBUTE_MUTATION} from "../keystone";

export const useSetPimgAttributeIgnored = (attributeId?: string) => {
    if (attributeId=== undefined) {
        throw new Error('No attribute is specified')
    }

    const [setPimAttributeIgnore] = useMutation(UPDATE_ATTRIBUTE_MUTATION, {
        variables: {
            "where": {"id":attributeId},
            "data": {
                "ignored": true
            }
        },
        update
    });

    function update(cache: any, payload: any) {
        cache.evict(cache.identify(payload.data.updatePimAttribute));
    }

    return setPimAttributeIgnore;
}