import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatientsServiceService {

  private loginUrl = window['baseUrl'] + '/excel/login';

    constructor(
        public router: Router, private http: Http) {
    }

    exportPatients(caller) {

    }
}
