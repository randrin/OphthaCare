import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Admin } from '../../models/administrateur/admin';
import { AuthenticationService } from '../../services/authenticationService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public admin = new Admin(0, true, '', '', '', '', '', '');
  private result;

  constructor(
    private authenticationService: AuthenticationService,
    private messageService: MessageService) {
  }

  ngOnInit() {
  }

  login() {
    this.authenticationService.login(this.admin)
      .subscribe(
        data => {
          console.log('Data code: ' + data.json().code);
          if (data.json().code != null) {
            this.messageService.add({
              sticky: false,
              severity: 'warn',
              summary: data.json().code,
              detail: data.json().message
            });
          } else {
            localStorage.setItem('user', JSON.stringify(data.json()));
            this.authenticationService.admin = data.json();
            this.authenticationService.router.navigate(['home']);
          }
        },
        err => {
          this.messageService.add({
            sticky: false,
            severity: 'error',
            summary: 'Error',
            detail: 'Connection Refused'
          });
        });
  }
}
