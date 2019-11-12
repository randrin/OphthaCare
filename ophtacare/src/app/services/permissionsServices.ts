import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Permission } from '../models/permissions/permission';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  public permission = new Permission(false, false, false, false, false);

  constructor(
    public router: Router, private http: Http) {
  }

  getAccess(caller) {
    let callerRole = caller.roleAdmin.toUpperCase();
    switch (callerRole) {
      case 1: 'ADMIN'
        this.permission = new Permission(true, true, true, true, true);
        return this.permission;
        break;
      case 2: 'SUPERVISOR'
        this.permission = new Permission(true, true, false, false, true);
        return this.permission;
        break;
      case 3: 'USER'
        this.permission = new Permission(false, true, false, false, false);
        return this.permission;
        break;
      default:
        this.permission = new Permission(false, false, false, false, false);
        return this.permission;
        break;
    }
  }
}