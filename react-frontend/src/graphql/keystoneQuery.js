import {gql} from "@apollo/client";

export const ALL_WOOCOMMERCE_PRODUCT_ATTRIBUTES_QUERY = gql`
     {
      woocommerceAttributes {
        id
        code
        name
        type
        required
        createdAt
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
      }
  }
`;

const GET_WOOCOMMERCE_ATTRIBUTE_LIST_QUERY = gql`    
    query WoocommerceAttributes($where: WoocommerceAttributeWhereInput!) {
      woocommerceAttributes(where: $where) {
        id
      }
    }
`;

export {GET_WOOCOMMERCE_ATTRIBUTE_LIST_QUERY}

const GET_MAGENTO_ATTRIBUTE_LIST_QUERY = gql`        
    query MagentoAttributes($where: MagentoAttributeWhereInput!) {
      magentoAttributes(where: $where) { 
        id
      }
    }
`;

export {GET_MAGENTO_ATTRIBUTE_LIST_QUERY}

const CREATE_WOOCOMMERCE_ATTRIBUTE_LIST_MUTATION = gql`    
      mutation CreateWoocommerceAttributes($data: [WoocommerceAttributeCreateInput!]!) {
         createWoocommerceAttributes(data: $data) {
            id
            code
            name
            type
            required
         }
      }   
`;

export {CREATE_WOOCOMMERCE_ATTRIBUTE_LIST_MUTATION}

const DELETE_WOOCOMMERCE_ATTRIBUTE_LIST_MUTATION = gql`    
    mutation DeleteWoocommerceAttributes($where: [WoocommerceAttributeWhereUniqueInput!]!) {
      deleteWoocommerceAttributes(where: $where) {
        id
      }
    }
`;

export {DELETE_WOOCOMMERCE_ATTRIBUTE_LIST_MUTATION}

const DELETE_MAGENTO_ATTRIBUTE_LIST_MUTATION = gql`    
    mutation DeleteMagentoAttributes($where: [MagentoAttributeWhereUniqueInput!]!) {
      deleteMagentoAttributes(where: $where) {
        id
      }
    }
`;

export {DELETE_MAGENTO_ATTRIBUTE_LIST_MUTATION}

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

export {CREATE_MAGENTO_ATTRIBUTE_LIST_MUTATION}

const UPDATE_ATTRIBUTE_MUTATION = gql`    
    mutation UpdateWoocommerceAttribute($where: WoocommerceAttributeWhereUniqueInput!, $data: WoocommerceAttributeUpdateInput!) {
      updateWoocommerceAttribute(where: $where, data: $data) {
        id
      }
    }
`

export {UPDATE_ATTRIBUTE_MUTATION}