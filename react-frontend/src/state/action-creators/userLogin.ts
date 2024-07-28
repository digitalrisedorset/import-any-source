import {Dispatch} from "redux";
import {UserLoginActionList} from "../actions";
import {UserActionType} from "../action-types";

export const setUserLogged = (name: string, access: []) => {
    return async (dispatch: Dispatch<UserLoginActionList>) => {
        dispatch({
                type: UserActionType.SET_USER_LOGIN,
                userName: name,
                access: access
            })
    }
}