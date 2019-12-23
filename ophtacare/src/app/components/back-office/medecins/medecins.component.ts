import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { AuthenticationService } from '../../../services/authenticationService';
import { MedecinsService } from '../../../services/medecinsService';
import { Medecins } from '../../../models/medecins/medecins';
import { MessageService, SelectItem } from 'primeng/api';
import saveAs from 'save-as';
import * as moment from 'moment';
import { Medecin } from '../../../models/medecins/medecin';
import { Professions } from '../../../models/professions/professions';
import { ProfessionsMedecinsService } from '../../../services/professionsMedecinsService';

@Component({
  selector: 'app-medecins',
  providers: [ConfirmationService],
  templateUrl: './medecins.component.html',
  styleUrls: ['./medecins.component.css']
})
export class MedecinsComponent implements OnInit {

  public yearOld = '<';
  public blocked;
  public gender: SelectItem[];
  public minDate: Date = new Date ('01/01/1927');
  public maxDate: Date = new Date ('01/01/2030');
  public cols: any[];
  public displayDetailsDialog;
  public displayNewDialog;
  public displayUpdateDialog;
  public addProfession;
  public medecins: Medecins = { list: [] };
  public professions;
  public medecin = new Medecin(0, '', '', '', 0, '', '', '', '', 0, 0, '');
  public newMedecin = new Medecin(0, '', '', '', 0, '', '', '', '', 0, 0, '');
  public medecinUpdate = new Medecin(0, '', '', '', 0, '', '', '', '', 0, 0, '');
  public response = {
    code: 0,
    message: ''
  };

  constructor(private authenticationService: AuthenticationService, private medecinsService: MedecinsService,
    private messageService: MessageService, private confirmationService: ConfirmationService,
    private professionsMedecinsService: ProfessionsMedecinsService) {
      this.cols = [
        { field: 'detail', header: 'detail' },
        { field: 'matriculeMedecin', header: 'matriculeMedecin' },
        { field: 'nomMedecin', header: 'firstName' },
        { field: 'prenomMedecin', header: 'lastName' },
        { field: 'sexeMedecin', header: 'sex' },
        { field: 'professionMedecin', header: 'nomProfession' },
        { field: 'dateNaisMedecin', header: 'dateOfBorn' },
        // { field: 'ageMedecin', header: 'year' },
        // { field: 'emailMedecin', header: 'email' },
        // { field: 'numFixeMedecin', header: 'fixePhone' },
        { field: 'detail', header: 'modify' },
        { field: 'detail', header: 'cancel' },
      ];
    }

  ngOnInit() {
    this.gender = [
      { label: 'Male', value: 'Male', icon: 'pi pi-user' },
      { label: 'Female', value: 'Female', icon: 'pi pi-user' }
    ];
    this.getMedecins();
    this.getProfessions();
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

  getProfessions() {
    this.professionsMedecinsService.getAllProfessionsMedecins(this.authenticationService.getUsername()).subscribe(
      response => {
        if (response.json() != null) {
          this.professions = response.json();
          console.log("Length Professions: ", response.json().length);
          console.log("Fuori add professions ...");
          if (response.json().length > 0) {
            console.log("Dentro add professions ...");
            this.addProfession = true;
          }
        }
    });
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
    this.blocked = true;
    setTimeout(() => {
      this.blocked = false;
      this.displayDetailsDialog = true;
    }, 500);
    this.medecin = medecin;
  }

  submitMedecin(medecin: Medecin) {
    console.log('Medecin to register: ' + medecin.nomMedecin + ' ' + medecin.prenomMedecin);
    medecin.dateNaisMedecin = moment(medecin.dateNaisMedecin).format('DD/MM/YYYY');
    this.newMedecin = medecin;
    this.blocked = true;
    this.medecinsService.insertMedecin(this.newMedecin, 'this.authenticationService.getUsername()').subscribe(
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
            detail: 'Médecin enregistré.'
          });
          this.getMedecins();
          this.newMedecin = new Medecin(0, '', '', '', 0, '', '', '', '', 0, 0, '');
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

  submitUpdateMedecin (updateMedecin: Medecin) {
    console.log('Medecin to update: ' + updateMedecin.nomMedecin + ' ' + updateMedecin.prenomMedecin);
    updateMedecin.dateNaisMedecin = moment(updateMedecin.dateNaisMedecin).format('DD/MM/YYYY');
    this.medecinUpdate = updateMedecin;
    this.blocked = true;
    this.medecinsService.updateMedecin(this.medecinUpdate, 'this.authenticationService.getUsername()').subscribe(
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
            detail: 'Medecin ajourné.'
          });
          this.getMedecins();
          this.medecinUpdate = new Medecin(0, '', '', '', 0, '', '', '', '', 0, 0, '');
          this.displayUpdateDialog = false;
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

  updateMedecin(medecin: Medecin) {
    this.blocked = true;
    setTimeout(() => {
      this.blocked = false;
      this.displayUpdateDialog = true;
    }, 500);
    medecin.dateNaisMedecin = moment(medecin.dateNaisMedecin).format('DD/MM/YYYY');
    this.medecinUpdate = medecin;
  }

  deleteMedeicn(medecin: Medecin) {
    console.log('Medecin to cancel: ' + medecin.idMedecin);
    this.confirmationService.confirm({
      message: 'Etes-vous sure de vouloir supprimer ' + medecin.nomMedecin + ' ' + medecin.prenomMedecin + ' ?',
      header: 'Conferma Eliminazione',
      icon: 'pi pi-trash',
      accept: () => {
        this.blocked = true;
        this.medecinsService.deleteMedecin(medecin, 'this.authenticationService.getUsername()').subscribe(
          res => {
            this.blocked = false;
            if (res.json().code !== 'OK') {
              this.messageService.add({
                sticky: true,
                severity: 'error',
                summary: res.json().code,
                detail: res.json().message
              });
            } else {
              this.messageService.add({
                sticky: false,
                severity: 'success',
                summary: 'Confermato',
                detail: 'Medecin eliminato'
              });
              this.getMedecins();
            }
          },
          error => {
            this.blocked = false;
            this.messageService.add({
              sticky: true,
              severity: 'error',
              summary: 'Error',
              detail: 'Internal Error'
            });
          }
        );
      }
    });
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

  closeDialog () {
    this.displayNewDialog = false;
    this.displayUpdateDialog = false;
    this.newMedecin = new Medecin(0, '', '', '', 0, '', '', '', '', 0, 0, '');
    this.medecinUpdate = new Medecin(0, '', '', '', 0, '', '', '', '', 0, 0, '');
  }
}
