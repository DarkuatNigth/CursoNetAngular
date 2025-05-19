import { InmuebleResponse } from "./save.models";
import * as fromActions from "./save.actions";

export interface ListState{
  inmuebles: InmuebleResponse[] | null;
  inmueble: InmuebleResponse | null;
  cargando: boolean | null;
  error: string | null;
}

export const initialState: ListState = {
  inmuebles: null,
  inmueble: null,
  cargando: null,
  error: null
}

export function reducer(
  state: ListState = initialState,
  action: fromActions.All | any
): ListState {
  switch (action.type) {
    case fromActions.TypeInmuebleActions.CREATE: {
      return {
        ...state,
        cargando: true,
        error: null
      };
    }
    case fromActions.TypeInmuebleActions.CREATE_SUCCESS: {
      return {
        ...state,
        inmueble: action.payload,
        cargando: false,
        error: null
      };
    }
    case fromActions.TypeInmuebleActions.CREATE_ERROR: {
      return {
        ...state,
        inmueble: null,
        cargando: false,
        error: action.error
      };
    }
    case fromActions.TypeInmuebleActions.READ: {
      return {
        ...state,
        inmuebles: null,
        cargando: true,
        error: null
      };
    }
    case fromActions.TypeInmuebleActions.READ_SUCCESS: {
      return {
        ...state,
        inmuebles: action.payload,
        cargando: false,
        error: null
      };
    }
    case fromActions.TypeInmuebleActions.READ_ERROR: {
      return {
        ...state,
        inmuebles: null,
        cargando: false,
        error: action.error
      };
    }
    default:
      return state;
  }
}
