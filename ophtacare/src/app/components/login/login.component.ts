import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Admin } from '../../models/administrateurs/admin';
import { AuthenticationService } from '../../services/authenticationService';
import { Medecin } from '../../models/medecins/medecin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public admin = new Admin(0, '', '', '', '', '', '', '', '', '');
  public medecin = new Medecin(0, '', '', '', 0, '', '', '', '', 0, 0, '');
  public hide = false;
  public responseData;
  constructor(
    private authenticationService: AuthenticationService,
    private messageService: MessageService) {
  }

  ngOnInit() {
    this.hide = true;
  }

  loginAdmin() {
    this.authenticationService.loginAdmin(this.admin).subscribe(
        data => {
          this.responseData = data.json();
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
              detail: this.responseData.nomAdmin + ' ' + this.responseData.prenomAdmin
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

  loginPersonnel() {
    this.authenticationService.loginPersonnel(this.medecin).subscribe(
      data => {
        this.responseData = data.json();
        console.log('Data code: ' + this.responseData);
        if (data.json().code != null) {
          this.messageService.add({
            sticky: false,
            severity: 'warn',
            summary: data.json().code,
            detail: data.json().message
          });
        } else {
          localStorage.setItem('medecin', JSON.stringify(data.json()));
          this.authenticationService.medecin = this.responseData;
          this.messageService.add({
            sticky: false,
            severity: 'success',
            summary: 'Welcome',
            detail: this.responseData.nomAdmin + ' ' + this.responseData.prenomAdmin
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
