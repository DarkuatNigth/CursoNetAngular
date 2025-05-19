import { Action } from "@ngrx/store";
import { InmuebleCreateRequest, InmuebleResponse } from "./save.models";

export enum TypeInmuebleActions
{
  READ = "[Inmueble] Read: Start",
  READ_SUCCESS = "[Inmueble] Read: Success",
  READ_ERROR = "[Inmueble] Read: Error",
  CREATE = "[Inmueble] Create: Start",
  CREATE_SUCCESS = "[Inmueble] Create: Success",
  CREATE_ERROR = "[Inmueble] Create: Error",
}

export class CreateInmueble implements Action
{
  readonly type = TypeInmuebleActions.CREATE;
  constructor(public payload: InmuebleCreateRequest) {}
}

export class CreateInmuebleSuccess implements Action
{
  readonly type = TypeInmuebleActions.CREATE_SUCCESS;
  constructor(public payload: InmuebleResponse) {}
}

export class CreateInmuebleError implements Action
{
  readonly type = TypeInmuebleActions.CREATE_ERROR;
  constructor(public error: string) {}
}

export class ReadInmueble implements Action
{
  readonly type = TypeInmuebleActions.READ;
  constructor() {}
}

export class ReadInmuebleSuccess implements Action
{
  readonly type = TypeInmuebleActions.READ_SUCCESS;
  constructor(public payload: InmuebleResponse[]) {}
}

export class ReadInmuebleError implements Action
{
  readonly type = TypeInmuebleActions.READ_ERROR;
  constructor(public error: string) {}
}

export type All =
CreateInmueble |
CreateInmuebleSuccess |
CreateInmuebleError |
ReadInmueble |
ReadInmuebleSuccess |
ReadInmuebleError;
