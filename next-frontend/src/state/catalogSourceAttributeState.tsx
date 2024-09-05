import { createContext, useContext} from 'react';
import {useImmer} from "use-immer";
import {CatalogSourceState} from "@/pages/types/states";
import { useCookies } from "react-cookie"
import {getCatalogSourceInitialStates} from "@/pages/catalog-source/hooks/useCatalogSourceOptions";

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

const initialState = getCatalogSourceInitialStates()

function CatalogSourceAttributeProvider({ children }) {
    const [state, setState] = useImmer<CatalogSourceState>(initialState);
    const [cookie, setCookie] = useCookies(["configuration"])

    const setCatalogSourceAttributesImported = (name: string, numberCatalogSourceAttributes: number, ignoredAttributes: number) => {
        setState(draft => draft.map(
            (catalogSourceImportState) => catalogSourceImportState.name === name ?
                {...catalogSourceImportState,
                    numberCatalogSourceAttributes,
                    ignoredAttributes
                }
                : catalogSourceImportState)
        );
        setCookie('configuration', JSON.stringify(state))
    }

    const addCatalogSourceAttributeMapped = (catalogSourceCode: string) => {
        setState(draft => draft.map(
            (catalogSourceImportState) => catalogSourceImportState.name === catalogSourceCode ? {
                ...catalogSourceImportState,
                magentoMapping: catalogSourceImportState.magentoMapping + 1
            } : {...catalogSourceImportState})
        );
        setCookie('configuration', JSON.stringify(state))
    }

    const addCatalogSourceAttributeIgnored = (catalogSourceCode: string) => {
        setState(draft => draft.map(
            (catalogSourceImportState) => catalogSourceImportState.name === catalogSourceCode ? {
                ...catalogSourceImportState,
                ignoredAttributes: catalogSourceImportState.ignoredAttributes + 1
            } : {...catalogSourceImportState})
        );
        setCookie('configuration', JSON.stringify(state))
    }

    const addCatalogSourceAttributeActivated = (catalogSourceCode: string) => {
        setState(draft => draft.map(
            (catalogSourceImportState) => catalogSourceImportState.name === catalogSourceCode ? {
                ...catalogSourceImportState,
                ignoredAttributes: catalogSourceImportState.ignoredAttributes - 1
            } : {...catalogSourceImportState})
        );
        setCookie('configuration', JSON.stringify(state))
    }

    const setActiveCatalogSourceSystem = (catalogSourceCode: string) => {
        setState(draft => draft.map(
            (catalogSourceImportState) => catalogSourceImportState.name === catalogSourceCode ? {...catalogSourceImportState, active: true}
                : {...catalogSourceImportState, active: false})
        );
        setCookie('configuration', JSON.stringify(state))
    }

    return (
        <LocalStateProvider
            value={{
                setCatalogSourceAttributesImported,
                addCatalogSourceAttributeMapped,
                addCatalogSourceAttributeIgnored,
                addCatalogSourceAttributeActivated,
                setActiveCatalogSourceSystem,
                catalogSourceAttributeState: state
            }}
        >
            {children}
        </LocalStateProvider>
    )
}

function useCatalogSourceAttribute() {
    // We use a consumer here to access the local state
    const all = useContext(LocalStateContext);
    return all;
}

export { CatalogSourceAttributeProvider, useCatalogSourceAttribute };