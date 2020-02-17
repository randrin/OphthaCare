import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, ResponseContentType, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

    
    private appointmentsUrl = window['baseUrl'] + '/appointment/getAllAppointments';
    private appointmentUrlInsert = window['baseUrl'] + '/appointment/insert';
    private appointmentUrlUpdate = window['baseUrl'] + '/appointment/update';
    private appointmentUrlDelete = window['baseUrl'] + '/appointment/delete';

    constructor(public router: Router, private http: Http) {}

    getAllAppointments(caller) {
        const options = {
          headers: new Headers({
            'caller': caller
          })
        };
        return this.http.get(this.appointmentsUrl, options);
    }

    insertAppointments (appointment, caller) {
        const options = {
            headers: new Headers({
            'caller': caller
            }),
        };
        return this.http.put(this.appointmentUrlInsert, appointment, options);
    }

    updateAppointments (appointment, caller) {
        const options = {
            headers: new Headers({
            'caller': caller
            }),
        };
        return this.http.post(this.appointmentUrlUpdate, appointment, options);
    }

    deleteAppointments(appointment, caller) {
        const options = {
            headers: new Headers({
            'caller': caller
            })
        };
        return this.http.delete(this.appointmentUrlDelete + '/' + appointment.idAppointment, options);
    }

  
}
