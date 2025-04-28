import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import * as fromActions from './user.actions';
import { NotificationService } from '@app/services';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { UserResponse } from './user.models';
import { environment } from '@src/environments/environment';


type objAction = fromActions.All | any;

@Injectable()
export class UserEffects{
  constructor(
    private objHttpClient: HttpClient,
    private objActions: Actions,
    private objNotificacion: NotificationService,
    private objRouter: Router
  ) { }

  // @Effect({})

  signUpEmail: Observable<Action> = createEffect(() =>
    this.objActions.pipe(
      ofType(fromActions.UserActionTypes.SIGN_UP_EMAIL),
      map((action: fromActions.SignUpEmail) => action.objPayload),
      switchMap((objPayload) =>
        this.objHttpClient.post<UserResponse>(`${environment.url}api/usuario/registrar`, objPayload).pipe(
          tap((objResponse: UserResponse) => {
            localStorage.setItem('token', objResponse.strToken);
            this.objRouter.navigate(['/']);
          }),
          map((objResponse: UserResponse) => new fromActions.SignUpEmailSuccess(objResponse.strUserEmail, objResponse || null)),
          catchError((error) => {
            this.objNotificacion.error("Errores al registrar un nuevo usuario");
            return of(new fromActions.SignUpEmailError(error.message));
          })
        )
      )
    )
  );


  signInEmail: Observable<Action> = createEffect(() =>
    this.objActions.pipe(
      ofType(fromActions.UserActionTypes.SIGIN_IN_EMAIL),
      map((action: fromActions.SignInEmail) => action.objPayload),
      switchMap((objPayload) =>
        this.objHttpClient.post<UserResponse>(`${environment.url}api/usuario/login`, objPayload).pipe(
          tap((objResponse: UserResponse) => {
            localStorage.setItem('token', objResponse.strToken);
            this.objRouter.navigate(['/']);
          }),
          map((objResponse: UserResponse) => new fromActions.SignInEmailSuccess(objResponse.strUserEmail, objResponse || null)),
          catchError((error) => {
            this.objNotificacion.error("Las credenciales son incorrectas.");
            return of(new fromActions.SignInEmailError(error.message));
          })
        )
      )
    )
  );


  init: Observable<Action> = createEffect(() =>
    this.objActions.pipe(
      ofType(fromActions.UserActionTypes.INIT),
      switchMap(async() => localStorage.getItem('token')),
      switchMap(token =>{
        if(token){
        return this.objHttpClient.get<UserResponse>(`${environment.url}api/usuario`)
        .pipe(
          tap((objResponse: UserResponse) => {
            console.log('Data del usuario en sesion que viene del servidor: ',objResponse);
          }),
          map((objResponse: UserResponse) => new fromActions.InitAuthorized(objResponse.strUserEmail, objResponse || null)),
          catchError((error) => {
            return of(new fromActions.InitError(error.message));
          })
        )
        }else{
          return of(new fromActions.InitUnAuthorized());
        }
      }
      )
    )
  );
}
