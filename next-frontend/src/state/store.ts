import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { authReducer } from "@/state/authSlice";
import { configurationReducer } from "@/state/configurationSlice";
import {catalogSourceProductReducer} from "@/state/catalogSourceProductSlice";
import {catalogSourceAttributeReducer} from "@/state/catalogSourceAttributeSlice";
import {flashMessageReducer} from "@/state/flashMessageSlice";
import {magentoAttributeReducer} from "@/state/magentoAttributeSlice";
import {catalogSourceMappingReducer} from "@/state/catalogSourceMappingSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        configuration: configurationReducer,
        catalogSourceProduct: catalogSourceProductReducer,
        catalogSourceAttribute: catalogSourceAttributeReducer,
        flashMessage: flashMessageReducer,
        magentoAttribute: magentoAttributeReducer,
        catalogSourceMapping: catalogSourceMappingReducer
    }
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;