import { Component, OnInit } from '@angular/core';
import { PatientsServiceService } from '../../services/patientsservice.service';
import { ConfirmationService } from 'primeng/primeng';
import { MessageService, SelectItem } from 'primeng/api';
import { AuthenticationService } from '../../services/authenticationService';
import saveAs from 'save-as';
import * as moment from 'moment';
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
  public gender: SelectItem[];
  public patients: Patients = { list: [] };
  public response = {
    code: 0,
    message: ''
  };
  public displayDetailsDialog;
  public displayNewDialog;
  public patient = new Patient(0, '', '', '', '', '', '', '', 0, '', 0, 0, '', 0);
  public newPatient = new Patient(0, '', '', '', '', '', '', '', 0, '', 0, 0, '', 0);
  public blocked;
  public minDate: Date = new Date ('01/01/1927');
  public maxDate: Date = new Date ('01/01/2030');
  public value: Date = new Date ();

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
    this.gender = [
      { label: 'Male', value: 'Male', icon: 'pi pi-user' },
      { label: 'Female', value: 'Female', icon: 'pi pi-user' }
    ];
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
    this.blocked = true;
    setTimeout(() => {
      this.blocked = false;
      this.displayNewDialog = true;
    }, 500);
  }

  submitPatient(patient: Patient) {
    this.newPatient = {
      nomPatient: patient.nomPatient,
      prenomPatient: patient.prenomPatient,
      idPatient: patient.idPatient,
      codePatient: patient.codePatient,
      agePatient: patient.agePatient,
      addressePatient: patient.addressePatient,
      codePostPatient: patient.codePostPatient,
      sexePatient: patient.sexePatient,
      numFixePatient: patient.numFixePatient,
      numTelPatient: patient.numTelPatient,
      emailPatient: patient.emailPatient,
      dateNaisPatient:  moment(patient.dateNaisPatient).format('DD/MM/YYYY'),
      domicilePatient: patient.domicilePatient,
      infoSupplPatient: patient.infoSupplPatient,
    };
    console.log('Patient to register: ' + this.newPatient.nomPatient + ' ' + this.newPatient.prenomPatient);
    this.blocked = true;
    this.patientsService.insertPatient(this.newPatient, 'this.authenticationService.getUsername()').subscribe(
      response => {
        this.blocked = false;
        if (response.json().code !== 'OK') {
          this.messageService.add({
            sticky: true,
            severity: 'error',
            summary: response.json().code,
            detail: response.json().message
          });
        } else {
          this.messageService.add({
            sticky: false,
            severity: 'success',
            summary: 'Succès',
            detail: 'Patient enregistré.'
          });
          this.getPatients();
        }
      },
      error => {
        this.blocked = false;
        this.messageService.add({
          sticky: true,
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur Technique'
        });
      });
  }

  isAdmin() {

  }

  detailsPatient (patient: Patient) {
    this.blocked = true;
    setTimeout(() => {
      this.blocked = false;
      this.displayDetailsDialog = true;
    }, 500);
    this.patient = patient;
  }

  deletePatient(patient: Patient) {
    console.log('Patient to cancel: ' + patient.idPatient);
    this.confirmationService.confirm({
      message: '{{ Etes-vous sure de vouloir supprimer : | translate }} ' + patient.nomPatient + ' ?',
      header: 'Conferma Eliminazione',
      icon: 'pi pi-trash',
      accept: () => {
        this.blocked = true;
        this.patientsService.deletePatient(patient, 'this.authenticationService.getUsername()').subscribe(
          res => {
            this.blocked = false;
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

  closeDialog () {
    this.displayNewDialog = false;
    this.newPatient = new Patient(0, '', '', '', '', '', '', '', 0, '', 0, 0, '', 0);
  }
}
