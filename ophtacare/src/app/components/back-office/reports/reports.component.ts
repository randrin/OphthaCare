import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/primeng';
import { ReportsService } from '../../../services/reportsService';
import { AuthenticationService } from '../../../services/authenticationService';
import { Reports } from '../../../models/reports/reports';
import { Report } from '../../../models/reports/report';
import saveAs from 'save-as';

@Component({
  selector: 'app-reports',
  providers: [ConfirmationService],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  public cols: any[];
  public blocked;
  public reports: Reports = { list: [] };
  public response = {
    code: 0,
    message: ''
  };

  constructor(private authenticationService: AuthenticationService,
    private confirmationService: ConfirmationService, private messageService: MessageService, private reportService: ReportsService) { }

  ngOnInit() {
    this.cols = [
      { field: 'userReport', header: 'userReport' },
      { field: 'actionReport', header: 'actionReport' },
      { field: 'resultReport', header: 'resultReport' },
      { field: 'dateReport', header: 'dateReport' },
      { field: 'detail', header: 'cancel' },
    ];
    this.getReports();
  }
  
  getReports() {
    this.blocked = true;
    this.reportService.getAllReports(this.authenticationService.getUsername()).subscribe(
      response => {
        this.reports.list = [];
        if (response.json() != null) {
          this.reports.list = this.reports.list.concat(response.json().filter(n => n));
        }
    });
    setTimeout(() => {
      this.blocked = false;
    }, 1000);
  }

  isAdmin() {

  }

  exportExcelReports() {
    console.log('Export excel file called: -> Reports');
    this.reportService.exportReports(this.authenticationService.getUsername()).subscribe(
      data => {
        console.log('Response: ' + JSON.stringify(data));
        this.response = {
          code: data.status,
          message: data.statusText
        };
        if (this.response.message !== 'OK') {
          this.messageService.add({
            sticky: true,
            severity: 'error',
            summary: 'Erreur code ' + this.response.code,
            detail: 'Message ' + this.response.message
          });
        } else {
          this.downloadReportsFile(data);
        }
      },
      error => {
        this.messageService.add({
          sticky: true,
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur Technique'
        });
      }
    );
  }
  
  downloadReportsFile(data: any) {
    const blob = new Blob([data.blob()], { type: 'application/octet-stream' });
    saveAs(blob, 'Reports_OphthaCare.xlsx');
  }

  deleteReport(report: Report) {
    console.log('Report to cancel: ' + report.idReport);
    this.confirmationService.confirm({
      message: 'Etes-vous sure de vouloir supprimer ' + report.actionReport + ' ?',
      header: 'Conferma Eliminazione',
      icon: 'pi pi-trash',
      accept: () => {
        this.blocked = true;
        this.reportService.deleteReport(report, this.authenticationService.getUsername()).subscribe(
          res => {
            this.blocked = false;
            if (res.json().code !== 'OK') {
              this.messageService.add({
                sticky: true,
                severity: 'error',
                summary: res.json().code,
                detail: res.json().message
              });
            } else {
              this.messageService.add({
                sticky: false,
                severity: 'success',
                summary: 'Confermato',
                detail: 'Report eliminato'
              });
              this.getReports();
            }
          },
          error => {
            this.blocked = false;
            this.messageService.add({
              sticky: true,
              severity: 'error',
              summary: 'Error',
              detail: 'Internal Error'
            });
          }
        );
      }
    });
  }

  clearFilter(dt) {
    $('.filter').val('');
     dt.reset();
  }
}
