export class Appointment {
    public description: string;
    public dateAppointment: string;
    public startHourAppointment: string;
    public endHourAppointment: string;
    public doctor:string;
    public codePatient:number;

    constructor(
        description: string,
        dateAppointment: string,
        startHourAppointment: string,
        endHourAppointment: string,
        doctor:string,
        codePatient:number
    ) { }
  }
