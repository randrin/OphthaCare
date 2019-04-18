import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, ResponseContentType, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AdministrateursService {
  private adminExportUrl = window['baseUrl'] + '/excel/downloadExcelAdmins';
  private adminsUrl = window['baseUrl'] + '/admin/getAllAdmins';
  private adminUrlInsert = window['baseUrl'] + '/admin/insert';
  private adminUrlUpdate = window['baseUrl'] + '/admin/update';
  private adminUrlDelete = window['baseUrl'] + '/admin/delete';

  constructor(public router: Router, private http: Http) {}

  getAllAdmins(caller) {
    const options = {
      headers: new Headers({
        'caller': caller
      })
    };
    return this.http.get(this.adminsUrl);
  }

  deleteAdministrator(admin, caller) {
    const options = {
      headers: new Headers({
        'caller': caller
      })
    };
    return this.http.delete(this.adminUrlDelete + '/' + admin.id, options);
  }
}
