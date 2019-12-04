import { Component, OnInit } from '@angular/core';
import { Permissions } from '../../models/permissions/permissions';
import { ConfirmationService } from 'primeng/primeng';
import { Permission } from '../../models/permissions/permission';
import { PermissionsService } from '../../services/PermissionsServices';
import { AuthenticationService } from '../../services/authenticationService';
import { SelectItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-permissions',
  providers: [ConfirmationService],
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {

  public cols: any[];
  public selectPermission: SelectItem[];
  public blocked;
  public displayNewDialog;
  public displayUpdateDialog;
  public displayDetailsDialog;
  public permissions: Permissions = { list: [] };
  public permissionDetail = new Permission(0, '', false, false, false, false, false, '', '');
  public newPermission = new Permission(0, '', false, false, false, false, false, '', '');
  public permissionUpdate = new Permission(0, '', false, false, false, false, false, '', '');

  constructor(private permissionsService: PermissionsService, private authenticationService: AuthenticationService,
    private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.cols = [
      { field: 'detail', header: 'detail' },
      { field: 'nomPermission', header: 'roleAdmin' },
      { field: 'createPermission', header: 'Create' },
      { field: 'readPermission', header: 'Read' },
      { field: 'updatePermission', header: 'Update' },
      { field: 'deletePermission', header: 'Delete' },
      { field: 'downloadPermission', header: 'Download' },
      // { field: 'emailPatient', header: 'email' },
      // { field: 'numTelPatient', header: 'cellularePhone' },
      // { field: 'numFixePatient', header: 'fixePhone' },
      // { field: 'addressePatient', header: 'city' },
      // { field: 'codePostPatient', header: 'postalCode' },
      // { field: 'infoSupplPatient', header: 'supplInfos' },
      { field: 'detail', header: 'modify' },
      { field: 'detail', header: 'cancel' },
    ];
    this.selectPermission = [
      { label: 'Yes', value: true, icon: 'pi pi-check' },
      { label: 'No', value: false, icon: 'pi pi-times' }
    ];
  }

  ngOnInit() {
    this.getAllPermissions();
  }

  getAllPermissions() {
    this.blocked = true;
    this.permissionsService.getAllPermissions(this.authenticationService.getUsername()).subscribe(
      response => {
        this.permissions.list = [];
        if (response.json() != null) {
          this.permissions.list = this.permissions.list.concat(response.json().filter(n => n));
        }
      });
    setTimeout(() => {
      this.blocked = false;
    }, 1000);
  }

  createPermission() {
    this.blocked = true;
    setTimeout(() => {
      this.blocked = false;
      this.displayNewDialog = true;
    }, 500);
  }

  detailsPermission (permission: Permission) {
    this.blocked = true;
    setTimeout(() => {
      this.blocked = false;
      this.displayDetailsDialog = true;
    }, 500);
    this.permissionDetail = permission;
  }

  updatePermission(permission: Permission) {
    this.blocked = true;
    setTimeout(() => {
      this.blocked = false;
      this.displayUpdateDialog = true;
    }, 500);
    this.permissionUpdate = permission;
  }

  isAdmin() { }

  submitPermission(permission: Permission) {
    console.log('Permission to register: ' + permission.nomPermission.toUpperCase());
    permission.nomPermission = permission.nomPermission.toUpperCase();
    this.newPermission = permission;
    this.blocked = true;
    this.permissionsService.insertPermission(this.newPermission, this.authenticationService.getUsername()).subscribe(
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
            detail: 'Permission enregistré.'
          });
          this.getAllPermissions();
          this.newPermission = new Permission(0, '', false, false, false, false, false, '', '');
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

  submitUpdatePermission(permission: Permission) {
    console.log('Permission to update: ' + permission.nomPermission.toUpperCase());
    permission.nomPermission = permission.nomPermission.toUpperCase();
    this.permissionUpdate = permission;
    this.blocked = true;
    this.permissionsService.updatePermission(this.permissionUpdate, this.authenticationService.getUsername()).subscribe(
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
            detail: 'Permission ajourné.'
          });
          this.getAllPermissions();
          this.permissionUpdate = new Permission(0, '', false, false, false, false, false, '', '');
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

  deletePermission(permission: Permission) {
    console.log('Permission to cancel: ' + permission.nomPermission);
    this.confirmationService.confirm({
      message: 'Etes-vous sure de vouloir supprimer ' + permission.nomPermission.toUpperCase() + ' ?',
      header: 'Conferma Eliminazione',
      icon: 'pi pi-trash',
      accept: () => {
        this.blocked = true;
        this.permissionsService.deletePermission(permission, this.authenticationService.getUsername()).subscribe(
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
                detail: 'Permission eliminato'
              });
              this.getAllPermissions();
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

  closeDialog() {
    this.displayNewDialog = false;
    this.displayUpdateDialog = false;
    this.newPermission = new Permission(0, '', false, false, false, false, false, '', '');
  }
}
