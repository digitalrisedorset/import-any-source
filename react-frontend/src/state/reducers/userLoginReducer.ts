import { UserActionType } from "../action-types";
import {UserLoginActionList } from "../actions";

interface UserLoginState {
    userName: string
    access: string[]
}

const initialState = {
    userName: '',
    access: []
}

const reducer = (
    state: UserLoginState = initialState,
    action: UserLoginActionList
): UserLoginState => {
    switch (action.type) {
        case UserActionType.SET_USER_LOGIN:
            return { userName: action.userName, access: action.access}
        default:
            return state;
    }
}

export default reducer