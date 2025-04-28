import { ActionReducerMap } from "@ngrx/store";
import *  as  fromUser from "./user";


export interface State{
  user: fromUser.UserState;
}

export const reducers: ActionReducerMap<State> ={
  user : fromUser.userReducer
}

export const effects =[
  fromUser.UserEffects
]
