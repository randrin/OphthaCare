import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, ResponseContentType, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class MedecinsService {

  private medecinExportUrl = window['baseUrl'] + '/excel/downloadExcelMedecins';
  private medecinsUrl = window['baseUrl'] + '/medecin/getAllMedecins';
  private medecinUrlInsert = window['baseUrl'] + '/medecin/insert';
  private medecinUrlUpdate = window['baseUrl'] + '/medecin/update';
  private medecinUrlDelete = window['baseUrl'] + '/medecin/delete';

  constructor(
    public router: Router, private http: Http) {
  }

  getAllMedecins (caller) {
    const options = {
      headers: new Headers({
        'caller': caller
      }),
  };
  return this.http.get(this.medecinsUrl);
  }

  insertMedecin (medecin, caller) {
    const options = {
      headers: new Headers({
        'caller': caller
      }),
  };
  return this.http.put(this.medecinUrlInsert, medecin, options);
  }

  updateMedecin (medecin, caller) {
    const options = {
      headers: new Headers({
        'caller': caller
      }),
    };
    return this.http.post(this.medecinUrlUpdate, medecin, options);
  }

  deleteMedecin (medecin, caller) {
    const options = {
      headers: new Headers({
        'caller': caller
      }),
  };
  return this.http.delete(this.medecinUrlDelete + '/' + medecin.idMedecin, options);
  }

  exportMedecins(caller) {
    const options = {
      headers: new Headers({
        'caller': caller
      }),
      responseType: ResponseContentType.Blob
  };
  return this.http.get(this.medecinExportUrl, options);
  }
}
