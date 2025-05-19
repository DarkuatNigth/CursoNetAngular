import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InmuebleRoutingModule } from './inmueble-routing.module';
import { StoreModule } from '@ngrx/store';
import { objReducers, objEffects } from './store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InmuebleRoutingModule,
    StoreModule.forFeature('inmueble', objReducers ),
    EffectsModule.forFeature(objEffects),
  ]
})
export class InmuebleModule { }
