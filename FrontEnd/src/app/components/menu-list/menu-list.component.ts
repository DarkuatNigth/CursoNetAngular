import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {
  @Output() objMenuToggle= new EventEmitter<void>();
  @Input() blIsAutorized !: boolean | null;
  @Output() objLogout = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  onCloseMenu():void{
    this.objMenuToggle.emit();
  }

  onSignOut(): void {
    this.objLogout.emit();
  }
}
