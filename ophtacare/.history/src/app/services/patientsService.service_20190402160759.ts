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
      let options = {
        headers: new Headers({
          'caller': caller
        }),
        responseType: ResponseContentType.Blob
    };
   return this.http.get(this.userExportUrl, options);
    }
}
