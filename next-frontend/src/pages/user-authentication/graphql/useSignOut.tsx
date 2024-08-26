import gql from "graphql-tag";
import {useMutation} from "@apollo/client";
import {CURRENT_USER_QUERY} from "../hooks/useUser";
import makeStore from "@/state/store";
import {persistStore} from "redux-persist";
import {useRef} from "react";

const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

export const useSignOut = () => {
    const response = useMutation(SIGN_OUT_MUTATION, {
        refetchQueries: [{query: CURRENT_USER_QUERY}]
    });

    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore()
    }

    let persistor = persistStore(storeRef.current)
    persistor.purge()

    return response
}