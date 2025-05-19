import { createFeatureSelector, createSelector } from "@ngrx/store";
import { InmuebleState } from "../index";

import { ListState } from "./save.reducer";

export const getInmuebleState = createFeatureSelector<InmuebleState>('inmueble');
export const getSaveState = createSelector(
  getInmuebleState,
  (state: InmuebleState) => state.list
);


export const getLoading = createSelector(
  getSaveState,
  (state: ListState) => state.cargando
);

export const getListadoInmueble = createSelector(
  getSaveState,
  (state: ListState) => state.inmuebles
);


