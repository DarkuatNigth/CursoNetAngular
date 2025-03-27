import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesUploadComponent } from './files-upload/files-upload.component';
import { FilesUploadModule } from './files-upload/files-upload.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FilesUploadModule
  ],
  exports: [
    FilesUploadModule
  ]
})
export class PopupsModule { }
