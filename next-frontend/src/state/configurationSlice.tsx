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

const buildInitialConfigState = () => {
    let configuration = null
    if (typeof window !== "undefined") {
        configuration = localStorage.getItem('configuration')
    }

    if (configuration === null) {
        const themeCode = ''

        return {
            themeCode,
            accessEnabled: accessDisabled
        }
    } else {
        return JSON.parse(configuration) as ConfigurationState
    }
}

const initialState = buildInitialConfigState()

export const configurationSlice = createSlice({
    name: "configuration",
    initialState,
    reducers: {
        setUserAccess: (state, action: PayloadAction) => {
            let newState: AccessState
            newState = {...state, accessEnabled: action.payload }
            localStorage.setItem('configuration', JSON.stringify(newState))
            state = newState
        },
        setActiveTheme: (state, action: PayloadAction) => {
            let newState: AccessState
            newState = {...state, themeCode: action.payload }
            localStorage.setItem('configuration', JSON.stringify(newState))
            state = newState
        },
    },
});

export const { setUserAccess, setActiveTheme } = configurationSlice.actions;
export const configurationReducer = configurationSlice.reducer;