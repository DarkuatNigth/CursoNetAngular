import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-entity-photo',
  templateUrl: './entity-photo.component.html',
  styleUrls: ['./entity-photo.component.scss']
})
export class EntityPhotoComponent implements OnInit {
  @Input() strSafePhotoUrl !: string;
  constructor(
    private objSanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
  }

  get safePhotoUrl() :SafeStyle | null{
    return this.strSafePhotoUrl ? this.objSanitizer.bypassSecurityTrustUrl(`url(${this.strSafePhotoUrl})`) : null;
  }

}
