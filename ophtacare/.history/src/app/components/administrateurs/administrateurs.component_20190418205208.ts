import { Component, OnInit } from '@angular/core';
import { ConfirmationService, SelectItem } from 'primeng/primeng';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from '../../services/authenticationService';
import { AdministrateursService } from '../../services/administrateursService';
import { Admins } from '../../models/administrateur/admins';
import { Admin } from '../../models/administrateur/admin';
import * as moment from 'moment';

@Component({
  selector: 'app-administrateurs',
  providers: [ConfirmationService],
  templateUrl: './administrateurs.component.html',
  styleUrls: ['./administrateurs.component.css']
})
export class AdministrateursComponent implements OnInit {

  public cols: any[];
  public blocked;
  public role: SelectItem[];
  public admins: Admins = {list: [] };
  public admin = new Admin(0, '', '', '', '', '', '', '');
  public displayDetailsDialog;

  constructor(private administrateurService: AdministrateursService, private authenticationService: AuthenticationService,
    private confirmationService: ConfirmationService, private messageService: MessageService) {
      this.cols = [
        { field: 'detail', header: 'detail' },
        { field: 'pseudoAdmin', header: 'pseudoAdmin' },
        { field: 'nomAdmin', header: 'firstName' },
        { field: 'prenomAdmin', header: 'lastName' },
        { field: 'roleAdmin', header: 'roleAdmin' },
        { field: 'activeAdmin', header: 'activeAdmin' },
        { field: 'detail', header: 'modify' },
        { field: 'detail', header: 'cancel' },
      ];
    }

  ngOnInit() {
    this.role = [
      { label: 'Admin', value: 'ADMIN' },
      { label: 'User', value: 'USER' },
      { label: 'Supervisor', value: 'SUPERVISOR' }
    ];
    this.getAdminsitrateurs();
  }

  getAdminsitrateurs() {
    this.blocked = true;
    this.administrateurService.getAllAdmins(this.authenticationService.getUsername()).subscribe(
      response => {
        this.admins.list = [];
        if (response.json() != null) {
          this.admins.list = this.admins.list.concat(response.json().filter(n => n));
        }
    });
    setTimeout(() => {
      this.blocked = false;
    }, 1000);
  }

  isAdmin() {

  }

  detailsAdmin (admin: Admin) {
    this.blocked = true;
    admin.lastLoginAdmin = moment(admin.lastLoginAdmin).format('DD/MM/YYYY');
    admin.registrationAdmin = moment(admin.registrationAdmin).format('DD/MM/YYYY');
    setTimeout(() => {
      this.blocked = false;
      this.displayDetailsDialog = true;
    }, 500);
    this.admin = admin;
  }

  deleteAdmin(admin: Admin) {
    console.log('Administrator to cancel: ' + admin.id);
    this.confirmationService.confirm({
      message: 'Etes-vous sure de vouloir supprimer ' + admin.nomAdmin + ' ?',
      header: 'Conferma Eliminazione',
      icon: 'pi pi-trash',
      accept: () => {
        this.blocked = true;
        this.administrateurService.deleteAdministrator(admin, 'this.authenticationService.getUsername()').subscribe(
          res => {
            this.blocked = false;
            if ( res.json().code !== 'OK') {
              this.messageService.add({
                sticky: true,
                severity: 'error',
                summary: res.json().code,
                detail: res.json().message
              });
            } else {
              this.messageService.add({
                sticky: false,
                severity: 'success',
                summary: 'Confermato',
                detail: 'utente eliminato'
              });
              this.getAdminsitrateurs();
            }
          },
          error => {
            this.blocked = false;
            this.messageService.add({
              sticky: true,
              severity: 'error',
              summary: 'Error',
              detail: 'Internal Error'
            });
          }
        );
      }
    });
  }

  clearFilter(dt) {
    $('.filter').val('');
     dt.reset();
  }
}
