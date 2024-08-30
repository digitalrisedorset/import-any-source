import { createContext, useContext} from 'react';
import {useImmer} from "use-immer";

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

interface CatalogSourceAttributesMappingState {
    catalogSourceAttribute: string | null,
    magentoMatchAttributes: MatchingAttributeData[],
    magentoMatch: MagentoAttribute | null
}

const initialState: CatalogSourceAttributesMappingState = {
    catalogSourceAttribute: null,
    magentoMatchAttributes: [],
    magentoMatch: null
}

function CatalogSourceMappingProvider({ children }) {
    const [state, setState] = useImmer<CatalogSourceAttributesMappingState>(initialState);

    const setCatalogSourceAttributesMatchFound = (catalogSourceAttributeCode: string, magentoMatches: MatchingAttributeData[]) => {
        setState(draft => {
            draft.catalogSourceAttribute = catalogSourceAttributeCode;
            draft.magentoMatches = magentoMatches;
            draft.magentoMatch = null
        });
    }

    const setCatalogSourceAttributesMatchSet = (catalogSourceCode: string, magentoMatch: MagentoAttribute) => {
        setState(draft => {
            draft.catalogSourceAttribute = catalogSourceCode;
            draft.magentoMatches = [];
            draft.magentoMatch = magentoMatch}
        );
    }

    return (
        <LocalStateProvider
            value={{
                setCatalogSourceAttributesMatchFound,
                setCatalogSourceAttributesMatchSet,
                catalogSourceAttribute: state.catalogSourceAttribute,
                magentoMatches: state.magentoMatches,
                magentoMatch: state.magentoMatch
            }}
        >
            {children}
        </LocalStateProvider>
    )
}

function useCatalogSourceMapping() {
    // We use a consumer here to access the local state
    const all = useContext(LocalStateContext);
    return all;
}

export { CatalogSourceMappingProvider, useCatalogSourceMapping };