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

  public admin = new Admin(0, '', '', '', '', '');
  public hide = false;
  public responseData;
  constructor(
    private authenticationService: AuthenticationService,
    private messageService: MessageService) {
  }

  ngOnInit() {
    this.hide = true;
  }

  login() {
    this.authenticationService.login(this.admin).subscribe(
        data => {
          this.responseData = JSON.stringify(data.json());
          console.log('Data code: ' + this.responseData);
          if (data.json().code != null) {
            this.messageService.add({
              sticky: false,
              severity: 'warn',
              summary: data.json().code,
              detail: data.json().message
            });
          } else {
            localStorage.setItem('admin', JSON.stringify(data.json()));
            this.authenticationService.admin = this.responseData;
            this.messageService.add({
              sticky: false,
              severity: 'success',
              summary: 'Welcome',
              detail: this.admin.prenomAdmin
            });
            this.authenticationService.router.navigate(['dashboard']);
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
