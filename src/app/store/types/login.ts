
export enum LoginActionTypes {
    CHANGE_ROUTE = 'CHANGE_ROUTE',
    RESET_FORM = 'RESET_FORM',
    SIGN_OUT  = 'SIGN_OUT',
    UNAUTH_USER = 'UNAUTH_USER',
    CHANGE_TAB = 'CHANGE_TAB',
    CHANGE_LANG = 'CHANGE_LANG',
    REMOVE_NOTIFICITAION = 'REMOVE_NOTIFICITAION'
}
export interface LoginState {
    value?: number,
    isResetForm?: boolean,
    authorized?: boolean,
    isTabChanged?: boolean,
    tabValue?: string,
    lang?: string,
    notify: boolean
}
interface LoginChangeRouteAction {
    type: LoginActionTypes.CHANGE_ROUTE,
    payload: number
}
interface LoginChangeTabAction {
    type: LoginActionTypes.CHANGE_TAB
    payload: number
}
interface ChangeLangeAction {
    type: LoginActionTypes.CHANGE_LANG
    payload: string
}
interface ResetFormAction {
    type: LoginActionTypes.RESET_FORM;
}
interface RemoveNotification {
    type: LoginActionTypes.REMOVE_NOTIFICITAION;
}
interface SignOutUser {
    type: LoginActionTypes.SIGN_OUT;
}
interface  UnAuthUser{
    type: LoginActionTypes.UNAUTH_USER;
}

export type LoginAction = 
LoginChangeRouteAction |
 ResetFormAction | 
 SignOutUser | 
 UnAuthUser | 
 LoginChangeTabAction |
 ChangeLangeAction    |
 RemoveNotification
