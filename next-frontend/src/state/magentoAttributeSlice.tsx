import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {MagentoImportStateData} from "@/pages/types/states";

const buildInitialState = (): MagentoImportStateData => {
    let loadStorageMagentoData = null
    if (typeof window !== "undefined") {
        loadStorageMagentoData = localStorage.getItem('magentoAttributes')
    }

    if (loadStorageMagentoData === null) {
        return {magentoAttributes: 0}
    }

    return {magentoAttributes: parseInt(loadStorageMagentoData)}
}

const initialState = buildInitialState()

export const magentoAttributeSlice = createSlice({
    name: "magentoAttributes",
    initialState,
    reducers: {
        setMagentoAttributesImported: (state, action: PayloadAction<number>) => {
            localStorage.setItem('magentoAttributes', action.payload.toString())
            state = { magentoAttributes: action.payload }
        },
    }
})

export const { setMagentoAttributesImported } = magentoAttributeSlice.actions;
export const magentoAttributeSliceReducer = magentoAttributeSlice.reducer;