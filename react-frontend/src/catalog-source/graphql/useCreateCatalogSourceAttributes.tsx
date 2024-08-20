import {gql, useMutation} from '@apollo/client';
import {ALL_CATALOG_SOURCE_PRODUCT_ATTRIBUTES_QUERY} from "./useCatalogSourceAttributes";

const CREATE_CATALOG_SOURCE_ATTRIBUTE_LIST_MUTATION = gql`    
      mutation CreateCatalogSourceAttributes($data: [CatalogSourceAttributeCreateInput!]!) {
         createCatalogSourceAttributes(data: $data) {
            id
            code
            name
            type
            required
         }
      }   
`;

export const useCreateCatalogSourceAttributes = () => {
    const [createListAttribute] = useMutation(CREATE_CATALOG_SOURCE_ATTRIBUTE_LIST_MUTATION, {
        refetchQueries: [{ query: ALL_CATALOG_SOURCE_PRODUCT_ATTRIBUTES_QUERY }],
    });

    return createListAttribute;
}