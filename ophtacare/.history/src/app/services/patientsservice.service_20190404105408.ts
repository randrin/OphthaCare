import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, ResponseContentType, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class PatientsServiceService {

  private patientExportUrl = window['baseUrl'] + '/excel/downloadExcelPatients';
  private patientsUrl = window['baseUrl'] + '/patient/getAll';
  private patientUrlDelete = window['baseUrl'] + '/patient/delete';

    constructor(
        public router: Router, private http: Http) {
    }

    getAllPatients (caller) {
      const options = {
        headers: new Headers({
          'caller': caller
        }),
    };
    return this.http.get(this.patientsUrl);
    }

    deletePatient (patient, caller) {
      const options = {
        headers: new Headers({
          'caller': caller
        }),
    };
    return this.http.delete(this.patientUrlDelete + '/' + patient.idPatient, options);
    }

    exportPatients(caller) {
      const options = {
        headers: new Headers({
          'caller': caller
        }),
        responseType: ResponseContentType.Blob
    };
    return this.http.get(this.patientExportUrl, options);
    }
}
