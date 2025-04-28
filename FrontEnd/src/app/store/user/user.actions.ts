import { Action } from '@ngrx/store';
import {
  EmailPasswordCredentials,
  UserCreateRequest,
  UserResponse,
} from './user.models';

export enum UserActionTypes {
  INIT = '[User] Init: Start',
  INIT_AUTHORIZED = '[User] Init: Authorized',
  INIT_UNAUTHORIZED = '[User] Init: Unuthorized',
  INIT_ERROR = '[User] Init: Error',

  SIGIN_IN_EMAIL = '[User] Login: Start',
  SIGIN_IN_EMAIL_SUCCESS = '[User] Login: Success',
  SIGIN_IN_EMAIL_ERROR = '[User] Login: Error',

  SIGN_UP_EMAIL = '[User] Registrar usuario con Email: Start',
  SIGN_UP_EMAIL_SUCCESS = '[User] Registrar usuario con Email: Success',
  SIGN_UP_EMAIL_ERROR = '[User] Registrar usuario con Email: Error',

  SIGIN_OUT_EMAIL = '[User] Logout: Start',
  SIGIN_OUT_EMAIL_SUCCESS = '[User] Logout: Success',
  SIGIN_OUT_EMAIL_ERROR = '[User] Logout: Error',
}

//INIT -> EL USUARIO ESTA EN SESION?

export class Init implements Action {
  readonly type = UserActionTypes.INIT;
  constructor() {}
}
export class InitAuthorized implements Action {
  readonly type = UserActionTypes.INIT_AUTHORIZED;
  constructor(public email: string, public objPayload: UserResponse | null) {}
}
export class InitUnAuthorized implements Action {
  readonly type = UserActionTypes.INIT_UNAUTHORIZED;
  constructor() {}
}
export class InitError implements Action {
  readonly type = UserActionTypes.INIT_ERROR;
  constructor(public strError: string) {}
}

//LOGIN -> INICIA SESION CON EMAIL Y PASSWORD
export class SignInEmail implements Action {
  readonly type = UserActionTypes.SIGIN_IN_EMAIL;
  constructor(public objPayload: EmailPasswordCredentials) {}
}

export class SignInEmailSuccess implements Action {
  readonly type = UserActionTypes.SIGIN_IN_EMAIL_SUCCESS;
  constructor(public email: string, public objPayload: UserResponse) {}
}

export class SignInEmailError implements Action {
  readonly type = UserActionTypes.SIGIN_IN_EMAIL_ERROR;
  constructor(public strError: string) {}
}

//REGISTRAR -> REGISTRA UN NUEVO USUARIO CON EMAIL Y PASSWORD
export class SignUpEmail implements Action {
  readonly type = UserActionTypes.SIGN_UP_EMAIL;
  constructor(public objPayload: UserCreateRequest) {}
}
export class SignUpEmailSuccess implements Action {
  readonly type = UserActionTypes.SIGN_UP_EMAIL_SUCCESS;
  constructor(public email: string, public objPayload: UserResponse | null) {}
}
export class SignUpEmailError implements Action {
  readonly type = UserActionTypes.SIGN_UP_EMAIL_ERROR;
  constructor(public strError: string) {}
}

//LOGOUT -> CERRAR SESION
export class SignOut implements Action {
  readonly type = UserActionTypes.SIGIN_OUT_EMAIL;
  constructor() {}
}

export class SignOutSuccess implements Action {
  readonly type = UserActionTypes.SIGIN_OUT_EMAIL_SUCCESS;
  constructor() {}
}
export class SignOutError implements Action {
  readonly type = UserActionTypes.SIGIN_OUT_EMAIL_ERROR;
  constructor(public strError: string) {}
}
export type All =
  | Init
  | InitAuthorized
  | InitUnAuthorized
  | InitError
  | SignInEmail
  | SignInEmailSuccess
  | SignInEmailError
  | SignUpEmail
  | SignUpEmailSuccess
  | SignUpEmailError
  | SignOut
  | SignOutSuccess
  | SignOutError;
