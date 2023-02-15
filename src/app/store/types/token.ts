export interface TokenState {
    tokenData: string;
    inProgress?: boolean;
    error?: any;
    mSignStatus: string;
    userData?: object;
    notify?: boolean
}
export enum TokenActionTypes {
    GET_TOKEN_DATA_REQUEST = 'GET_TOKEN_DATA_REQUEST',
    GET_TOKEN_DATA_SUCCESS = 'GET_TOKEN_DATA_SUCCESS',
    GET_TOKEN_DATA_ERROR = 'GET_TOKEN_DATA_ERROR',

    GET_AUTHORIZATION_VALUE_REQUEST = 'GET_AUTHORIZATION_VALUE_REQUEST',
    GET_AUTHORIZATION_VALUE_SUCCESS = 'GET_AUTHORIZATION_VALUE_SUCCESS',
    GET_AUTHORIZATION_VALUE_ERROR = 'GET_AUTHORIZATION_VALUE_ERROR',
    REMOVE_NOTIFICATION_ASAN = 'REMOVE_NOTIFICATION_ASAN',
    CANCEL_ASAN_SIGN = 'CANCEL_ASAN_SIGN'
}
interface TokenRequestAction {
    type: TokenActionTypes.GET_TOKEN_DATA_REQUEST
}

interface TokenSuccessAction {
    type: TokenActionTypes.GET_TOKEN_DATA_SUCCESS;
    payload: any;
}
interface TokenErrorAction {
    type: TokenActionTypes.GET_TOKEN_DATA_ERROR;
    error: any;
}
interface CancelAsanSign {
    type: TokenActionTypes.CANCEL_ASAN_SIGN,
    payload: any;
}
interface AuthorizationReqeustAction {
    type: TokenActionTypes.GET_AUTHORIZATION_VALUE_REQUEST
}
interface removeNotification {
    type: TokenActionTypes.REMOVE_NOTIFICATION_ASAN
}
interface AuthorizationSuccessAction {
    type: TokenActionTypes.GET_AUTHORIZATION_VALUE_SUCCESS;
    payload: any;
}
interface AuthorizationErrorAction {
    type: TokenActionTypes.GET_AUTHORIZATION_VALUE_ERROR;
    error: any;
}
export type TokenAction =
     TokenRequestAction |
     TokenSuccessAction |
     TokenErrorAction |
     AuthorizationReqeustAction |
     AuthorizationSuccessAction |
     AuthorizationErrorAction   |
     CancelAsanSign             |
     removeNotification
