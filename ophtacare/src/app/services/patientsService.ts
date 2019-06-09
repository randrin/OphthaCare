import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, ResponseContentType, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  private patientExportUrl = window['baseUrl'] + '/excel/downloadExcelPatients';
  private patientsUrl = window['baseUrl'] + '/patient/getAllPatients';
  private patientUrlInsert = window['baseUrl'] + '/patient/insert';
  private patientUrlUpdate = window['baseUrl'] + '/patient/update';
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
    return this.http.get(this.patientsUrl, options);
    }

    insertPatient (patient, caller) {
      const options = {
        headers: new Headers({
          'caller': caller
        }),
    };
    return this.http.put(this.patientUrlInsert, patient, options);
    }

    updatePatient (patient, caller) {
      const options = {
        headers: new Headers({
          'caller': caller
        }),
      };
      return this.http.post(this.patientUrlUpdate, patient, options);
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
