import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { AuthenticationService } from '../../services/authenticationService';
import { MedecinsService } from '../../services/medecinsService';
import { Medecins } from '../../models/medecins/medecins';
import { MessageService } from 'primeng/api';
import saveAs from 'save-as';
import { Medecin } from '../../models/medecins/medecin';

@Component({
  selector: 'app-medecins',
  providers: [ConfirmationService],
  templateUrl: './medecins.component.html',
  styleUrls: ['./medecins.component.css']
})
export class MedecinsComponent implements OnInit {

  public blocked;
  public cols: any[];
  public displayDetailsDialog;
  public displayNewDialog;
  public displayUpdateDialog;
  public medecins: Medecins = { list: [] };
  public medecin = new Medecin(0, '', '', '', 0, '', '', '', '', 0, 0);
  public newMedecin = new Medecin(0, '', '', '', 0, '', '', '', '', 0, 0);
  public medecinUpdate = new Medecin(0, '', '', '', 0, '', '', '', '', 0, 0);
  public response = {
    code: 0,
    message: ''
  };

  constructor(private authenticationService: AuthenticationService, private medecinsService: MedecinsService,
    private messageService: MessageService) {
      this.cols = [
        { field: 'detail', header: 'detail' },
        { field: 'matriculeMedecin', header: 'matriculeMedecin' },
        { field: 'nomMedecin', header: 'firstName' },
        { field: 'prenomMedecin', header: 'lastName' },
        { field: 'sexeMedecin', header: 'sex' },
        { field: 'dateNaisMedecin', header: 'dateOfBorn' },
        // { field: 'ageMedecin', header: 'year' },
        // { field: 'emailMedecin', header: 'email' },
        { field: 'numTelMedecin', header: 'cellularePhone' },
        // { field: 'numFixeMedecin', header: 'fixePhone' },
        { field: 'detail', header: 'modify' },
        { field: 'detail', header: 'cancel' },
      ];
    }

  ngOnInit() {
    this.blocked = true;
    setTimeout(() => {
      this.blocked = false;
    }, 1000);
    this.getMedecins();
  }

  getMedecins() {
    this.blocked = true;
    this.medecinsService.getAllMedecins(this.authenticationService.getUsername()).subscribe(
      response => {
        this.medecins.list = [];
        if (response.json() != null) {
          this.medecins.list = this.medecins.list.concat(response.json().filter(n => n));
        }
    });
    setTimeout(() => {
      this.blocked = false;
    }, 1000);
  }

  isAdmin() {

  }

  createMedecin() {
    this.blocked = true;
    setTimeout(() => {
      this.blocked = false;
      this.displayNewDialog = true;
    }, 500);
  }

  detailsMedecin(medecin: Medecin) {

  }

  updateMedecin(medecin: Medecin) {

  }

  deleteMedeicn(medecin: Medecin) {

  }

  exportExcelMedecins() {
    console.log('Export excel file called: -> Medecins');
    this.medecinsService.exportMedecins(this.authenticationService.getUsername()).subscribe(
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
          this.downloadMedecinsFile(data);
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

  downloadMedecinsFile(data: any) {
    const blob = new Blob([data.blob()], { type: 'application/octet-stream' });
    saveAs(blob, 'Medecins_OphthaCare.xlsx');
  }

  clearFilter(dt) {
    $('.filter').val('');
     dt.reset();
  }
}
