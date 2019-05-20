import { Component, OnInit } from '@angular/core';
import { ProfessionsMedecinsService } from '../../services/professionsMedecinsService';
import { AuthenticationService } from '../../services/authenticationService';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/primeng';
import { Profession } from '../../models/professions/profession';
import { Professions } from '../../models/professions/professions';
import saveAs from 'save-as';
import * as moment from 'moment';

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
  public response = {
    code: 0,
    message: ''
  };

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

  exportExcelProfessionsMedecins() {
    console.log('Export excel file called: -> Professions');
    this.professionsMedecinsService.exportProfessionsMedecins(this.authenticationService.getUsername()).subscribe(
      data => {
        console.log('Response: ' + JSON.stringify(data));
        this.response = {
          code: data.status,
          message: data.statusText
        };
        if (this.response.message !== 'OK') {
          this.messageService.add({
            sticky: true,
            severity: 'error',
            summary: 'Erreur code ' + this.response.code,
            detail: 'Message ' + this.response.message
          });
        } else {
          this.downloadProfessionsFile(data);
        }
      },
      error => {
        this.messageService.add({
          sticky: true,
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur Technique'
        });
      }
    );
  }

  downloadProfessionsFile(data: any) {
    const blob = new Blob([data.blob()], { type: 'application/octet-stream' });
    saveAs(blob, 'Professions_OphthaCare.xlsx');
  }

  createProfession() {
    this.blocked = true;
    setTimeout(() => {
      this.blocked = false;
      this.displayNewDialog = true;
    }, 500);
  }

  submitProfession(profession: Profession) {
    console.log('Profession to register: ' + profession.nomProfession);
    this.newProfession = profession;
    this.blocked = true;
    this.professionsMedecinsService.insertProfessionMedecin(this.newProfession, 'this.authenticationService.getUsername()').subscribe(
      response => {
        this.blocked = false;
        if (response.json().code !== 'OK') {
          this.messageService.add({
            sticky: true,
            severity: 'error',
            summary: response.json().code,
            detail: response.json().message
          });
        } else {
          this.messageService.add({
            sticky: false,
            severity: 'success',
            summary: 'Succès',
            detail: 'Profession enregistré.'
          });
          this.getProfessions();
          this.newProfession = new Profession(0, '', '', '');
          this.displayNewDialog = false;
        }
      },
      error => {
        this.blocked = false;
        this.messageService.add({
          sticky: true,
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur Technique'
        });
      });
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
