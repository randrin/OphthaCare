import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/primeng';
import { AuthenticationService } from '../../../services/authenticationService';
import { MaladiesService } from '../../../services/maladiesService';
import { Maladies } from '../../../models/maladies/maladies';
import saveAs from 'save-as';
import { Maladie } from '../../../models/maladies/maladie';
import { ProfessionsMedecinsService } from '../../../services/professionsMedecinsService';
import { InitModelService } from '../../../services/initModelService';

@Component({
  selector: 'app-maladies',
  providers: [ConfirmationService],
  templateUrl: './maladies.component.html',
  styleUrls: ['./maladies.component.css']
})
export class MaladiesComponent implements OnInit {

  public blocked;
  public maladies: Maladies = { list: [] };
  public displayDetailsDialog;
  public displayNewDialog;
  public displayUpdateDialog;
  public cols: any[];
  public professions;
  public maladie = this.initModelService.initModelMaladie();
  public newMaladie = this.initModelService.initModelMaladie();
  public maladieUpdate = this.initModelService.initModelMaladie();
  public response = {
    code: 0,
    message: ''
  };

  constructor(private authenticationService: AuthenticationService, private confirmationService: ConfirmationService,
    private maladiesService: MaladiesService, private messageService: MessageService,
    private professionsMedecinsService: ProfessionsMedecinsService, private initModelService: InitModelService) {
      this.cols = [
        { field: 'detail', header: 'detail' },
        { field: 'codeMaladie', header: 'codeMaladie' },
        { field: 'nomMaladie', header: 'FIRST_NAME' },
        { field: 'descMaladie', header: 'descProfession' },
        { field: 'medecinMaladie', header: 'medecinMaladie' },
        { field: 'detail', header: 'modify' },
        { field: 'detail', header: 'cancel' },
      ];
    }

    ngOnInit() {
      this.blocked = true;
      setTimeout(() => {
        this.blocked = false;
      }, 1000);
      this.getMaladies();
      this.getProfessions();
    }

  getMaladies () {
    this.blocked = true;
    this.maladiesService.getAllMaladies(this.authenticationService.getUsername()).subscribe(
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

  getProfessions() {
    this.professionsMedecinsService.getAllProfessionsMedecins(this.authenticationService.getUsername()).subscribe(
      response => {
        if (response.json() != null) {
          this.professions = response.json();
        }
    });
  }

  isAdmin() {

  }

  createMaladie() {
    this.blocked = true;
    setTimeout(() => {
      this.blocked = false;
      this.displayNewDialog = true;
    }, 500);
  }

  submitMaladie(maladie: Maladie) {
    console.log('Maladie to register: ' + maladie.nomMaladie);
    this.newMaladie = maladie;
    this.blocked = true;
    this.maladiesService.insertMaladie(this.newMaladie, 'this.authenticationService.getUsername()').subscribe(
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
          this.getMaladies();
          this.newMaladie = this.initModelService.initModelMaladie();
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

  detailsMaladie(maladie: Maladie) {
    this.blocked = true;
    setTimeout(() => {
      this.blocked = false;
      this.displayDetailsDialog = true;
    }, 500);
    this.maladie = maladie;
  }

  updateMaladie(maladie: Maladie) {
    this.blocked = true;
    setTimeout(() => {
      this.blocked = false;
      this.displayUpdateDialog = true;
    }, 500);
    this.maladieUpdate = maladie;
  }

  submitUpdateMaladie (maladie: Maladie) {
    console.log('Maladie to update: ' + maladie.nomMaladie);
    this.maladieUpdate = maladie;
    this.blocked = true;
    this.maladiesService.updateMaladie(this.maladieUpdate, 'this.authenticationService.getUsername()').subscribe(
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
            detail: 'Maladie ajourné.'
          });
          this.getMaladies();
          this.maladieUpdate = this.initModelService.initModelMaladie();
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

  deleteMaladie(maladie: Maladie) {
    console.log('Maladie to cancel: ' + maladie.idMaladie);
    this.confirmationService.confirm({
      message: 'Etes-vous sure de vouloir supprimer ' + maladie.codeMaladie + ' - ' + maladie.nomMaladie + ' ?',
      header: 'Conferma Eliminazione',
      icon: 'pi pi-trash',
      accept: () => {
        this.blocked = true;
        this.maladiesService.deleteMaladie(maladie, 'this.authenticationService.getUsername()').subscribe(
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
                detail: 'Maladie eliminato'
              });
              this.getMaladies();
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

  exportExcelMaladies() {
    console.log('Export excel file called: -> Maladies');
    this.maladiesService.exportMaladies(this.authenticationService.getUsername()).subscribe(
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
          this.downloadMaladiesFile(data);
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

  downloadMaladiesFile(data: any) {
    const blob = new Blob([data.blob()], { type: 'application/octet-stream' });
    saveAs(blob, 'Maladies_OphthaCare.xlsx');
  }

  clearFilter(dt) {
    $('.filter').val('');
     dt.reset();
  }

  closeDialog () {
    this.displayNewDialog = false;
    this.displayUpdateDialog = false;
    this.newMaladie = this.initModelService.initModelMaladie();
    this.maladieUpdate = this.initModelService.initModelMaladie();
  }
}
