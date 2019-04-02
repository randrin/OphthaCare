import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authenticationService';

@Component({
  selector: 'app-root',
  providers: [AuthenticationService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  public constructor (private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.authenticationService.router.navigate(['login']);
  }
}
