import { Component, OnInit, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { UploadTaskSnapshot } from '@angular/fire/storage';

import { Observable, Subject, lastValueFrom } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy {

  @Input() objFile !: File;
  @Output() objCompleto = new EventEmitter<string>();

  objTask !: AngularFireUploadTask;
  objSnapshot$ !: Observable<UploadTaskSnapshot | undefined>;

  obsPorcentaje$ !: Observable<number | undefined>;
  strDownloadURL !: string;
  private objDestroy = new Subject<void>();


  constructor(private objStorage : AngularFireStorage) { }

  ngOnInit(): void {
    this.startUploading();
  }

  startUploading(): void {
      const objPath = `${this.objFile.type.split('/')[0]}/${Date.now()}_${this.objFile.name}`;
      const objStorageRef =  this.objStorage.ref(objPath);

      this.objTask = this.objStorage.upload(objPath, this.objFile);

      this.obsPorcentaje$ = this.objTask.percentageChanges();

      this.objSnapshot$.pipe(
        takeUntil(this.objDestroy),
        finalize(async () => {
          const objStorageRefObs$ = objStorageRef.getDownloadURL();
          this.strDownloadURL = await lastValueFrom(objStorageRefObs$);
          this.objCompleto.next(this.strDownloadURL);
        })
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.objDestroy.next();
    this.objDestroy.complete();
  }

}
