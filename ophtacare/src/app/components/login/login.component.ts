import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authenticationService';
import { MessageService } from 'primeng/api';
import { Admin } from '../../models/administrateur/admin';

@Component({
  selector: 'app-login',
  providers: [AuthenticationService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public admin = new Admin(0, true, '', '', '', '', '');
  private result;

  constructor(
    private authenticationService: AuthenticationService,
    private messageService: MessageService) {
  }

  ngOnInit() {
  }

  login(admin) {
    this.authenticationService.login(this.admin)
      .subscribe(
        data => { this.result = data; },
        error => { this.result = 'error'; },
        () => {
          if (this.result.json().code != null) {
            this.messageService.add({
              sticky: false,
              severity: 'warn',
              summary: this.result.json().code,
              detail: this.result.json().message
            });
          } else {
            localStorage.setItem('admin', JSON.stringify(this.result.json()));
            this.authenticationService.setAdmin(this.result.json());
            this.authenticationService.router.navigate(['home']);
          }
        }
      );
  }
}
