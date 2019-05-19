import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, ResponseContentType, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ProfessionsMedecinsService {

  private professionsMedecinsExportUrl = window['baseUrl'] + '/excel/downloadExcelProfessionsMedecins';
  private professionsMedecinsUrl = window['baseUrl'] + '/profession/getAllProfessionsMedecins';
  private professionsMedecinUrlInsert = window['baseUrl'] + '/profession/insert';
  private professionsMedecinUrlUpdate = window['baseUrl'] + '/profession/update';
  private professionsMedecinUrlDelete = window['baseUrl'] + '/profession/delete';

  constructor(
    public router: Router, private http: Http) {
  }

  getAllProfessionsMedecins (caller) {
    const options = {
      headers: new Headers({
        'caller': caller
      }),
  };
  return this.http.get(this.professionsMedecinsUrl);
  }

  insertProfessionMedecin (professionMedecin, caller) {
    const options = {
      headers: new Headers({
        'caller': caller
      }),
  };
  return this.http.put(this.professionsMedecinUrlInsert, professionMedecin, options);
  }

  updateProfessionMedecin (professionMedecin, caller) {
    const options = {
      headers: new Headers({
        'caller': caller
      }),
    };
    return this.http.post(this.professionsMedecinUrlUpdate, professionMedecin, options);
  }

  deleteProfessionMedecin (professionMedecin, caller) {
    const options = {
      headers: new Headers({
        'caller': caller
      }),
  };
  return this.http.delete(this.professionsMedecinUrlDelete + '/' + professionMedecin.idMedecin, options);
  }

  exportProfessionsMedecins(caller) {
    const options = {
      headers: new Headers({
        'caller': caller
      }),
      responseType: ResponseContentType.Blob
  };
  return this.http.get(this.professionsMedecinsExportUrl, options);
  }
}
