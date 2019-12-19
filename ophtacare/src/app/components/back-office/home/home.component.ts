import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public blocked;
  public selectedLanguage;

  constructor() { }

  ngOnInit() {
    this.getSelectedLanguage();
    this.blocked = true;
    setTimeout(() => {
      this.blocked = false;
    }, 1000);
  }
  getSelectedLanguage() {
    if (localStorage.getItem('selectedLanguage')) {
      localStorage.setItem('selectedLanguage',  localStorage.getItem('selectedLanguage')); // User is already logged, then it is navigate in the dashboard
    } else {
      localStorage.setItem('selectedLanguage', 'fr'); // First login connection, then the default language is French
    }
  }
}
