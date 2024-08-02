import {useMutation} from "@apollo/client";
import {CURRENT_USER_QUERY} from "../hooks/useUser";
import gql from "graphql-tag";
import {useActions} from "../../global/hooks/useActions";

const SIGNIN_MUTATION = gql`
  mutation AuthenticateUserWithPassword($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
          theme
          role {
            name          
            canUpdateProducts
            canImportPIMAttribute
            canCreateProducts
            canMapAttribute
            canImportProduct
            canImportMagentoAttribute
            canDeleteProducts
          }
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`;

export const useLoginUser = (inputs: any) => {
    const { setUserAccess, setActiveTheme } = useActions()

    const [signin] = useMutation(SIGNIN_MUTATION, {
        variables: inputs,
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
    });

    const setUserLogged = async (inputs: any) => {
        const res = await signin(inputs);
        if (res?.data?.authenticateUserWithPassword?.item) {
            const user = res.data.authenticateUserWithPassword.item
            setUserAccess(user.role)
            setActiveTheme(user.theme || '')
        }

        return (res?.data?.authenticateUserWithPassword.__typename === 'UserAuthenticationWithPasswordFailure')
            ? res?.data?.authenticateUserWithPassword
            : undefined
    }

    return setUserLogged
}