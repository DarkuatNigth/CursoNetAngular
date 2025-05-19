import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserResponse } from '@app/store/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() objMenuToggle = new EventEmitter<void>();
  @Input() objUser !: UserResponse | null;
  @Input() blIsAutorized !: boolean | null;
  @Output() objLogout = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
    console.log('objUser', this.objUser);
    console.log('blIsAutorized', this.blIsAutorized);
  }

  onMenuToggleDispatch(): void{
    this.objMenuToggle.emit();
  }

  onSignOut(): void {
    this.objLogout.emit();
  }
}
