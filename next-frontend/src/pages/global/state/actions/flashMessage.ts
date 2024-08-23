import {ImportResponse} from "../../../types/catalog-source"
import {FlashMessageActionType} from "../action-types/flashMessageAction";

interface AddFlashMessageAction {
    type: FlashMessageActionType.ADD_FLASH_MESSAGE,
    message: string
}

interface AddDownloadMessageAction {
    type: FlashMessageActionType.ADD_DOWNLOAD_MESSAGE,
    message: string
    file: ImportResponse
}

export type FlassMessaggeActionList = AddFlashMessageAction | AddDownloadMessageAction