import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authenticationService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public blocked;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.router.navigate(['dashboard']);
    this.blocked = true;
    setTimeout(() => {
      this.blocked = false;
    }, 1000);
  }
}
