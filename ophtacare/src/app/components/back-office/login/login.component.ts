import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Admin } from '../../../models/administrateurs/admin';
import { AuthenticationService } from '../../../services/authenticationService';
import { Medecin } from '../../../models/medecins/medecin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
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

  loginAdmin(admin) {
    console.log('User logging: ', admin.username, ' - ', admin.password);
    this.authenticationService.loginAdmin(admin).subscribe(
        data => {
          this.responseData = data;
          console.log(' this.responseData: ',  this.responseData);
          if (data != null) {
            this.messageService.add({
              sticky: false,
              severity: 'warn',
              // summary: data.json().code,
              // detail: data.json().message
            });
          } else {
            // localStorage.setItem('admin', JSON.stringify(data.json()));
            this.authenticationService.admin = this.responseData;
            this.messageService.add({
              sticky: false,
              severity: 'success',
              summary: 'Welcome',
              detail: this.responseData.nomAdmin + ' ' + this.responseData.prenomAdmin
            });
            localStorage.setItem('isConnected', 'true');
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
