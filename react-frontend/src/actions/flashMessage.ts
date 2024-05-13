import {Dispatch} from "redux";

export enum FlashActionTypes {
    clearMessage,
    flashMessage,
    errorMessage
}

export type FlassMessageAction = clearFlashMessageAction | setFlashMessageAction

export enum MessageType {
    success,
    error
}

export interface FlashMessage {
    messages: string[]
    type: MessageType
}

export interface clearFlashMessageAction {
    type: FlashActionTypes.clearMessage,
    message: null
}

export interface setFlashMessageAction {
    type: MessageType,
    message: string
}

export const clearFlashMessage = () => {
    return async (dispatch: Dispatch) => {
        dispatch<clearFlashMessageAction>({
            type: FlashActionTypes.clearMessage,
            message: null
        })
    }
}

export const setFlashMessage = (message: string, type: MessageType) => {
    return async (dispatch: Dispatch) => {
        dispatch<setFlashMessageAction>({
            type,
            message: message
        })
    }
}