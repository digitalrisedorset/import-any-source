import { createContext, useContext} from 'react';
import {useImmer} from "use-immer";
import { MagentoImportStateData} from "@/pages/types/states";

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

interface FlashMessageState {
    messages: string[]
    messageType: string,
    downloadLink?: ImportResponse
}

const initialState: FlashMessageState = {
    messages: [],
    messageType: ''
}

function FlashMessageProvider({ children }) {
    const [state, setState] = useImmer<MagentoImportStateData>(initialState);

    const addFlashMessage = (message: string) => {
        setState(draft => {draft.messages = [message], draft.messageType = 'success' });
    }

    const addDownloadMessage = (message: string, file:ImportResponse) => {
        setState(draft => {draft.messages = [message], draft.downloadLink = file, draft.messageType = 'success' });
    }

    const clearFlashMessage = () => {
        setState(initialState);
    }

    return (
        <LocalStateProvider
            value={{
                addFlashMessage,
                addDownloadMessage,
                clearFlashMessage,
                messages: state.messages,
                downloadLink: state.downloadLink,
                messageType: state.messageType
            }}
        >
            {children}
        </LocalStateProvider>
    )
}

function useFlashMessage() {
    // We use a consumer here to access the local state
    const all = useContext(LocalStateContext);
    return all;
}

export { FlashMessageProvider, useFlashMessage };