import { Injectable } from '@angular/core';
import { Admin } from '../models/administrateurs/admin';

@Injectable({
  providedIn: 'root'
})
export class InitModelService {

  constructor() { }

  initModelAdmin() {
    return new Admin(0, '', '', '', '', '', '', '', '', '');
  }
}
