import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { AuthenticationService } from '../../services/authenticationService';
import { SpecialistesService } from '../../services/specialistesService';

@Component({
  selector: 'app-specialistes',
  providers: [ConfirmationService],
  templateUrl: './specialistes.component.html',
  styleUrls: ['./specialistes.component.css']
})
export class SpecialistesComponent implements OnInit {

  public blocked;

  constructor(private authenticationService: AuthenticationService, private specialistesService: SpecialistesService) { }

  ngOnInit() {
    this.blocked = true;
    setTimeout(() => {
      this.blocked = false;
    }, 1000);
  }

}
