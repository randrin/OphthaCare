import { Component, OnInit } from '@angular/core';
import { ConfirmationService, SelectItem } from 'primeng/primeng';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from '../../services/authenticationService';
import { AdministrateursService } from '../../services/administrateursService';
import { Admins } from '../../models/administrateurs/admins';
import { Admin } from '../../models/administrateurs/admin';
import * as moment from 'moment';
import saveAs from 'save-as';
import { PermissionsService } from '../../services/PermissionsServices';
import { Permission } from '../../models/permissions/permission';

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
  public activation: SelectItem[];
  public admins: Admins = {list: [] };
  public admin = new Admin(0, '', '', '', '', '', '', '', '', '');
  public newAdmin = new Admin(0, '', '', '', '', '', '', '', '', '');
  public adminUpdate = new Admin(0, '', '', '', '', '', '', '', '', '');
  public userPermission = new Permission('', false, false, false, false, false);
  public displayDetailsDialog;
  public displayNewDialog;
  public displayUpdateDialog;
  public response = {
    code: 0,
    message: ''
  };

  constructor(private administrateurService: AdministrateursService, private authenticationService: AuthenticationService,
    private confirmationService: ConfirmationService, private messageService: MessageService,
    private permissionsService: PermissionsService) {
      this.cols = [
        { field: 'detail', header: 'detail' },
        { field: 'pseudoAdmin', header: 'pseudoAdmin' },
        { field: 'nomAdmin', header: 'firstName' },
        { field: 'prenomAdmin', header: 'lastName' },
        { field: 'roleAdmin', header: 'roleAdmin' },
        { field: 'emailAdmin', header: 'email' },
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
    this.activation = [
      { label: 'Yes', value: 'true', icon: 'pi pi-check' },
      { label: 'No', value: 'false', icon: 'pi pi-times' }
    ];
    this.getAdminsitrateurs();
    this.getPermissions();
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

  // getPermissions() {
  //   this.permissionsService.getPermission(this.authenticationService.getRole());
  //   this.userPermission = this.permissionsService.permission;
  //   console.log('Permission: ' + this.userPermission.createItem);
  // }

  isAdmin() {}

  createAdmin() {
    this.blocked = true;
    setTimeout(() => {
      this.blocked = false;
      this.displayNewDialog = true;
    }, 500);
  }

  submitAdmin(admin: Admin) {
    console.log('Admin to register: ' + admin.nomAdmin + ' ' + admin.prenomAdmin);
    this.newAdmin = admin;
    this.blocked = true;
    this.administrateurService.insertAdministrateur(this.newAdmin, this.authenticationService.getUsername()).subscribe(
      response => {
        this.blocked = false;
        if (response.json().code !== 'OK') {
          this.messageService.add({
            sticky: true,
            severity: 'error',
            summary: response.json().code,
            detail: response.json().message
          });
        } else {
          this.messageService.add({
            sticky: false,
            severity: 'success',
            summary: 'Succès',
            detail: 'Administrateur enregistré.'
          });
          this.getAdminsitrateurs();
          this.newAdmin = new Admin(0, '', '', '', '', '', '', '', '', '');
          this.displayNewDialog = false;
        }
      },
      error => {
        this.blocked = false;
        this.messageService.add({
          sticky: true,
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur Technique'
        });
      });
  }

  updateAdmin(admin: Admin) {
    this.blocked = true;
    setTimeout(() => {
      this.blocked = false;
      this.displayUpdateDialog = true;
    }, 500);
    this.adminUpdate = admin;
  }

  submitUpdateAdmin (updateAdmin: Admin) {
    console.log('Admin to update: ' + updateAdmin.nomAdmin + ' ' + updateAdmin.prenomAdmin);
    this.adminUpdate = updateAdmin;
    this.blocked = true;
    this.administrateurService.updateAdministrateur(this.adminUpdate, this.authenticationService.getUsername()).subscribe(
      response => {
        this.blocked = false;
        if (response.json().code !== 'OK') {
          this.messageService.add({
            sticky: true,
            severity: 'error',
            summary: response.json().code,
            detail: response.json().message
          });
        } else {
          this.messageService.add({
            sticky: false,
            severity: 'success',
            summary: 'Succès',
            detail: 'Administrateur ajourné.'
          });
          this.getAdminsitrateurs();
          this.adminUpdate = new Admin(0, '', '', '', '', '', '', '', '', '');
          this.displayUpdateDialog = false;
        }
      },
      error => {
        this.blocked = false;
        this.messageService.add({
          sticky: true,
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur Technique'
        });
      });
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
    console.log('Administrator to cancel: ' + admin.idAdmin);
    this.confirmationService.confirm({
      message: 'Etes-vous sûre de vouloir supprimer ' + admin.nomAdmin + ' ' + admin.prenomAdmin + ' ?',
      header: 'Conferma Eliminazione',
      icon: 'pi pi-trash',
      accept: () => {
        this.blocked = true;
        this.administrateurService.deleteAdministrator(admin, this.authenticationService.getUsername()).subscribe(
          res => {
            this.blocked = false;
            if (res.json().code !== 'OK') {
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
                detail: 'Administrateur eliminato'
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

  exportExcelAdministrateurs() {
    console.log('Export excel file called: -> Administrateurs');
    this.administrateurService.exportAdministrateurs(this.authenticationService.getUsername()).subscribe(
      data => {
        console.log('Response: ' + JSON.stringify(data));
        this.response = {
          code: data.status,
          message: data.statusText
        };
        if (this.response.message !== 'OK') {
          this.messageService.add({
            sticky: true,
            severity: 'error',
            summary: 'Erreur code ' + this.response.code,
            detail: 'Message ' + this.response.message
          });
        } else {
          this.downloadAdministrateursFile(data);
        }
      },
      error => {
        this.messageService.add({
          sticky: true,
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur Technique'
        });
      }
    );
  }

  downloadAdministrateursFile(data: any) {
    const blob = new Blob([data.blob()], { type: 'application/octet-stream' });
    saveAs(blob, 'Administrateurs_OphthaCare.xlsx');
  }

  clearFilter(dt) {
    $('.filter').val('');
     dt.reset();
  }

  closeDialog () {
    this.displayNewDialog = false;
    this.displayUpdateDialog = false;
    this.newAdmin = new Admin(0, '', '', '', '', '', '', '', '', '');
    this.adminUpdate = new Admin(0, '', '', '', '', '', '', '', '', '');
  }
}
