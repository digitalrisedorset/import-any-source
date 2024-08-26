import { Provider } from "react-redux";
import {persistStore} from "redux-persist"
import {PersistGate} from "redux-persist/integration/react";
import makeStore from "@/state/store";
import {useRef} from "react";

export default function ReduxProvider({ children }: {
    children: React.ReactNode;
}) {
    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore()
    }

    let persistor = persistStore(storeRef.current)

    return <Provider store={storeRef.current}>
        <PersistGate loading={null} persistor={persistor}>
            {children}
        </PersistGate>
    </Provider>;
}