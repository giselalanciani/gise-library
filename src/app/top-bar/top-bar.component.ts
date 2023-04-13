import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-top-bar[toggleSidenav]',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {

  @Output()
  toggleSidenav = new EventEmitter();

}
