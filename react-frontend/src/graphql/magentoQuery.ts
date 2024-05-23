import {gql} from "@apollo/client";

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

export {GET_MAGENTO_ATTRIBUTE_LIST_QUERY}

