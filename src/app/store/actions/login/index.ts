import { Dispatch } from "redux";
import { verifyAuth,  } from '../../../services/login'
import { LoginAction, LoginActionTypes } from "../../types/login";
import { TokenAction, TokenActionTypes } from "../../types/token";




export const signout = (history: any) => {
  return (dispatch: Dispatch<LoginAction>) => {
    localStorage.removeItem('auth_token')
    history.push('/login')
    dispatch(changeRoute(0))
    dispatch({
      type: LoginActionTypes.SIGN_OUT
    })
  }
}

export const changeRoute = (value: number) => {
  return (dispatch: Dispatch<LoginAction>) => {
    dispatch({
      type: LoginActionTypes.CHANGE_ROUTE,
      payload: value
    })
  }
}



export const changeLang = (lang: string) => {
  return (dispatch: Dispatch<LoginAction>) => {
    dispatch({
      type: LoginActionTypes.CHANGE_LANG,
      payload: lang
    })
  }
}
