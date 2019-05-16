import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

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
}
