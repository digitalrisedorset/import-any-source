import {combineReducers, configureStore} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { authReducer } from "@/state/authSlice";
import { configurationReducer } from "@/state/configurationSlice";
import {catalogSourceProductReducer} from "@/state/catalogSourceProductSlice";
import {catalogSourceAttributeReducer} from "@/state/catalogSourceAttributeSlice";
import {flashMessageReducer} from "@/state/flashMessageSlice";
import {magentoAttributeReducer} from "@/state/magentoAttributeSlice";
import {catalogSourceMappingReducer} from "@/state/catalogSourceMappingSlice";
import storage from "@/state/storage";
import {persistReducer,FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,} from "redux-persist";

let store;

const rootReducer = combineReducers({
    auth: authReducer,
    configuration: configurationReducer,
    catalogSourceProduct: catalogSourceProductReducer,
    catalogSourceAttribute: catalogSourceAttributeReducer,
    flashMessage: flashMessageReducer,
    magentoAttribute: magentoAttributeReducer,
    catalogSourceMapping: catalogSourceMappingReducer
});

const persistConfig = {
    key: "root",
    version: 1,
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

function makeStore() {
    return configureStore({
        reducer: persistedReducer,
        devTools: process.env.NODE_ENV !== "production",
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }),
    });
}

// export const initializeStore = () => {
//     let _store = store ?? makeStore();
//
//     // For SSG and SSR always create a new store
//     if (typeof window === "undefined") return _store;
//
//     // Create the store once in the client
//     if (!store) store = _store;
//
//     return _store;
// };
//
// export function useStore() {
//     const store = useMemo(() => initializeStore(), []);
//     return store;
// }

export default makeStore;

//setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;