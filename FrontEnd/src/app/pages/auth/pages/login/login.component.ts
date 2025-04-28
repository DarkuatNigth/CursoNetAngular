import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  blLoading$ !: Observable<boolean | null>;

  constructor(
    private objStore: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
  }

  loginUsuario(objFm: NgForm){
    const objUserLoginRequest : fromUser.EmailPasswordCredentials ={
      strEmail : objFm.value.email,
      strPassword: objFm.value.password
    }

    this.objStore.dispatch(new fromUser.SignInEmail(objUserLoginRequest));

  }

}
