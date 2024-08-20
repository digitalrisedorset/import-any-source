import {gql, useMutation} from '@apollo/client';

export const UPDATE_ATTRIBUTE_MUTATION = gql`    
    mutation UpdateCatalogSourceAttribute($where: CatalogSourceAttributeWhereUniqueInput!, $data: CatalogSourceAttributeUpdateInput!) {
      updateCatalogSourceAttribute(where: $where, data: $data) {
        id
      }
    }
`

export const useSetCatalogSourceAttributeIgnoredQueryResult = (attributeId?: string) => {
    const [setCatalogSourceAttributeIgnore] = useMutation(UPDATE_ATTRIBUTE_MUTATION, {
        variables: {
            "where": {"id":attributeId},
            "data": {
                "ignored": true
            }
        },
        update
    });

    function update(cache: any, payload: any) {
        cache.evict(cache.identify(payload.data.updateCatalogSourceAttribute));
    }

    return setCatalogSourceAttributeIgnore;
}