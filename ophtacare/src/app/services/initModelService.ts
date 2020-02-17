import { Injectable } from '@angular/core';
import { Admin } from '../models/administrateurs/admin';
import { Patient } from '../models/patients/patient';
import { Maladie } from '../models/maladies/maladie';
import { Medecin } from '../models/medecins/medecin';
import { Profession } from '../models/professions/profession';
import { Permission } from '../models/permissions/permission';
import { Appointment} from '../models/appointments/appointment';

@Injectable({
  providedIn: 'root'
})
export class InitModelService {

  constructor() { }

  initModelAdmin() {
    return new Admin(0, '', '', '', '', '', '', '', '', '');
  }

  initModelPatient() {
    return new Patient(0, '', '', '', '', '', '', '', 0, '', 0, 0, '', 0);
  }

  initModelMaladie() {
    return new Maladie(0, '', '', '', '');
  }

  initModelMedecin() {
    return new Medecin(0, '', '', '', 0, '', '', '', '', 0, 0, '');
  }

  initModelProfessionMedecin() {
    return new Profession(0, '', '', '');
  }

  initModelPermission() {
    return new Permission(0, '', false, false, false, false, false, '', '');
  }
  initModelAppointment() {
    return new Appointment('', '', '', '', '',0);
  }
 
}
