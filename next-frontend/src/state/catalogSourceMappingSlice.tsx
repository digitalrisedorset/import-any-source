import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {flashMessageSlice} from "@/state/flashMessageSlice";

interface CatalogSourceAttributesMappingState {
    loading: boolean;
    error: string | null;
    catalogSourceAttribute: string | null,
    magentoMatchAttributes: MatchingAttributeData[],
    magentoMatch: MagentoAttribute | null
}

const initialState = {
    loading: false,
    error: null,
    catalogSourceAttribute: null,
    magentoMatchAttributes: [],
    magentoMatch: null
}

export const catalogSourceMappingSlice = createSlice({
    name: "catalogSourceMapping",
    initialState,
    reducers: {
        setCatalogSourceAttributesMatchFound: (state, action: PayloadAction<{catalogSourceAttributeCode: string, magentoMatches: MatchingAttributeData[]}>) => {
            state = { loading: true, error: null, catalogSourceAttribute: action.payload.catalogSourceAttributeCode, magentoMatchAttributes: action.payload.magentoMatchesAttributes, magentoMatch: null}
        },
        setCatalogSourceAttributesMatchSet: (state, action: PayloadAction<{catalogSourceAttributeCode: string, magentoMatch: MagentoAttribute}>) => {
            state = { loading: true, error: null, catalogSourceAttribute: action.payload.catalogSourceAttributeCode, magentoMatchAttributes: [], magentoMatch: action.payload.magentoMatch}
        },
    }
})

export const { setCatalogSourceAttributesMatchFound, setCatalogSourceAttributesMatchSet } = catalogSourceMappingSlice.actions;
export const catalogSourceMappingReducer = catalogSourceMappingSlice.reducer;