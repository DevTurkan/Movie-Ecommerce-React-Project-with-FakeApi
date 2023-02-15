export interface TranslateState {
    translateData: {};
    inProgress?: boolean;
    error?: any;
    notify?: boolean
}
export enum TranslateActionTypes {
    ADD_ACTIVE_TRANSLATE_REQUEST = 'ADD_ACTIVE_TRANSLATE_REQUEST',
    ADD_ACTIVE_TRANSLATE_SUCCESS = 'ADD_ACTIVE_TRANSLATE_SUCCESS',
    ADD_ACTIVE_TRANSLATE_ERROR = 'ADD_ACTIVE_TRANSLATE_ERROR',
}

interface SetTranslateRequestAction {
    type: TranslateActionTypes.ADD_ACTIVE_TRANSLATE_REQUEST
}

interface SetTranslateSuccessAction {
    type: TranslateActionTypes.ADD_ACTIVE_TRANSLATE_SUCCESS;
    payload: any;
}
interface SetTranslateErrorAction {
    type: TranslateActionTypes.ADD_ACTIVE_TRANSLATE_ERROR;
    error: any;
}

export type TranslateAction =
    SetTranslateRequestAction |
    SetTranslateSuccessAction |
    SetTranslateErrorAction

