import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NotificationService } from '@app/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  blShowSpinner = false;
  title = 'cli-inmueble-app';

  constructor(
    private objFs: AngularFirestore,
    private objNotification: NotificationService
  )
  {

  }

  ngOnInit(): void {
    this.objFs
            .collection('test')
            .stateChanges()
            .subscribe(lstPersonas =>
            {
              console.log(
                lstPersonas.map(objPersona => objPersona.payload.doc.data())
              )
            });
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

}
