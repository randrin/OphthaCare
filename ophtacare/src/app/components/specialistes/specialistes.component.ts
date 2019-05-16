import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { AuthenticationService } from '../../services/authenticationService';
import { SpecialistesService } from '../../services/specialistesService';
import { Specialistes } from '../../models/specialistes/specialistes';

@Component({
  selector: 'app-specialistes',
  providers: [ConfirmationService],
  templateUrl: './specialistes.component.html',
  styleUrls: ['./specialistes.component.css']
})
export class SpecialistesComponent implements OnInit {

  public blocked;
  public specialistes: Specialistes = { list: [] };

  constructor(private authenticationService: AuthenticationService, private specialistesService: SpecialistesService) { }

  ngOnInit() {
    this.blocked = true;
    setTimeout(() => {
      this.blocked = false;
    }, 1000);
    this.getSpecialistes();
  }

  getSpecialistes () {
    this.blocked = true;
    this.specialistesService.getAllSpecialistes(this.authenticationService.getUsername()).subscribe(
      response => {
        this.specialistes.list = [];
        if (response.json() != null) {
          this.specialistes.list = this.specialistes.list.concat(response.json().filter(n => n));
        }
    });
    setTimeout(() => {
      this.blocked = false;
    }, 1000);
  }
}
