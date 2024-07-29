import {ConfigActionType} from "../action-types/configAction";
import {AccessState} from "../../../types/states";

interface SetConfigAction {
    type: ConfigActionType.SET_THEME_PREFERENCE,
    themeCode: string
}

interface SetConfigAccessAction {
    type: ConfigActionType.SET_ACCESS_ENABLED,
    accessEnabled: AccessState
}

interface SetConfigDisabledAccessAction {
    type: ConfigActionType.SET_ACCESS_DISABLED
}

export type SetConfigActionList = SetConfigAction | SetConfigAccessAction | SetConfigDisabledAccessAction