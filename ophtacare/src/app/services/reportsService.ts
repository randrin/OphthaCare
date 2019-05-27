import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, ResponseContentType, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private reportExportUrl = window['baseUrl'] + '/excel/downloadExcelReports';
  private reportsUrl = window['baseUrl'] + '/report/getAllReports';
  private reportUrlDelete = window['baseUrl'] + '/report/delete';

  constructor(public router: Router, private http: Http) {}

  getAllReports(caller) {
    const options = {
      headers: new Headers({
        'caller': caller
      })
    };
    return this.http.get(this.reportsUrl);
  }

  exportReports(caller) {
    const options = {
      headers: new Headers({
        'caller': caller
      }),
      responseType: ResponseContentType.Blob
  };
  return this.http.get(this.reportExportUrl, options);
  }

  deleteReport (report, caller) {
    const options = {
      headers: new Headers({
        'caller': caller
      }),
  };
  return this.http.delete(this.reportUrlDelete + '/' + report.idReport, options);
  }
}
