import {fakeUser} from "@/tests/fixtures/fakeData";
import {CURRENT_USER_QUERY} from "@/pages/user-authentication/hooks/useUser";

export const useFakeUser = () => {
    return [
        {
            request: {query: CURRENT_USER_QUERY, variables: {}},
            result: {
                data: {
                    authenticatedItem: fakeUser()
                }
            }
        }
    ];
}

export const useFakeNonLoggedInUser = () => {
    return [
        {
            request: {query: CURRENT_USER_QUERY, variables: {}},
            result: {
                data: {
                    authenticatedItem: null
                }
            }
        }
    ];
}