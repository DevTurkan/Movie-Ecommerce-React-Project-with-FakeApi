import { LoginModel } from './model';
import { TokenModel } from './model';

export interface RootState {
  login: RootState.LoginState;
  token: RootState.TokenState;
  router?: any;
}

export namespace RootState {
  export type LoginState = LoginModel[];
  export type TokenState =  TokenModel[];
}
