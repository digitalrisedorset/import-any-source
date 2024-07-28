interface SetUserLoginAction {
    type: 'set_user_login',
    userName: string
    access: string[]
}

export type UserLoginActionList = SetUserLoginAction
