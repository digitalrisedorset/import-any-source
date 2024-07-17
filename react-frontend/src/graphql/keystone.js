import {gql} from "@apollo/client";

export const ALL_PIM_PRODUCT_ATTRIBUTES_QUERY = gql`
     {
      pimAttributes {
        id
        code
        name
        type
        required
        ignored
        createdAt
        magentoCode {
            code
            name
        }
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
            code
            name
        }
      }
  }
`;

export const ALL_PIM_ATTRIBUTES_NOT_MAPPED_QUERY = gql`
    query PimAttributes($where: PimAttributeWhereInput!) {
      pimAttributes(where: $where) {
        code
        ignored
        name
        magentoCode {
          code
        }
      }
    }
`;


const GET_PIM_ATTRIBUTE_LIST_QUERY = gql`    
    query PimAttributes($where: PimAttributeWhereInput!) {
      pimAttributes(where: $where) {
        id
      }
    }
`;

export {GET_PIM_ATTRIBUTE_LIST_QUERY}

const GET_MAGENTO_ATTRIBUTE_LIST_QUERY = gql`        
    query MagentoAttributes($where: MagentoAttributeWhereInput!) {
      magentoAttributes(where: $where) { 
        id     
      }
    }
`;

export {GET_MAGENTO_ATTRIBUTE_LIST_QUERY}

const GET_MAPPING_STATUS_ATTRIBUTE_LIST_QUERY = gql`        
    query MagentoAttributes($where: MagentoAttributeWhereInput!) {
      magentoAttributes(where: $where) {       
        code
        name
        assignedTo {
            code
            name
        }
      }
    }
`;

export {GET_MAPPING_STATUS_ATTRIBUTE_LIST_QUERY}

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

export {CREATE_PIM_ATTRIBUTE_LIST_MUTATION}

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
    mutation UpdatePimAttribute($where: PimAttributeWhereUniqueInput!, $data: PimAttributeUpdateInput!) {
      updatePimAttribute(where: $where, data: $data) {
        id
      }
    }
`

export {UPDATE_ATTRIBUTE_MUTATION}