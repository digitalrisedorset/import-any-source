import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface FlashMessageState {
    messages: string[]
    messageType: string,
    downloadLink?: ImportResponse
}

const initialState = {
    messages: [],
    messageType: ''
}

export const flashMessageSlice = createSlice({
    name: "flashMessage",
    initialState,
    reducers: {
        addFlashMessage: (state, action: PayloadAction<string>) => {
            state = { messages: [action.payload], messageType: 'success' }
        },
        addDownloadMessage: (state, action: PayloadAction<{message: string, file:ImportResponse}>) => {
            state = { messages: [action.payload.message], downloadLink: action.payload.file, messageType: 'success' }
        },
    }
})

export const { addFlashMessage, addDownloadMessage } = flashMessageSlice.actions;
export const flashMessageReducer = flashMessageSlice.reducer;