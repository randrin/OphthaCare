import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { ProfilService } from '../../services/profilService';
import { AuthenticationService } from '../../services/authenticationService';
import { Admin } from '../../models/administrateurs/admin';

@Component({
  selector: 'app-profil',
  providers: [ConfirmationService],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  public blocked;
  public profilAdmin = new Admin(0, '', '', '', '', '', '', '', '', '');

  constructor(private profilService: ProfilService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.getProfilAdministrateur();
  }

  getProfilAdministrateur() {
    this.blocked = true;
    this.profilAdmin = this.authenticationService.admin;
    setTimeout(() => {
      this.blocked = false;
    }, 1000);
  }
}
