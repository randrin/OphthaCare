import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class MaladiesService {

  private maladieExportUrl = window['baseUrl'] + '/excel/downloadExcelMaladies';
  private maladiesUrl = window['baseUrl'] + '/maladie/getAllSpecialistes';
  private maladieUrlInsert = window['baseUrl'] + '/maladie/insert';
  private maladieUrlUpdate = window['baseUrl'] + '/maladie/update';
  private maladieUrlDelete = window['baseUrl'] + '/maladie/delete';

  constructor(
    public router: Router, private http: Http) {
  }
  
  getAllMaladies (caller) {
    const options = {
      headers: new Headers({
        'caller': caller
      }),
  };
  return this.http.get(this.maladiesUrl);
  }

}
