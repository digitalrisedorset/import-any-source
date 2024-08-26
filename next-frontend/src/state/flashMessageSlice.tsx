import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface FlashMessageState {
    messages: string[]
    messageType: string,
    downloadLink?: ImportResponse
}

const initialState: FlashMessageState = {
    messages: [],
    messageType: ''
}

export const flashMessageSlice = createSlice({
    name: "flashMessage",
    initialState,
    reducers: {
        addFlashMessage: (state, action: PayloadAction<string>) => {
            return { messages: [action.payload], messageType: 'success' }
        },
        addDownloadMessage: (state, action: PayloadAction<{message: string, file:ImportResponse}>) => {
            return { messages: [action.payload.message], downloadLink: action.payload.file, messageType: 'success' }
        },
        clearFlashMessage: (state) => {
            Object.assign(state, initialState)
        }
    }
})

export const { addFlashMessage, addDownloadMessage, clearFlashMessage } = flashMessageSlice.actions;
export const flashMessageReducer = flashMessageSlice.reducer;