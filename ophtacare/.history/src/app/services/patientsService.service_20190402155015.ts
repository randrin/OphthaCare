import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatientsServiceService {

  private loginUrl = window['baseUrl'] + '/admin/login';

    constructor(
        public router: Router, private http: Http) {
    }
}
