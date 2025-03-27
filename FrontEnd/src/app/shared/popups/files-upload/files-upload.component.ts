import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  blMultiple: boolean;
  blCrop: boolean;
}
@Component({
  selector: 'app-files-upload',
  templateUrl: './files-upload.component.html',
  styleUrls: ['./files-upload.component.scss']
})
export class FilesUploadComponent implements OnInit {

  blIsHovered ?: boolean;
  lstFile : File[] = [];
  blIsError!: boolean;

  filesURLs : string[] =[];

  constructor(
    private objDialogRef: MatDialogRef<FilesUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public objData: DialogData
  ) { }

  ngOnInit(): void {
  }

  toggleHover($event: boolean) {
    this.blIsHovered = $event;
  }

  onDrop(lstFiles: FileList) : void {
    this.dropGeneral(lstFiles);
  }

  onDropFile(event: FileList | any) : void {
    this.dropGeneral(event.target.files);
  }

  dropGeneral(lstFiles : FileList):void{
    this.blIsError = false;
    if(this.objData.blCrop && lstFiles.length > 1){
      this.blIsError = true;
      return;
    }
    for(let i = 0; i < lstFiles.length; i++){
      this.lstFile.push(lstFiles.item(i) as File);
    }
    console.log(this.lstFile);
  }
}
