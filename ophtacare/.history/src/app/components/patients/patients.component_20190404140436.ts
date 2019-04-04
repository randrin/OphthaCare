import { Component, OnInit } from '@angular/core';
import { PatientsServiceService } from '../../services/patientsservice.service';
import { ConfirmationService } from 'primeng/primeng';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from '../../services/authenticationService';
import saveAs from 'save-as';
import { Patients } from '../../models/patients/patients';
import { Patient } from '../../models/patients/patient';
import {ProgressBarModule} from 'primeng/progressbar';
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
  public blocked;
  constructor(private patientsService: PatientsServiceService, private messageService: MessageService,
    private authenticationService: AuthenticationService, private confirmationService: ConfirmationService) {
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
    this.blocked = true;
    this.patientsService.getAllPatients(this.authenticationService.getUsername()).subscribe(
      response => {
        this.patients.list = [];
        if (response.json() != null) {
          this.patients.list = this.patients.list.concat(response.json().filter(n => n));
        }
    });
    setTimeout(() => {
      this.blocked = false;
    }, 3000);
  }

  createPatient() {

  }
  
  isAdmin() {

  }

  detailsPatient (patient: Patient) {
    this.displayDetailsDialog = true;
    this.patient = {
      idPatient: patient.idPatient,
      nomPatient: patient.nomPatient,
      prenomPatient: patient.prenomPatient,
      agePatient: patient.agePatient,
      codePostPatient: patient.codePostPatient,
      dateNaisPatient: patient.dateNaisPatient,
      domicilePatient: patient.domicilePatient,
      infoSupplPatient: patient.infoSupplPatient,
      numFixePatient: patient.numFixePatient,
      numTelPatient: patient.numTelPatient,
      sexePatient: patient.sexePatient
    };
  }

  deletePatient(patient: Patient) {
    console.log('Patient to cancel: ' + patient.idPatient);
    this.confirmationService.confirm({
      message: '{{ \'Etes-vous sure de vouloir supprimer :\' | translate }} ' + patient.nomPatient + ' ?',
      header: 'Conferma Eliminazione',
      icon: 'pi pi-trash',
      accept: () => {
        this.blocked = true;
        this.patientsService.deletePatient(patient, 'hhh').subscribe(
          res => {
            this.blocked = false;
            // this.responseData = res.json();
            if ( res.json().code !== 'OK') {
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
                detail: 'utente eliminato'
              });
              this.getPatients();
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

  updatePatient (patient: Patient) {

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
