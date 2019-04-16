import { Component, OnInit } from '@angular/core';
import { ConfirmationService, SelectItem } from 'primeng/primeng';
import { AuthenticationService } from '../../services/authenticationService';
import { AdministrateursService } from '../../services/administrateursService';
import { Admins } from '../../models/administrateur/admins';
import { Admin } from '../../models/administrateur/admin';

@Component({
  selector: 'app-administrateurs',
  providers: [ConfirmationService],
  templateUrl: './administrateurs.component.html',
  styleUrls: ['./administrateurs.component.css']
})
export class AdministrateursComponent implements OnInit {

  public cols: any[];
  public blocked;
  public role: SelectItem[];
  public admins: Admins = {list: [] };
  public admin = new Admin(0, '', '', '', '', '');
  public displayDetailsDialog;

  constructor(private administrateurService: AdministrateursService, private authenticationService: AuthenticationService,
    private confirmationService: ConfirmationService) {
      this.cols = [
        { field: 'detail', header: 'detail' },
        { field: 'pseudoAdmin', header: 'pseudoAdmin' },
        { field: 'nomAdmin', header: 'firstName' },
        { field: 'prenomAdmin', header: 'lastName' },
        { field: 'roleAdmin', header: 'roleAdmin' },
        { field: 'activeAdmin', header: 'activeAdmin' },
        { field: 'detail', header: 'modify' },
        { field: 'detail', header: 'cancel' },
      ];
    }

  ngOnInit() {
    this.role = [
      { label: 'Admin', value: 'ADMIN' },
      { label: 'User', value: 'USER' },
      { label: 'Supervisor', value: 'SUPERVISOR' }
    ];
    this.getAdminsitrateurs();
  }

  getAdminsitrateurs() {
    this.blocked = true;
    this.administrateurService.getAllAdmins(this.authenticationService.getUsername()).subscribe(
      response => {
        this.admins.list = [];
        if (response.json() != null) {
          this.admins.list = this.admins.list.concat(response.json().filter(n => n));
        }
    });
    setTimeout(() => {
      this.blocked = false;
    }, 1000);
  }

  isAdmin() {

  }

  detailsAdmin (admin: Admin) {
    this.blocked = true;
    setTimeout(() => {
      this.blocked = false;
      this.displayDetailsDialog = true;
    }, 500);
    this.admin = admin;
  }

  clearFilter(dt) {
    $('.filter').val('');
     dt.reset();
  }
}
