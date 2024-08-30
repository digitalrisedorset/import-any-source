import { createContext, useContext} from 'react';
import {useImmer} from "use-immer";
import { MagentoImportStateData} from "@/pages/types/states";

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

const initialState: MagentoImportStateData = {magentoAttributes: 0}

function MagentoAttributeProvider({ children }) {
    const [state, setState] = useImmer<MagentoImportStateData>(initialState);

    const setMagentoAttributesImported = (numberAttributes: number) => {
        setState(draft => {draft.magentoAttributes = numberAttributes});
    }

    return (
        <LocalStateProvider
            value={{
                setMagentoAttributesImported,
                magentoAttributesState: state
            }}
        >
            {children}
        </LocalStateProvider>
    )
}

function useMagentoAttribute() {
    // We use a consumer here to access the local state
    const all = useContext(LocalStateContext);
    return all;
}

export { MagentoAttributeProvider, useMagentoAttribute };