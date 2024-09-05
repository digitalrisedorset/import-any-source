import { gql, useQuery } from '@apollo/client';
import {useEffect} from "react";
import {useRouter} from "next/router";

export const CURRENT_USER_QUERY = gql`
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
          canImportSourceAttribute
          canImportMagentoAttribute
          canMapAttribute
          canImportProduct
        }
      }
    }
  }
`;

export function useUser() {
  const router = useRouter()
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY);

  // useEffect(() => {
  //   if (data?.authenticatedItem) {
  //     router.push({pathname: '/'})
  //   } else {
  //     router.push({pathname: '/signin'})
  //   }
  // }, [data?.authenticatedItem])

  return data?.authenticatedItem;
}

export function useUserConfiguration() {
  const { data } = useQuery(CURRENT_USER_QUERY);

  const user = data?.authenticatedItem;

  return {
    themeCode: user?.theme,
    accessEnabled: user?.role
  }
}

export function verifyUserAccess() {
  const router = useRouter()
  const { data } = useQuery(CURRENT_USER_QUERY);

  useEffect(() => {
    if (data?.authenticatedItem) {
      //router.push({pathname: '/'})
    } else {
      //router.push({pathname: '/signin'})
    }
  }, [data?.authenticatedItem])

  return data?.authenticatedItem;
}
