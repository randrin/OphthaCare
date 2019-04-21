import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-nav-top',
  templateUrl: './nav-top.component.html',
  styleUrls: ['./nav-top.component.css']
})
export class NavTopComponent implements OnInit {
  public pushRightClass: string;
  public monthNames;
  public dayNames;
  public newDate;
  public Date;
  public Seconds;
  public Hours;
  public Minutes;

  constructor(private translate: TranslateService, private router: Router) {
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
    this.dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    this.getCurrentTime();
  }

  getCurrentTime() {
    // Make single object
    this.newDate = new Date();
      
		// Make current time
    this.newDate.setDate(this.newDate.getDate());
    
    // Setting date and time
    this.Date = this.dayNames[this.newDate.getDay()] + ', ' + this.newDate.getDate() + ' '
    + this.monthNames[this.newDate.getMonth()] + ' ' + this.newDate.getFullYear();

    setInterval( function() {
      // Create a newDate() object and extract the seconds of the current time on the visitor's
      const seconds = new Date().getSeconds();

      // Add a leading zero to seconds value
      this.Seconds = (seconds < 10 ? '0' : '' ) + seconds;
    }, 1000);

    setInterval( function() {
      // Create a newDate() object and extract the minutes of the current time on the visitor's
      const minutes = new Date().getMinutes();

      // Add a leading zero to minutes value
      this.Minutes = (minutes < 10 ? '0' : '' ) + minutes;
    }, 1000);

    setInterval( function() {
      // Create a newDate() object and extract the hours of the current time on the visitor's
      const hours = new Date().getHours();

      // Add a leading zero to hours value
      this.Hours = (hours < 10 ? '0' : '' ) + hours;
    }, 1000);
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
