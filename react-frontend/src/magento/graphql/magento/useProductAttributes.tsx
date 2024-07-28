import {gql, OperationVariables, QueryResult, useQuery} from '@apollo/client';
import {RemoteMagentoAttributeData} from "../../../types/magento";

const GET_MAGENTO_ATTRIBUTE_LIST_QUERY = gql`
    {
      attributesList(entityType: CATALOG_PRODUCT, filters: {}) {
        errors {
          message
          type
        }
        items {
          code
          default_value
          entity_type
          frontend_class
          frontend_input
          is_required
          is_unique
          label
        }
      }
    }
`;

export const useProductAttributes = () => {
    const productAttributesData: QueryResult<RemoteMagentoAttributeData | OperationVariables> = useQuery(GET_MAGENTO_ATTRIBUTE_LIST_QUERY, {
        variables: {}, context: {clientName: 'magento'}
    });

    return productAttributesData;
}