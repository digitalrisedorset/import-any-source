import { gql, useQuery } from '@apollo/client';
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
        theme
        role {
          canCreateProducts
          canUpdateProducts
          canDeleteProducts
          canImportPIMAttribute
          canImportMagentoAttribute
          canMapAttribute
          canImportProduct
        }
      }
    }
  }
`;

export function useUser() {
  const navigate = useNavigate()
  const { data } = useQuery(CURRENT_USER_QUERY);

  useEffect(() => {
    if (data?.authenticatedItem) {
      navigate('/')
    } else {
      navigate('/signin')
    }
  }, [data?.authenticatedItem])

  return data?.authenticatedItem;
}

export { CURRENT_USER_QUERY };
