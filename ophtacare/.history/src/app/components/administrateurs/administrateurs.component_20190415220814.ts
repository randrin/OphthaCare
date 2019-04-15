import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { AuthenticationService } from '../../services/authenticationService';
import { AdministrateursService } from '../../services/administrateursService';

@Component({
  selector: 'app-administrateurs',
  providers: [ConfirmationService],
  templateUrl: './administrateurs.component.html',
  styleUrls: ['./administrateurs.component.css']
})
export class AdministrateursComponent implements OnInit {

  public cols: any[];
  public blocked;

  constructor(private administrateurService: AdministrateursService, private authenticationService: AuthenticationService, 
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
  }

}
