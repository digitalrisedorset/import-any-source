import { useQuery, gql } from "@apollo/client";
import styled from 'styled-components';
import { perPage } from '../config';
import WoocommerceAttribute from './WoocommerceAttribute';

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

const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function WoocommerceAttributes({ page }) {
  // const { data, error, loading } = useQuery(ALL_PRODUCT_ATTRIBUTES_QUERY, {
  //   variables: {
  //     skip: page * perPage - perPage,
  //     first: perPage,
  //   },
  // });
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <ProductsListStyles>
        {/*{data.allProductAttributes.map((attribute) => (
          <WoocommerceAttribute />
        ))}*/}
      </ProductsListStyles>
    </div>
  );
}
