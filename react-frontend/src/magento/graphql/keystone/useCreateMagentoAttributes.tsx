import {gql} from "@apollo/client";
import { useMutation} from '@apollo/client';
import {ALL_PIM_ATTRIBUTES_NOT_MAPPED_QUERY} from "../../../pim/graphql/useFindPimAttributesNotMapped"

const CREATE_MAGENTO_ATTRIBUTE_LIST_MUTATION = gql`    
      mutation CreateMagentoAttributes($data: [MagentoAttributeCreateInput!]!) {
          createMagentoAttributes(data: $data) {
            id
            code
            name
            type
            required
          }
      }
`;

export const ALL_MAGENTO_PRODUCT_ATTRIBUTES_QUERY = gql`
     {
      magentoAttributes {
        id
        code
        name
        type
        required
        createdAt
        assignedTo {
            id
            code
            name
        }
      }
  }
`;


export const useCreateMagentoAttributes = () => {
    const [createListAttribute ] = useMutation(CREATE_MAGENTO_ATTRIBUTE_LIST_MUTATION, {
        refetchQueries: [{ query: ALL_MAGENTO_PRODUCT_ATTRIBUTES_QUERY }, {query: ALL_PIM_ATTRIBUTES_NOT_MAPPED_QUERY}]
    });

    return createListAttribute;
}