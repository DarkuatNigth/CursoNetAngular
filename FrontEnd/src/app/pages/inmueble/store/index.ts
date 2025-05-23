import * as fromList from './save/save.reducer';
import { SaveEffects } from './save';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface InmuebleState {
  list: fromList.ListState;
}

export const objReducers: ActionReducerMap<InmuebleState> = {
  list: fromList.reducer
}

export const objEffects: any = [
  SaveEffects
]

export const getInmuebleState = createFeatureSelector<InmuebleState>('inmueble');

