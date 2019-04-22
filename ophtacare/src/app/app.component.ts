import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authenticationService';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  providers: [AuthenticationService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  public constructor (private authenticationService: AuthenticationService, private translate: TranslateService) {
    translate.setDefaultLang('fr');
  }

  ngOnInit() {
    this.authenticationService.router.navigate(['dashboard']);
  }
}
