import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, ResponseContentType, Headers } from '@angular/http';
import { Permission } from '../models/permissions/permission';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  private permissionExportUrl = window['baseUrl'] + '/excel/downloadExcelPermissions';
  private permissionsUrl = window['baseUrl'] + '/permission/getAllPermissions';
  private permissionUrlInsert = window['baseUrl'] + '/permission/insert';
  private permissionUrlUpdate = window['baseUrl'] + '/permission/update';
  private permissionUrlDelete = window['baseUrl'] + '/permission/delete';

  public permission = new Permission('', false, false, false, false, false);

  constructor(
    public router: Router, private http: Http) {
  }

  getAllPermissions(caller) {
    const options = {
      headers: new Headers({
        'caller': caller
      }),
  };
  return this.http.get(this.permissionsUrl, options);
  }

  getPermission(caller) {
    const callerRole = caller;
    if (callerRole === 'ADMIN') {
      this.permission = new Permission(true, true, true, true, true);
    } else if (callerRole === 'SUPERVISOR') {
      this.permission = new Permission(true, true, false, false, true);
    } else if (callerRole === 'USER') {
      this.permission = new Permission(false, true, false, false, false);
    } else {
      this.permission = new Permission(false, false, false, false, false);
    }
    return this.permission;
  }

  public setPermission(permission) {
    this.permission = permission;
  }
}
