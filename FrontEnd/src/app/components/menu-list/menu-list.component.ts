import { Component, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {
  @Output() objMenuToggle= new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  onCloseMenu():void{
    this.objMenuToggle.emit();
  }

}
