import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CatalogSourceAttributesMappingState {
    loading: boolean;
    error: string | null;
    catalogSourceAttribute: string | null,
    magentoMatchAttributes: MatchingAttributeData[],
    magentoMatch: MagentoAttribute | null
}

const initialState: CatalogSourceAttributesMappingState = {
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
            return { loading: true, error: null, catalogSourceAttribute: action.payload.catalogSourceAttributeCode, magentoMatchAttributes: action.payload.magentoMatchesAttributes, magentoMatch: null}
        },
        setCatalogSourceAttributesMatchSet: (state, action: PayloadAction<{catalogSourceAttributeCode: string, magentoMatch: MagentoAttribute}>) => {
            return { loading: true, error: null, catalogSourceAttribute: action.payload.catalogSourceAttributeCode, magentoMatchAttributes: [], magentoMatch: action.payload.magentoMatch}
        },
    }
})

export const { setCatalogSourceAttributesMatchFound, setCatalogSourceAttributesMatchSet } = catalogSourceMappingSlice.actions;
export const catalogSourceMappingReducer = catalogSourceMappingSlice.reducer;