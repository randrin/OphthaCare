import { Component, OnInit } from '@angular/core';
import { Permissions } from '../../models/permissions/permissions';
import { Permission } from '../../models/permissions/permission';
import { PermissionsService } from '../../services/PermissionsServices';
import { AuthenticationService } from '../../services/authenticationService';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {

  public cols: any[];
  public blocked;
  public permissions: Permissions = { list: [] };

  constructor(private permissionsService: PermissionsService, private authenticationService: AuthenticationService) {
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

  }

  detailsPermission() {

  }

  updatePermission() {

  }

  deletePermission() {

  }

  isAdmin() {}

  clearFilter(dt) {
    $('.filter').val('');
     dt.reset();
  }
}
