import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public initYear = '2019';
  public currentYear = new Date().getFullYear().toString();
  public correct;

  constructor() { }

  ngOnInit() {
    if (this.initYear == this.currentYear) {
      this.correct = true;
    }
  }
}
