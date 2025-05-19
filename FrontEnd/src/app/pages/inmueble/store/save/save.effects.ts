import { Injectable } from '@angular/core';
import * as fromActions from './save.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '@app/services';
import { catchError, delay, from, map, of, switchMap, tap } from 'rxjs';
import { Observable } from 'rxjs';
import { InmuebleCreateRequest, InmuebleResponse } from './save.models';
import { environment } from '@src/environments/environment';

type Action = fromActions.All;


@Injectable()
export class SaveEffects{

  constructor(
    private objActions : Actions,
    private objHttpClient : HttpClient,
    private objRouter : Router,
    private objNotificationService : NotificationService
  ){}

  read: Observable<Action> = createEffect( ()=>
    this.objActions.pipe(
      ofType(fromActions.TypeInmuebleActions.READ),
      switchMap( () =>
      this.objHttpClient.get<InmuebleResponse[]>(
        `${environment.url}api/inmueble`)
        .pipe(
                delay(1000),
                tap((objResponse: InmuebleResponse[])=> {
                  this.objRouter.navigate(['inmueble/list']);
                }),
                map((objInmueble:InmuebleResponse[])=>
                  new fromActions.ReadInmuebleSuccess(objInmueble)),
                catchError((error: any) => {
                  this.objNotificationService.error(`Error al crear el inmueble: ${error.message}`);
                  return of(new fromActions.ReadInmuebleError(error.message));
                })
    )
    ))
  );

  create: Observable<Action> = createEffect( ()=>
    this.objActions.pipe(
      ofType(fromActions.TypeInmuebleActions.CREATE),
      map( (action: fromActions.CreateInmueble) => action.payload ),
      switchMap( (objRequest:  InmuebleCreateRequest) =>
      this.objHttpClient.post<InmuebleResponse>(
        `${environment.url}api/inmueble`, objRequest )
        .pipe(
                delay(1000),
                tap((objResponse: InmuebleResponse)=> {
                  this.objRouter.navigate(['inmueble/list']);
                }),
                map((objInmueble:InmuebleResponse)=>
                  new fromActions.CreateInmuebleSuccess(objInmueble)),
                catchError((error: any) => {
                  this.objNotificationService.error(`Error al crear el inmueble: ${error.message}`);
                  return of(new fromActions.CreateInmuebleError(error.message));
                })
    )
    ))
  );
}
