import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gise-library';

  @ViewChild('drawer')
  drawer: any;

  toggleSidenav () {
    console.log('si apretó');
    this.drawer.toggle()
    console.log('funciono con un viewchild');
  }
}
