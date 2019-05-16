import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { AuthenticationService } from '../../services/authenticationService';
import { MaladiesService } from '../../services/maladiesService';
import { Maladies } from '../../models/maladies/maladies';

@Component({
  selector: 'app-maladies',
  providers: [ConfirmationService],
  templateUrl: './maladies.component.html',
  styleUrls: ['./maladies.component.css']
})
export class MaladiesComponent implements OnInit {

  public blocked;
  public maladies: Maladies = { list: [] };

  constructor(private authenticationService: AuthenticationService, private confirmationService: ConfirmationService,
    private maladiesServices: MaladiesService) { }

    ngOnInit() {
      this.blocked = true;
      setTimeout(() => {
        this.blocked = false;
      }, 1000);
      this.getMaladies();
    }

    getMaladies () {
    this.blocked = true;
    this.maladiesServices.getAllMaladies(this.authenticationService.getUsername()).subscribe(
      response => {
        this.maladies.list = [];
        if (response.json() != null) {
          this.maladies.list = this.maladies.list.concat(response.json().filter(n => n));
        }
    });
    setTimeout(() => {
      this.blocked = false;
    }, 1000);
  }
}
