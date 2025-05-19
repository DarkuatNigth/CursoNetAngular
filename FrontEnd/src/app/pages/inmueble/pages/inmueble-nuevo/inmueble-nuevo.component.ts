import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '@app/store';
import * as fromList from '../../store/save';

@Component({
  selector: 'app-inmueble-nuevo',
  templateUrl: './inmueble-nuevo.component.html',
  styleUrls: ['./inmueble-nuevo.component.scss']
})
export class InmuebleNuevoComponent implements OnInit {

  blCargando$ !: Observable<boolean | null>;
  strPhotoUrl !: string;
  constructor(
    private objStore: Store<fromRoot.State>,
  ) { }

  ngOnInit(): void {
  }

  registrarInmueble(objFormulario : NgForm): void
  {
    if(objFormulario.valid){
      this.blCargando$ = this.objStore.pipe(select(fromList.getLoading));

      const objInmuebleCreateRequest : fromList.InmuebleCreateRequest = {
        strNombre: objFormulario.value.nombre,
        strFoto : ' ',
        dbPrecio: objFormulario.value.precio,
        strDireccion: objFormulario.value.direccion,
      };
      console.log('objeto a guardar:',objInmuebleCreateRequest);
      this.objStore.dispatch(new fromList.CreateInmueble(objInmuebleCreateRequest));

    }
  }

  onFilesChanged(url: any):void{
    if(url){
      this.strPhotoUrl = url;
    }
  }
}
