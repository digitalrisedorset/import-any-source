import {SetConfigActionList} from '../actions'
import {ConfigActionType} from '../action-types'

interface ConfigurationState {
    themeCode: string
}

const initialState = {
    themeCode: localStorage.getItem('themeCode') || ''
}

const reducer = (
    state: ConfigurationState = initialState,
    action: SetConfigActionList
): ConfigurationState => {
    switch (action.type) {
        case ConfigActionType.SET_THEME_PREFERENCE:
            localStorage.setItem('themeCode', action.themeCode)
            return { themeCode: action.themeCode }
        default:
            return state;
    }
}

export default reducer