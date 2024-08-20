import {Dispatch} from "redux";
import {FlassMessaggeActionList} from "../../../state/actions";
import {FlashMessageActionType} from "../../../state/action-types";
import {ImportResponse} from "../../../types/catalog-source"

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