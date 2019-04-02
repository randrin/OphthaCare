import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-top',
  templateUrl: './nav-top.component.html',
  styleUrls: ['./nav-top.component.css']
})
export class NavTopComponent implements OnInit {

  public pushRightClass: string;
  
  constructor(private translate: TranslateService, private router: Router) { }

  ngOnInit() {
    this.pushRightClass = 'push-right';
}

isToggled(): boolean {
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
}

toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
}

onLoggedout() {
    localStorage.removeItem('isLoggedin');
    this.router.navigate(['/login']);
}

changeLang(language: string) {
    this.translate.use(language);
}

}
