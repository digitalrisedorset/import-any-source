import {Dispatch} from "redux";
import {FlassMessaggeActionList} from "../actions";
import {FlashMessageActionType} from "../action-types";
import {ImportResponse} from "../../types/woocommerce"

export const addFlashMessage = (message: string) => {
    return async (dispatch: Dispatch<FlassMessaggeActionList>) => {
        dispatch({
            type: FlashMessageActionType.ADD_FLASH_MESSAGE,
            message
        })
    }
}

export const addDownloadMessage = (message: string, file:ImportResponse) => {
    return async (dispatch: Dispatch<FlassMessaggeActionList>) => {
        dispatch({
            type: FlashMessageActionType.ADD_DOWNLOAD_MESSAGE,
            message,
            file
        })
    }
}

export const resetFlashMessage = () => {
    return async (dispatch: Dispatch<FlassMessaggeActionList>) => {
        dispatch({
            type: FlashMessageActionType.RESET_FLASH_MESSAGE
        })
    }
}