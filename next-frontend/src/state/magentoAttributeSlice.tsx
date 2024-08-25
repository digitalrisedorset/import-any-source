import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {MagentoImportStateData} from "@/pages/types/states";

const initialState: MagentoImportStateData = {magentoAttributes: 0}

export const magentoAttributeSlice = createSlice({
    name: "magentoAttributes",
    initialState,
    reducers: {
        setMagentoAttributesImported: (state, action: PayloadAction<number>) => {
            return { magentoAttributes: action.payload }
        },
    }
})

export const { setMagentoAttributesImported } = magentoAttributeSlice.actions;
export const magentoAttributeReducer = magentoAttributeSlice.reducer;