import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, ResponseContentType, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class SpecialistesService {

  private specialisteExportUrl = window['baseUrl'] + '/excel/downloadExcelSpecialistes';
  private specialistesUrl = window['baseUrl'] + '/patient/getAllSpecialistes';
  private specialisteUrlInsert = window['baseUrl'] + '/specialiste/insert';
  private specialisteUrlUpdate = window['baseUrl'] + '/specialiste/update';
  private specialisteUrlDelete = window['baseUrl'] + '/specialiste/delete';

  constructor(
    public router: Router, private http: Http) {
  }

  getAllSpecialistes (caller) {
    const options = {
      headers: new Headers({
        'caller': caller
      }),
  };
  return this.http.get(this.specialistesUrl);
  }

  insertSpecialiste (specialiste, caller) {
    const options = {
      headers: new Headers({
        'caller': caller
      }),
  };
  return this.http.put(this.specialisteUrlInsert, specialiste, options);
  }

  updateSpecialiste (specialiste, caller) {
    const options = {
      headers: new Headers({
        'caller': caller
      }),
    };
    return this.http.post(this.specialisteUrlUpdate, specialiste, options);
  }

  deleteSpecialiste (specialiste, caller) {
    const options = {
      headers: new Headers({
        'caller': caller
      }),
  };
  return this.http.delete(this.specialisteUrlDelete + '/' + specialiste.idMedecin, options);
  }

  exportSpecialistes(caller) {
    const options = {
      headers: new Headers({
        'caller': caller
      }),
      responseType: ResponseContentType.Blob
  };
  return this.http.get(this.specialisteExportUrl, options);
  }
}
