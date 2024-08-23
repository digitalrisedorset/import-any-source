import {Dispatch} from "redux";
import {ConfigActionType} from "../action-types/configAction";
import {SetConfigActionList} from "../actions/configPreference";
import {AccessState} from "../../../types/states";

export const setActiveTheme = (themeCode: string) => {
    return async (dispatch: Dispatch<SetConfigActionList>) => {
        dispatch({
            type: ConfigActionType.SET_THEME_PREFERENCE,
            themeCode
        })
    }
}

export const setUserAccess = (accessEnabled: AccessState) => {
    return async (dispatch: Dispatch<SetConfigActionList>) => {
        dispatch({
            type: ConfigActionType.SET_ACCESS_ENABLED,
            accessEnabled
        })
    }
}

export const removeUserAccess = () => {
    return async (dispatch: Dispatch<SetConfigActionList>) => {
        dispatch({
            type: ConfigActionType.SET_ACCESS_DISABLED
        })
    }
}