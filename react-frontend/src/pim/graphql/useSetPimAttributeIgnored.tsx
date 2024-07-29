import {gql, useMutation} from '@apollo/client';

export const UPDATE_ATTRIBUTE_MUTATION = gql`    
    mutation UpdatePimAttribute($where: PimAttributeWhereUniqueInput!, $data: PimAttributeUpdateInput!) {
      updatePimAttribute(where: $where, data: $data) {
        id
      }
    }
`

export const useSetPimgAttributeIgnored = (attributeId?: string) => {
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