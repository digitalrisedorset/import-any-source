import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ConfigurationState {
    themeCode: string,
    accessEnabled: AccessState
}

const accessDisabled: AccessState = {
    canCreateProducts: false,
    canUpdateProducts: false,
    canDeleteProducts: false,
    canImportSourceAttribute: false,
    canImportMagentoAttribute: false,
    canMapAttribute: false,
    canImportProduct: false,
    canMonitorData: false,
    canSetupImport: false
}

const initialState: ConfigurationState = {
    themeCode: '',
    accessEnabled: accessDisabled
}

export const configurationSlice = createSlice({
    name: "configuration",
    initialState,
    reducers: {
        setUserAccess: (state, action: PayloadAction) => {
            state.accessEnabled = action.payload
        },
        setActiveTheme: (state, action: PayloadAction) => {
            state.themeCode = action.payload
        },
    },
});

export const { setUserAccess, setActiveTheme } = configurationSlice.actions;
export const configurationReducer = configurationSlice.reducer;