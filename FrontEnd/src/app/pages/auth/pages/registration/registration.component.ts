import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  objLoading$! : Observable<boolean | null>;

  constructor(
    private objStore: Store<fromRoot.State>,
  ) { }

  ngOnInit(): void {
    this.objLoading$ = this.objStore.pipe(select(fromUser.getLoading));
  }

  registrarUsuario(objFm: NgForm){
    if(objFm.valid){
      const objUserCreateRequest : fromUser.UserCreateRequest = {
        strUserName: objFm.value.UserName,
        strNombre: objFm.value.Nombre,
        strApellido: objFm.value.Apellido,
        strTelefono: objFm.value.Telefono,
        strEmail: objFm.value.Email,
        strPassword: objFm.value.Password,
      };
      console.log(objUserCreateRequest);
      this.objStore.dispatch(new fromUser.SignUpEmail(objUserCreateRequest));

    }
  }
}
