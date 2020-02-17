import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../../../services/AppointmentsService';
import { ConfirmationService } from 'primeng/primeng';
import { MessageService, SelectItem } from 'primeng/api';
import { AuthenticationService } from '../../../services/authenticationService';
import saveAs from 'save-as';
import * as moment from 'moment';
import { Appointment } from '../../../models/appointments/appointment';
import { DashboardService } from '../../../services/dashboardService';
import { InitModelService } from '../../../services/initModelService';
import { Appointments } from '../../../models/appointments/appointments';

@Component({
  selector: 'app-Appointments',
  providers: [ConfirmationService],
  templateUrl: './Appointments.component.html',
  styleUrls: ['./Appointments.component.css']
})
export class AppointmentsComponent implements OnInit {


  public Appointments: Appointments = { list: [] };
  public cols: any[];
  public AppointmentCode = this.initModelService.initModelAppointment();
  public AppointmentUpdate = this.initModelService.initModelAppointment();
  public blocked;
  public initDate: Date = new Date ('01/01/1927');
  public endDate: Date = new Date ('01/01/2030');
  public value: Date = new Date ();
  public doctor = this.initModelService.initModelMedecin;
  public displayDetailsDialog;
  public displayNewDialog;
  public displayUpdateDialog;
  public newAppointment = this.initModelService.initModelAppointment();
  public response = {
    code: 0,
    message: ''
  }

  constructor(private AppointmentsService: AppointmentsService, private messageService: MessageService,
    private authenticationService: AuthenticationService, private confirmationService: ConfirmationService,
    private dashboardService: DashboardService, private initModelService: InitModelService) {
     
      this.cols = [
        { field: 'date', header: 'date' },
        { field: 'description', header: 'description' },
        { field: 'doctor', header: 'doctor' },
        { field: 'patient code', header: 'patient code' },
        { field: 'start time', header: 'start time' },
        { field: 'end time', header: 'end time' },
      ];
    }

  ngOnInit() {
 
  }

  getAppointments() {
    this.blocked = true;
    this.AppointmentsService.getAllAppointments(this.authenticationService.getUsername()).subscribe(
      response => {
        this.Appointments.list = [];
        if (response.json() != null) {
          this.Appointments.list = this.Appointments.list.concat(response.json().filter(n => n));
        }
    });
    setTimeout(() => {
      this.blocked = false;
    }, 1000);
  }

  createAppointments() {
    this.blocked = true;
    setTimeout(() => {
      this.blocked = false;
    }, 500);
  }

  submitAppointments(appointment: Appointment) {
    //console.log('Appointment to register: ' + Appointment + ' ' + Appointment.);
   // Appointment. = moment(Appointment.date).format('DD/MM/YYYY');
   
    this.newAppointment = appointment;
    this.blocked = true;
    this.AppointmentsService.insertAppointments(this.newAppointment, this.authenticationService.getUsername()).subscribe(
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
            detail: 'Appointment enregistré.'
          });
          this.getAppointments();
          this.newAppointment = this.initModelService.initModelAppointment();
          this.displayNewDialog = false;
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

  submitUpdateAppointments(updateAppointment: Appointment) {
    console.log('Appointment to update: ' + updateAppointment.codePatient + ' ' + updateAppointment.description);
    updateAppointment.dateAppointment = moment(updateAppointment.dateAppointment).format('DD/MM/YYYY');
    this.AppointmentUpdate = updateAppointment;
    this.blocked = true;
    this.AppointmentsService.updateAppointments(this.AppointmentUpdate, this.authenticationService.getUsername()).subscribe(
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
            detail: 'Appointment ajourné.'
          });
          this.getAppointments();
          this.AppointmentUpdate = this.initModelService.initModelAppointment();
          this.displayUpdateDialog = false;
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

 

  detailsAppointment (appointment: Appointment) {
    this.blocked = true;
    setTimeout(() => {
      this.blocked = false;
      this.displayDetailsDialog = true;
    }, 500);
   // this.Appointment = Appointment;
  }

  deleteAppointment(Appointment: Appointment) {
  
    this.confirmationService.confirm({
      message: 'Etes-vous sure de vouloir supprimer ' + Appointment.dateAppointment + ' ' + Appointment.description + ' ?',
      header: 'Conferma Eliminazione',
      icon: 'pi pi-trash',
      accept: () => {
        this.blocked = true;
        this.AppointmentsService.deleteAppointments(Appointment, this.authenticationService.getUsername()).subscribe(
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
                detail: 'Appointment eliminato'
              });
              this.getAppointments();
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

  updateAppointment (Appointment: Appointment) {
    this.blocked = true;
    setTimeout(() => {
      this.blocked = false;
      this.displayUpdateDialog = true;
    }, 500);
    Appointment.dateAppointment = moment(Appointment.dateAppointment).format('DD/MM/YYYY');
    this.AppointmentUpdate = Appointment;
  }
  clearFilter(dt) {
    $('.filter').val('');
     dt.reset();
  }

  closeDialog () {
    this.displayNewDialog = false;
    this.displayUpdateDialog = false;
    this.newAppointment = this.initModelService.initModelAppointment();
    this.AppointmentUpdate = this.initModelService.initModelAppointment();
  }
}

