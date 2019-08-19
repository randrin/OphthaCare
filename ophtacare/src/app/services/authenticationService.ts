import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { Admin } from '../models/administrateurs/admin';
import { Medecin } from '../models/medecins/medecin';

@Injectable()
export class AuthenticationService {

    public admin = new Admin(0, '', '', '', '', '', '', '', '', '');
    public medecin = new Medecin(0, '', '', '', 0, '', '', '', '', 0, 0, '');

    private loginUrlAdmin = window['baseUrl'] + '/admin/login';
    private loginUrlPersonnel = window['baseUrl'] + '/medecin/login';
    private logoutUrl = window['baseUrl'] + '/admin/logout';
    public result;

    constructor(
        public router: Router, private http: Http) {
    }

    loginAdmin(admin) {
        return this.getAdmin(admin);
    }

    loginPersonnel(medecin) {
        return this.getMedecin(medecin);
    }

    logout() {
        const options = new RequestOptions({});
        this.http.post(this.logoutUrl, options).subscribe(
            data => {this.result = data; },
            err => { this.result = 'error'; },
            () => { localStorage.removeItem('admin'); });
    }

    public getAdmin(admin) {
        const params: URLSearchParams = new URLSearchParams();
        params.set('username', admin.nomAdmin);
        params.set('password', admin.password);
        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.loginUrlAdmin, params, options);
    }

    public getMedecin(medecin) {
        const params: URLSearchParams = new URLSearchParams();
        params.set('matricule', medecin.matriculeMedecin);
        params.set('password', medecin.password);
        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.loginUrlPersonnel, params, options);
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
