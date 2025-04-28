import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from './components';

@Injectable()
export class NotificationService {

  constructor(private ObjSnackBar: MatSnackBar) { }

  error(strMensaje: string): void {
    this.ObjSnackBar.openFromComponent(NotificationComponent, {
      duration:3000,
      data: {strMensaje: strMensaje},
      panelClass: ['mat-snackbar_error'],
    });
  }


  success(strMensaje: string): void {
    this.ObjSnackBar.openFromComponent(NotificationComponent, {
      duration:3000,
      data: {strMensaje: strMensaje},
      panelClass: ['mat-snackbar_success'],
    });
  }
}
