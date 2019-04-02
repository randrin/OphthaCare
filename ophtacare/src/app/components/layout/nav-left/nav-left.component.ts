import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-left',
  templateUrl: './nav-left.component.html',
  styleUrls: ['./nav-left.component.css']
})
export class NavLeftComponent implements OnInit {
  public showMenu: string;

  constructor() {}

  ngOnInit() {}

  addExpandClass(element: any) {
    console.log('Clicking sub-menu to expand: ' + element);
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }
}
