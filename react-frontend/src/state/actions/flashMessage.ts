interface AddFlashMessageAction {
    type: 'add_flash_message',
    message: string
}

interface ResetFlashMessageAction {
    type: 'reset_flash_message'
}

export type FlassMessaggeActionList = AddFlashMessageAction | ResetFlashMessageAction