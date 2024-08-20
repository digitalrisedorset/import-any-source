import {FlassMessaggeActionList} from '../../../state/actions'
import {FlashMessageActionType} from '../../../state/action-types'
import {ImportResponse} from "../../../types/catalog-source"

interface FlashMessageState {
    messages: string[]
    messageType: string,
    downloadLink?: ImportResponse
}

const initialState = {
    messages: [],
    messageType: ''
}

const reducer = (
    state: FlashMessageState = initialState,
    action: FlassMessaggeActionList
): FlashMessageState => {
    switch (action.type) {
        case FlashMessageActionType.ADD_FLASH_MESSAGE:
            //state.messages.push(action.message)
            return { messages: [action.message], messageType: 'success' }
        case FlashMessageActionType.ADD_DOWNLOAD_MESSAGE:
            //state.messages.push(action.message)
            return { messages: [action.message], downloadLink: action.file, messageType: 'success' }
        default:
            return state;
    }
}

export default reducer