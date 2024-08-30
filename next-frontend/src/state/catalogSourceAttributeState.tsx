import { createContext, useContext} from 'react';
import {useImmer} from "use-immer";
import {CatalogSourceState} from "@/pages/types/states";
import {CatalogSourceHandler} from "@/pages/configuration/models/CatalogSourceHandler";

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

const buildInitialImportState = (): CatalogSourceState => {
    const catalogSourceHandler = new CatalogSourceHandler()

    return catalogSourceHandler.getCatalogSourceInitialStates()
}

const initialState = buildInitialImportState()

function CatalogSourceAttributeProvider({ children }) {
    const [state, setState] = useImmer<CatalogSourceState>(initialState);

    const setCatalogSourceAttributesImported = (name: string, numberCatalogSourceAttributes: number, ignoredAttributes: number) => {
        setState(draft => draft.map(
            (catalogSourceImportState) => catalogSourceImportState.name === name ?
                {...catalogSourceImportState,
                    numberCatalogSourceAttributes,
                    ignoredAttributes
                }
                : catalogSourceImportState)
        );
    }

    const addCatalogSourceAttributeMapped = (catalogSourceCode: string) => {
        setState(draft => draft.map(
            (catalogSourceImportState) => catalogSourceImportState.name === catalogSourceCode ? {
                ...catalogSourceImportState,
                magentoMapping: catalogSourceImportState.magentoMapping + 1
            } : {...catalogSourceImportState})
        );
    }

    const addCatalogSourceAttributeIgnored = (catalogSourceCode: string) => {
        setState(draft => draft.map(
            (catalogSourceImportState) => catalogSourceImportState.name === catalogSourceCode ? {
                ...catalogSourceImportState,
                ignoredAttributes: catalogSourceImportState.ignoredAttributes + 1
            } : {...catalogSourceImportState})
        );
    }

    const addCatalogSourceAttributeActivated = (catalogSourceCode: string) => {
        setState(draft => draft.map(
            (catalogSourceImportState) => catalogSourceImportState.name === catalogSourceCode ? {
                ...catalogSourceImportState,
                ignoredAttributes: catalogSourceImportState.ignoredAttributes - 1
            } : {...catalogSourceImportState})
        );
    }

    const setActiveCatalogSourceSystem = (catalogSourceCode: string) => {
        setState(draft => draft.map(
            (catalogSourceImportState) => catalogSourceImportState.name === catalogSourceCode ? {...catalogSourceImportState, active: true}
                : {...catalogSourceImportState, active: false})
        );
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