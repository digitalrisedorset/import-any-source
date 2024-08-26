import { Provider } from "react-redux";
import {useStore} from "@/state/store";
import {persistStore} from "redux-persist"
import {PersistGate} from "redux-persist/integration/react";

export default function ReduxProvider({ children }: {
    children: React.ReactNode;
}) {
    const store = useStore();
    let persistor;

    if (store) {
        persistor = persistStore(store, {}, function () {
            persistor.persist();
        });
    }

    return <Provider store={store}>
        <PersistGate loading={"loading from store"} persistor={persistor}>
            {children}
        </PersistGate>
    </Provider>;
}