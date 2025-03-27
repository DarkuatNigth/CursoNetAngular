import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDropZone]'
})
export class DropZoneDirective {

  @Output() objDropped = new EventEmitter<FileList>();
  @Output() objHovered = new EventEmitter<boolean>();

  constructor() { }

  @HostListener('drop', ['$event'])
  onDrop($event: any) {
    $event.preventDefault();
    this.objDropped.emit($event.dataTransfer.files);
    this.objHovered.emit(false);
  }

  @HostListener('dragover', ['$event'])
  onDragOver($event: any) {
    $event.preventDefault();
    this.objHovered.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave($event:any) {
    $event.preventDefault();
    this.objHovered.emit(false);
  }


}
