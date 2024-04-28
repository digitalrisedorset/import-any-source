import { useEffect, useState } from "react"
import {gql, useMutation, useQuery} from '@apollo/client';

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

export default function ImportMagentoAttribute() {
    const [attributeListState, setAttributeListState] = useState({});
    const [isLoading, setIsLoading] = useState(true)
    const [createListAttribute] = useMutation(CREATE_MAGENTO_ATTRIBUTE_LIST_MUTATION, {
        variables: {
            data: attributeListState
        }
    });
    const { data, status, error, loading } = useQuery(GET_MAGENTO_ATTRIBUTE_LIST_QUERY, {
        variables: {}, context: {clientName: 'magento'}
    });

    useEffect(() => {
        async function createAttributeList() {
            try {
                if (attributeListState.length>0) {
                    createListAttribute();
                    setIsLoading(false)
                }
            } catch (e) {
                console.log("There was a problem.")
            }
        }
        createAttributeList()
        return () => {

        }
    }, [attributeListState])

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setAttributeListState(data.attributesList.items.map(attribute => ({
                code: attribute.code,
                name: attribute.label,
                type: attribute.frontend_input,
                required: false
            })))
        } catch (e) {
            console.log('error');
        }
    }

    return (
        <form>
            <button type="submit" onClick={handleSubmit} className="py-3 mt-4 btn btn-lg btn-success btn-block">
                Import Magento Attributes
            </button>
        </form>
    )
}