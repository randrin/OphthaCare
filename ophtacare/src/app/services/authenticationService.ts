import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { Admin } from '../models/administrateurs/admin';

@Injectable()
export class AuthenticationService {

    public admin = new Admin(0, '', '', '', '', '', '', '');
    private loginUrl = window['baseUrl'] + '/admin/login';
    private logoutUrl = window['baseUrl'] + '/admin/logout';

    constructor(
        public router: Router, private http: Http) {
    }

    login(admin) {
        return this.getAdmin(admin);
    }

    logout() {
        const options = new RequestOptions({});
        this.http.post(this.logoutUrl, options);
    }

    public getAdmin(admin) {
        const params: URLSearchParams = new URLSearchParams();
        params.set('username', admin.nomAdmin);
        params.set('password', admin.password);
        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.loginUrl, params, options);
    }

    public setAdmin(value) {
        this.admin = value;
    }

    public getUsername() {
        console.log('Administrateur Logged: ' + this.admin.pseudoAdmin);
        if (this.admin == null) {
          return '';
        }
       return this.admin.nomAdmin + ' ' + this.admin.prenomAdmin;
    }
}
