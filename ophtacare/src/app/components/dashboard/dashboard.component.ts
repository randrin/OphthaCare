import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboardService';
import { PatientsService } from '../../services/patientsService';
import { AuthenticationService } from '../../services/authenticationService';
import { Patients } from '../../models/patients/patients';
import { AdministrateursService } from '../../services/administrateursService';
import { Admins } from '../../models/administrateur/admins';
import { ConfirmationService } from 'primeng/primeng';
import { MedecinsService } from '../../services/medecinsService';
import { Medecins } from '../../models/medecins/medecins';

@Component({
  selector: 'app-dashboard',
  providers: [ConfirmationService],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public totalPatients: Patients = { list: [] };
  public totalAdmins: Admins = { list: [] };
  public totalMedecins: Medecins = { list: [] };
  public dataBar: any;
  public dataPie: any;
  public blocked;

  // bar chart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: string;
  public barChartLegend: boolean;

  public barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  // Doughnut
  public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: number[] = [350, 450, 100];
  public doughnutChartType: string;

  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }

  constructor(private dashboardService: DashboardService, private patientsService: PatientsService,
    private authenticationService: AuthenticationService, private administrateursService: AdministrateursService,
    private medecinService: MedecinsService) {
    this.dataBar = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'My First dataset',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
              data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
              label: 'My Second dataset',
              backgroundColor: '#9CCC65',
              borderColor: '#7CB342',
              data: [28, 48, 40, 19, 86, 27, 90]
          }
      ]
  };

  this.dataPie = {
    labels: ['A', 'B', 'C'],
    datasets: [
        {
            data: [300, 50, 100],
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ]
        }]
    };
  }

  ngOnInit() {
    this.blocked = true;
    setTimeout(() => {
      this.getAllPatients();
      this.getAllAdministrateurs();
      this.getAllMedecins();
      this.blocked = false;
    }, 1000);

    this.barChartType = 'bar';
    this.barChartLegend = true;
    this.doughnutChartType = 'doughnut';
  }

  getAllPatients() {
      this.patientsService.getAllPatients(this.authenticationService.getUsername()).subscribe(
        response => {
          if (response.json() != null) {
            this.totalPatients.list = this.totalPatients.list.concat(response.json().filter(n => n));
          }
      });
  }

  getAllAdministrateurs() {
    this.administrateursService.getAllAdmins(this.authenticationService.getUsername()).subscribe(
      response => {
        if (response.json() != null) {
          this.totalAdmins.list = this.totalAdmins.list.concat(response.json().filter(n => n));
        }
    });
}

getAllMedecins() {
  this.medecinService.getAllMedecins(this.authenticationService.getUsername()).subscribe(
    response => {
      if (response.json() != null) {
        this.totalMedecins.list = this.totalMedecins.list.concat(response.json().filter(n => n));
      }
  });
}
}
