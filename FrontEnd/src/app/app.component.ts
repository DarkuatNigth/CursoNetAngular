import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import {  select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  blShowSpinner = false;
  title = 'cli-inmueble-app';
  objUser$ !: Observable<fromUser.UserResponse>;
  blIsAutorized$ !: Observable<boolean>;
  constructor(
    private objFs: AngularFirestore,
    private objNotification: NotificationService,
    private objStore: Store<fromRoot.State>,
    private objRouter: Router
  )
  {

  }

  ngOnInit(): void {
    this.objUser$ = this.objStore.pipe(select(fromUser.getUser)) as Observable<fromUser.UserResponse>;
    this.blIsAutorized$ = this.objStore.pipe(select(fromUser.getIsAuthorized)) as Observable<boolean>;
    this.objStore.dispatch(new fromUser.Init());

  }

  onToggleSpinner(): void {
    this.blShowSpinner = !this.blShowSpinner;
  }

  onFilesChanged(lstUrl : string | string[]): void{
    console.log('urls',lstUrl);
  }

  onSuccess(): void {
    this.objNotification.success("El Procedimiento fue exitoso.");
  }
  onError(): void {
    this.objNotification.error("Se encotraron errores en el proceso.");
  }

  onSignOut(): void {
    localStorage.removeItem('token');
    this.objStore.dispatch(new fromUser.SignOut());
    this.objRouter.navigate(['/auth/login']);
  }

}
