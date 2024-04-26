import { useQuery, gql } from "@apollo/client";

export const ALL_PRODUCT_ATTRIBUTES_QUERY = gql`
     {
      woocommerceAttributes {
        id
        code
        name
        type
        required
      }
  }
`;

export default function GetWoocommerceAttribute() {
    const { data, status, error, loading } = useQuery(ALL_PRODUCT_ATTRIBUTES_QUERY, {
        variables: {},
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="App">
            {status === "error" && <p>Error fetching data</p>}
            {status === "loading" && <p>Fetching data...</p>}
            {(
                data.woocommerceAttributes.map((attribute) => (
                        <li key={attribute.id}>name: {attribute.name}, type: {attribute.type}</li>
                    ))
            )}
        </div>
    )
}