import {fakeUser} from "@/tests/fixtures/fakeData";
import {CURRENT_USER_QUERY} from "@/pages/user-authentication/hooks/useUser";

export const useFakeUser = () => {
    const user = fakeUser()

    const mocks = [
        {
            request: {query: CURRENT_USER_QUERY, variables: {}},
            result: {
                data: {
                    user: user
                }
            }
        }
    ]

    return mocks;
}