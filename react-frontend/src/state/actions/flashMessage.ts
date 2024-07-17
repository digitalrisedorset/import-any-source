import {ImportResponse} from "../../types/pim"

interface AddFlashMessageAction {
    type: 'add_flash_message',
    message: string
}

interface AddDownloadMessageAction {
    type: 'add_download_message',
    message: string
    file: ImportResponse
}

interface ResetFlashMessageAction {
    type: 'reset_flash_message'
}

export type FlassMessaggeActionList = AddFlashMessageAction | ResetFlashMessageAction | AddDownloadMessageAction