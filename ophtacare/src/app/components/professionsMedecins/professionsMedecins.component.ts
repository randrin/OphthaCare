import { Component, OnInit } from '@angular/core';
import { ProfessionsMedecinsService } from '../../services/professionsMedecinsService';
import { AuthenticationService } from '../../services/authenticationService';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/primeng';
import { Profession } from '../../models/professions/profession';
import { Professions } from '../../models/professions/professions';

@Component({
  selector: 'app-professionsmedecins',
  providers: [ConfirmationService],
  templateUrl: './professionsMedecins.component.html',
  styleUrls: ['./professionsMedecins.component.css']
})
export class ProfessionsMedecinsComponent implements OnInit {

  public blocked;
  public cols: any[];
  public professions: Professions = { list: [] };
  public displayDetailsDialog;
  public displayNewDialog;
  public displayUpdateDialog;
  public profession = new Profession(0, '', '', '');
  public newProfession = new Profession(0, '', '', '');
  public professionUpdate = new Profession(0, '', '', '');

  constructor(private professionsMedecinsService: ProfessionsMedecinsService, private messageService: MessageService,
    private authenticationService: AuthenticationService, private confirmationService: ConfirmationService) {
      this.cols = [
        { field: 'detail', header: 'detail' },
        { field: 'codeProfession', header: 'codeProfession' },
        { field: 'nomProfession', header: 'nomProfession' },
        { field: 'descProfession', header: 'descProfession' },
        { field: 'detail', header: 'modify' },
        { field: 'detail', header: 'cancel' },
      ];
    }

  ngOnInit() {
    this.getProfessions();
  }

  getProfessions() {
    this.blocked = true;
    this.professionsMedecinsService.getAllProfessionsMedecins(this.authenticationService.getUsername()).subscribe(
      response => {
        this.professions.list = [];
        if (response.json() != null) {
          this.professions.list = this.professions.list.concat(response.json().filter(n => n));
        }
    });
    setTimeout(() => {
      this.blocked = false;
    }, 1000);
  }

  isAdmin() {

  }

  clearFilter(dt) {
    $('.filter').val('');
     dt.reset();
  }

  closeDialog () {
    this.displayNewDialog = false;
    this.displayUpdateDialog = false;
    this.newProfession = new Profession(0, '', '', '');
    this.professionUpdate = new Profession(0, '', '', '');
  }
}
