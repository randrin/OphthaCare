import { Component, OnInit } from '@angular/core';
import { PatientsServiceService } from '../../services/patientsservice.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  constructor(private patientsService: PatientsServiceService) { }

  ngOnInit() {
  }

}
