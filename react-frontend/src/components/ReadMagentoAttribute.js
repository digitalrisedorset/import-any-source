import {gql, useQuery} from '@apollo/client';

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

export default function ReadMagentoAttribute() {
    const { data, status, error, loading } = useQuery(GET_MAGENTO_ATTRIBUTE_LIST_QUERY, {
        variables: {}, context: {clientName: 'magento'}
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="App">
            <h2>Magento Attributes</h2>
            {status === "error" && <p>Error fetching data</p>}
            {status === "loading" && <p>Fetching data...</p>}
            {(
                data.attributesList.items.map((attribute) => (
                    <li key={attribute.code}>name: {attribute.label} (code: {attribute.code}), type: {attribute.frontend_input}</li>
                ))
            )}
        </div>
    )
}