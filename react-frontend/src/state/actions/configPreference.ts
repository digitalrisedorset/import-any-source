interface SetConfigAction {
    type: 'set_active_theme',
    themeCode: string
}

export type SetConfigActionList = SetConfigAction