import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-dashboard',
  templateUrl: './footer-dashboard.component.html',
  styleUrls: ['./footer-dashboard.component.css']
})
export class FooterDashboardComponent implements OnInit {

  public initYear = '2019';
  public currentYear = new Date().getFullYear().toString();
  public correct;

  constructor() { }

  ngOnInit() {
    if (this.initYear === this.currentYear) {
      this.correct = true;
    }
  }
}

