import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilesUploadComponent } from './files-upload.component';

@Directive({
  selector: '[appFilesUpload]'
})
export class FilesUploadDirective {
  @Input() blMultiple!: boolean;
  @Input() blCrop!: boolean ;
  @Output() objChanged = new EventEmitter<string | string[]>();


  constructor(private objMatDialog : MatDialog) {

   }

   @HostListener('click', ['event']) onClick(){
      this.openDialog();
   }

   private openDialog(): void{
    const objDialogRef = this.objMatDialog.open(FilesUploadComponent, {
      width: '550px',
      height: '500px',
      data: {
        blMultiple: this.blMultiple,
        blCrop: this.blCrop
      }
   });
    objDialogRef.afterClosed().subscribe(objResult => {
      this.objChanged.emit(objResult || null);
    });
  }


}
