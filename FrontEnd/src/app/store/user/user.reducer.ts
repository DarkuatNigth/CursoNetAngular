import { UserResponse } from "./user.models";
import * as fromActions from "./user.actions";


export interface UserState{
  entity: UserResponse | null;
  id: string | null;
  loading: boolean | null;
  error: string | null;
}

const initialState: UserState = {
  entity: null,
  id: null,
  loading: null,
  error: null
}


export function userReducer(state = initialState, action: fromActions.All | any): UserState {

  switch (action.type) {
    case fromActions.UserActionTypes.INIT:{
      return {...state,loading: true,error: null};
    }
    case fromActions.UserActionTypes.INIT_AUTHORIZED:{
      return {...state,loading: false,entity: action.User, id: action.id, error: null};
    }
    case fromActions.UserActionTypes.INIT_ERROR:{
      return  {...state,loading: false,entity: null, id: null, error: action.error};
    }
    case fromActions.UserActionTypes.INIT_UNAUTHORIZED:{
      return  {...state,loading: false,entity: null, id: null, error: null};
    }
    //LOGIN
    case fromActions.UserActionTypes.SIGIN_IN_EMAIL:{
      return  {...state,loading: true,entity: null, id: null, error: null};
    }
    case fromActions.UserActionTypes.SIGIN_IN_EMAIL_SUCCESS:{
      return  {...state,loading: false,entity: action.User, id: action.id, error: null};
    }
    case fromActions.UserActionTypes.SIGIN_IN_EMAIL_ERROR:{
      return  {...state,loading: false,entity: null, id: null, error: action.error};
    }
    //Registro usuario
    case fromActions.UserActionTypes.SIGN_UP_EMAIL:{
      return  {...state,loading: true,entity: null, id: null, error: null};
    }
    case fromActions.UserActionTypes.SIGN_UP_EMAIL_SUCCESS:{
      return  {...state,loading: false,entity: action.User, id: action.id, error: null};
    }
    case fromActions.UserActionTypes.SIGN_UP_EMAIL_ERROR:{
      return  {...state,loading: false,entity: null, id: null, error: action.error};
    }
    //Logout salir de sesion
    case fromActions.UserActionTypes.SIGIN_OUT_EMAIL:{
      return  {...initialState};
    }
    case fromActions.UserActionTypes.SIGIN_OUT_EMAIL_SUCCESS:{
      return  {...initialState};
    }
    case fromActions.UserActionTypes.SIGIN_OUT_EMAIL_ERROR:{
      return  {...state,loading: false,entity: null, id: null, error: action.error};
    }
    default:{
      return state;
    }
  }

}
