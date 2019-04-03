import { Component, OnInit } from '@angular/core';
import { PatientsServiceService } from '../../services/patientsservice.service';
import { ConfirmationService } from 'primeng/primeng';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from '../../services/authenticationService';
import saveAs from 'save-as';
import { Patients } from '../../models/patients/patients';
import { Patient } from '../../models/patients/patient';

@Component({
  selector: 'app-patients',
  providers: [ConfirmationService],
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  public cols: any[];
  public patients: Patients = { list: [] };
  public response = {
    code: 0,
    message: ''
  };
  public displayDetailsDialog;
  public patient = new Patient(0, '', '', '', '', 0, '', 0, 0, '', 0);

  constructor(private patientsService: PatientsServiceService, private messageService: MessageService, 
    private authenticationService: AuthenticationService) {
      this.cols = [
        { field: 'detail', header: 'detail' },
        { field: 'nomPatient', header: 'firstName' },
        { field: 'prenomPatient', header: 'lastName' },
        { field: 'sexePatient', header: 'sex' },
        { field: 'dateNaisPatient', header: 'dateOfBorn' },
        // { field: 'agePatient', header: 'year' },
        // { field: 'emailPatient', header: 'email' },
        { field: 'numTelPatient', header: 'cellularePhone' },
        // { field: 'numFixePatient', header: 'fixePhone' },
        // { field: 'addressePatient', header: 'city' },
        { field: 'codePostPatient', header: 'postalCode' },
        // { field: 'infoSupplPatient', header: 'supplInfos' },
        { field: 'detail', header: 'modify' },
        { field: 'detail', header: 'cancel' },
      ];
    }

  ngOnInit() {
    this.getPatients();
  }

  getPatients () {
    this.patientsService.getAllPatients(this.authenticationService.getUsername()).subscribe(
      response => {
        this.patients.list = [];
        if (response.json() != null) {
          this.patients.list = this.patients.list.concat(response.json().filter(n => n));
        }
    });
  }

  isAdmin() {

  }

  openDetails () {
    this.displayDetailsDialog = true;
  }
  exportExcelFile() {
    console.log('Export excel file called: -> Patients');
    this.patientsService.exportPatients(this.authenticationService.getUsername()).subscribe(
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
            summary: 'Error code ' + this.response.code,
            detail: 'Message ' + this.response.message
          });
        } else {
          this.downloadFile(data);
        }
      },
      error => {
        this.messageService.add({
          sticky: true,
          severity: 'error',
          summary: 'Error',
          detail: 'Internal Error'
        });
      }
    );
  }

  downloadFile(data: any) {
    const blob = new Blob([data.blob()], { type: 'application/octet-stream' });
    saveAs(blob, 'Patients_OphthaCare.xlsx');
  }

  clearFilter(dt) {
    $('.filter').val('');
     dt.reset();
  }
}
