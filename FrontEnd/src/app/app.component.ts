import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  blShowSpinner = false;
  title = 'cli-inmueble-app';

  constructor(private objFs: AngularFirestore){

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
}
