import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, ResponseContentType, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

    private appointmentExportUrl = window['baseUrl'] + '/excel/downloadExcelAppointments';
    private appointmentsUrl = window['baseUrl'] + '/appointment/getAllAppointments';
    private appointmentUrlInsert = window['baseUrl'] + '/appointment/insert';
    private appointmentUrlUpdate = window['baseUrl'] + '/appointment/update';
    private appointmentUrlDelete = window['baseUrl'] + '/appointment/delete';

    constructor(public router: Router, private http: Http) {}

    getAllAdmins(caller) {
        const options = {
          headers: new Headers({
            'caller': caller
          })
        };
        return this.http.get(this.appointmentsUrl, options);
    }

    insertAdministrateur (appointment, caller) {
        const options = {
            headers: new Headers({
            'caller': caller
            }),
        };
        return this.http.put(this.appointmentUrlInsert, appointment, options);
    }

    updateAdministrateur (appointment, caller) {
        const options = {
            headers: new Headers({
            'caller': caller
            }),
        };
        return this.http.post(this.appointmentUrlUpdate, appointment, options);
    }

    deleteAdministrator(appointment, caller) {
        const options = {
            headers: new Headers({
            'caller': caller
            })
        };
        return this.http.delete(this.appointmentUrlDelete + '/' + appointment.idAppointment, options);
    }

    exportAdministrateurs(caller) {
        const options = {
            headers: new Headers({
            'caller': caller
            }),
            responseType: ResponseContentType.Blob
        };
        return this.http.get(this.appointmentExportUrl, options);
    }
}
