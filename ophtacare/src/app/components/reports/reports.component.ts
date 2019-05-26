import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/primeng';
import { ReportsService } from '../../services/reportsService';
import { AuthenticationService } from '../../services/authenticationService';
import { Reports } from '../../models/reports/reports';


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

  constructor(private authenticationService: AuthenticationService,
    private confirmationService: ConfirmationService, private messageService: MessageService, private reportService: ReportsService) { }

  ngOnInit() {
    this.cols = [
      { field: 'pseudoAdmin', header: 'pseudoAdmin' },
      { field: 'nomAdmin', header: 'firstName' },
      { field: 'prenomAdmin', header: 'lastName' },
      { field: 'roleAdmin', header: 'roleAdmin' },
      { field: 'activeAdmin', header: 'activeAdmin' },
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

  exportExcelReports() {

  }
  
  clearFilter(dt) {
    $('.filter').val('');
     dt.reset();
  }
}
