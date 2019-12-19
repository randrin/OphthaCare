import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from '../../../services/authenticationService';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../../back-office/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-nav-top',
  templateUrl: './nav-top.component.html',
  styleUrls: ['./nav-top.component.css']
})
export class NavTopComponent implements OnInit {
  public pushRightClass: string;
  public monthNames;
  public dayNames;
  public CurrentDate;
  public CurrentTime;
  public selectedLanguage;
  public isConnected;

  constructor(private translate: TranslateService, private router: Router, private authenticationService: AuthenticationService,public dialog: MatDialog) {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
        this.toggleSidebar();
      }
    });
  }

  ngOnInit() {
    this.pushRightClass = 'push-right';
    this.monthNames = [ 'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
    this.dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.isConnected = localStorage.getItem('isConnected');
    this.selectedLanguage = localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : 'fr';
    this.getCurrentTime();
  }

  getCurrentTime() {
    // Setting current date
    this.CurrentDate =this.dayNames[new Date().getDay()] + ', ' + new Date().getDate() + ' '
    + this.monthNames[new Date().getMonth()] + ' ' + new Date().getFullYear();

    // Setting current time
    setInterval(() => {
      this.CurrentTime = [(new Date().getHours() < 10 ? '0' : '') + new Date().getHours()] + ' : ' +
                         [(new Date().getMinutes() < 10 ? '0' : '') + new Date().getMinutes()] + ' : ' +
                         [(new Date().getSeconds() < 10 ? '0' : '') + new Date().getSeconds()]}, 1);
  }

  isToggled(): boolean {
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }

  onLoggedout():void {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '350px',
        data: "Do you want to logout?"
       // data:"{{'Do you want to logout?' | translate }}"//
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          console.log('Yes clicked');
          // DO SOMETHING
          this.authenticationService.logout();
          localStorage.removeItem('admin');
          localStorage.removeItem('isConnected');
          this.router.navigate(['/login']);
        }
      });
  }

  changeLang(language: string) {
    this.selectedLanguage = language;
    localStorage.setItem('selectedLanguage', language);
    this.translate.use(language);
  }
}
