import {Dispatch} from "redux";
import {ConfigActionType} from "../action-types";
import {SetConfigActionList} from "../actions";

export const setActiveTheme = (themeCode: string) => {
    return async (dispatch: Dispatch<SetConfigActionList>) => {
        dispatch({
            type: ConfigActionType.SET_THEME_PREFERENCE,
            themeCode
        })
    }
}