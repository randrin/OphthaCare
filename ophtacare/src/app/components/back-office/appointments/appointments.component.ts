import { Component, OnInit } from '@angular/core';
import {Appointment} from './appointments.type';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  isNew = null;
  appointmentDetail: Appointment;
  appointments: Appointment[] = [
    {
      id: new Date().getTime().toString(),
      title: 'event1',
      start: new Date()
    }
  ];

  onRequestNewAppointment(e: Appointment): void {
    this.isNew = true;
    this.appointmentDetail = e;
  }

  onRequestUpdateAppointment(e: Appointment): void {
    this.isNew = false;
    this.appointmentDetail = e;
  }

  onCloseAppointmentDetail(): void {
    this.appointmentDetail = null;
    this.isNew = null;
  }

  onAdd(appointment: Appointment): void {
    this.appointments = [...this.appointments, { id: new Date().getTime().toString(), ...appointment }];
    this.onCloseAppointmentDetail();
  }

  onUpdate(appointment: Appointment): void {
    this.appointments = this.appointments.map(
      a => a.id === appointment.id ? { ...a, ...appointment } : a
    );
    this.onCloseAppointmentDetail();
  }

  onAppointmentUpdated(appointment: Appointment): void {
    this.onUpdate(appointment);
  }

}
