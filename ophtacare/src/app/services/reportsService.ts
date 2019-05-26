import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, ResponseContentType, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private reportExportUrl = window['baseUrl'] + '/excel/downloadExcelReports';

  constructor(public router: Router, private http: Http) {}

  getAllReports(caller) {
    const options = {
      headers: new Headers({
        'caller': caller
      })
    };
    return this.http.get(this.reportExportUrl);
  }
}
