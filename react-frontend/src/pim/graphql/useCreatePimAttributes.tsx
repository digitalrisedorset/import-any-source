import {gql, useMutation} from '@apollo/client';
import {ALL_PIM_PRODUCT_ATTRIBUTES_QUERY} from "./usePimAttributes";

const CREATE_PIM_ATTRIBUTE_LIST_MUTATION = gql`    
      mutation CreatePimAttributes($data: [PimAttributeCreateInput!]!) {
         createPimAttributes(data: $data) {
            id
            code
            name
            type
            required
         }
      }   
`;

export const useCreatePimAttributes = () => {
    const [createListAttribute] = useMutation(CREATE_PIM_ATTRIBUTE_LIST_MUTATION, {
        refetchQueries: [{ query: ALL_PIM_PRODUCT_ATTRIBUTES_QUERY }],
    });

    return createListAttribute;
}